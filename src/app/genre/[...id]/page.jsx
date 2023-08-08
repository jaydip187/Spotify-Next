"use client";

import React from "react";
import SpotifyWebApi from "spotify-web-api-node";

const page = ({ songId }) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
  });

  const playSong = () => {
    console.log("====================================");
    console.log("0MbOLfDcGk8ROHJYXJHu5c");
    console.log("====================================");
    spotifyApi?.player?.play({
      uris: ["spotify:track:0HnbfIzOu6eLF8Kb1mT9Wl"],
    });
  };

  return (
    <button className="text-white" onClick={playSong}>
      Play Song
    </button>
  );
};

export default page;
