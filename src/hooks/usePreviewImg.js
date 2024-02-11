import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const showToast = useShowToast();
    const maxFileSizeInBytes = 1 * 1024 * 1024;
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {

            if (file.size > maxFileSizeInBytes) {
                showToast("Error", "File size must be less than 2MB", "error");
                return;
            }
            const render = new FileReader();
            render.onloadend = () => {
                setSelectedFile(render.result);

            }
            render.readAsDataURL(file);
        }
        else {
            showToast("Error", "Please select an image file", "error")
            setSelectedFile(null);
        }
    };
    return {
        selectedFile, setSelectedFile, handleImageChange
    }
};

export default usePreviewImg;