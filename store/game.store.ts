// games.store.ts
import axios from "redaxios";
import { create } from 'zustand';
import { IGame } from '../utils/interfaces'; // Assuming IGame interface exists

export interface GameState { // Define the GameState interface
  games: IGame[] | null;
  loading: boolean;
};

export interface Actions {
  fetchGames: () => Promise<void>;
}

const initialState: GameState = {
  games: null,
  loading: true,
}

const useGamesStore = create<GameState & Actions>()((set) => ({
  ...initialState,// Use GameState type

  fetchGames: async () => {
    try {
      const apiUrl = "https://operax-back.onrender.com/api/games";
      // const apiUrl = "http://localhost:8080/api/games";
      const response = await axios.get<IGame[]>(apiUrl);
      set({ games: response.data, loading: false });
    } catch (error) {
      console.error('Error fetching games:', error);
      // Handle errors appropriately, e.g., display an error message
    }
  },
}));

export default useGamesStore;
