import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";
import useGetUserPosts from "../../hooks/useGetUserPosts";

const ProfilePosts = () => {

    const { isLoading, posts } = useGetUserPosts();
    const noPostFound = !isLoading && posts.length === 0;
    console.log(posts, 'profilePost');
    if (noPostFound) return <NopostFound />
    return (
        <Grid
            templateColumns={{
                sm: "repeat(1,1fr)",
                md: "repeat(3,1fr)"
            }}
            gap={1}
            columnGap={1}
        >
            {isLoading && [0, 1, 2, 3, 4, 5].map((_, idx) => (
                <VStack key={idx} alignItems={"flex-start"} gap={4}>
                    <Skeleton w={{ base: "full", sm: "350px" }}>
                        <Box h="300">
                            contents wrappe
                        </Box>
                    </Skeleton>
                </VStack>
            ))}
            {!isLoading && (
                posts.map(post => <ProfilePost key={post.id} post={post} />)
            )
            }
        </Grid >
    );
};

export default ProfilePosts;

const NopostFound = () => {
    return (
        <Flex flexDir={"column"} textAlign={"center"} mx={"auto"} mt={10}>
            <Text fontSize={"2xl"}>
                No Posts Found🤔
            </Text>
        </Flex>
    )
}