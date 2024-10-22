import { atom } from "jotai";
import { UserInfo } from "./lib/types";

export const userInfoAtom = atom<UserInfo | null>(null);
