import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

const Signup = () => {
    const [inputs, setInputs] = useState({
        email: "",
        fullName: "",
        userName: "",
        password: "",
    });
    const [showPassword, setPassword] = useState(false);
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
            <Button w={'full'} colorScheme="blue" size={"sm"} fontSize={14}>
                Sign up
            </Button>

        </>
    );
};

export default Signup;