import { Box, Flex, Tooltip, Link } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { Link as routerLink } from "react-router-dom";

const SidebarHome = () => {
    return (
        <Tooltip
            hasArrow
            label={"Home"}
            placement="right"
            ml={1}
            openDelay={300}
            display={{ base: 'block', md: "none" }}>
            <Link display={'flex'}
                to={"/"}
                as={routerLink}
                alignItems={'center'}
                gap={4}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                p={2}
                w={{ base: "10", md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
            >
                <AiFillHome size={25} />
                <Box display={{ base: "none", md: "block" }}>
                    Home
                </Box>
            </Link>

        </Tooltip>
    );
};

export default SidebarHome;