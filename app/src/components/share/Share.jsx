import "./share.css";
import Image from "../../assets/img.png";
import Map from "../../assets/Mappe.png";
import Friend from "../../assets/Amici.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import { useMutation, useQueryClient, } from 'react-query';
import { makeRequest } from "../../axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'; // Import Marker and useMapEvents
import "leaflet/dist/leaflet.css"
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import { useEffect } from "react";


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
    let position = "";
    if (file) imgUrl = await upload();
    if (markerPosition) position = await upload();
    mutation.mutate({
      desc,
      img: imgUrl,
      markerPosition,
      channelname,
    });
    setDesc("");
    setFile(null);
    setMarkerPosition(null);
  };

  //  MAPPA



  const handleAddPlace = () => {
    setShowMap(true);
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
      mutation.mutate({desc : randDesc});
    }, 1800000 ); // 60000 milliseconds = 1 minute  
  
    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [mutation, randDesc]); // Dependencies

  return (
    <div className="Share">
      <div className="containerShare">
        <div className="topShare">
          <div className="leftShare">
            <img
              src={currentUser.profilePic}
              alt=""
            />
            <input type="text" placeholder={`What's on your mind ${currentUser.username}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          
        </div>
        <div className="middleShare">

          {file && <img alt="" src={URL.createObjectURL(file)} />}
          {showMap && (
            <MapContainer center={[44.49744930671936, 11.356477769914472]} zoom={15} style={{maxHeight:"500px", height: "100vh", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {markerPosition && <Marker position={markerPosition}/>}
                <MapEvents />
            </MapContainer>
          )}

        </div>
        <hr />
        <div className="bottomShare">
          <div className="leftShare">
            <input type="file" id="file" style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])} />
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