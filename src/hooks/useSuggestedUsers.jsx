import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firbase/firebase.config";

const useSuggestedUsers = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const { user } = useAuthStore();
    const showToast = useShowToast();
    useEffect(() => {
        setIsLoading(true)
        const getSuggestedUser = async () => {
            try {
                const userRef = collection(firestore, "users");
                const q = query(
                    userRef,
                    where("uid", "not-in", [user.uid, ...user.following]),
                    orderBy("uid"),
                    limit(3)
                )
                const querySnapShot = await getDocs(q);
                const getUser = [];
                querySnapShot.forEach(doc => {
                    getUser.push(doc.data({ ...doc.data, id: doc.id }));
                });
                setSuggestedUsers(getUser);
                console.log(getUser);
            } catch (error) {
                showToast("Error", error.message, "error");
            }
            finally {
                setIsLoading(false);
            }
        };
        if (user) getSuggestedUser();
    }, [user, showToast]);
    return { isLoading, suggestedUsers };

};

export default useSuggestedUsers;