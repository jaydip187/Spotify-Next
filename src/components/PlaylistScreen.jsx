"use client";

import React, { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { RxHeartFilled, RxHeart } from "react-icons/rx";
import dayjs from "dayjs";
import UseSpotify from "@/hooks/UseSpotify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { SongIdAState } from "@/atom/Atom";
import Song from "./Song";

const PlaylistScreen = ({ playlistData }) => {
  const router = useRouter();
  const [_, setIDforSong] = useRecoilState(SongIdAState);
  // console.log(playlistData);

  const spotifyApi = UseSpotify();

  return (
    <>
      <div className="mx-2 ">
        <div className="ml-5 pt-6 text-green-700 flex items-center">
          <span className="  ">
            <FaPlayCircle className="bg-black border-green-700 border-1 text-6xl rounded-full" />
          </span>
          <div className="text-4xl ml-8 ">
            {" "}
            {true ? <RxHeartFilled /> : <RxHeart />}
          </div>
        </div>

        {/* ================================================================================================== */}

        <div className=" mt-6 text-xs">
          <table className=" w-full ">
            <thead>
              <tr className="border-b-2 border-gray-50 ">
                <td>#</td>
                <td>Title</td>
                <td className="text-center">Album</td>
                <td className="text-center">Date Added</td>
                <td>
                  <BiTimeFive />
                </td>
              </tr>
            </thead>
          </table>
          <Song SongData={playlistData?.tracks?.items} />
        </div>
      </div>
    </>
  );
};

export default PlaylistScreen;
