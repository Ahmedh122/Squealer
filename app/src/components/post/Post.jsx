import "./post.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link, createRoutesFromElements } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/Authcontext";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, TileLayer, Marker , Polyline } from "react-leaflet"; // Import Marker and useMapEvents
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";


let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41], // size of the icon
  shadowSize: [41, 41], // size of the shadow
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  shadowAnchor: [13, 41], // the same for the shadow
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
});

L.Marker.prototype.options.icon = DefaultIcon;



const Post = ({ post, user}) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
 // const [thisrouteCoordinates, setRouteCoordinates] = useState(user.routeCoordinates);
  const [isVideoInViewport, setIsVideoInViewport] = useState(false);
  const videoRef = useRef(null);
  const handleVideoIntersection = (entries) => {
    const [entry] = entries;
    setIsVideoInViewport(entry.isIntersecting);

    if (videoRef.current && videoRef.current instanceof HTMLVideoElement) {
      if (entry.isIntersecting) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust this threshold based on when you want the video to start playing
    };

    const observer = new IntersectionObserver(handleVideoIntersection, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [videoRef]);

  const { currentUser } = useContext(AuthContext);



  const {
    isLoadinglikes,
    errorlikes,
    data: datalikes,
  } = useQuery(["likes", post._id], () =>
    makeRequest.get("/likes/getLike?postId=" + post._id).then((res) => {
      return res.data;
    })
  );
  const {
    isLoadingdislikes,
    errordislikes,
    data: datadislikes,
  } = useQuery(["dislikes", post._id], () =>
    makeRequest.get("/likes/getDislike?postId=" + post._id).then((res) => {
      return res.data;
    })
  );
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked)
        return makeRequest.delete("/likes/deleteLike?postId=" + post._id);
      return makeRequest.post("/likes/addLike", { postId: post._id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
        queryClient.invalidateQueries(["dislikes"]);
      },
    }
  );

  const dislikemutation = useMutation(
    (disliked) => {
      if (disliked)
        return makeRequest.delete("/likes/deleteDislike?postId=" + post._id);
      return makeRequest.post("/likes/addDislike", { postId: post._id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["dislikes"]);
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

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

  const handleLike = () => {
    if (currentUser) {
      console.log("currentUser:", currentUser);
      console.log("datalikes in handleLike:", datalikes);
      mutation.mutate(datalikes.includes(currentUser._id));
    } else {
      console.log("currentUser is undefined");
    }
  };
  
  const handleDislike = () => {
    if (currentUser) {
      dislikemutation.mutate(datadislikes.includes(currentUser._id));
    } else {
      console.log("currentUser is undefined");
    }
  };

  const handleDelete = () => {
    if (post.userId._id === currentUser._id) {
      deleteMutation.mutate(post._id);
    }
    // If the post is a MAPPA post, remove its coordinates from routeCoordinates
    /*if (post.channelname === "MAPPA" && post.position) {
      setRouteCoordinates(prevCoordinates => {
        return coordmutation.mutate(prevCoordinates.filter(coord => !(coord[0] === post.position.lat && coord[1] === post.position.lng)));
    });
  }*/
  };

  // MAPPA ------------------------------------------------------------------------------------------------------------------
  const [showMap, setShowMap] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);

 /* const coordmutation = useMutation(updateCoords => {
    console.log("updateCoords: ", updateCoords);
    return makeRequest.put("/users/position",updateCoords).then(res => res.data);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });*/

  const handleShowmap = () => {
    if (post.position !== null && post.position !== undefined) {
      setMarkerPosition(post.position);
      setShowMap(true);
    }
  };
  useEffect(() => {
    handleShowmap();
  }, [post]);

  /*useEffect(() => {
    if (post?.position && user?.islive) {
      console.log("ciao")
      setRouteCoordinates(prevCoordinates => {
        const newPosition = [post.position.lat, post.position.lng];
        const alreadyExists = prevCoordinates.some(coord => coord[0] === newPosition[0] && coord[1] === newPosition[1]);
        if (!alreadyExists) {
          return [...prevCoordinates, newPosition];
        } else {
          return prevCoordinates;
        }
      });
      console.log("thisrouteCoordinates: ", thisrouteCoordinates);
      coordmutation.mutate(thisrouteCoordinates)
    }
  }, [post?.position, user?.islive]);*/



  
  /*useEffect(() => {
    //console.log("routeCoordinates: ", thisrouteCoordinates);
  }, [thisrouteCoordinates]);*/

  const postRef = useRef();

 useEffect(() => {
   const observer = new IntersectionObserver((entries) => {
     if (entries[0].isIntersecting) {
       const userId = currentUser ? currentUser._id : "undefined_user";
       makeRequest
         .post(`/views?postId=${post._id}&userId=${userId}`)
         .then((response) => {
           console.log("View recorded successfully");
         })
         .catch((error) => {
           console.error("Error recording view:", error);
         });
     }
   });

   if (postRef.current) {
     observer.observe(postRef.current);
   }

   return () => {
     if (postRef.current) {
       observer.unobserve(postRef.current);
     }
   };
 }, [post._id, currentUser]);
 // Add post and currentUser to the dependency array





  return ( <div ref= {postRef}>
    <div className="Post">
      <div className="containerPost" id="containerPost">
        <div className="userPost">
          <div className="userInfoPost">
            {post.userId && (
              <>
                <img src={`/upload/${post.userId.profilePic}`} alt="" />
                <div className="detailsPost">
                  <Link
                    to={`/profile/${post.userId._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <span className="namePost">{post.userId.username}</span>
                  </Link>
                  {post.channelname !== "" && (
                    <Link
                      to={`/channel/${post.channelname}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <span className="namePost">§ {post.channelname}</span>
                    </Link>
                  )}
                  <span className="datePost">
                    {moment(post.createdAt).fromNow()}
                  </span>
                </div>
              </>
            )}
          </div>
          <DeleteOutlinedIcon onClick={handleDelete}/>
        </div>
        <div className="contentPost">
          <p>{post.desc}</p>
          {showMap && markerPosition &&(
            <a
            href={`https://www.google.com/maps/search/?api=1&query=${post.position.lat},${post.position.lng}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapContainer
              center={post.position}
              zoom={17}
              style={{ maxHeight: "500px", height: "100vh", width: "100%" }}
              zoomControl={false}
              scrollWheelZoom={false}
            >
              {user.routeCoordinates.length>0 && < Polyline positions={user.routeCoordinates} color='blue' />}
              <Marker position={markerPosition} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
            </MapContainer>
          </a>
          )}
          <img src={"/upload/" + post.img} alt="" />
            
              {post.vid && (
                <video height="500" width="800" controls muted ref={videoRef}>
                  <source src={"/upload/" + post.vid} type="video/mp4" />
                </video>
              )}
            
          </div>
        <div className="infoPost">    
          <div className="itemPost">
            {isLoadinglikes ? (
              "loading"
            ) : currentUser && datalikes?.includes(currentUser._id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {datalikes?.length} Likes
          </div>
          <div className="itemPost">
            {isLoadingdislikes ? (
              "loading"
            ) : currentUser && datadislikes?.includes(currentUser._id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "purple", rotate: "180deg" }}
                onClick={handleDislike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                style={{ rotate: "180deg" }}
                onClick={handleDislike}
              />
            )}
            {datadislikes?.length} Dislikes
          </div>
          <div
            className="itemPost"
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <TextsmsOutlinedIcon />
            See Comments
          </div>
          <div className="views"><span>views: </span>{post.views}</div> 
        </div>
        {commentOpen && <Comments postId={post._id} />}
      </div>
    </div>
  </div>
  );
};

export default Post;
