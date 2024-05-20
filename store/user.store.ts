import { create } from "zustand";

export interface User {
  firstName: string;
  photoUrl: string;
}
export interface InitialState {
  isLoggedIn: Boolean;
  user: User | null;
}

export interface Actions {
  loginStatus: (user: User | null) => void;
  logoutStatus: () => void;
}

const initialState: InitialState = {
  isLoggedIn: true,
  user: null,
};

export const useUserStore = create<InitialState & Actions>()((set) => ({
  ...initialState,
  loginStatus: (user) => set((state) => ({
    ...state,
    isLoggedIn: true,
    user: user,
  })),
  logoutStatus: () => set((state) => ({
    ...state,
    isLoggedIn: false,
    user: null,
  })),
}));

