import React from "react";
import { FaPhone, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  return (
    <div
      name='contact'
      className='w-full xl:h-screen  flex justify-center items-center p-4'
    >
      <form
        method='POST'
        action='https://getform.io/f/fbea8dd6-626f-4e8f-86f1-b45a3e9725b8'
        className='flex flex-col max-w-[600px] w-full h-full'
      >
        <div className='pb-8'>
          <p className='text-4xl font-bold inline border-b-4 border-pink-600 text-gray-300'>
            Contact
          </p>

          <div className='flex items-center'>
            <FaPhone className='text-gray-300 mr-2' />
            <p className='text-gray-300'>Phone number: 052-870-3824</p>
          </div>
          <div className='flex items-center'>
            <FaLinkedin className='text-gray-300 mr-2' />
            <a href='https://www.linkedin.com/in/yourname/' className='text-gray-300'>Send me a message in LinkedIn</a>
          </div>
        </div>
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
      </form>
    </div>
  );
};

export default Contact;
