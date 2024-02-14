import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utlisties/timeAgo";

const Comment = ({ comment }) => {
    // console.log(comment, 'comment');
    const { isLoading, userProfile, setUserProfile } = useGetUserProfileById(comment.createdBy);

    if (isLoading) return <CommentSkeleton />
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
                        {comment.comment}
                    </Text>
                </Flex>
                <Text fontSize={10} color={"gray"}>
                    {timeAgo(comment.createdAt)}
                </Text>
            </Flex>
        </Flex >
    );
};

export default Comment;
const CommentSkeleton = () => {
    return (
        <Flex gap={4} w={"full"} alignItems={"center"}>
            <SkeletonCircle h={10} w={10}>
                <Flex gap={1} flexDir={"column"}>
                    <Skeleton height={2} width={100} />
                    <Skeleton height={2} width={50} />
                </Flex>
            </SkeletonCircle>
        </Flex>
    )
}