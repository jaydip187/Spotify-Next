"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useParams } from "next/navigation";
import UseSpotify from "@/hooks/UseSpotify";
import Image from "next/image";
import PlaylistScreen from "./PlaylistScreen";

const PlaylistMainScreen = () => {
  const pathname = usePathname();
  const { id } = useParams();
  const spotifyApi = UseSpotify();
  // console.log(spotifyApi.getAccessToken());
  //   console.log(id);

  const [playlistData, setPlaylistData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState(null);

  //   console.log("====================================");
  //   //   console.log(playlistData?.owner.id, owner);
  //   console.log(playlistData);
  //   console.log("====================================");
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylist(id)
        .then((data) => setPlaylistData(data.body))
        .catch((e) => console.log(e));
      setLoading(true);
    }
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUser(playlistData?.owner.id)
        .then((data) => setOwner(data.body))
        .catch((e) => console.log(e));
    }
  }, [pathname, id, owner, playlistData]);

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
                  src={playlistData?.images[0].url}
                  alt="Playlisst Img "
                  height={200}
                  width={200}
                />
              </div>
              <div className="m-4 text-white">
                <div className=" mr-4 mb-8 font-bold">PlayList</div>
                <div className=" mr-4 mb-2 text-3xl font-bold">
                  {playlistData?.name}
                </div>
                <div className=" mb-2 mr-4">{playlistData?.description}</div>
                <div className="flex items-center">
                  {/* <div> */}
                  {owner && (
                    <Image
                      className="rounded-full"
                      src={owner?.images[0].url}
                      alt="Playlist Owner"
                      width={35}
                      decoding="async"
                      height={35}
                    />
                  )}
                  {/* </div> */}
                  <span className="mx-2 font-bold text-sm">
                    {playlistData?.owner.display_name}{" "}
                  </span>
                  <span className="text-sm mx-2">
                    {playlistData?.followers.total} likes
                  </span>
                  <span className="text-sm mx-2">
                    {playlistData?.tracks.total} songs
                  </span>
                </div>
              </div>
            </div>

            {/* ======================================================================================================== */}
            <div
              className={`bg-gradient-to-b ${colorElement} via-black to-zinc-800 w-full  `}
            >
              <PlaylistScreen playlistData={playlistData} />
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

export default PlaylistMainScreen;
