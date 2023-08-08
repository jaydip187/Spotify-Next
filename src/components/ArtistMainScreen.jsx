"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useParams } from "next/navigation";
import UseSpotify from "@/hooks/UseSpotify";
import Image from "next/image";
import PlaylistScreen from "./PlaylistScreen";
import ArtistScreen from "./ArtistScreen";
import FollowAndPlaylist from "./FollowAndPlaylist";

const ArtistMainScreen = () => {
  const pathname = usePathname();
  const { id } = useParams();
  const spotifyApi = UseSpotify();
  const [ArtistData, setArtistData] = useState(null);
  const [ArtistTrackData, setArtistTrackData] = useState(null);
  const [loading, setLoading] = useState(false);
  // console.log(ArtistTrackData);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getArtist(id)
        .then((data) => setArtistData(data.body))
        .catch((e) => console.log(e));
      setLoading(true);
    }
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getArtistAlbums(id)
        .then((data) => setArtistTrackData(data.body))
        .catch((e) => console.log(e));
    }
  }, [pathname, id, ArtistData]);

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
      {ArtistData ? (
        <>
          {" "}
          <div className="mx-2 h-[680px] mt-1 w-[1120px] bg-gradient-to-t ${colorElement} to-zinc-800 rounded-lg overflow-scroll text-white scrollbar  scrollbar-thumb-[#232323] scrollbar-track-transparent scrollbar-h-6 overflow-x-hidden  ">
            <div
              style={{
                // backgroundColor: "red",
                backgroundImage: `url(${ArtistData?.images[0]?.url})`,
                // backgroundSize: "cover",
                backgroundRepeatY: "no-repeat",
                // backgroundPositionY: "-300px",
              }}
              className={`rounded-t-lg bg-gradient-to-t ${colorElement} to-zinc-800  w-full h-80 flex items-end bg-contain bg-center  `}
            >
              <div className="m-4 text-white">
                <div className=" mr-4 mb-8 font-bold">Artist</div>
                <div className=" mr-4 mb-2  text-7xl font-bold">
                  {ArtistData?.name}
                </div>
                {/* <div className=" mb-2 mr-4">{playlistData?.description}</div> */}
                <div className="flex items-center">
                  <span className="mx-2 font-bold text-sm">
                    {/* {playlistData?.owner.display_name}{" "} */}
                  </span>
                  <span className="text-sm ">
                    {ArtistData?.followers.total} Followers
                  </span>
                  <span className="text-sm mx-2"></span>
                </div>
              </div>
            </div>

            {/* ======================================================================================================== */}
            <div className={`bg-zinc-700 w-full  `}>
              <FollowAndPlaylist />
              <ArtistScreen id={id} />
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

export default ArtistMainScreen;
