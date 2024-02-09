import { Box, Image } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

const FeedPost = ({ img, userName, avatar }) => {
    return (
        <>
            <PostHeader userName={userName} avatar={avatar}></PostHeader>
            <Box my={2}
                borderRadius={4}
                overflow={'hidden'}>
                <Image src={img} alt={userName} />
            </Box>
            <PostFooter userName={userName}></PostFooter>
        </>
    );
};

export default FeedPost;