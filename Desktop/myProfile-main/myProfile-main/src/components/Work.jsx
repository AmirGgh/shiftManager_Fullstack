
import { data } from "../data/data.js";

import React, { useState } from 'react';

const Project = ({ name, image, video }) => {
  const [displayVideo, setDisplayVideo] = useState(false);

  return (
    <div
      className="relative "
      onMouseEnter={() => setDisplayVideo(true)}
      onMouseLeave={() => setDisplayVideo(false)}
    >
      <img src={image} alt={name} className="w-full rounded-md" />
      {displayVideo && (
        <video
          src={video}
          className="absolute z-0 inset-0 w-full h-full rounded-md object-cover"
          autoPlay
          loop
          muted
        />
      )}
    </div>
  );
};

const Work = () => {
  // projects file
  const project = data;
  return (
    <div name="work" className="w-full xl:h-min text-gray-300 ">
      <div className="max-w-[1200px] mx-auto p-10 flex flex-col justify-center w-full h-full">
        <div className="pb-4">
          <p className="text-4xl font-bold inline border-b-4 text-gray-300 border-pink-600">
            Work
          </p>
          <p className="py-6">// Check out some of my recent work</p>
        </div>
        {/* container for projects */}
        <div className="grid md:grid-cols-1 gap-4">
          {project.map((item, index) => (
            <div key={index}>
              <div className="sm:flex justify-center rounded-md">
                <span className="text-2xl font bold text-white tracking-wider  ">
                  {item.name}
                </span>
              </div>
              <div className="md:flex justify-center ">
                <div className="md:w-2/3  p-2 justify-center text-center ">
                  <Project name={item.name} image={item.image} video={item.video} />
                </div>
                <div className="md:w-2/3 p-2 justify-center text-center ">
                  <p className="text-gray-200 text-sm md:text-base">{item.summary}</p>
                  <div className="pt-8 text-center  ">
                    <a href={item.github}>
                      <button className="bg-gradient-to-r from-cyan-500 to-blue-500  text-white px-3 py-1 border-none rounded-md m-4">
                        Code
                      </button>
                    </a>
                    {item.live && (
                      <a href={item.live}>
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-to-teal-500 text-white px-3 py-1 border-none rounded-md ml-8">
                          Live
                        </button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
