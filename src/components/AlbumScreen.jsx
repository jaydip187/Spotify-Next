"use client";

import React, { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { RxHeartFilled, RxHeart } from "react-icons/rx";
import dayjs from "dayjs";
import UseSpotify from "@/hooks/UseSpotify";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AlbumScreen = ({ albumData }) => {
  // console.log(albumData);
  const router = useRouter();

  const spotifyApi = UseSpotify();

  return (
    <>
      {albumData ? (
        <>
          {" "}
          <div className="mx-2 ">
            <div className="ml-5 pt-6 text-green-700 flex items-center">
              <span className="  ">
                <FaPlayCircle className="bg-black border-green-700 border-1 text-6xl rounded-full" />
              </span>
              <div className="text-4xl ml-8 ">
                {" "}
                {true ? <RxHeartFilled /> : <RxHeart />}
              </div>
            </div>

            {/* ================================================================================================== */}

            <div className=" mt-6 text-sm">
              <div>
                {albumData?.tracks.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex text-sm py-2 justify-between items-center hover:bg-slate-400 px-2 rounded-lg "
                  >
                    <div className="text-center flex-none">{index + 1}</div>
                    <div className=" mx-4 grow">
                      <div className="flex flex-col">
                        <div>
                          <span
                            className="ml-3 font-bold cursor-pointer hover:border-b-2 border-white"
                            onClick={() => router.push(`/track/${item.id}`)}
                          >
                            {item.name}
                          </span>
                        </div>
                        <div className="flex ml-3">
                          {" "}
                          {item.artists.map((x, index) => (
                            <>
                              <div className="flex flex-row">
                                {" "}
                                <span
                                  className="cursor-pointer hover:border-b-2 border-white"
                                  onClick={() => router.push(`/artist/${x.id}`)}
                                >
                                  {x.name}
                                  {index !== item?.artists.length - 1
                                    ? ","
                                    : ""}
                                </span>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className=" mx-3 flex-none">
                      {/* {item?.duration_ms} */}
                      {dayjs(item?.duration_ms).format(" MM: ss")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

export default AlbumScreen;
