import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";


const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    // const navigate = useNavigate();

    return (
        <>

            <Box border={"1px solid gray"} borderRadius={4} padding={3}>
                <VStack>
                    <Image src={'/logo.png'} h={24} cursor={"pointer"} alt="Instagram" />
                    {isLogin ? <Login /> : <Signup />}

                    <Flex alignItems={"center"} justifyContent={'center'} my={4} gap={1} w={"full"}>
                        <Box flex={2} h={'1px'} bg={"gray.400"}>

                        </Box>
                        <Text mx={1} color={'white'}>
                            OR
                        </Text>
                        <Box flex={2} h={'1px'} bg={"gray.400"}>
                        </Box>
                    </Flex>
                    <GoogleAuth></GoogleAuth>
                </VStack>
            </Box >
            <Box border={"1px solid gray"} borderRadius={4} padding={5}>
                <Flex alignItems={"center"} justifyContent={"center"}>
                    <Box mx={2} fontSize={14}>{isLogin ? "Don't have an account" : "Already have an account"}</Box>
                    <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
                        <Text>
                            {isLogin ? "Sign up" : "Log in"}
                        </Text>
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default AuthForm;