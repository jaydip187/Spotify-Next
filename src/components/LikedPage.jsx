"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PlaylistScreen from "./PlaylistScreen";
import UseSpotify from "@/hooks/UseSpotify";
import LikeImg from "/public/like.png";
import Song from "./Song";

const LikedPage = () => {
  const [playlistData, setplaylistData] = useState(null);
  const spotifyApi = UseSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMySavedTracks()
        .then((data) => setplaylistData(data?.body?.items))
        .catch((e) => console.log(e));
    }
  }, [playlistData, spotifyApi]);

  // console.log("====================================");
  // console.log(playlistData);
  // console.log("====================================");

  const color = [
    "from-indigo-500",
    "from-red-500",
    "from-lime-500",
    "from-teal-500",
    "from-cyan-500",
    "from-blue-500",
    "from-violet-500",
    "from-fuchsia-500",
    "from-rose-500",
    "from-yellow-500",
  ];
  const colorElement = color[Math.floor(Math.random() * color.length)];

  return (
    <div>
      <div className="h-full">
        {playlistData ? (
          <>
            {" "}
            <div className="mx-2 h-[680px] mt-1 w-[1120px] bg-gradient-to-t ${colorElement} to-zinc-800 rounded-lg overflow-scroll text-white scrollbar  scrollbar-thumb-[#232323] scrollbar-track-transparent scrollbar-h-6 overflow-x-hidden  ">
              <div
                className={`bg-gradient-to-t ${colorElement} to-zinc-800 rounded-t-lg  w-full h-80 flex items-end  `}
              >
                <div>
                  <Image
                    className=" ml-6 mb-4"
                    src={LikeImg}
                    alt="Playlisst Img "
                    height={200}
                    width={200}
                  />
                </div>
                <div className="m-4 text-white">
                  <div className=" mr-4 mb-7 text-6xl font-extrabold">
                    Liked Song
                  </div>
                </div>
              </div>

              {/* ======================================================================================================== */}
              <div
                className={`bg-gradient-to-b ${colorElement} via-black to-zinc-800 w-full  text-xs `}
              >
                <Song SongData={playlistData} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div>Loading</div>
          </>
        )}
      </div>
    </div>
  );
};

export default LikedPage;
