import React, { useState, useContext } from "react";
import "./profileedit.css";
import { useMutation } from "react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router";
import { useQueryClient } from "react-query";
import Image from "../../assets/img.png";
import { AuthContext } from "../../context/Authcontext";

export default function Predit() {
  const [modal, setModal] = useState(false);
  const username= "pippo";
  const [username2, setusername] = useState("");
  const [newprcover, setprcoverpic] = useState("");
  const [newprpic, setprpic] = useState("");
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

  const mutation = useMutation(
    updateUser => {
      return makeRequest
        .put("/users", updateUser)
        .then((res) => res.data);
    },
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(["users"]);
        window.location.href = `/profile/${data._id}`;
      },
    }
  );

const handleClick = async (e) => {
  e.preventDefault();
  let newprPic = "";
  let newprcoverPic = "";
  if (newprpic) newprPic = await uploadFile(newprpic);
  if (newprcover) newprcoverPic = await uploadFile(newprcover);

  if (username2 !== "") {
    setusername(username2);
    mutation.mutate({
      username,
       username2,
      newprpic: newprPic,
      newprcover: newprcoverPic,
    });
  } else {
    mutation.mutate({
      username,
      newprpic: newprPic,
      newprcover: newprcoverPic,
    });
  }

  setusername("");
  setprcoverpic("");
  setprpic("");
  toggleModal();
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
        edit profile
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>profile Customization</h2>
            <form>
              <input
                className="inputform"
                type="text"
                placeholder="user name"
                onChange={(e) => setusername(e.target.value)}
              />

              {/* Channel Pic */}
              <div className="image-icon">
                <span>profile picture </span>
                <label htmlFor="profilepic">
                  <img src={Image} alt="Profile Pic" />
                </label>
                <input
                  type="file"
                  id="profilepic"
                  style={{ display: "none" }}
                  onChange={(e) => setprpic(e.target.files[0])}
                />
              </div>

              {/* Cover Pic */}
              <div className="image-icon">
                <span>profile cover </span>
                <label htmlFor="coverpic">
                  <img src={Image} alt="Cover Pic" />
                </label>
                <input
                  type="file"
                  id="coverpic"
                  style={{ display: "none" }}
                  onChange={(e) => setprcoverpic(e.target.files[0])}
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
