import "./share.css";
import Image from "../../assets/img.png";
import Map from "../../assets/Mappe.png";
import Friend from "../../assets/Amici.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Authcontext";
import { useMutation, useQueryClient, } from 'react-query';
import { makeRequest } from "../../axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'; // Import Leaflet components

const Share = () => {

  // Add new state variable for location
  const [location, setLocation] = useState(null);

  // Add new state variable for showing the map modal
  const [showMap, setShowMap] = useState(false);

  // Function to handle "Add Place" click
  const handleAddPlace = () => {
    setShowMap(true);
  };
  // Function to handle map click
  const MapEvents = () => {
    const map = useMapEvents({
      click: (e) => {
        setLocation(e.latlng);
        setShowMap(false);
      },
    });
    return location ? <Marker position={location} /> : null;
  };

  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file)
      const res = await makeRequest.post("/upload", formData);
      return res.data
    } catch (err) {
      console.log(err)
    }
  }


  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const mutation = useMutation(newPost => {
    return makeRequest.post("/posts", newPost)
  }, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl, location });
    setDesc("");
    setFile(null);
    setLocation(null);
  };

  return (
    <div className="Share">
      <div className="containerShare">
        <div className="middleShare">
          <div className="leftShare">
            <img
              src={currentUser.profilePic}
              alt=""
            />
            <input type="text" placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="rightShare">

            {file && <img className="fileShare" alt="" src={URL.createObjectURL(file)} />}

          </div>
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
            {showMap && (
              <MapContainer center={[0, 0]} zoom={15} style={{ height: "300px", width: "100%" }} >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapEvents />
              </MapContainer>
            )}
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