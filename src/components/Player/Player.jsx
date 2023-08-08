"use client";

import { IsPlayingState, SongIdAState } from "@/atom/Atom";
import UseSongInfo from "@/hooks/UseSongInfo";
import UseSpotify from "@/hooks/UseSpotify";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

// import { FaShuffle } from "react-icons/fa";
import { TbArrowsShuffle, TbRepeat } from "react-icons/tb";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { BsFillVolumeUpFill, BsFillVolumeDownFill } from "react-icons/bs";
import { space } from "postcss/lib/list";
import UsePlayPuse from "@/hooks/UsePlayPuse";

const Player = () => {
  const id = useRecoilValue(SongIdAState);
  console.log(id, "In PlyreeS");
  const { data: session, status } = useSession();
  const spotifyApi = UseSpotify();
  const [MyCurrentPlayingTrackId, setMyCurrentPlayingTrack] =
    useRecoilState(SongIdAState);
  const [MyCurrentPlayingTrackData, setMyCurrentPlayingTrackData] =
    useState(null);
  const [MyCurrentPlaybackState, setMyCurrentPlaybackState] = useState(null);
  const [isPlaying, setIsPlaying] = useRecoilState(IsPlayingState);
  const [volume, setVolume] = useState(50);
  const [loading, setLoading] = useState(true);
  const SongInfo = UseSongInfo();
  const PlayPuse = UsePlayPuse();
  console.log(SongInfo, "SongInfo");
  console.log(PlayPuse, "UsePlayPuse");

  const fetchCurrentSong = () => {
    if (!SongInfo) {
      console.log("Info fun");
      if (spotifyApi.getAccessToken()) {
        spotifyApi.getMyCurrentPlayingTrack().then((data) => {
          console.log("Now Playing", data?.body?.item);
          setMyCurrentPlayingTrack(data.body?.item?.id);
          setMyCurrentPlayingTrackData(data.body?.item);
        });
      }

      if (spotifyApi.getAccessToken()) {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      }
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !MyCurrentPlayingTrackId) {
      fetchCurrentSong();
      console.log("789");
      setLoading(true);
    }
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyCurrentPlaybackState()
        .then((data) => console.log("777777777777777777777777777", data?.body))
        .catch((e) => console.log(e));
    }
  }, [spotifyApi, MyCurrentPlayingTrackId, id, session]);

  // useEffect(() => {
  //   if (spotifyApi.getAccessToken()) {
  //     console.log(`Volume is ${volume}`);
  //     if (spotifyApi.getMyDevices()) {
  //       console.log(`Volume is ${volume} _____________________________`);

  //       spotifyApi
  //         .setVolume(volume)
  //         .then(() => console.log(`Volume is ${volume}`))
  //         .catch((e) => console.log(e));
  //     }
  //   } else {
  //     console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
  //   }
  // }, [volume, session]);
  // console.log(`Volume is ${volume}`);

  // console.log(loading, "Loading");
  // console.log(isPlaying, "Playing");
  // console.log(SongInfo, "SongIngo");
  // console.log(MyCurrentPlayingTrackId, "Track Id");

  const PlayPause = () => {
    // if (spotifyApi.getAccessToken()) {
    //   console.log("Plat Pause Fun");
    // spotifyApi
    //   .getMyCurrentPlaybackState()
    //   .then(() => {
    //     if (data?.body?.is_playing) {
    //       spotifyApi.pause().then().catch();
    //       setIsPlaying(false);
    //     } else {
    //       spotifyApi.play().then().catch();
    //       setIsPlaying(true);
    //     }
    //   })
    //   .catch((e) => console.log(e));
    // } else {
    //   console.log("0000000000");
    // }
  };

  return (
    <>
      {loading ? (
        <>
          {" "}
          <div className="text-white flex justify-between   ">
            <div className="flex flex-row">
              <div className="">
                <Image
                  src={SongInfo?.album.images[0].url}
                  alt="Song Img"
                  width={100}
                  height={100}
                />
              </div>

              <div className="text-white flex flex-col justify-center ml-2">
                <span>{SongInfo?.album.name}</span>
                <span> {SongInfo?.artists[0].name}</span>
              </div>
            </div>
            <div className="flex items-center">
              {" "}
              <div className="flex text-2xl items-center ">
                <TbArrowsShuffle className="text-lg mx-2" />
                <BiSkipPrevious className=" mx-2" />
                <span className="text-4xl mx-2">
                  {!isPlaying ? (
                    <span onClick={() => setIsPlaying(true)}>
                      {" "}
                      <AiFillPlayCircle />
                    </span>
                  ) : (
                    <span onClick={() => setIsPlaying(false)}>
                      <AiFillPauseCircle />
                    </span>
                  )}
                </span>
                <BiSkipNext className=" mx-2" />
                <TbRepeat className="text-lg mx-2" />
              </div>
            </div>
            <div className="flex items-center mr-2">
              {" "}
              <div className="flex gap-2 ">
                <BsFillVolumeDownFill className="text-2xl" />
                <input
                  onChange={(e) => setVolume(Number(e.target.value))}
                  type="range"
                  name="volume"
                  max={100}
                  min={0}
                  value={volume}
                  id=""
                />
                <BsFillVolumeUpFill className="text-2xl" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div>Loading</div>
        </>
      )}
    </>
  );
};

export default Player;
