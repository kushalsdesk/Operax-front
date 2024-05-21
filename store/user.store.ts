import { create } from "zustand";

export interface IUser {
  firstName: string;
  avatarImg: string;
  emailId: string;
}
export interface InitialState {
  isLoggedIn: Boolean;
  user: IUser | null;
}

export interface Actions {
  loginStatus: (user: IUser | null) => void;
  logoutStatus: () => void;
}

const initialState: InitialState = {
  isLoggedIn: false,
  user: null,
};

const useUserStore = create<InitialState & Actions>()((set) => ({
  ...initialState,
  loginStatus: (user) => set((state) => ({
    isLoggedIn: true,
    user: user,
  })),
  logoutStatus: () => set((state) => ({
    isLoggedIn: false,
    user: null,
  })),
}));

export default useUserStore;
