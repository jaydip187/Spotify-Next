"use client";

import React, { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { RxHeartFilled, RxHeart } from "react-icons/rx";
import dayjs from "dayjs";
import UseSpotify from "@/hooks/UseSpotify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { SongIdAState } from "@/atom/Atom";

const ArtistScreen = ({ id }) => {
  // console.log(id);
  const router = useRouter();
  const spotifyApi = UseSpotify();
  const [artistPopularTrack, setArtistPopularTrack] = useState(null);
  const [artistAlbum, setArtistAlbum] = useState(null);
  const [ArtistRelatedArtists, setArtistRelatedArtists] = useState(null);
  const [_, setIDforSong] = useRecoilState(SongIdAState);

  //   getArtistRelatedArtists

  // console.log(ArtistRelatedArtists);
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      // getArtistTopTracks({artistId:id})
      spotifyApi
        .getArtistTopTracks(id, "IN")
        .then((data) => setArtistPopularTrack(data.body.tracks))
        .catch((e) => console.log(e));
    }
    if (spotifyApi.getAccessToken()) {
      // getArtistTopTracks({artistId:id})
      spotifyApi
        .getArtistAlbums(id, { limit: 29 })
        .then((data) => setArtistAlbum(data.body.items))
        .catch((e) => console.log(e));
    }
    if (spotifyApi.getAccessToken()) {
      // getArtistTopTracks({artistId:id})
      spotifyApi
        .getArtistRelatedArtists(id)
        .then((data) => setArtistRelatedArtists(data.body.artists))
        .catch((e) => console.log(e));
    }
  }, [id]);

  console.log("====================================");
  console.log(artistAlbum);
  console.log("====================================");
  return (
    <>
      <div className="mx-2 ">
        {/* ================================================================================================== */}

        {artistPopularTrack?.length > 0 && (
          <div className=" mt-6 ml-5 text-2xl ">
            <div className="font-bold">popular</div>
            <div className="overflow-scroll h-80 scrollbar  scrollbar-thumb-[#232323] scrollbar-track-transparent scrollbar-h-6 overflow-x-hidden">
              {artistPopularTrack?.map((item, index) => (
                <div
                  key={index}
                  className="flex text-sm py-2 justify-between items-center hover:bg-slate-400 px-2 rounded-lg "
                >
                  <div className="text-center flex-none">{index + 1}</div>
                  <div className=" mx-4 grow">
                    <div className="flex">
                      <Image
                        onClick={() => setIDforSong(item?.id)}
                        src={item?.album.images[0].url}
                        alt="Song pic"
                        height={35}
                        width={35}
                        className="cursor-pointer"
                      />
                      <span
                        className="ml-3 cursor-pointer "
                        onClick={() => router.push(`/track/${item.id}`)}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                  <div className=" mx-3 flex-none">name</div>
                  <div className=" mx-3 flex-none">
                    {/* {item?.duration_ms} */}
                    {dayjs(item?.duration_ms).format(" MM: ss")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================================================== */}

        {artistAlbum?.length > 0 && (
          <div className="mt-6 ml-5">
            <div className="text-2xl   font-bold">Album</div>
            <div className="flex  justify-start">
              {artistAlbum?.map((item, index) => {
                if (index < 5) {
                  return (
                    <div
                      key={item.id}
                      onClick={() => router.push(`/album/${item.id}`)}
                      className="flex mt-2 rounded-lg cursor-pointer mx-3 flex-col bg-[#181818] p-4 hover:shadow-2xl hover:scale-[1.05] duration-150 transition-all"
                    >
                      <Image
                        src={item.images[0].url}
                        alt="Album Img"
                        width={160}
                        height={160}
                      />
                      <span className="mt-2">
                        {item.name.slice(0, 15)}
                        {item.name.length > 15 ? "..." : ""}
                      </span>
                      <span className="mt-2 text-xs">{item.release_date}</span>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}

        {/* ================================================================================================== */}

        {ArtistRelatedArtists?.length > 0 && (
          <div className="my-6 ml-5">
            <div className="text-2xl   font-bold">Releted Artist</div>
            <div className="flex justify-start">
              {ArtistRelatedArtists?.map((item, index) => {
                if (index < 5) {
                  return (
                    <div
                      onClick={() => router.push(`/artist/${item.id}`)}
                      key={item.id}
                      className="flex mt-2 cursor-pointer rounded-lg mx-3 flex-col bg-[#181818] p-4 hover:shadow-2xl hover:scale-[1.05] duration-150 transition-all"
                    >
                      <Image
                        className="rounded-lg"
                        src={item.images[0]?.url}
                        alt="Album Img"
                        width={160}
                        height={160}
                      />
                      <span className="mt-2">{item.name.slice(0, 20)}</span>
                      <span className="mt-2 text-xs">
                        {item.type.toUpperCase()}
                      </span>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}
        {/* ================================================================================================== */}

        <div className="py-5"></div>
      </div>
    </>
  );
};

export default ArtistScreen;
