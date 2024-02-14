import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useProfileStore from "../../store/useProfileStore";
import { timeAgo } from "../../utlisties/timeAgo";

const Caption = ({ post }) => {
    const { userProfile } = useProfileStore();
    return (
        <Flex gap={4}
        >
            <Link to={`/${userProfile.userName}`}>
                <Avatar src={userProfile.profilePictureUrl} size={"sm"} /></Link>

            <Flex direction={"column"}>
                <Flex gap={2} alignItems={"center"}>
                    <Link to={`/${userProfile.userName}`}>
                        <Text fontWeight={"bold"} fontSize={12}>
                            {userProfile.userName}
                        </Text>
                    </Link >
                    <Text fontSize={13}>
                        {/* {text} */}
                        {post.caption}
                    </Text>
                </Flex>
                <Text fontSize={10} color={"gray"}>
                    {timeAgo(post.createdAt)}
                </Text>
            </Flex>
        </Flex >
    );
};

export default Caption;