import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { firestore } from "../firbase/firebase.config";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../store/usePostStore";

const useLikeUnlikePost = (post) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const { user } = useAuthStore();
    const { posts, removeLikes } = usePostStore();
    console.log(posts, 'hey');
    const [likes, setLikes] = useState(post?.likes.length);
    const [isLiked, setIsLiked] = useState(post?.likes.includes(user?.uid));
    const showToast = useShowToast();
    const handleLikedPost = async () => {
        if (isUpdating) return;
        if (!user) return showToast("Error", "You must be login in to like a post", "error");
        setIsUpdating(true);
        try {

            const postRef = doc(firestore, "posts", post.id);
            await updateDoc(postRef, {
                likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid)
            });
            setIsLiked(!isLiked);
            isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
            isLiked && removeLikes(user.uid)
        } catch (error) {
            showToast("Error", error.message, "error")
        }
        finally {
            setIsUpdating(false)
        }
    };
    return { isUpdating, likes, isLiked, handleLikedPost }
};

export default useLikeUnlikePost;