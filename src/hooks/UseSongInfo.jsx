"use client";

import React, { useEffect, useState } from "react";
import UseSpotify from "./UseSpotify";
import { useRecoilState } from "recoil";
import { SongIdAState } from "@/atom/Atom";

const UseSongInfo = () => {
  const spotifyApi = UseSpotify();
  const [currentSongId, setCurrentSongId] = useRecoilState(SongIdAState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentSongId) {
        if (spotifyApi.getAccessToken()) {
          console.log("74108520");
          const TrackInfo = await fetch(
            `https://api.spotify.com/v1/tracks/${currentSongId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
              },
            }
          )
            .then((res) => res.json())
            .catch((e) => console.log(e));

          setSongInfo(TrackInfo);
        }
      }
    };

    fetchSongInfo();
  }, [spotifyApi, currentSongId]);

  return songInfo;
};

export default UseSongInfo;
