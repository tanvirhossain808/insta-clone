import { Avatar, Flex, Text } from "@chakra-ui/react";

const Comment = ({ createdAt, profilePic, userName, text }) => {
    return (
        <Flex gap={4}
        >
            <Avatar src={profilePic} name={userName} size={"sm"} />
            <Flex direction={"column"}>
                <Flex gap={2}>
                    <Text fontWeight={"bold"} fontSize={12}>
                        {userName}
                    </Text>
                    <Text fontSize={13}>
                        {text}
                    </Text>
                </Flex>
                <Text fontSize={10} color={"gray"}>
                    {createdAt}
                </Text>
            </Flex>
        </Flex >
    );
};

export default Comment;