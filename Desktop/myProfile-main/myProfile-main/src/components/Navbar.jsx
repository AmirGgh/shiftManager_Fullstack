import React, { useState } from "react";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Logo from "../assets/logo.png";
import { Link } from "react-scroll";
import profileimg from "../assets/profileimg-rem.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className='fixed w-full h-[50px] flex justify-between items-center px-4  text-gray-300  bg-gradient-to-r from-cyan-700 to-blue-900 opacity-95 z-50	'>
      <img
        className='w-12 h-12 rounded-full border-white border-2 bg-gray-300'
        src={profileimg}
      />
      <ul className='hidden md:flex '>
        <li>
          <Link to='home' smooth={true} duration={650}>
            Home
          </Link>
        </li>
        <li>
          <Link to='about' smooth={true} duration={650}>
            About
          </Link>
        </li>
        <li>
          <Link to='work' smooth={true} duration={650}>
            Work
          </Link>
        </li>
        <li>
          <Link to='skills' smooth={true} duration={650}>
            Skills
          </Link>
        </li>
        <li>
          <Link to='contact' smooth={true} duration={650}>
            Contact
          </Link>
        </li>
      </ul>
      {/* Hamburger */}
      <div onClick={handleClick} className='md:hidden z-10'>
        {!nav ? <FaBars /> : <FaTimes />}
      </div>
      {/* Mobile menu */}
      <ul
        className={
          !nav
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center"
        }
      >
        <li className='py-6 text-4xl'>
          <Link onClick={handleClick} to='home' smooth={true} duration={650}>
            Home
          </Link>
        </li>
        <li className='py-6 text-4xl'>
          <Link onClick={handleClick} to='about' smooth={true} duration={650}>
            About
          </Link>
        </li>
        <li className='py-6 text-4xl'>
          <Link onClick={handleClick} to='work' smooth={true} duration={650}>
            Work
          </Link>
        </li>
        <li className='py-6 text-4xl'>
          <Link onClick={handleClick} to='skills' smooth={true} duration={650}>
            Skills
          </Link>
        </li>
        <li className='py-6 text-4xl'>
          <Link onClick={handleClick} to='contact' smooth={true} duration={650}>
            Contact
          </Link>
        </li>
      </ul>
      {/* Social icons */}
      <div className='hidden lg:flex fixed flex-col top-[25%] left-0'>
        <ul>
          <li className='w-[145px] h-[50px] flex justify-between items-center ml-[-95px] hover:ml-[-10px] duration-300 bg-blue-600'>
            <a
              className='flex justify-between items-center w-full text-gray-300'
              href='https://www.linkedin.com/in/amir-gez/'
            >
              Linkedin <FaLinkedin size={30} />
            </a>
          </li>
          <li className='w-[145px] h-[50px] flex justify-between items-center ml-[-95px] hover:ml-[-10px] duration-300 bg-[#333333]'>
            <a
              className='flex justify-between items-center w-full text-gray-300'
              href='https://github.com/AmirGgh'
            >
              Github <FaGithub size={30} />
            </a>
          </li>
          <li className='w-[145px] h-[50px] flex justify-between items-center ml-[-95px] hover:ml-[-10px] duration-300  bg-[#3a87bb]'>
            <a
              className='flex justify-between items-center w-full text-gray-300'
              href='https://drive.google.com/file/d/1FO7THyxw3aLlhxWcBuL4tPnImUpHbYPJ/view?usp=share_link'
            >
              Resume <BsFillPersonLinesFill size={30} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
