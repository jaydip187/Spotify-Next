// "use client";

import { atom } from "recoil";

export const SongIdAState = atom({
  key: "SongIdAState",
  default: null,
});
export const UriTrackState = atom({
  key: "UriTrackState",
  default: null,
});
export const IsPlayingState = atom({
  key: "IsPlayingState",
  default: false,
});
export const AccessTokenState = atom({
  key: "AccessTokenState",
  default: null,
});
