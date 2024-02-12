import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firbase/firebase.config";

const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const showToast = useShowToast();
    const getUserProfile = async (userName) => {
        setIsLoading(true)
        try {
            const q = query(collection(firestore, "users"), where("userName", "==", userName));
            const querySnapShot = await getDocs(q);
            if (querySnapShot.empty) return showToast("Error", "User not found", "error");
            querySnapShot.forEach((doc) => {
                setUser(doc.data())
            })
        } catch (error) {
            showToast("Error", error.message, "error")
        }
        finally {
            setIsLoading(false)
        }
    };
    return { isLoading, getUserProfile, user };
};

export default useSearchUser;