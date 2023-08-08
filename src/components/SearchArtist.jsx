import Image from "next/image";
import React from "react";

const SearchArtist = ({ searchArtists }) => {
  return (
    <div>
      {" "}
      <div>
        <div className="my-6 ml-5">
          <div className="text-2xl   font-bold">Artist</div>
          <div className="flex flex-wrap justify-start">
            {searchArtists?.map((item, index) => {
              if (index < 15) {
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
      </div>
    </div>
  );
};

export default SearchArtist;
