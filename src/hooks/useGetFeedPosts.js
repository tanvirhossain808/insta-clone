import { useEffect, useState } from "react";
import usePostStore from "../store/usePostStore";
import useAuthStore from "../store/useAuthStore";
import useShowToast from "./useShowToast";
import useProfileStore from "../store/useProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firbase/firebase.config";

const useGetFeedPosts = () => {
    const [isLoading, setIsloading] = useState(true);
    const { posts, setPosts } = usePostStore();
    const { user } = useAuthStore();
    const { setUserProfile } = useProfileStore();
    const showToast = useShowToast();

    useEffect(() => {
        const getFeedPosts = async () => {
            setIsloading(true);
            if (user.following.length === 0) {
                setIsloading(false);
                setPosts([]);
                return;
            }

            const q = query(collection(firestore, "posts"), where('createdBy', "in", user.following));

            try {
                const querySnapShot = await getDocs(q);
                const feedPosts = [];
                querySnapShot.forEach((doc) => {
                    feedPosts.push({ id: doc.id, ...doc.data() });
                })
                feedPosts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(feedPosts);
            } catch (error) {
                showToast("Error", error.message, "error")
            }
            finally {
                setIsloading(false)
            }
        };
        if (user) getFeedPosts();
    }, [user, showToast, setPosts, setUserProfile]);
    return { isLoading, posts };
};

export default useGetFeedPosts;