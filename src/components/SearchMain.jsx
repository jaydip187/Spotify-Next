"use client";

import UseSpotify from "@/hooks/UseSpotify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import SerachFun from "./SerachFun";

const SearchMain = () => {
  const spotifyApi = UseSpotify();
  const [Categories, setCategories] = useState(null);
  const [query, setQuery] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getCategories({
          limit: 40,
          offset: 0,
          country: "IN",
          // locale: 'sv_SE'
        })
        .then((data) => setCategories(data?.body?.categories?.items))
        .catch((e) => console.log(e));

      //   console.log("7410857474777");
    }
    // console.log("741085207410");
  }, []);

  //   console.log(Categories, "CAwertydfghqwertyui");
  return (
    <div className=" mx-2 h-[680px] mt-1 w-[1120px]   bg-[#121212] border-[#121212] rounded-lg overflow-scroll text-white scrollbar  scrollbar-thumb-[#232323] scrollbar-track-transparent scrollbar-h-6 overflow-x-hidden ">
      <div>
        <div className="ml-16 mt-3 flex w-80 items-center bg-[#242424] rounded-lg">
          <span className="px-1">
            {" "}
            <FiSearch />
          </span>
          <input
            type="text"
            onChange={(e) => {
              setQuery(e.target.value);
              //   router.push(`/search/${query}`);
            }}
            className="py-2 w-72 ml-2 bg-[#242424] focus:border-0 "
            placeholder="What do you want to listen to?"
            name="query"
            id=""
          />
        </div>

        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        {query.length > 0 ? (
          <>
            <SerachFun query={query} key={query} />
          </>
        ) : (
          <>
            {" "}
            <div className="mt-2 flex flex-wrap gap-4 z-10" key={query}>
              {Categories?.map((item) => (
                <>
                  <div className="relative cursor-pointer">
                    <div
                      className="z-10 relative"
                      onClick={() => router.push(`/genre/${item?.name}`)}
                    >
                      <Image
                        src={item?.icons[0]?.url}
                        alt="Cat Img"
                        className="rounded-lg"
                        width={205}
                        height={205}
                      />
                    </div>

                    <span className="text-2xl font-bold z-20 top-2 px-2 absolute">
                      {item?.name}
                    </span>
                  </div>
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchMain;
