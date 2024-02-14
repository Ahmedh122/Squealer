import "./share.css";
import Image from "../../assets/img.png";
import Map from "../../assets/Mappe.png";
import Friend from "../../assets/Amici.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import { useMutation, useQueryClient, } from 'react-query';
import { makeRequest } from "../../axios";
import { MapContainer, TileLayer, Marker, useMapEvents, Polyline } from 'react-leaflet'; // Import Marker and useMapEvents
import "leaflet/dist/leaflet.css"
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";


let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],  // size of the icon
  shadowSize: [41, 41], // size of the shadow
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  shadowAnchor: [13, 41],  // the same for the shadow
  popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor
});

L.Marker.prototype.options.icon = DefaultIcon;

let currentlat = 0
let currentlng = 0



const Share = ({ channelname }) => {

  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [randDesc, setrandDesc] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [lastLivePostId, setLastLivePostId] = useState(null);
  const [currentLivePostId, setCurrentLivePostId] = useState(null);
  const [thisrouteCoordinates, setRouteCoordinates] = useState([]);


const {
    isLoadingQuota,
    errorQuota,
    data: dataQuota,
  } = useQuery(["Quota"], () =>
    makeRequest.get(`/quota/${currentUser._id}`).then((res) => {
      return res.data;
    })
  );

  const [quota, setQuota] = useState(dataQuota?.quota);
  const queryClient = useQueryClient();






  const upload = async () => {
    try {
      const formData = new FormData();
      if (markerPosition) {
        formData.append("file", JSON.stringify(markerPosition));
      }
      else {
        formData.append("file", file)
      }
      console.log(formData.get("file"))
      const res = await makeRequest.post("/upload", formData);
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  
  

  const { isLoading: load, data: dat } = useQuery(["users"], () =>
    makeRequest.get("/users/find/" + currentUser._id).then((res) => {
      //console.log(res.data);
      return res.data;
    })
  );



  const mutation = useMutation(newPost => {
    return makeRequest.post("/posts", newPost);
  }, {
    onSuccess: (data) => {
      // Update state variables
      if (data.data.islive){
        setLastLivePostId(currentLivePostId);
        setCurrentLivePostId(data.data.postId);
      }
      // Invalidate and refetch
      queryClient.invalidateQueries(["posts"]);
    },
  });

  useEffect(() => {
    console.log("current: ", currentLivePostId);
    console.log("last: ", lastLivePostId);
    if (lastLivePostId) {
      deleteMutation.mutate(lastLivePostId);
    }
  }, [currentLivePostId, lastLivePostId]);

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );
  
  // Log the updated state
  /*useEffect(() => {
    console.log("current: ", currentLivePostId);
    console.log("last: ", lastLivePostId);
  }, [currentLivePostId, lastLivePostId]);*/

    useEffect(() => {
    let quotaUsed = desc.length;
    if (file) {
      quotaUsed += 10;
    }
    if (dataQuota?.quota) {
      // Check if dataQuota is defined
      setQuota(dataQuota?.quota - quotaUsed);
    }
  }, [desc, file, dataQuota]);



  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    //let position = "";
    if (file) imgUrl = await upload();
    //if (markerPosition) position = await upload();
    //console.log("markerpos is (handleClick) :"+markerPosition);
    mutation.mutate({
      desc,
      img: imgUrl,
      position: markerPosition,
      channelname,
    });
      // Call modifyQuota on the server
  try {
    const resQuota = await makeRequest.post("/quota", {
      userId: currentUser._id,
      usedQuota: desc.length + (file ? 10 : 0),
    });
      queryClient.invalidateQueries(["Quota"]);
      const { data: updatedQuotaData } = await queryClient.fetchQuery(
        ["Quota"],
        () =>
          makeRequest.get(`/quota/${currentUser._id}`).then((res) => res.data)
      );
    console.log(resQuota.data.message); // Log the server response
  } catch (err) {
    console.error(err);
  }

    setDesc("");
    setFile(null);
    setMarkerPosition(null);
    setShowMap(false)
  };

  //  MAPPA



  const handleAddPlace = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      currentlat = position.coords.latitude;
      currentlng = position.coords.longitude;
      setShowMap(true);
      setMarkerPosition([currentlat, currentlng]);
    }
    );
  };

  //const [live, setLive] = useState(false);
  const [watchId, setWatchId] = useState(null);


  const handleLive = async () => {
    if (!dat.islive) {
      const id = navigator.geolocation.watchPosition((position) => {
        currentlat = position.coords.latitude;
        currentlng = position.coords.longitude;
        setMarkerPosition([currentlat, currentlng]);
      });
      setWatchId(id);
      await makeRequest.put("/users/update/" , { islive: true });
      queryClient.invalidateQueries(["users"]);
    } else {
      navigator.geolocation.clearWatch(watchId);
      await makeRequest.put("/users/update/" , { islive: false });
      queryClient.invalidateQueries(["users"]);
      coordmutation.mutate([])
      setCurrentLivePostId(null);
      setLastLivePostId(null);
      setRouteCoordinates([]);
    }
    //console.log("live :"+live);
  };

  // Component to handle map events
  const MapEvents = () => {
    const map = useMapEvents({
      click: (e) => {
        setMarkerPosition(e.latlng);
      },
    });

    return null;
  };

  // TIMED POST (fare una mutation apposta??? ) FUNZIONA

  /*useEffect(() => {
    const intervalId = setInterval(() => {
      setrandDesc("I'm thinking about " + Math.floor(Math.random() * 100) + " things at the same time");
      console.log(randDesc);
      mutation.mutate({ desc: randDesc });
    }, 1800000); // 60000 milliseconds = 1 minute  

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [mutation, randDesc]); // Dependencies/*/

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios.get('https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=extracts&exintro&explaintext&grnlimit=1&origin=*')
        .then(response => {
          const pages = response.data.query.pages;
          const pageId = Object.keys(pages)[0];
          const extract = pages[pageId].extract;
          const sentences = extract.split('. ');
          const firstSentence = sentences[0];
          setrandDesc(firstSentence);
          mutation.mutate({ desc: "Did you know that " + firstSentence + " !!!" });
        })
        .catch(error => {
          console.error(error);
        });
    }, 2000000); // 60000 milliseconds = 1 minute  
  
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [mutation, randDesc]);

  const coordmutation = useMutation(updateCoords => {
    console.log("updateCoords: ", updateCoords);
    return makeRequest.put("/users/position",updateCoords).then(res => res.data);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  
  

  //TIMED POST LOCATION
  useEffect(() => {
    const intervalId2 = setInterval(() => {
      if (dat.islive) {
        setMarkerPosition([currentlat, currentlng]);
        var newposition = {lat : currentlat, lng : currentlng}  
        mutation.mutate({ desc:"im here", position: newposition, channelname: "MAPPA", islive: true});
        setRouteCoordinates(prevCoordinates => {
          const newPosition = [currentlat, currentlng];
          const alreadyExists = prevCoordinates.some(coord => coord[0] === newPosition[0] && coord[1] === newPosition[1]);
          if (!alreadyExists) {
            return [...prevCoordinates, newPosition];
          } else {
            return prevCoordinates;
          }
        });
        if (lastLivePostId) {
          deleteMutation.mutate(lastLivePostId);
        }
        
      } 
    }, 10000); // 60000 milliseconds = 1 minute  
  
    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId2);
  }, [mutation]); // Dependencies
  
  // New useEffect hook // NON SO SE MI PIACE QUESTO
  useEffect(() => {
    console.log("thisrouteCoordinates:", thisrouteCoordinates)
    coordmutation.mutate(thisrouteCoordinates);
  }, [thisrouteCoordinates]); // Dependency on thisrouteCoordinates
  

  return (
    <div className="Share">
      <div className="containerShare">
        <div className="topShare">
          {load ? ("Loading") : (
            <div className="leftShare">
              <img src={`/upload/${dat.profilePic}`} alt="" />
              <input
                type="text"
                placeholder={`What's on your mind ${dat.username}?`}
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              />
            </div>
          )}
        </div>
        <div className="middleShare">
          {file && <img alt="" src={URL.createObjectURL(file)} />}
          {showMap && (
            <MapContainer
              center={[currentlat, currentlng]}
              zoom={15}
              style={{ maxHeight: "500px", height: "100vh", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {markerPosition && <Marker position={markerPosition} />}
              <MapEvents />
            </MapContainer>
          )}
        </div>
        <hr />
        <div className="bottomShare">
          <div className="leftShare">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="itemShare">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="itemShare" onClick={handleAddPlace}>
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="itemShare">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
              
            <div className="itemShare" onClick={handleLive}>
              <img src={Map} alt="" />
              <span>{dat && dat.islive ? "Stop Live" : "Go Live"}</span>
            </div>
            <div className="quota">
              <span>quota: </span>
              {isLoadingQuota ? (
                "Loading"
              ) : errorQuota ? (
                <>{`Error: ${errorQuota.message}`}</>
              ) : (
                <span>
                  {quota}/{dataQuota?.maxquota}
                </span>
              )}
            </div>
          </div>
          <div className="rightShare">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;