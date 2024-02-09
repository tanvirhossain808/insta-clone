import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthPage = () => {
    return (
        <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
            <Container maxW={"container.md"} padding={0}>
                <Flex justifyContent={'center'} gap={10} alignItems={'center'}>
                    <Box display={{ base: "none", md: "block" }}>
                        <Image src="/auth.png" h={650} alt="Phone img"></Image>
                    </Box>
                    <VStack spacing={4} align={'stretch'}>
                        <AuthForm />
                        <Box textAlign={"center"}>get the app</Box>
                        <Flex gap={5} justifyContent={"center"}>
                            <Image src="/playstore.png" h={10} alt="Playstore logo"></Image>
                            <Image src="/microsoft.png" h={10} alt="Playstore logo"></Image>
                        </Flex>

                    </VStack>
                </Flex>
                {/* <h1>This is for the auth page</h1> */}


            </Container>
        </Flex>
    );
};

export default AuthPage;