import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector(store=>store.user);
  return (
    <div className="navbar bg-base-300 absolute top-0 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn bg-base-300 border-0 w-48 mx-5 px-1 py-6">
            <img alt="devTinder logo" src="/devTinder logo.png"/>
        </Link>
      </div>
      {user && <div className="flex gap-2">
        <p className="my-auto text-neutral-300">Welcome! {user.firstName}</p>
        <div className="dropdown dropdown-end mx-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full border-2 border-lime-600">
              <img
                alt="user photo"
                src={user.photoURL}
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">Update</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>}
    </div>
  );
};

export default Navbar;
