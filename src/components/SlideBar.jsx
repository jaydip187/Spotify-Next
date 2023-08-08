"use client";

import React, { useEffect, useState } from "react";
import { FiHome, FiSearch, FiLogOut } from "react-icons/fi";
import { RiPlayList2Fill } from "react-icons/ri";
import { AiOutlinePlus, AiOutlineArrowRight } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";
import UseSpotify from "@/hooks/UseSpotify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LikeImg from "/public/like.png";
const SlideBar = () => {
  const router = useRouter();
  const [playlist, setPlaylist] = useState([]);
  const [artist, setArtist] = useState([]);
  const [likeSong, setLikeSong] = useState([]);
  const { data: session, status } = useSession();
  const spotifyApi = UseSpotify();

  // console.log(spotifyApi.getUserPlaylists(), "74108520963.");
  // console.log("====================================");
  // console.log(session?.user.username);
  // console.log(artist);

  // console.log("====================================");
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getFollowedArtists()
        .then((data) => setArtist(data.body.artists.items))
        .catch((e) => console.log(e));
    }
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists()
        .then((data) => setPlaylist(data?.body.items))
        .catch((e) => console.log(e));
    }
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMySavedTracks()
        .then((data) => setLikeSong(data?.body.items))
        .catch((e) => console.log(e));
    }
  }, [playlist, session, artist]);

  // console.log("====================================");
  // console.log("sdfgh", session);
  // console.log("sdfgh", playlist);
  // console.log("====================================");

  return (
    <div className="ml-1 mt-1">
      {/* --------------------------------------HOME $ SEARCH______________________________________________ */}

      <div className="w-96    bg-[#121212] border-[#121212] rounded-lg">
        <div
          className="flex items-center justify-start mr-2 py-3 px-3 text-white cursor-pointer"
          onClick={() => router.push("/")}
        >
          <FiHome /> <span className="px-3">Home</span>
        </div>
        <div
          className="flex items-center justify-start mr-2 py-3 px-3 text-white cursor-pointer"
          onClick={() => router.push("/seach")}
        >
          <FiSearch />
          <span className="px-3">Search</span>
        </div>
      </div>

      {/* ---------------------------------------PLAYLIST--------------------------------------------------------------- */}
      <div className="w-96 border-2 mt-1  bg-[#121212] border-[#121212] rounded-lg  text-white">
        <div className="flex items-center justify-between mr-2 py-3 px-3">
          <div className="flex items-center">
            <RiPlayList2Fill /> <span className="px-3">Your Playlist</span>
          </div>
          <div className="flex items-center ">
            <div className="px-3 text-xl">
              <AiOutlinePlus />
            </div>
            <div className="px-3 text-xl">
              <AiOutlineArrowRight />
            </div>
          </div>
        </div>
        {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}

        <div className="flex px-3  font-bold">
          <div
            onClick={() => setArtist([])}
            className="bg-[#232323] rounded-lg px-2 mx-2 cursor-pointer"
          >
            playlist
          </div>
          <div
            onClick={() => setPlaylist([])}
            className="bg-[#232323] rounded-lg px-2 mx-2 cursor-pointer"
          >
            Artist
          </div>
        </div>

        {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}

        <div className="flex items-center  justify-start mr-2 py-3 px-3 ">
          <FiSearch />
          <span className="px-3">Search</span>
        </div>
        {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}

        <div className="    h-[456px] overflow-scroll  overflow-x-hidden  scrollbar  scrollbar-thumb-[#232323] scrollbar-track-[#121212]">
          {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}

          <div
            className="mr-2 px-3 cursor-pointer"
            onClick={() => router.push(`/collection`)}
            // key={item.id}
          >
            <div className="my-2 flex items-start ">
              {/* {console.log(item.images[0].url)} */}
              <div>
                <Image
                  className="rounded-md"
                  src={LikeImg}
                  alt="playlist "
                  height={50}
                  width={50}
                />
              </div>
              <div className="ml-2 flex items-center ">
                <span>Liked Song</span>
              </div>
            </div>
          </div>

          {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}

          {playlist.map((item) => (
            <div
              className="mr-2 px-3 cursor-pointer"
              onClick={() => router.push(`/playlist/${item.id}`)}
              key={item.id}
            >
              <div className="my-2 flex ">
                {/* {console.log(item.images[0].url)} */}
                <div>
                  <Image
                    className="rounded-md"
                    src={item.images[0].url}
                    alt="playlist "
                    height={50}
                    width={50}
                  />
                </div>
                <div className="ml-2 flex flex-col">
                  <span>
                    {item.name.slice(0, 30)}
                    {item.name.length >= 30 ? "..." : ""}
                  </span>
                  <span className="font-thin">{item.owner.display_name}</span>
                </div>
              </div>
            </div>
          ))}

          {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}
          {artist?.map((item) => (
            <div className="mr-2 px-3" key={item.id}>
              <div
                className="my-2 flex cursor-pointer "
                onClick={() => router.push(`/artist/${item.id}`)}
              >
                {/* {console.log(item.images[0].url)} */}
                <div>
                  <Image
                    className="rounded-full"
                    src={item.images[0].url}
                    alt="playlist "
                    height={50}
                    width={50}
                  />
                </div>
                <div className="ml-3 flex flex-col">
                  <span>{item.name}</span>
                  <span className="font-thin">Artist</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}

        {/* <div
          className="py-2 mr-2 cursor-pointer flex items-center"
          onClick={() => signOut()}
        >
          {" "}
          <FiLogOut />
          <span className="mx-5"> Log Out</span>
        </div> */}
      </div>
    </div>
  );
};

export default SlideBar;
