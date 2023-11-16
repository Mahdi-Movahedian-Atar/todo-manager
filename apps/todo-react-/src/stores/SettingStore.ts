import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SettingStore {
  loggedIn: boolean;
  darkMode: boolean;
  toggleLoggedIn: (value: boolean) => void;
  toggleDarkMode: (value: boolean) => void;
}

export const useSettingStore = create<SettingStore>()(
  persist(
    (set) => ({
      loggedIn: false,
      darkMode: true,
      toggleLoggedIn: (value: boolean) =>
        set((state) => ({ ...state, loggedIn: value })),
      toggleDarkMode: (value: boolean) =>
        set((state) => ({ ...state, darkMode: value })),
    }),
    { name: 'Setting_Store' }
  )
);
