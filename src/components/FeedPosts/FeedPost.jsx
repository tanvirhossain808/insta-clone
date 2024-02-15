import { Box, Image } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const FeedPost = ({ post }) => {

    const { isLoading, userProfile } = useGetUserProfileById(post.createdBy);
    console.log(userProfile, isLoading, 'userProfile');
    return (
        <>
            <PostHeader post={post} creatorProfile={userProfile} />
            <Box my={2}
                borderRadius={4}
                overflow={'hidden'}>
                <Image src={post.imageUrl} alt={"FEED POST IMG"} />
            </Box>
            <PostFooter post={post} creatorProfile={userProfile}></PostFooter>
        </>
    );
};

export default FeedPost;