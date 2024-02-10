import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, CloseButton, Input, InputGroup, InputRightElement, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import useSignupWithEmailAndPassword from "../../hooks/useSignupWithEmailAndPassword";


const Signup = () => {
    const {
        isOpen: isVisible,
        onClose,
    } = useDisclosure({ defaultIsOpen: true })
    const [inputs, setInputs] = useState({
        email: "",
        fullName: "",
        userName: "",
        password: "",
    });
    const [showPassword, setPassword] = useState(false);
    const { loading, error, signup } = useSignupWithEmailAndPassword();
    console.log(error);
    // console.log(user)
    return (
        <>
            <Input placeholder="Email" size={"sm"} fontSize={14} type="email" value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />

            <Input placeholder="Full name" size={"sm"} fontSize={14} type="text" value={inputs.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} />

            <Input placeholder="User name" size={"sm"} fontSize={14} type="text" value={inputs.userName}
                onChange={(e) => setInputs({ ...inputs, userName: e.target.value })} />

            <InputGroup>
                <Input placeholder="Password" fontSize={14} type={showPassword ? "text" : "password"} size={"sm"} value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />

                <InputRightElement h="full">
                    <Button variant={"ghost"} size={"sm"} onClick={() => setPassword(!showPassword)}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>
            {error && <Alert status="error">
                <CloseButton
                    alignSelf='flex-start'
                    position='relative'
                    right={-1}
                    top={-1}
                    onClick={onClose}
                />
                <AlertIcon fontSize={12} />
                {error.message}
            </Alert>}
            <Button w={'full'} colorScheme="blue" size={"sm"} fontSize={14} onClick={() => signup(inputs)} isLoading={loading}>
                Sign up
            </Button>

        </>
    );
};

export default Signup;