import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { SidebarPart } from "../components/SidebarPart/SidebarPart";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firbase/firebase.config";
import Navbar from "../components/Navbar/Navbar";

export const Layout = ({ children }) => {
    const { user: userIsLogin, loading, error } = useAuthState(auth);
    const { pathname } = useLocation();
    const canRenderSidebar = pathname !== "/auth" && userIsLogin;
    const canRenderNavbar = !userIsLogin && !loading && pathname !== "/auth";
    const checkingUserIsAuth = !userIsLogin && loading;
    if (checkingUserIsAuth) return <PageLayoutSpinner />

    return (
        <>
            <Flex flexDir={canRenderNavbar ? "column" : "row"}>
                {/* <Outlet /> */}

                {canRenderSidebar === '/auth' ? (<Box w={{ base: "70px", md: "240px" }}>
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