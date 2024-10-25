import { atom } from "jotai";
import { LoginInfo } from "./lib/types";
import { atomWithStorage } from "jotai/utils";

export const userInfoAtom = atom<LoginInfo | null>(null);
export const tokenAtom = atomWithStorage<string | null>(`token`, null);
