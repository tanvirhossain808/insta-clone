import { create } from "zustand"
const useProfileStore = create((set) => ({
    userProfile: null,
    setUserProfile: (userProfile) => set({ userProfile }),
    deleteprofilePost: (postId) => set((state) => ({
        userProfile: {
            ...state.userProfile,
            posts: [...state.userProfile.posts.filter((id) => id !== postId)]
        }
    })),
    addPost: (post) => set(state => ({
        userProfile: { ...state.userProfile, posts: [post.id, ...state.userProfile.posts] },

    }))
}))
export default useProfileStore;