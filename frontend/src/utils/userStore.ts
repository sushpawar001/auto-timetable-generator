import { create } from "zustand";

interface UserStore {
    userId: string | null;
    setUserId: (userId: string) => void;
    logout: () => void;
}

const userUserStore = create<UserStore>()((set) => ({
    userId: null,
    setUserId: (userId: string) => {
        console.log("setUserId", userId);
        set({ userId })
    },
    logout: () => set({ userId: null }),
}));

export default userUserStore;
