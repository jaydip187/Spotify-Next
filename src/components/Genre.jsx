"use client";

import UseSpotify from "@/hooks/UseSpotify";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Song from "./Song";
import Image from "next/image";

const Genre = () => {
  const { id } = useParams();
  //   console.log(id);
  const CatID = id[0].toLowerCase();
  console.log(CatID);
  const router = useRouter();
  const spotifyApi = UseSpotify();
  const [PlaylistData, setPalylistData] = useState();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylistsForCategory(CatID, {
          country: "IN",
          limit: 30,
          //   offset: 0,
        })
        .then(
          function (data) {
            // console.log(data.body);
            setPalylistData(data?.body?.playlists?.items);
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );
    }
    // console.log("77777777777777777777777777777777777777");
  }, [id]);

  const color = [
    "from-indigo-500",
    "from-red-500",
    "from-lime-500",
    "from-teal-500",
    "from-cyan-500",
    "from-blue-500",
    "from-violet-500",
    "from-fuchsia-500",
    "from-rose-500",
    "from-yellow-500",
  ];
  const colorElement = color[Math.floor(Math.random() * color.length)];

  console.log(PlaylistData);
  return (
    <div>
      {PlaylistData ? (
        <>
          {" "}
          <div className="mx-2 h-[680px] mt-1 w-[1120px] bg-gradient-to-t ${colorElement} to-zinc-800 rounded-lg overflow-scroll text-white scrollbar  scrollbar-thumb-[#232323] scrollbar-track-transparent scrollbar-h-6 overflow-x-hidden  ">
            <div
              className={`bg-gradient-to-t ${colorElement} to-zinc-800 rounded-t-lg  w-full h-80 flex items-center `}
            >
              <h1 className="text-8xl font-bold ml-5">{id[0]}</h1>
            </div>

            <div
              className={`bg-gradient-to-b ${colorElement} via-black to-zinc-800 w-full  `}
            >
              {/* <Song SongData={PlaylistData} /> */}

              <div className="ml-2  flex flex-wrap gap-4 z-10">
                {" "}
                {PlaylistData?.map((item) => (
                  <>
                    <div className=" cursor-pointer">
                      <div
                        className=""
                        onClick={() => router.push(`/playlist/${item?.id}`)}
                      >
                        <Image
                          src={item?.images[0]?.url}
                          alt="Cat Img"
                          className="rounded-lg"
                          width={205}
                          height={205}
                        />
                      </div>

                      <span className="text-xl mt-2 font-bold     ">
                        {item?.name.slice(0, 14)}
                        {item?.name.length > 14 ? "..." : ""}
                      </span>
                    </div>
                  </>
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
    </div>
  );
};

export default Genre;
