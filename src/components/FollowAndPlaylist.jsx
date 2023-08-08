import React from "react";
import { FaPlayCircle } from "react-icons/fa";

const FollowAndPlaylist = () => {
  return (
    <div>
      <div className="ml-5 pt-6 text-green-700 flex items-center">
        <span className="  ">
          <FaPlayCircle className="bg-black border-green-700 border-1 text-6xl rounded-full" />
        </span>
        <div className="text-xl ml-8 border-2 text-white border-white px-4 font-bold rounded-xl">
          {" "}
          Follow
          {/* {true ? <RxHeartFilled /> : <RxHeart />} */}
        </div>
      </div>
    </div>
  );
};

export default FollowAndPlaylist;
