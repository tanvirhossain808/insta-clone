import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firbase/firebase.config";
import useShowToast from "./useShowToast";

const useLogout = () => {
    const [signOut, loading, error] = useSignOut(auth);
    const showToast = useShowToast();
    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.removeItem('user-insta');
            console.log('log out')
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }
    return { handleLogout, loading, error }
};

export default useLogout;