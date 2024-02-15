import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowUnFollow from "../../hooks/useFollowUnfollowUser";

const PostHeader = ({ post, creatorProfile }) => {
    // console.log(creatorProfile);
    const { isUpdating, isFollowing, handleFollowUnfollow } = useFollowUnFollow(post.createdBy);

    return (
        <Flex justifyContent={"space-between"}
            alignItems={"center"}
            w={'full'}
            my={2}>
            <Flex alignItems={'center'} gap={2}>
                {
                    creatorProfile ? (<Link to={`/${creatorProfile.userName}`}>
                        <Avatar src={creatorProfile?.profilePictureUrl} alt="user profile pic" size={"sm"} />
                    </Link>) : <SkeletonCircle size={10} />
                }

                <Flex fontSize={12} fontWeight={"bold"} gap={2}>
                    {
                        creatorProfile ? (<Link to={`/${creatorProfile.userName}`}>
                            {creatorProfile.userName}
                        </Link>) : <Skeleton width={"100px"} size={"10px"} />
                    }

                    <Box color={'gray.500'}>
                        .1w
                    </Box>
                </Flex>

            </Flex>
            <Box
                cursor={'pointer'}>
                <Button
                    size={"xs"}
                    bg={"transparent"}
                    fontSize={12}
                    color={'blue.500'}
                    fontWeight={"bold"}
                    _hover={{ color: "white" }}
                    transition={'0.2s ease-in-out'}
                    onClick={handleFollowUnfollow}
                    isUpdating={isUpdating}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            </Box>
        </Flex >
    );
};

export default PostHeader;