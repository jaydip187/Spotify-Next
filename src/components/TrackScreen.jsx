"use client";

import React, { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { RxHeartFilled, RxHeart } from "react-icons/rx";
import dayjs from "dayjs";
import UseSpotify from "@/hooks/UseSpotify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ArtistScreen from "./ArtistScreen";

const TrackScreen = ({ id }) => {
  // console.log(id);
  const ids = id?.join(",");
  // console.log(ids);
  const router = useRouter();
  const spotifyApi = UseSpotify();
  const [artistPopularTrack, setArtistPopularTrack] = useState(null);
  const [artistAlbum, setArtistAlbum] = useState(null);
  const [ArtistRelatedArtists, setArtistRelatedArtists] = useState(null);
  const [Artists, setArtists] = useState(null);

  // console.log("====================================");
  // console.log(Artists);
  // console.log("====================================");
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getArtists(id)
        .then((data) => setArtists(data.body.artists))
        .catch((e) => console.log(e));
    }
    // if (spotifyApi.getAccessToken()) {
    //   spotifyApi
    //     .getArtistAlbums(id, { limit: 29 })
    //     .then((data) => setArtistAlbum(data.body))
    //     .catch((e) => console.log(e));
    // }
    // if (spotifyApi.getAccessToken()) {
    //   spotifyApi
    //     .getArtistRelatedArtists(id)
    //     .then((data) => setArtistRelatedArtists(data.body.artists))
    //     .catch((e) => console.log(e));
    // }
  }, [id]);

  return (
    <>
      {Artists ? (
        <>
          <div className="ml-5">
            <div>
              {Artists?.map((item) => (
                <>
                  <div className="flex items-center py-2 ">
                    <Image
                      className="rounded-full"
                      src={item?.images[0]?.url}
                      alt="Artist Img"
                      width={80}
                      height={80}
                    />

                    <div className="flex flex-col font-bold text-sm ml-3">
                      <span>{item?.type.toUpperCase()}</span>
                      <span
                        className="border-white hover:border-b-2 cursor-pointer "
                        onClick={() => router.push(`/artist/${item.id}`)}
                      >
                        {item?.name.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </>
              ))}
            </div>

            {ids ? (
              <>
                <div className="mt-3">
                  <hr />
                  {Artists.map((item) => {
                    return (
                      <>
                        <React.StrictMode>
                          <span className="font-bold mt-6 ml-5 text-3xl">
                            {item.name}
                          </span>
                          <ArtistScreen id={item.id} key={item.id} />
                        </React.StrictMode>
                      </>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div>Loading</div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div>Loading</div>
        </>
      )}
    </>
  );
};

export default TrackScreen;
