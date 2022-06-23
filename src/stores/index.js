import create from 'zustand';

export const userStore = create(set => ({
    user: null,
    storeUser: (user) => set({ user: user }),
    storeToken: (token) => set({ token: token }),
    removeUser: () => set({ user: null }),
}))