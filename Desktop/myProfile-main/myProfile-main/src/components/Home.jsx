import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <div name='home' className='w-full h-screen'>
      <div className='max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full'>
        <h2 className='text-black-600 font-bold text-xl'>Hi, my name is</h2>
        <h2 className='text-3xl lg:text-5xl font-bold text-[#ccd6f6]'>
          AMIR GEZ
        </h2>
        <h3 className='text-2xl lg:text-4xl font-bold text-[#a9a7b5]'>
          I'm a Full Stack Developer.
        </h3>
        <p className='text-[#ecf1ff] py-4 max-w-[700px]'>
          A Full Stack developer with pession to learn new things, Have a strong
          understanding of JS, React, Node, and MongoDB. And allways seeking for
          new challenges!
        </p>
        <div>
          <button className='text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-pink-600 hover:border-pink-600'>
            <Link to='work' smooth={true} duration={500}>
              View Work
            </Link>
            <span className='group-hover:rotate-90 duration-300'>
              <HiArrowNarrowRight className='ml-3 ' />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
