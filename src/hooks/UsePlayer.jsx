import React, { useEffect } from "react";

const UsePlayer = () => {
  var player;
  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = session?.user.accessToken;
      const player = new Spotify.Player({
        name: "Player",
        getOAuthToken: (cb) => {
          cb(token);
        },
      });

      player.connect().then((success) => {
        if (success) {
          console.log(
            "The Web Playback SDK successfully connected to Spotify!"
          );
        }
      });
    };
  }, []);
  return <div>UsePlayer</div>;
};

export default UsePlayer;
