import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/navbar/Navbar";
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Channel from "./pages/channel/Channel";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/Authcontext";

function App() {
  const {currentUser} = useContext(AuthContext);
  const Layout = ()=>{
    return(
      <div>
        <Navbar/>
        <div style={{display:'flex'}}>
          <Leftbar/>
          <div style={{flex :"6"}}>
          <Outlet/>
          </div>
          <Rightbar/>
        </div>
      </div>
    )
  }

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([

    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children:[
        {
          path : "/",
          element: <Home/>,
        },
        {
          path: "/profile/:id",
          element: <Profile/>,
        },
        {
          path: "/channel/:id",
          element: <Channel/>,
        }
      ]
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
