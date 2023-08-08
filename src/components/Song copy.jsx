import { SongIdAState, IsPlayingState } from "@/atom/Atom";
import UseSpotify from "@/hooks/UseSpotify";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useRecoilState } from "recoil";

const SongCopy = ({ SongData }) => {
  const router = useRouter();
  const [_, setIDforSong] = useRecoilState(SongIdAState);
  const [__, setIsPlaying] = useRecoilState(IsPlayingState);
  const spotifyApi = UseSpotify();

  const PlaySong = (i) => {
    console.log(i?.album?.uri);

    if (spotifyApi.getAccessToken()) {
      spotifyApi.play({
        uris: [i?.album?.uri],
      });
    }
    setIDforSong(i?.track.id);
    setIsPlaying(true);
  };

  //   console.log(SongData);
  return (
    <div>
      <div className="flex flex-col">
        {SongData.map((i, index) => (
          <div key={i?.album?.id}>
            <div className="py-2 hover:bg-slate-400 flex   px-2 rounded-lg">
              <div className="py-2 cursor-pointer" onClick={() => PlaySong(i)}>
                {index + 1}
                {/* {console.log(i?.album?.album?.images[0]?.url)} */}
              </div>
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
                        router.push(`/track/${i?.track.id}`);
                      }}
                    >
                      {i?.album?.name.slice(0, 30)}
                      {i?.album?.name.length >= 30 ? "..." : ""}
                    </div>
                    <div className="">
                      {i?.album?.artists?.map((artist, index) => {
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
                                {index == 2 ||
                                index !== i?.track?.artists?.length - 1
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
              <div className="w-80">
                {i?.album?.album?.name.slice(0, 30)}{" "}
                {i?.album?.album?.name.length >= 30 ? "..." : ""}
              </div>
              <div className="text-center w-56">
                {/* {i?.added_at} */}
                {dayjs(i?.album?.added_at).format(" ")}{" "}
              </div>
              <div className="w-40 text-right">
                {/* {i?.track.duration_ms}{" "} */}
                {dayjs(i?.duration_ms).format("MM : ss")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongCopy;
