"use client";

import UseSpotify from "@/hooks/UseSpotify";
import React, { useEffect, useState } from "react";
import Song from "./Song";
import Image from "next/image";
import dayjs from "dayjs";
import SearchSong from "./SearchSong";
import SearchPlaylist from "./SearchPlaylist";
import SearchArtist from "./SearchArtist";

const SerachFun = ({ query }) => {
  const [searchSongs, setSearchSongs] = useState(null);
  const [searchArtists, setSearchArtists] = useState(null);
  const [searchPlaylists, setSearchPlaylists] = useState(null);
  const spotifyApi = UseSpotify();
  const searchq = query;
  //   console.log("====================================");
  console.log(query, query.length, "query"), searchq;

  //   console.log("====================================");
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.searchTracks(query).then(
        function (data) {
          console.log(`Search by  Song "${query}"`, data.body.tracks.items);
          setSearchSongs(data?.body?.tracks?.items);
        },
        function (err) {
          console.error(err);
        }
      );
    }
    if (spotifyApi.getAccessToken()) {
      spotifyApi.searchArtists(query).then(
        function (data) {
          console.log(`Search artists by "${query}"`, data.body.artists.items);
          setSearchArtists(data?.body?.artists?.items);
        },
        function (err) {
          console.error(err);
        }
      );
    }
    if (spotifyApi.getAccessToken()) {
      spotifyApi.searchPlaylists(query).then(
        function (data) {
          console.log(
            `Found playlists "${query}" are`,
            data.body.playlists.items
          );
          setSearchPlaylists(data?.body?.playlists?.items);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    }
  }, [query.length, query, searchSongs, searchq]);

  console.log("====================================");
  console.log(searchPlaylists);
  console.log("====================================");
  return (
    <div>
      <div>
        {/* ========================================================================================= */}
        {searchSongs && (
          <>
            <SearchSong searchSongs={searchSongs} />
          </>
        )}

        {/* ========================================================================================= */}
        {searchPlaylists && (
          <>
            <SearchPlaylist searchPlaylists={searchPlaylists} />
          </>
        )}
        {/* ========================================================================================= */}
        {searchArtists && (
          <>
            <SearchArtist searchArtists={searchArtists} />
          </>
        )}
      </div>
    </div>
  );
};

export default SerachFun;
