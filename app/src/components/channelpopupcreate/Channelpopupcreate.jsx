
import React, { useState } from "react";
import "./channelpopupcreate.css";
import { useMutation } from "react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router";
import { useQueryClient } from "react-query";


export default function Modal() {
    const [modal, setModal] = useState(false);


    const [coverpic, setcoverpic] = useState("");
    const [channelpic, setchannelpic] = useState("");
    const [channelname, setchannelname] = useState("");

    const queryClient = useQueryClient();


    const mutation = useMutation(newChannel => {
        return makeRequest.post("/channels", newChannel).then(res => res.data);
    }, {
        onSuccess: (data) => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["channels"]);
            // Redirect to the newly created channel
            // navigate(`/channel/${data.channelname}`, {replace: true}); // Use navigate instead of history.push
            window.location.href = `/channel/${data.channelname}`;

        },
    });

    const handleClick = async (e) => {
        e.preventDefault();
        if (channelname === "") {
            mutation.mutate({ channelname : "newchannel", channelpic, coverpic }); 
        }
        else{
            mutation.mutate({ channelname, channelpic, coverpic});
        }
        setchannelname("");
        setchannelpic("");
        setcoverpic("");
        toggleModal();

    };


    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
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
                        <h2>Channel Costumization</h2>
                        <form>
                            <input
                                type="text"
                                placeholder="Channel Name"
                                onChange={(e) => setchannelname(e.target.value)}
                                value={channelname}
                            />
                            <input
                                type="text"
                                placeholder="Channel Pic"
                                onChange={(e) => setchannelpic(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Channel Cover"
                                onChange={(e) => setcoverpic(e.target.value)}
                            />
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
