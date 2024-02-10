import { Avatar, Box, Button, Flex, Link, Tooltip } from "@chakra-ui/react"
import { NavLink, Link as routerLink } from "react-router-dom"
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, NotificationsLogo, SearchLogo } from "../../assets/contants";
import { AiFillHome } from "react-icons/ai"
import { BiLogOut } from "react-icons/bi"
import useLogout from "../../hooks/useLogout";

export const SidebarPart = () => {
    const { handleLogout, loading, error } = useLogout();
    const sidebarItems = [
        {
            icon: <AiFillHome size={25} />,
            text: "Home",
            link: "/"
        },
        {
            icon: <SearchLogo />,
            text: "Search"
        },
        {
            icon: <NotificationsLogo />,
            text: "Notifications"
        },
        {
            icon: <CreatePostLogo />,
            text: "Create"
        },
        {
            icon: <Avatar size={'sm'} name="Burak Orkmez" src="/profilepic.png" />,
            text: "Profile",
            link: "asaprogrammer"

        }

    ]
    return (

        <Box height={"100vh"}
            borderRight={"1px solid"}
            borderColor={"whiteAlpha.300"}
            py={8} position={"sticky"}
            top={0} left={0}
            px={{ base: 2, md: 4 }}>
            <Flex direction={'column'}
                gap={10} w={'full'}
                height={'full'}>
                <Link to={'/'} as={NavLink}
                    pl={2}
                    display={{ base: "none", md: "block" }}
                    cursor={"pointer"}>
                    <InstagramLogo />
                </Link>
                <Link to={'/'}
                    as={NavLink}
                    p={2}
                    display={{ base: "block" }}
                    cursor={"pointer"}
                    borderRadius={6}
                    _hover={{ bg: "whiteAlpha.200" }}
                    w={10}
                > <InstagramMobileLogo />
                </Link>
                <Flex
                    direction={"column"}
                    gap={5} cursor={'pointer'}>
                    {sidebarItems.map((item, index) => (
                        <Tooltip key={index} hasArrow
                            label={item.text}
                            placement="right"
                            ml={1}
                            openDelay={300}
                            display={{ base: 'block', md: "none" }}>
                            <Link display={'flex'}
                                to={item.link || null}
                                as={routerLink}
                                alignItems={'center'}
                                gap={4}
                                _hover={{ bg: "whiteAlpha.400" }}
                                borderRadius={6}
                                p={2}
                                w={{ base: "10", md: "full" }}
                                justifyContent={{ base: "center", md: "flex-start" }}
                            >
                                {item.icon}
                                <Box display={{ base: "none", md: "block" }}>
                                    {item.text}
                                </Box>
                            </Link>

                        </Tooltip>
                    ))}
                </Flex>
                <Tooltip
                    hasArrow
                    label={"Log out"}
                    placement="right"
                    ml={1}
                    openDelay={300}
                    display={{ base: 'block', md: "none" }}>
                    <Flex
                        onClick={handleLogout}
                        alignItems={'center'}
                        gap={4}
                        _hover={{ bg: "whiteAlpha.400" }}
                        borderRadius={6}
                        p={2}
                        w={{ base: "10", md: "full" }}
                        justifyContent={{ base: "center", md: "flex-start" }}
                        mt={"auto"}
                    >
                        <BiLogOut size={25}></BiLogOut>
                        <Button display={{ base: "none", md: "block" }}
                            variant={"ghost"}
                            _hover={{ bg: "transparent" }}
                            isLoading={loading}
                        >
                            Log out
                        </Button>
                    </Flex>

                </Tooltip>
            </Flex>
        </Box>
    )
}