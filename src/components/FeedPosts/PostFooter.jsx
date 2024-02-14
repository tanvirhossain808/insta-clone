import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/contants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/useAuthStore.js"

const PostFooter = ({ userName, isProfilePage, post }) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(1000);
    const { isCommenting, handlePostComment } = usePostComment();
    const [comment, setComment] = useState('');
    const authUser = useAuthStore((state => state.user))
    const handleSubmitComment = async () => {
        await handlePostComment(post.id, comment);
        setComment('');
    }
    const handleLike = () => {
        if (liked) {
            setLiked(false);
            setLikes(likes - 1)
        }
        else {
            setLiked(true)
            setLikes(likes + 1)
        }
    }
    return (
        <Box my={10} mt={"auto"}>
            <Flex alignItems={"center"}
                gap={4}
                w={'full'}
                pt={0}
                mb={2}
                mt={4}>
                <Box onClick={handleLike}
                    cursor={"pointer"}
                    fontSize={18}>
                    {!liked ? <NotificationsLogo /> : <UnlikeLogo />}
                </Box>
                <Box
                    cursor={"pointer"}
                    fontSize={18}>
                    <CommentLogo />
                </Box>
            </Flex>
            <Text
                fontSize={"sm"}
                fontWeight={600}>{likes} likes</Text>
            {
                !isProfilePage && (
                    <>

                        <Text
                            fontSize={"sm"}
                            fontWeight={700}>
                            {userName}{" "}
                            <Text as={"span"} fontWeight={400}>
                                Feeling good
                            </Text>
                        </Text>
                        <Text fontSize={"sm"} color={'gray'}>
                            View all 1,000 comments
                        </Text>
                    </>
                )
            }
            {authUser && (
                <Flex
                    alignItems={'center'} gap={2}
                    justify={'space-between'}
                    w={"full"}>
                    <InputGroup>
                        <Input variant={"flushed"} placeholder="Add a comment..." fontSize={14} onChange={e => setComment(e.target.value)}
                            value={comment}
                        />
                        <InputRightElement>
                            <Button
                                fontSize={14}
                                color={"blue.500"}
                                fontWeight={600}
                                cursor={'pointer'}
                                _hover={{ color: "white" }}
                                bg={'transparent'}
                                onClick={handleSubmitComment}
                                isLoading={isCommenting}
                            >Post</Button>
                        </InputRightElement>
                    </InputGroup>
                </Flex >
            )}
        </Box>
    );
};

export default PostFooter;