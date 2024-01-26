
import React, { useState } from "react";
import "./channelpopupmod.css";

export default function Modal() {
  const [modal, setModal] = useState(false);
  const [channelname, setchannelname] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    //mutation.mutate({ channelname });
    setchannelname("");
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
        Open
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Channel Costumization</h2>
            <form>
                  <input
                    type="text"
                    placeholder="Channel Name"
                    onChange={(e) => setchannelname(e.target.value)}
                    value={channelname}
                  />
                  <input type="text" placeholder="Channel Pic" />
                  <input type="text" placeholder="Channel Cover" />
                  <button onClick={handleClick}>Submit</button>
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
