import { create } from "zustand";
const usePostStore = create(set => (
    {
        posts: [],
        createPost: (post) => set(state => ({ posts: [post, ...state.posts] })),
        setPosts: (posts) => set({ posts }),
        deletePost: (id) => set(state => ({ posts: state.posts.filter(delPost => delPost.id !== id) })),
        addComment: (postId, newComment) => set(state => ({
            posts: state.posts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        comments: [...post.comments, newComment]
                    }
                }
                return post;
            })
        }))
    }
));

export default usePostStore;