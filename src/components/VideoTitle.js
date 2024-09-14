import React from "react";
import { FaPlay } from "react-icons/fa";
import { BsInfoCircleFill } from "react-icons/bs";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="my-4 md:m-0 flex ">
        <button className=" bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl  rounded-lg hover:bg-opacity-80 font-bold flex items-center gap-3">
          <FaPlay /> Play
        </button>
        <button className=" mx-2  bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg font-bold flex items-center gap-3">
          <BsInfoCircleFill />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
