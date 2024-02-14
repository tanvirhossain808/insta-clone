import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/useAuthStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firbase/firebase.config";
import usePostStore from "../store/usePostStore";

const usePostComment = () => {
    const [isCommenting, setIsCommenting] = useState(false);
    const showToast = useShowToast();
    const { user } = useAuthStore();
    const { addComment } = usePostStore();
    const handlePostComment = async (postId, comment) => {
        if (isCommenting) return;
        if (!user) return showToast("Error", "You need to login", "error");
        setIsCommenting(true);
        const newComment = {
            comment,
            createdAt: Date.now(),
            createdBy: user.uid,
            postId,
        }
        try {
            await updateDoc(doc(firestore, "posts", postId), {
                comments: arrayUnion(newComment)
            });
            addComment(postId, newComment);

        } catch (error) {
            showToast("Error", error.message, "error")
        }
        finally {
            setIsCommenting(false);
        }
    };
    return {
        isCommenting, handlePostComment
    }

};

export default usePostComment;