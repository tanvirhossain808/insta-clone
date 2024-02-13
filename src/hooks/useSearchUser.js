import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firbase/firebase.config";
import useProfileStore from "../store/useProfileStore";

const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const { setUserProfile } = useProfileStore();
    const showToast = useShowToast();
    const getUserProfile = async (userName) => {

        setIsLoading(true)
        setUser(null);
        try {
            const q = query(collection(firestore, "users"), where("userName", "==", userName));
            const querySnapShot = await getDocs(q);
            if (querySnapShot.empty) return showToast("Error", "User not found", "error");
            querySnapShot.forEach((doc) => {
                setUser(doc.data());
                setUserProfile(doc.data());
            })
        } catch (error) {
            showToast("Error", error.message, "error")
        }
        finally {
            setIsLoading(false)
        }
    };
    return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;