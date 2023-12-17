import "./rightbar.css";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";

const RightBar = () => {

  const { isLoading, error, data } = useQuery(["channels"], async () =>
  await makeRequest.get('http://localhost:8800/api/channels/getchannellist').then((res) => {
  console.log(res.data);  
  return res.data;
})
);

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
          <div className="userRB">
            <div className="userInfoRB">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Canale 1</span>
              </p>
            </div>
          </div>
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