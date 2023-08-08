"use client";

import { UriTrackState } from "@/atom/Atom";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import SpotifyWebApi from "spotify-web-api-node";
import UseSpotify from "./UseSpotify";
// import UseSpotify from "./UseSpotify";

const USeCurrentTrack = () => {
  // const spotifyAPI = new SpotifyWebApi({
  //   clientId: process.env.SPOTIFY_ID,
  //   clientSecret: process.env.SPOTIFY_SECRET,
  // });
  const i = useRecoilValue(UriTrackState);
  const { data: session } = useSession();
  const spotifyApi = UseSpotify();
  console.log(i);
  console.log(spotifyApi.getAccessToken());
  useEffect(() => {
    // spotifyAPI.setAccessToken(session?.user.accessToken);
    console.log(i, "rrrrrrrrrr");
    console.log(session?.user.accessToken, "rrrrrrrrrr");
    function ASDF() {
      const playUrl = "https://api.spotify.com/v1/me/player/play";
      const headers = {
        Authorization: `Bearer ${session?.user.accessToken}`,
        // "Content-Type": "application/json",
      };
      const data = {
        uris: [i],
      };

      console.log(headers.Authorization);

      console.log("Try Catch");
      try {
        axios
          ?.put(playUrl, data, { headers })
          .then(() => console.log("Track is now playing!"))
          .catch((e) => console.log(e));
        console.log("Track is now playing!");
      } catch (error) {
        console.error("Error playing the track:", error);
      }
    }

    ASDF();
  }, [i, session]);
  return spotifyApi;
};

export default USeCurrentTrack;
