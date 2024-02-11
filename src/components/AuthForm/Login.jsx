import { Alert, AlertIcon, Button, CloseButton, Input } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const { loading, error, login } = useLogin();
    console.log(error);
    return (
        <>
            <Input placeholder="Email" size={"sm"} fontSize={14} type="email" value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
            <Input scrollMargin={"sm"} placeholder="Password" fontSize={14} type="password" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
            {error && <Alert status="error">
                <CloseButton
                    alignSelf='flex-start'
                    position='relative'
                    right={-1}
                    top={-1}
                    onClick={onclose}
                />
                <AlertIcon fontSize={12} />
                {error.message}
            </Alert>}
            <Button w={'full'} colorScheme="blue" size={"sm"} fontSize={14} onClick={() => login(inputs)}>
                Log in
            </Button>
        </>
    );
};

export default Login;