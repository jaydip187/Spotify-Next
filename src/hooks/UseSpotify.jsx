"use client";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const UseSpotify = () => {
  const spotifyAPI = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
  });
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === "RefresTokenError") {
        signIn();
      }
      // console.log("token", session?.user.accessToken);

      spotifyAPI.setAccessToken(session?.user.accessToken);
    }
  }, [session]);
  return spotifyAPI;
};

export default UseSpotify;
