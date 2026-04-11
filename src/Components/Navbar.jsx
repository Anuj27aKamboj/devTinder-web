import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    if (user) {
      navigate("/feed");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async()=>{
    try{
      await axios.post(BASE_URL+"/logout",{},{
        withCredentials: true,
      })
      dispatch(removeUser());
      return navigate("/login")
    }catch(err){
      console.log(err.message)
      navigate("/error");
    }
  }

  return (
    <div className="navbar bg-base-300 fixed top-0 w-full z-50 px-5 max-h-20">
      {/* LEFT */}
      <div className="flex-1">
        <img
          src="/devTinderLogo.png"
          alt="devTinderLogo"
          onClick={handleLogoClick}
          className="w-48 mx-5 cursor-pointer object-contain"
        />
      </div>

      {/* RIGHT */}
      {user && (
        <div className="flex gap-2 flex-col lg:flex-row text-center">
          <p className="my-auto text-neutral-300">Welcome! {user.firstName}</p>
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border-2 border-lime-600">
                <img alt="user photo" src={user.photoURL} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-1 mt-6 w-52 p-2 text-xl font-bold shadow bg-base-300"
            >
              <li>
                <Link to="/profile">
                  Profile
                  <span className="badge bg-lime-600 text-xs font-light text-black rounded-md">Update</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests">
                  Requests
                </Link>
              </li>
              <li>
                <button className="cursor-pointer" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
