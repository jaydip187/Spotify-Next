"use client";

import { IsPlayingState } from "@/atom/Atom";

import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import UseSpotify from "./UseSpotify";
import { useSession } from "next-auth/react";
import axios from "axios";

const UsePlayPuse = () => {
  const [isPlaying, setIsPlaying] = useRecoilState(IsPlayingState);
  const spotifyApi = UseSpotify();
  const { data: session } = useSession();
  console.log("====================================");
  console.log(isPlaying);
  console.log("====================================");
  useEffect(() => {
    if (isPlaying) {
      const fetchSongInfo = async () => {
        // if (p) {
        if (session?.user.accessToken) {
          console.log("74108520");
          const TrackInfo = await fetch(
            `https://api.spotify.com/v1/me/player/play`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${session?.user?.accessToken}`,
              },
            }
          )
            .then((res) => res.json())
            .catch((e) => console.log(e));

          console.log(TrackInfo); // setSongInfo(TrackInfo);
        } else {
          console.log("78888888788878887");
        }

        // }
      };

      fetchSongInfo();
    } else {
      const fetchSongInfo = async () => {
        // if (p) {
        if (session?.user.accessToken) {
          console.log("74108520");
          const TrackInfo = await fetch(
            `https://api.spotify.com/v1/me/player/pause`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${session?.user?.accessToken}`,
              },
            }
          )
            .then((res) => res.json())
            .catch((e) => console.log(e));

          console.log(TrackInfo); // setSongInfo(TrackInfo);
        } else {
          console.log("78888888788878887");
        }

        // }
      };

      fetchSongInfo();
    }
  }, [isPlaying]);

  return isPlaying;
};

export default UsePlayPuse;

// function ASDF() {
//     if (isPlaying) {
//       const playUrl = "https://api.spotify.com/v1/me/player/pause";
//       const headers = {
//         Authorization: `Bearer qqqqqqqqqqqqqqqqqqqqqqqqq`,
//         // "Content-Type": "application/json",
//       };

//       console.log(headers.Authorization);

//       console.log("Try Catch");
//       try {
//         axios
//           ?.put(playUrl, { headers })
//           .then(() => console.log("Track is now playing!"))
//           .catch((e) => console.log(e));
//         //   console.log("Track is now playing!");
//       } catch (error) {
//         console.error("Error playing the track:", error);
//       }
//     } else {
//       const playUrl = "https://api.spotify.com/v1/me/player/play";
//       const headers = {
//         Authorization: `Bearer qqqqqqqqqqqqqqqqqqqqqqq`,
//         // "Content-Type": "application/json",
//       };

//       console.log(headers.Authorization);

//       console.log("Try Catch ");
//       try {
//         axios
//           ?.put(playUrl, { headers })
//           .then(() => console.log("Track is now pause!"))
//           .catch((e) => console.log(e));
//         //   console.log("Track is now playing!");
//       } catch (error) {
//         console.error("Error playing the track:", error);
//       }
//     }
//   }

//   ASDF();
