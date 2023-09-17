import { SongIdAState, IsPlayingState, UriTrackState } from "@/atom/Atom";
import USeCurrentTrack from "@/hooks/USeCurrentTrack";
import UseSpotify from "@/hooks/UseSpotify";
import { data } from "autoprefixer";
import axios from "axios";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Song = ({ SongData }) => {
  const router = useRouter();
  const [_, setIDforSong] = useRecoilState(SongIdAState);
  const [__, setIsPlaying] = useRecoilState(IsPlayingState);
  const [___, setUri] = useRecoilState(UriTrackState);
  const spotifyApi = UseSpotify();
  const { data: session, status } = useSession();

  const [a, seta] = useState(null);
  const asd = USeCurrentTrack();

  useEffect(() => {
    // seta(spotifyApi.getAccessToken());

    seta(spotifyApi.getAccessToken());

    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyDevices()
        .then((data) => console.log(data.body))
        .catch((e) => console.log(e));
    }
  }, [session, spotifyApi, SongData]);

  // useEffect(() => {
  //   // seta(spotifyApi.getAccessToken());

  //   // seta(spotifyApi.getAccessToken());
  //   if (spotifyApi.getAccessToken()) {
  //     spotifyApi
  //       .getMyDevices()
  //       .then((data) => console.log(data.body))
  //       .catch((e) => console.log(e));
  //   }
  // }, []);

  // console.log(asd, "aaaa");
  // console.log(___, "aaaa");
  const PlaySong = (i) => {
    // USeCurrentTrack({ i, a });
    setIDforSong(i.track.id);
    setUri(i?.track.uri);
    setIsPlaying(true);
  };

  // const playSong = useCallback(() => {});
  // const handleSubmit = useCallback((i) => {
  //   // if (spotifyApi.getAccessToken()) {
  //   console.log("777777777777777777777777777777777777777");

  //   if (spotifyApi.getMyDevices()) {
  //     console.log("777777777777777777777777777777777777777");
  //     spotifyApi.play({
  //       uris: [i.track.uri],
  //     });
  //   }
  //   // } else {
  //   // console.log(
  //   // "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  //   // );
  //   // }
  // }, []); // .

  // console.log(SongData);
  return (
    <div>
      <div className="flex flex-col">
        {SongData?.map((i, index) => (
          <div key={i?.track?.id}>
            <div className="py-2 hover:bg-slate-400 flex   px-2 rounded-lg">
              <div className="py-2 cursor-pointer">{index + 1}</div>
              <div>
                <div className="flex ml-5 w-72">
                  <div>
                    <Image
                      onClick={() => PlaySong(i)}
                      src={i?.track?.album?.images[0]?.url}
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
                      {i?.track?.name.slice(0, 30)}
                      {i?.track?.name.length >= 30 ? "..." : ""}
                    </div>
                    <div className="">
                      {i?.track?.artists?.map((artist, index) => {
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
                                index !== i?.track.artists.length - 1
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
                {i?.track?.album?.name.slice(0, 30)}{" "}
                {i?.track?.album?.name.length >= 30 ? "..." : ""}
              </div>
              <div className="text-center w-56">
                {/* {i?.added_at} */}
                {dayjs(i?.added_at).format("MMM DD, YYYY")}{" "}
              </div>
              <div className="w-40 text-right">
                {/* {i?.track.duration_ms}{" "} */}
                {dayjs(i?.track?.duration_ms).format("MM : s")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Song;
