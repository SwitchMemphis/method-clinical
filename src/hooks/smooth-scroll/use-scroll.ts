import { create } from "zustand";

export interface UseScroll {
  isEnableScroll: boolean;
  start: () => void;
  stop: () => void;
}

export const useScroll = create<UseScroll>((set) => ({
  isEnableScroll: true,
  start: () => set({ isEnableScroll: true }),
  stop: () => set({ isEnableScroll: false }),
}));
