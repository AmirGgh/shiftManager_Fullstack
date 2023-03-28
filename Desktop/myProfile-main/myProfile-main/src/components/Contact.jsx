import React, { useState } from "react";
import { FaPhone, FaLinkedin, FaEnvelope, FaGithub, FaRegFileAlt } from 'react-icons/fa';

const Contact = () => {
  const [email, setEmail] = useState(false)
  return (
    <div
      name='contact'
      className='w-full xl:h-screen  flex justify-center items-center p-4'
    >
      <form
        method='POST'
        action='https://getform.io/f/fbea8dd6-626f-4e8f-86f1-b45a3e9725b8'
        className='flex flex-col max-w-[600px] w-full h-full justify-center'
      >
        <div className='pb-8'>
          <p className='text-4xl font-bold inline border-b-4  border-pink-600 text-gray-300'>
            Contact
          </p>
          <p className='py-6 text-gray-300'>// More about me:</p>
          <div className="flex p "><div></div><div></div></div>
          <div className='flex items-center'>
            <FaGithub className='text-gray-300 mr-2' />
            <p className='text-gray-300'>
              <a href='https://github.com/AmirGgh' className='text-gray-300'>My Github</a>
            </p>
          </div>
          <br />
          <div className='flex items-center'>
            <FaRegFileAlt className='text-gray-300 mr-2' />
            <p className='text-gray-300'>
              <a href='https://github.com/AmirGgh' className='text-gray-300'>Resume</a>
            </p>
          </div>
          <p className='py-6 text-gray-300'>// Contact me via...</p>
          <div className='flex items-center'>
            <FaPhone className='text-gray-300 mr-2' />
            <p className='text-gray-300'>Phone number: 052-870-3824</p>
          </div>
          <br />
          <div className='flex items-center'>
            <FaLinkedin className='text-gray-300 mr-2' />
            <a href='https://www.linkedin.com/in/amir-gez/' className='text-gray-300'>Send me a message in LinkedIn</a>
          </div>

        </div>
        {email ? <>
          <input
            className='bg-[#e1e8ff] p-2'
            type='text'
            placeholder='Name'
            name='name'
          />
          <input
            className='my-4 p-2 bg-[#e1e8ff]'
            type='email'
            placeholder='Email'
            name='email'
          />
          <textarea
            className='bg-[#e1e8ff] p-2'
            name='message'
            rows='10'
            placeholder='Message'
          ></textarea>
          <button className='text-white border-2 hover:bg-pink-600 hover:border-pink-600 px-4 py-3 my-8 mx-auto flex items-center'>
            Let's Collaborate
          </button>
        </> : <div onClick={() => setEmail(!email)} className='flex items-center'>
          <FaEnvelope className='text-gray-300 mr-2' />
          <p className='text-gray-300'>Send email to amir.gez.p@gmail.com</p>
        </div>
        }
      </form>
    </div>
  );
};


export default Contact;
