import React, { useContext, useState } from "react";
import "./channelpopupcreate.css";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import Image from "../../assets/img.png";
import { AuthContext } from "../../context/Authcontext";

export default function Modal() {
  const [modal, setModal] = useState(false);
  const [channelpic, setChannelpic] = useState(null);
  const [coverpic, setCoverpic] = useState(null);
  const [channelname, setChannelname] = useState("");
  const queryClient = useQueryClient();
  const { currentUser, } = useContext(AuthContext);

  
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


    const mutation = useMutation(
      newChannel => {
        return makeRequest
          .post("/channels", newChannel)
          .then((res) => res.data);
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["channels"]);
          window.location.href = `/channel/${data.channelname}`;
        },
      }
    );



  const handleClick = async (e) => {
    e.preventDefault();
    let channelPic = "";
    let coverPic = "";
    if(channelpic) channelPic = await uploadFile(channelpic);
    if(coverpic) coverPic = await uploadFile(coverpic);
    if (channelname === "") {
      mutation.mutate({
        channelname: "newchannel",
        channelpic: channelPic,
        coverpic: coverPic,
        admin: currentUser._id,
      });
    } else {
      mutation.mutate({
        channelname,
        channelpic: channelPic,
        coverpic: coverPic,
        admin : currentUser._id,
      });
    }

    setChannelname("");
    setChannelpic(null);
    setCoverpic(null);
    toggleModal();
  };

  const handleFileChange = (file, setFile) => {
    if (file) {
      setFile(file);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Create Channel
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Channel Creation</h2>
            <form>
              <input
                className="inputform"
                type="text"
                placeholder="Channel Name"
                onChange={(e) => setChannelname(e.target.value)}
                value={channelname}
              />

              {/* Channel Pic */}
              <div className="image-icon">
                <span>channel picture  </span>
                <label htmlFor="channelpic">
                  <img src={Image} alt="Channel Pic" />
                </label>
                <input
                  type="file"
                  id="channelpic"
                  style={{ display: "none" }}
                  onChange={(e) => setChannelpic(e.target.files[0])}
                />
              </div>

              {/* Cover Pic */}
              <div className="image-icon">
                <span>channel cover  </span>
                <label htmlFor="coverpic">
                  <img src={Image} alt="Cover Pic" />
                </label>
                <input
                  type="file"
                  id="coverpic"
                  style={{ display: "none" }}
                  onChange={(e) => setCoverpic(e.target.files[0])}
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
