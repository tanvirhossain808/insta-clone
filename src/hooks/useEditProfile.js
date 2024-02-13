// import { getDatabase, ref, set } from "firebase/database";
// import useShowToast from "./useShowToast";
// import { firestore } from "../firbase/firebase.config";
// const useEditProfile = () => {
//     const showToast = useShowToast()
//     const updateUserProfileInfo = async (inputs, userId) => {
//         try {
//             const success = await set(ref(firestore, "users/", userId.uid), {
//                 fullName: inputs.fullName,
//                 userName: inputs.userName,
//                 bio: inputs.bio
//             });
//         } catch (error) {
//             showToast("Error", error.message, "error")
//         }

import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firbase/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import useProfileStore from "../store/useProfileStore";

//     }
//     // function writeUserData(userId, name, email, imageUrl) {
//     //     const db = getDatabase();
//     //     set(ref(db, 'users/' + userId), {
//     //         username: name,
//     //         email: email,
//     //         profile_picture: imageUrl
//     //     });
//     // }

//     return { updateUserProfileInfo }
// };

// export default useEditProfile;




const useEditProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const { user, setUser } = useAuthStore();
    const showToast = useShowToast();
    const { setUserProfile } = useProfileStore();


    const editProfile = async (inputs, selectedFile) => {
        if (isUpdating || !user) return;
        setIsUpdating(true);
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        const userDocRef = doc(firestore, "users", user.uid);
        let Url = "";
        try {
            if (selectedFile) {
                await uploadString(storageRef, selectedFile, 'data_url');
                Url = await getDownloadURL(storageRef)
            }
            const updatedUser = {
                ...user,
                fullName: inputs.fullName || user.userName,
                bio: inputs.bio || user.bio,
                userName: inputs.userName || user.userName,
                profilePictureUrl: Url || user.profilePictureUrl,
            };
            await updateDoc(userDocRef, updatedUser);
            localStorage.setItem("user-insta", JSON.stringify(updatedUser));
            setUser(updatedUser);
            setUserProfile(updatedUser);
            showToast("Success", "Profile update successfully", "success");
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }
    return { editProfile, isUpdating };


};

export default useEditProfile;