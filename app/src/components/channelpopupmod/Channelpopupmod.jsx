
import React, { useState, useContext } from "react";
import "./channelpopupmod.css";
import { useMutation } from "react-query";
import {makeRequest} from "../../axios";
import { useLocation } from "react-router";
import {useQueryClient } from "react-query";
import Image from "../../assets/img.png";
import { AuthContext } from "../../context/Authcontext";


export default function Modal() {
  const [modal, setModal] = useState(false);
  const channelname = useLocation().pathname.split("/")[2];
  const [channelname2, setchannelname] = useState("");
  const [newcoverpic, setcoverpic] = useState("");
  const [newchannelpic, setchannelpic] = useState("");
  const queryClient = useQueryClient();
   const { currentUser } = useContext(AuthContext);
   const uploadFile = async (file) => {
     try {
       const formData = new FormData();
       formData.append("file", file);
       const res = await makeRequest.post("/upload", formData);
       return res.data;
     } catch (err) {
       console.log(err);
       return null;
     }
   };

  const mutation = useMutation(modifyChannel => {
    return makeRequest.put("/channels",modifyChannel).then(res => res.data);
  }, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["channelName"]); 
      window.location.href = `/channel/${data.channelname}`;
      
    },
  });


  const handleClick = async (e) => {
    e.preventDefault();
    let newchannelPic = "";
    let newcoverPic = "";
    if (newchannelpic) newchannelPic = await uploadFile(newchannelpic);
    if (newcoverpic) newcoverPic = await uploadFile(newcoverpic);

    if (channelname2 !== "") {
      setchannelname(channelname2); // Set the new channel name
      mutation.mutate({
        channelname,
        channelname2,
        newchannelpic: newchannelPic,
        newcoverpic: newcoverPic,
      });
    } else {
      mutation.mutate({
        channelname,
        newchannelpic: newchannelPic,
        newcoverpic: newcoverPic,
      });
    }

    setchannelname("");
    setcoverpic("");
    setchannelpic("");
    toggleModal();
  };


  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        edit channel
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Channel Customization</h2>
            <form>
              <input
                className="inputform"
                type="text"
                placeholder="Channel Name"
                onChange={(e) => setchannelname(e.target.value)}
              
              />

              {/* Channel Pic */}
              <div className="image-icon">
                <span>channel picture </span>
                <label htmlFor="channelpic">
                  <img src={Image} alt="Channel Pic" />
                </label>
                <input
                  type="file"
                  id="channelpic"
                  style={{ display: "none" }}
                  onChange={(e) => setchannelpic(e.target.files[0])}
                />
              </div>

              {/* Cover Pic */}
              <div className="image-icon">
                <span>channel cover </span>
                <label htmlFor="coverpic">
                  <img src={Image} alt="Cover Pic" />
                </label>
                <input
                  type="file"
                  id="coverpic"
                  style={{ display: "none" }}
                  onChange={(e) => setcoverpic(e.target.files[0])}
                />
              </div>

              <button className="test123" onClick={handleClick}>
                Submit
              </button>
            </form>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
