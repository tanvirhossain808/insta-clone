import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useProfileStore from "../store/useProfileStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firbase/firebase.config";

const useFollowUnFollow = (userId) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const { user, setUser } = useAuthStore();
    const { userProfile, setUserProfile } = useProfileStore();
    const showToast = useShowToast();
    const handleFollowUnfollow = async () => {
        setIsUpdating(true);
        console.log(userProfile, 'followerss');
        try {
            const currentUserRef = doc(firestore, "users", user.uid);
            const userToFollowOrUnfollowRef = doc(firestore, "users", userId);
            await updateDoc(currentUserRef, {
                following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
            });
            await updateDoc(userToFollowOrUnfollowRef, {
                followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid)
            });
            if (isFollowing) {
                setUser(
                    {
                        ...user,
                        following: user.following.filter(uid => uid !== userId)
                    }
                );
                setUserProfile(
                    {
                        ...userProfile,
                        followers: userProfile.followers.filter(uid => uid !== user.uid)
                    }
                )
                // console.log(userProfile.followers, 'j');
                localStorage.setItem("user-insta", JSON.stringify({

                    ...user,
                    following: user.following.filter(uid => uid !== userId)

                }));
                setIsFollowing(false);
            }

            else {
                setUser(
                    {
                        ...user,
                        following: [...user.following, userId]
                    }
                );
                setUserProfile(
                    {
                        ...userProfile,
                        followers: [...userProfile.followers, user.uid]
                    }
                );
                localStorage.setItem('user-insta', JSON.stringify({

                    ...user,
                    following: [...user.following, userId]

                }));
                setIsFollowing(true);
            }
        } catch (error) {
            showToast("Error", error.message, "error");
            console.log(error);

        }
        finally {
            setIsUpdating(false)
        }
    }
    useEffect(() => {
        if (user) {
            const isFollowing = user.following.includes(userId);
            setIsFollowing(isFollowing);
        }

    }, [user, userId]);
    return { isUpdating, isFollowing, handleFollowUnfollow };
};

export default useFollowUnFollow;