import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from "../firbase/firebase.config";
import { doc, setDoc } from 'firebase/firestore';
import useShowToast from './useShowToast';

const useSignupWithEmailAndPassword = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    console.log(error);
    const showToast = useShowToast();
    const signup = async (inputs) => {
        if (!inputs.email || !inputs.password || !inputs.userName || !inputs.fullName) {
            // showToast("Error", "Please fill all the fields", "error")
            return;
        }
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser && error) {
                showToast("Error", error.message, "error")
                console.log('hey', error)
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
                console.log(newUser.user.uid)
                setDoc(doc(firestore, "users", newUser.user.uid), userDocument);
                localStorage.setItem("user-insta", JSON.stringify(userDocument));
                showToast("Success", "Account created", "success")
            }
        }
        catch (error) {
            showToast("Error", error.message, "error")
            console.log(error, loading, "erlo")
        }
    }
    return { loading, error, signup }


};

export default useSignupWithEmailAndPassword;