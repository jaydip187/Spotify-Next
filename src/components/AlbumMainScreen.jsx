"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useParams } from "next/navigation";
import UseSpotify from "@/hooks/UseSpotify";
import Image from "next/image";
import PlaylistScreen from "./PlaylistScreen";
import AlbumScreen from "./AlbumScreen";

const AlbumMainScreen = () => {
  const pathname = usePathname();
  const { id } = useParams();
  const spotifyApi = UseSpotify();
  const [albumData, setAlbumData] = useState(null);
  console.log(id);
  const playlistData = true;

  // console.log(albumData);
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getAlbum(id)
        .then((data) => setAlbumData(data.body))
        .catch((e) => console.log(e));
    }
    //   if (spotifyApi.getAccessToken()) {
    //     spotifyApi
    //       .getUser(playlistData?.owner.id)
    //       .then((data) => setOwner(data.body))
    //       .catch((e) => console.log(e));
    //   }
  }, [pathname, id]);

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
    <>
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
                  src={albumData?.images[0]?.url}
                  alt="album Img "
                  height={200}
                  width={200}
                />
              </div>
              <div className="m-4 text-white">
                <div className=" mr-4 mb-8 font-bold">Album</div>
                <div className=" mr-4 mb-2 text-3xl font-bold">
                  {albumData?.name}
                </div>
                <div className=" mb-2 mr-4">{playlistData?.description}</div>
                <div className="flex items-center">
                  {/* <div> */}

                  <span className="text-sm mx-2">{albumData?.label}</span>
                  <span className="text-sm mx-2">
                    {albumData?.tracks.total} songs
                  </span>
                </div>
              </div>
            </div>

            {/* ======================================================================================================== */}
            <div
              className={`bg-gradient-to-b ${colorElement} via-black to-zinc-800 w-full  `}
            >
              <AlbumScreen albumData={albumData} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div>Loading</div>
        </>
      )}
    </>
  );
};

export default AlbumMainScreen;
