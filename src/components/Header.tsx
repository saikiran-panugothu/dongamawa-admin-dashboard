import { FaReact } from "react-icons/fa6";
import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineSun } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi";
import { HiOutlineMenu } from "react-icons/hi";
import { useAppDispatch } from "../hooks";
import { setSidebar } from "../features/dashboard/dashboardSlice";
import { Link } from "react-router-dom";


const Header = () => {
  const dispatch = useAppDispatch();
  return (
    <header className="bg-blackPrimary relative">
      <div className="flex justify-between items-center px-9 py-5 max-xl:flex-col max-xl:gap-y-7 max-[400px]:px-4">
      <HiOutlineMenu className="text-2xl text-white absolute bottom-7 left-5 xl:hidden max-sm:static max-sm:order-1 cursor-pointer" onClick={() => dispatch(setSidebar())} />
        <Link to="/">
          <FaReact className="text-4xl text-white hover:rotate-180 hover:duration-1000 hover:ease-in-out cursor-pointer" />
        </Link>
        <div className="relative max-sm:w-full">
          <HiOutlineSearch className="text-white absolute top-4 left-3 text-xl text-gray-400" />
          <input
            type="text"
            className="w-[600px] h-[50px] bg-blackSecondary indent-11 border-0 outline-0 text-white max-sm:w-full"
            placeholder="Search here..."
          />
        </div>
        <div className="flex gap-4 items-center max-xl:justify-center">
          <span className="text-white">EN</span>
          <HiOutlineSun className="text-xl text-white" />
          <HiOutlineBell className="text-xl text-white" />
          <div className="flex gap-2 items-center">
            <img
              src="/src/assets/profile.jpg"
              alt="profile"
              className="rounded-full w-10 h-10"
            />
            <div className="flex flex-col">
              <p className="text-white text-base max-xl:text-sm">Sherwood Gruninger</p>
              <p className="text-white text-sm max-xl:text-xs">Web Developer</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
