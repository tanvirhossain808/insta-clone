import { Box, Button, Flex, Image, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";


const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <>

            <Box border={"1px solid gray"} borderRadius={4} padding={3}>
                <VStack>
                    <Image src={'/logo.png'} h={24} cursor={"pointer"} alt="Instagram" />
                    <Input placeholder="Email" fontSize={14} type="email" />
                    <Input placeholder="Password" fontSize={14} type="password" />
                    {
                        !isLogin && <Input placeholder="Confirm password" type="password"></Input>
                    }
                    <Button w={'full'} colorScheme="blue" size={"sm"} fontSize={14}>
                        {isLogin ? "Log in" : "Sign up"}
                    </Button>
                    <Flex alignItems={"center"} justifyContent={'center'} my={4} gap={1} w={"full"}>
                        <Box flex={2} h={'1px'} bg={"gray.400"}>

                        </Box>
                        <Text mx={1} color={'white'}>
                            OR
                        </Text>
                        <Box flex={2} h={'1px'} bg={"gray.400"}>
                        </Box>
                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'center'} cursor={"pointer"}>
                        <Image src="/google.png" w={5} alt='Google logo'></Image>
                        <Text mx={2} color={"blue.500"}>
                            Log in with Google
                        </Text>
                    </Flex>
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