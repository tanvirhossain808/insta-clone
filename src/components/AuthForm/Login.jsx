import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    return (
        <>
            <Input placeholder="Email" size={"sm"} fontSize={14} type="email" value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
            <Input scrollMargin={"sm"} placeholder="Password" fontSize={14} type="password" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
            <Button w={'full'} colorScheme="blue" size={"sm"} fontSize={14} >
                Log in
            </Button>
        </>
    );
};

export default Login;