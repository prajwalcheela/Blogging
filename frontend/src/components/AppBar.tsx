import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AppBar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);
  return (
    <div className="flex justify-between pt-3 mt-4 border-b bg-slate-100">
      <Link to={"/blogs"}>
        <div className="pl-4 font-semibold text-xl cursor-pointer flex ">
          Blogging
        </div>
      </Link>
      <div className="pr-5 flex ">
        <Link to={"/publish"} className="flex items-center">
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">
            New
          </button>
        </Link>
        <div className="flex ">
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

// function Avatar() {
//   return (
//     <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
//       <span className="font-medium text-gray-600 dark:text-gray-300"></span>
//     </div>
//   );
// }

export default AppBar;
// import { useState } from "react";
// import { Link } from "react-router-dom";

// interface AvatarProps {
//   onClick: () => void;
// }

// const AppBar = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const handleAvatarClick = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <div className="flex justify-between">
//       <Link to="/blogs">
//         <div className="pl-4 font-semibold text-xl cursor-pointer">
//           Blogging
//         </div>
//       </Link>
//       <div className="pr-5 relative">
//         <Avatar onClick={handleAvatarClick} />
//         {isDropdownOpen && <Dropdown />}
//       </div>
//     </div>
//   );
// };

// const Avatar = ({ onClick }: AvatarProps) => {
//   return (
//     <div
//       className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full cursor-pointer"
//       onClick={onClick}>
//       <span className="font-medium text-gray-600 dark:text-gray-300"></span>
//     </div>
//   );
// };

// const Dropdown = () => {
//   return (
//     <div className="absolute right-0 top-full bg-white shadow-md rounded-md">
//       <ul>
//         <li>
//           <Link to="/logout">Logout</Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default AppBar;
