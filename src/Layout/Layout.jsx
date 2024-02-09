import { Box, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { SidebarPart } from "../components/SidebarPart/SidebarPart";

export const Layout = ({ children }) => {
    const { pathname } = useLocation();
    return (
        <>
            <Flex>
                {/* <Outlet /> */}

                {pathname !== '/auth' ? (<Box w={{ base: "70px", md: "240px" }}>
                    <SidebarPart />
                </Box>) : null}


                <Box flex={1} width={{ base: "calc(100%-70px)", md: "calc(100%-240px)" }}>
                    {children}
                </Box>
            </Flex>

        </>
    )
}