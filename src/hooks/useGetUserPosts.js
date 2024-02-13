import { useEffect, useState } from "react";
import usePostStore from "../store/usePostStore";
import useShowToast from "./useShowToast";
import useProfileStore from "../store/useProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firbase/firebase.config";

const useGetUserPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();
    const { posts, setPosts } = usePostStore();
    const { userProfile } = useProfileStore();
    useEffect(() => {
        const getPosts = async () => {
            if (!userProfile) return true;
            setIsLoading(true);
            setPosts([]);
            try {
                const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));

                const querySnapshot = await getDocs(q);

                const posts = [];
                querySnapshot.forEach(doc => {
                    posts.push({ ...doc.data(), id: doc.id });
                });
                posts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(posts);

            } catch (error) {
                showToast("Error", error.message, "error");
                setPosts([]);
            }
            finally {
                setIsLoading(false);
            }
        }
        getPosts();
    }, [setPosts, userProfile, showToast]);
    return { isLoading, posts }
};

export default useGetUserPosts;