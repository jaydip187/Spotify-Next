"use client";

import UseSpotify from "@/hooks/UseSpotify";
import React, { useEffect, useState } from "react";
import Song from "./Song";
import { seed_genres } from "@/lib/features";
import SearchArtist from "./SearchArtist";
import { useSession } from "next-auth/react";
import SongCopy from "./Song copy";
import { useRecoilState } from "recoil";
import { AccessTokenState } from "@/atom/Atom";

const HomeScreen = () => {
  const [Recentlyplayed, setRecentlyplayed] = useState(null);
  const [TopArtists, setTopArtists] = useState(null);
  const [TopTracks, setTopTracks] = useState(null);
  const [___, setToken] = useRecoilState(AccessTokenState);
  const spotifyApi = UseSpotify();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      setToken(spotifyApi.getAccessToken());
      spotifyApi
        .getMyRecentlyPlayedTracks()
        .then((data) => {
          setRecentlyplayed(data?.body?.items);
        })
        .catch((e) => console.log(e));
    }
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyTopArtists()
        .then((data) => setTopArtists(data?.body?.items))
        .catch((e) => console.log(e));
    }

    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyTopTracks()
        .then((data) => setTopTracks(data?.body?.items))
        .catch((e) => console.log(e));
    }
  }, [session, TopArtists, Recentlyplayed]);
  // console.log("====================================");
  // console.log(TopTracks);
  // console.log("====================================");
  return (
    <div className="text-white mt-1">
      <div className=" mx-2 h-[680px] mt-1 w-[1120px]   bg-[#121212] border-[#121212] rounded-lg overflow-scroll text-white scrollbar  scrollbar-thumb-[#232323] scrollbar-track-transparent scrollbar-h-6 overflow-x-hidden ">
        {/* ======================================================================================================= */}
        {Recentlyplayed && (
          <>
            {" "}
            <div className="mt-5 ml-4 text-xs ">
              <div className="text-3xl font-bold">Recently played</div>
              <div className="mt-3">
                <Song SongData={Recentlyplayed} />
              </div>
            </div>
          </>
        )}
        {/* ======================================================================================================= */}
        {TopTracks && (
          <>
            {" "}
            <div className="mt-5 ml-4 text-xs ">
              <div className="text-3xl font-bold">Top Songs</div>
              <div className="mt-3">
                <SongCopy SongData={TopTracks} />
              </div>
            </div>
          </>
        )}
        {/* ======================================================================================================= */}
        <div>{TopArtists && <SearchArtist searchArtists={TopArtists} />}</div>{" "}
      </div>
    </div>
  );
};

export default HomeScreen;
