"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useParams, useRouter } from "next/navigation";
import UseSpotify from "@/hooks/UseSpotify";
import Image from "next/image";
import PlaylistScreen from "./PlaylistScreen";
import TrackScreen from "./TrackScreen";
import FollowAndPlaylist from "./FollowAndPlaylist";

const TrackMainScreen = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams();
  const spotifyApi = UseSpotify();
  //   console.log(spotifyApi.getAccessToken());
  //   console.log(id);
  let a = [];
  const [TrackData, setTrackData] = useState(null);
  const [owner, setOwner] = useState(null);
  //   a = TrackData?.artists;
  let ArtistIds = null;
  ArtistIds = TrackData?.artists.filter((i) => {
    a.push(i?.id);
    return i.id;
  });
  //   console.log(TrackData);
  //   console.log(typeof TrackData?.artists, "7410");
  //   console.log(a?.join(","), "Owner");

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getTrack(id)
        .then((data) => setTrackData(data.body))
        .catch((e) => console.log(e));
    }
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getArtist(TrackData?.artists[0]?.id)
        .then((data) => setOwner(data.body))
        .catch((e) => console.log(e));
    }
  }, [pathname, id, TrackData]);

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

  return (
    <>
      {!false ? (
        <>
          {" "}
          <div className="mx-2 h-[680px] mt-1 w-[1120px] bg-gradient-to-t ${colorElement} to-zinc-800 rounded-lg overflow-scroll text-white scrollbar  scrollbar-thumb-[#232323] scrollbar-track-transparent scrollbar-h-6 overflow-x-hidden  ">
            <div
              className={`bg-gradient-to-t ${colorElement} to-zinc-800 rounded-t-lg  w-full h-80 flex items-end  `}
            >
              <div>
                <Image
                  className=" ml-6 mb-4"
                  src={TrackData?.album.images[0]?.url}
                  alt="Playlisst Img "
                  height={200}
                  width={200}
                />
              </div>
              <div className="m-4 text-white">
                <div className=" mr-4 mb-8 font-bold">Song</div>
                <div className=" mr-4 mb-2 text-3xl font-bold">
                  {TrackData?.name}
                </div>
                {/* <div className=" mb-2 mr-4">{playlistData?.description}</div> */}
                <div className="flex items-center font-semibold">
                  <div>
                    {owner && (
                      <Image
                        className="rounded-full"
                        src={owner?.images[0]?.url}
                        alt="Playlist Owner"
                        width={35}
                        decoding="async"
                        height={35}
                      />
                    )}
                  </div>
                  <span
                    className="mx-2 ml-3 cursor-pointer font-bold text-sm "
                    onClick={() => router.push(`/artist/${owner.id}`)}
                  >
                    {owner?.name}{" "}
                  </span>
                  <span
                    className="text-sm mx-2 cursor-pointer font-bold "
                    onClick={() => router.push(`/album/${TrackData?.album.id}`)}
                  >
                    {TrackData?.album.name}
                  </span>
                  <span className="text-sm mx-2">
                    {TrackData?.album.release_date}
                  </span>
                  <span className="text-sm mx-2">{TrackData?.duration_ms}</span>
                </div>
              </div>
            </div>

            {/* ======================================================================================================== */}
            {ArtistIds ? (
              <>
                {" "}
                <div
                  className={`bg-gradient-to-b ${colorElement} via-black to-zinc-800 w-full  `}
                >
                  <FollowAndPlaylist />
                  <TrackScreen id={a} />
                </div>
              </>
            ) : (
              <>
                {" "}
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

export default TrackMainScreen;
