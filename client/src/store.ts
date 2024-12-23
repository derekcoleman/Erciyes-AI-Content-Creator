import { atom } from "jotai";
import { LoginInfo, Settings } from "./lib/types";
import { atomWithStorage } from "jotai/utils";
import { getTheme } from "./lib/utils";

export const userInfoAtom = atom<LoginInfo | null>(null);
export const tokenAtom = atomWithStorage<string | null>(`token`, null);
export const themeAtom = atomWithStorage<"Light" | "Dark">("theme", getTheme());
export const settingsAtom = atom<Settings>({
  status: false,
  code: 0,
  message: "",
  topic: "",
  language: "",
  selectedInteractions: [],
  mood: "",
  customTopic: "",
  bannedWords: [],
  wantedWords: [],
  disabled: false,
});
