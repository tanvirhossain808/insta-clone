import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/useAuthStore";
import { Link } from "react-router-dom";

const SuggestedHeader = () => {
    const { handleLogout, isLoginout } = useLogout();
    const authUser = useAuthStore(state => state.user);
    console.log(authUser, 'authUser');
    if (authUser === null) return null
    return (
        <Flex justifyContent={'space-between'} alignItems={'center'} w={"full"}>

            <Flex alignItems={'center'} gap={2}>

                <Link to={`${authUser.userName}`}>
                    <Avatar size={"lg"} src={authUser.profilePictureUrl} />
                </Link>

                <Link to={`${authUser.userName}`}>
                    <Text fontSize={12} fontWeight={"bold"}>
                        {authUser.userName}
                    </Text>
                </Link>

            </Flex>
            <Button
                fontSize={14}
                background={"transparent"}
                _hover={{ background: "transparent" }}
                fontWeight={'medium'}
                color={"blue.400"}
                isLoading={isLoginout}
                onClick={handleLogout}
                cursor={"cursor"}
            >
                Log out
            </Button>
        </Flex>
    );
};

export default SuggestedHeader;