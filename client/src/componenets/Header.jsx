import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const currentUser = useSelector((state) => state.user);

  console.log("Current User:", currentUser); // Add this line to check if currentUser is being populated correctly

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Sahand</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        <form
          className="bg-slate-100 p-3 rounded-lg flex items-center"
          action=""
        >
          <input
            type="text"
            placeholder="Search... "
            className="bg-transparent focus:outline-none"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/About">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          {currentUser ? (
           <Link to="/profile">
           <li>
             <img
               src={currentUser.avatar}
               alt="profile"
               className="h-8 w-8 rounded-full"
             />
           </li>
         </Link>
          ) : (
            <Link to="/signin">
              <li className="inline text-slate-700 hover:underline">Sign In</li>
            </Link>
          )}
          <Link to="/SignUp">
            <li className="inline text-slate-700 hover:underline">Sign Up</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
