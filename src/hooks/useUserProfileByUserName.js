import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firbase/firebase.config";
import useProfileStore from "../store/useProfileStore";

const useUserProfileByUserName = (userName) => {
    const [isLoading, setLoading] = useState(true);
    const showToast = useShowToast();
    const { userProfile, setUserProfile } = useProfileStore();
    // const userProfile = useProfileStore(state => state.userProfile);
    useEffect(() => {
        setLoading(true);
        const getUserProfile = async () => {
            try {
                const q = query(collection(firestore, "users"), where("userName", "==", userName));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) return setUserProfile(null);
                let userDoc;
                querySnapshot.forEach((doc) => {
                    userDoc = doc.data();
                });
                setUserProfile(userDoc);
            } catch (error) {
                showToast("Error", error.message, "error");
            }
            finally {
                setLoading(false)
            }
        };
        getUserProfile();
    }, [setUserProfile, userName, showToast]);
    return { isLoading, userProfile };
};

export default useUserProfileByUserName;