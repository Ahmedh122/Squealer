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
import { useEffect} from "react";
import { useQuery } from "react-query";


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
let lastknownposition = [currentlat, currentlng]
var start = [8.681495,49.41461];
var end = [8.686507,49.41943];

const Share = ({channelname}) => {

  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [randDesc,setrandDesc] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);

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

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading : load, data : dat } = useQuery(["users"], () =>
    makeRequest.get("/users/find/" + currentUser._id).then((res) => {
      console.log(res.data);
      return res.data;
    })
  );



  const mutation = useMutation(newPost => {
    return makeRequest.post(
      "/posts",newPost);
  }, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    //let position = "";
    if (file) imgUrl = await upload();
    //if (markerPosition) position = await upload();
    mutation.mutate({
      desc,
      img: imgUrl,
      position : markerPosition,
      channelname,
     });
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setrandDesc("I'm thinking about " + Math.floor(Math.random() * 100) + " things at the same time");
      console.log(randDesc);
      mutation.mutate({desc : randDesc});
    }, 1800000 ); // 60000 milliseconds = 1 minute  
  
    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [mutation, randDesc]); // Dependencies

  //TIMED POST LOCATION
  /*useEffect(() => {
    const intervalId2 = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        currentlat = position.coords.latitude;
        currentlng = position.coords.longitude;
        //postmap(map, [currentlat, currentlng],lastknownposition)
        setMarkerPosition([currentlat, currentlng]);
      }
      );
      lastknownposition = markerPosition;
      mutation.mutate({position : markerPosition});
    }, 1800000 ); // 60000 milliseconds = 1 minute  
  
    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId2);
  }, [mutation, markerPosition]); // Dependencies*/

  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    // Define your start and end locations (as [longitude, latitude])
    var start = [8.681495,49.41461];
    var end = [8.686507,49.41943];

    // Call the OpenRouteService API to get the route
    fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248076c990f987d45f89a27f6c3c970ea31&start=${start.join(',')}&end=${end.join(',')}`)
      .then(response => response.json())
      .then(data => {
        // Get the coordinates of the route
        var coords = data.features[0].geometry.coordinates;

        // Convert the coordinates to a format that Leaflet understands
        coords = coords.map(coord => [coord[1], coord[0]]);

        setRouteCoordinates(coords);
      });
  }, []);
  

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
          {showMap  && (
            <MapContainer
              center={[ currentlat, currentlng]}
              zoom={15}
              style={{ maxHeight: "500px", height: "100vh", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {routeCoordinates.length > 0 && <Polyline positions={routeCoordinates} color='blue' />}
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