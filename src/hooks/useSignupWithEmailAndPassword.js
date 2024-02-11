import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from "../firbase/firebase.config";
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import useShowToast from './useShowToast';
import useAuthStore from '../store/useAuthStore';
export let loginUser;
const useSignupWithEmailAndPassword = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore(state => state.login);
    const signup = async (inputs) => {
        if (!inputs.email || !inputs.password || !inputs.userName || !inputs.fullName) {
            showToast("Error", "Please fill all the fields", "error")
            return;
        }
        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("userName", "==", inputs.userName));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            showToast("Error", "userName already exists", "error");
            return;
        }
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser && error) {
                showToast("Error", error.message, "error")
                return;
            }
            if (newUser) {
                const userDocument = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    userName: inputs.userName,
                    fullName: inputs.fullName,
                    bio: "",
                    profilePictureUrl: "",
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),

                };
                setDoc(doc(firestore, "users", newUser.user.uid), userDocument);
                localStorage.setItem("user-insta", JSON.stringify(userDocument));
                loginUser(userDocument);
                showToast("Success", "Account created", "success")
            }
        }
        catch (error) {
            showToast("Error", error.message, "error")
        }
    }
    return { loading, error, signup }


};

export default useSignupWithEmailAndPassword;