"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const SearchSong = ({ searchSongs }) => {
  const router = useRouter();
  return (
    <div>
      <div>
        <div className="flex flex-col text-sm">
          {searchSongs?.map((i, index) => (
            <div key={i?.id}>
              <div className="py-2 hover:bg-slate-400 flex justify-between  px-2 rounded-lg">
                <div>
                  <div className="flex ml-5 w-72">
                    <div>
                      <Image
                        onClick={() => PlaySong(i)}
                        src={i?.album?.images[0]?.url}
                        alt="Song Img"
                        height={40}
                        width={40}
                        className="cursor-pointer"
                      />

                      {/* {GetSongDtails(i?.track.id)} */}
                    </div>
                    <div className="ml-4">
                      <div
                        className="font-bold cursor-pointer hover:border-b-2 border-white"
                        onClick={() => {
                          router.push(`/track/${i?.id}`);
                        }}
                      >
                        {i?.name.slice(0, 30)}
                        {i?.name.length >= 30 ? "..." : ""}
                      </div>
                      <div className="">
                        {i?.artists?.map((artist, index) => {
                          if (index < 3)
                            return (
                              <>
                                <span
                                  key={artist.id}
                                  className="cursor-pointer hover:border-b-2 border-white"
                                  onClick={() =>
                                    router.push(`/artist/${artist.id}`)
                                  }
                                >
                                  {" "}
                                  {artist?.name}
                                  {index == 2 || index !== i?.artists.length - 1
                                    ? ","
                                    : ""}
                                </span>
                              </>
                            );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-40 text-right">
                  {/* {i?.track.duration_ms}{" "} */}
                  {dayjs(i?.duration_ms).format("MM : s")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSong;
