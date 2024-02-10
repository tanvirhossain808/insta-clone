import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firbase/firebase.config";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/useAuthStore";

const useLogout = () => {
    const [signOut, loading, error] = useSignOut(auth);
    const showToast = useShowToast();
    const logoutUser = useAuthStore(state => state.logout)
    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.removeItem('user-insta');
            logoutUser()
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }
    return { handleLogout, loading, error }
};

export default useLogout;