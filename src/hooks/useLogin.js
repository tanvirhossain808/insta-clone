import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToast from "./useShowToast";
import { auth, firestore } from "../firbase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/useAuthStore";

const useLogin = () => {
    const showToast = useShowToast();
    const [singInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore((state) => state.login);
    const login = async (inputs) => {
        try {
            const userCred = await singInWithEmailAndPassword(inputs.email, inputs.password);
            if (userCred) {
                const docRef = doc(firestore, "users", userCred.user.uid);
                const docSnap = await getDoc(docRef);
                localStorage.setItem('user-insta', JSON.stringify(docSnap.data()));
                loginUser(docSnap.data());
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };
    return { loading, error, login }

};

export default useLogin;