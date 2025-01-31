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
  sub_topic: "",
  bannedWords: [],
  wantedWords: [],
  disabled: false,
  gundem: false,
});
export const gundemAtom = atom<boolean>(
  JSON.parse(localStorage.getItem("gundemAtom") || "false")
);

// Use the atom and sync with localStorage on changes
export const gundemAtomPersisted = atom(
  (get) => get(gundemAtom),
  (get, set, update) => {
    set(gundemAtom, update);
    localStorage.setItem("gundemAtom", JSON.stringify(update)); // Persist the updated value
  }
);
