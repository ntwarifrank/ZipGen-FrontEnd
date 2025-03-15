import React from 'react'
import student from "../../public/ai2.png"
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


function Homepage() {
  return (
    <div className='w-[90%] mx-auto flex flex-row'>
        <div className='w-[50%] px-10 pt-20'>
            <div className='font-bold text-4xl'>
                The <span className='text-accentPurple'>Future </span> of AI-Powered Creativity
            </div>

            <div className='pt-4 text-gray-400'>
                Unlock limitless possibilities with AI-driven tools for content generation, image creation, and video production. 
                Experience seamless automation that enhances creativity and efficiency like never before.
            </div>

            <div className='mt-4 gap-0 flex flex-row w-[85%] bg-white text-backgroundDark rounded-full'>
                <div className='w-[74%]'>
                  <input type="text" className='w-full px-3 py-2 rounded-l-full outline-none border-none'/>
                </div>
                <div className='bg-accentPurple text-white cursor-pointer w-[26%] outline-none rounded-r-full pt-2 pl-2'>
                    Continue
                </div>
            </div>
        </div>
        <div className='w-[50%]'>
             <div className='w-[65%] h-[400px] float-right'>
                <Image src={student} alt='image' className='w-full h-full object-cover'></Image>
             </div>
        </div>
    </div>
  )
}

export default Homepage