import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import voltyImage from "./volty.png";
import { AuthContext } from "../../context/Authcontext";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";

import "./navbar.css";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [value, setValue] = useState("");

  const { isLoading, data: datasearch } = useQuery(["search"], () =>
    makeRequest
      .get("/search", {
        params: {
          value: value,
        },
      })
      .then((res) => res.data)
  );

  const redirectToChannel = (channelname) => {
    window.location.href = `/channel/${channelname}`;
  };

  const redirectToProfile = (_id) => {
    window.location.href = `/profile/${_id}`;
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="Navbar">
      <div className="leftside">
        <div className="leftside2">
          <img src={voltyImage} alt="" />
          <Link to="/" style={{ textDecoration: "none" }}>
            <span>Squealer</span>
          </Link>
        </div>
        <HomeIcon />
        <DarkModeIcon />

        <div className="search">
          <div className="search_input_div">
            <button onClick={() => onSearch(value)}>
              <SearchOutlinedIcon />
            </button>
            <input
              type="text"
              className="search_input"
              placeholder="Search..."
              value={value}
              onChange={onChange}
            />
          </div>

          <div className="dropdown">
            {isLoading
              ? "Loading"
              : datasearch
                  .filter((entry) => {
                    const entryName = entry.channelname || entry.username;
                    return value && entryName.startsWith(value);
                  })
                  .map((entry) => (
                    <div className="dropdownrow" key={entry._id}>
                      <img src={entry.profilePic} alt="" />
                      <div className="info">
                        {entry.channelname ? (
                          <span
                            onClick={() => redirectToChannel(entry.channelname)}
                            style={{
                              cursor: "pointer",
                              textDecoration: "none",
                              color: "inherit",
                            }}
                          >
                            §{entry.channelname}
                          </span>
                        ) : (
                          <span
                            onClick={() => redirectToProfile(entry._id)}
                            style={{
                              cursor: "pointer",
                              textDecoration: "none",
                              color: "inherit",
                            }}
                          >
                            @{entry.username}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
          </div>
        </div>
      </div>

      <div className="rightside">
        <div className="logoutbutton">
          <button onClick={handleLogout}>
            <SettingsIcon />
          </button>
        </div>
        <div className="user">
          <img src={currentUser.profilePic} alt="" />
          <Link
            to={`/profile/${currentUser._id}`}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <span>{currentUser.username}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;