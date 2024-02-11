import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firbase/firebase.config";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/useAuthStore";
import { doc, getDoc, setDoc } from "firebase/firestore";

const GoogleAuth = ({ prefix }) => {
    const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);
    const handleGoogleAuth = async () => {
        try {
            const newUser = await signInWithGoogle();
            if (!newUser && error) {
                showToast("Error", error.message, "error");
                return;
            }
            const useRef = doc(firestore, "users", newUser.user.uid);
            const userSnap = await getDoc(useRef);
            if (userSnap.exists()) {
                const userDoc = userSnap.data();
                localStorage.setItem("user-insta", JSON.stringify(userDoc));
                loginUser(userDoc);
                console.log('heyo')
            }
            else {
                const userDocument = {
                    uid: newUser.user.uid,
                    email: newUser.user.email,
                    userName: newUser.user.email.split("@")[0],
                    fullName: newUser.user.displayName,
                    bio: "",
                    profilePictureUrl: newUser.user.photoURL,
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),

                };
                console.log(newUser.user.uid)
                setDoc(doc(firestore, "users", newUser.user.uid), userDocument);
                localStorage.setItem("user-insta", JSON.stringify(userDocument));
                loginUser(userDocument);
            }
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }
    return (
        <Flex alignItems={'center'} justifyContent={'center'} cursor={"pointer"} onClick={handleGoogleAuth}>
            <Image src="/google.png" w={5} alt='Google logo'></Image>
            <Text mx={2} color={"blue.500"}>
                {prefix} with Google
            </Text>
        </Flex>
    );
};

export default GoogleAuth;