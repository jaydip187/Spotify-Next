"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const SearchPlaylist = ({ searchPlaylists }) => {
  const router = useRouter();
  return (
    <div>
      {" "}
      <div>
        {" "}
        <div className="mt-6 ml-5">
          <div className="text-2xl   font-bold">PlayLists</div>
          <div className="flex flex-wrap justify-start">
            {searchPlaylists?.map((item, index) => {
              if (index < 15) {
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
      </div>
    </div>
  );
};

export default SearchPlaylist;
