"use client";
import { signIn, SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import Player from "./Player/Player";
import { useRecoilValue } from "recoil";
import { SongIdAState } from "@/atom/Atom";

const SinginBtn = ({ item }) => {
  return (
    <>
      <div>
        <button
          className="text-white bg-slate-600 p-3 rounded-md m-2"
          onClick={() => {
            signIn(item.id, { callbackUrl: "/" });
          }}
        >
          Login with {item.name}
        </button>
      </div>
    </>
  );
};

export default SinginBtn;

export const SessionProviderTag = ({ children }) => {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  );
};

export const PlayerCLient = ({ children }) => {
  const id = useRecoilValue(SongIdAState);
  return <Player key={id}>{children}</Player>;
};
