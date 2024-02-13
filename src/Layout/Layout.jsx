import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { SidebarPart } from "../components/SidebarPart/SidebarPart";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firbase/firebase.config";
import Navbar from "../components/Navbar/Navbar";
import useProfileStore from "../store/useProfileStore";

export const Layout = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const { userProfile } = useProfileStore();
    console.log(userProfile?.posts.length, "dlkj");
    const { pathname } = useLocation();
    const canRenderSidebar = pathname !== "/auth" && user;
    const canRenderNavbar = !user && !loading && pathname !== "/auth";
    const checkingUserIsAuth = !user && loading;
    // const canRenderSidebar = pathname !== "/auth" && user;
    // const canRenderNavbar = !user && !loading && pathname !== "/auth";
    if (checkingUserIsAuth) return <PageLayoutSpinner />;



    return (
        <>
            <Flex flexDir={canRenderNavbar ? "column" : "row"}>
                {canRenderSidebar ? (<Box w={{ base: "70px", md: "240px" }}>
                    <SidebarPart />
                </Box>) : null}
                {canRenderNavbar && <Navbar></Navbar>}

                <Box flex={1} width={{ base: "calc(100%-70px)", md: "calc(100%-240px)" }} mx={"auto"}>
                    {children}
                </Box>
            </Flex>

        </>
    )
}
const PageLayoutSpinner = () => {
    return (
        <Flex flexDir={"column"} h={"100vh"} alignItems={"center"} justifyContent={"center"}>
            <Spinner size={"xl"}></Spinner>
        </Flex>
    )
}