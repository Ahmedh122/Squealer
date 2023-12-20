import "./rightbar.css";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import Channels from "../rightbar/channel/Channel";

const RightBar = () => {



  return (
    <div className="rightBar">
      <div className="containerRB">
        <div className="itemRB">
          <span>Suggestions For You</span>
          <div className="userRB">
            <div className="userInfoRB">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span>Jane Doe</span>
            </div>
            <div className="buttonsRB">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          <div className="userRB">
            <div className="userInfoRB">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span>Jane Doe</span>
            </div>
            <div className="buttonsRB">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>
        <div className="itemRB">
          <span>Your channels</span>
          <Channels/>
        </div>
        <div className="itemRB">
          <span>Online Friends</span>
          <div className="userRB">
            <div className="userInfoRB">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="onlineRB" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="userRB">
            <div className="userInfoRB">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="onlineRB" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="userRB">
            <div className="userInfoRB">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="onlineRB" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="userRB">
            <div className="userInfoRB">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="onlineRB" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="userRB">
            <div className="userInfoRB">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="onlineRB" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="userRB">
            <div className="userInfoRB">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="onlineRB" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="userRB">
            <div className="userInfoRB">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="onlineRB" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="userRB">
            <div className="userInfoRB">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="onlineRB" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="userRB">
            <div className="userInfoRB">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="onlineRB" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="userRB">
            <div className="userInfoRB">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="onlineRB" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="userRB">
            <div className="userInfoRB">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="onlineRB" />
              <span>Jane Doe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;