import React from "react";

import HTML from "../assets/html.png";
import CSS from "../assets/css.png";
import JAVASCRIPT from "../assets/javascript.png";
import REACT from "../assets/react.png";
import NODE from "../assets/node.png";
import FIREBASE from "../assets/firebase.png";
import GITHUB from "../assets/github.png";
import TAILWIND from "../assets/tailwind.png";
import MONGODB from "../assets/mongo.png";
import MUI from "../assets/mui.png";
import GRAPHQL from "../assets/graphQL.png";
import TS from "../assets/ts.png";

const skills = [
  HTML,
  CSS,
  JAVASCRIPT,
  REACT,
  GITHUB,
  NODE,
  MONGODB,
  TAILWIND,
  FIREBASE,
  MUI,
  GRAPHQL,
  TS,
];
const titleSkills = [
  "HTML",
  "CSS",
  "JAVASCRIPT",
  "REACT",
  "GITHUB",
  "NODE",
  "MONGODB",
  "TAILWIND",
  "FIREBASE",
  "MUI",
  "GRAPHQL",
  "TS",
];
const Skills = () => {
  return (
    <div name='skills' className='w-full xl:h-screen  text-gray-300 '>
      {/* Container */}
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <div>
          <p className='text-4xl font-bold inline border-b-4 border-pink-600 '>
            Skills
          </p>
          <p className='py-4'>// These are the technologies I've worked with</p>
        </div>

        <div className='w-full grid grid-cols-3 sm:grid-cols-6 gap-4 text-center py-8'>
          {skills.map((s, index) => (
            <div key={s} className='shadow-md hover:scale-110 duration-500'>
              <img className='w-10 mx-auto' src={s} />
              <p className='my-4 text-sm'>{titleSkills[index]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
