
import React, { useState } from "react";
import "./channelpopupmod.css";
import { useMutation } from "react-query";
import {makeRequest} from "../../axios";
import { useLocation } from "react-router";
import {useQueryClient } from "react-query";


export default function Modal() {
  const [modal, setModal] = useState(false);
  const channelname = useLocation().pathname.split("/")[2];
  const [channelname2, setchannelname] = useState("");
  const [newcoverpic, setcoverpic] = useState("");
  const [newchannelpic, setchannelpic] = useState("");
  const queryClient = useQueryClient();

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
    if(channelname2 !== ""){
      mutation.mutate({channelname,channelname2,newchannelpic,newcoverpic});
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
        Modify
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Channel Costumization</h2>
            <form>
                  <input
                    className="inputform"
                    type="text"
                    placeholder="Channel Name"
                    onChange={(e) => setchannelname(e.target.value)}
                    value={channelname2}
                  />
                  <input 
                    className="inputform"
                    type="text"
                    placeholder="Channel Pic"
                    onChange={(e) => setchannelpic(e.target.value)}
                  />
                  <input
                    className="inputform" 
                    type="text" 
                    placeholder="Channel Cover"
                    onChange={(e) => setcoverpic(e.target.value)} 
                  />
                  <button className="test123" onClick={handleClick}>Submit</button>
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
