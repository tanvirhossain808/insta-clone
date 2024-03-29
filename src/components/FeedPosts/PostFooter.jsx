import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/contants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/useAuthStore.js"
import useLikeUnlikePost from "../../hooks/useLikeUnlikePost.js";
import { timeAgo } from "../../utlisties/timeAgo.js";
import { CommentsModal } from "../Modals/CommentModal.jsx";

const PostFooter = ({ isProfilePage, post, creatorProfile }) => {
    const [liked, setLiked] = useState(false);
    const { isCommenting, handlePostComment } = usePostComment();
    const [comment, setComment] = useState('');
    const authUser = useAuthStore((state => state.user));
    const commentRef = useRef(null);
    const { isUpdating, likes, isLiked, handleLikedPost } = useLikeUnlikePost(post);
    const { onOpen, onClose, isOpen } = useDisclosure();
    const handleSubmitComment = async () => {
        await handlePostComment(post.id, comment);
        setComment('');
    }
    return (
        <Box my={10} mt={"auto"}>
            <Flex alignItems={"center"}
                gap={4}
                w={'full'}
                pt={0}
                mb={2}
                mt={4}>
                <Box onClick={handleLikedPost}
                    cursor={"pointer"}
                    fontSize={18}>
                    {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
                </Box>
                <Box
                    cursor={"pointer"}
                    fontSize={18}
                    onClick={() => commentRef.current.select()}>
                    <CommentLogo />
                </Box>
            </Flex>
            <Text
                fontSize={"sm"}
                fontWeight={600}>{likes} likes</Text>
            {isProfilePage && (
                <Text fontSize={12} color={"gray"}>
                    Posted {timeAgo(post.createdAt)}
                </Text>
            )}
            {
                !isProfilePage && (
                    <>

                        <Text
                            fontSize={"sm"}
                            fontWeight={700}>
                            {creatorProfile?.userName}{" "}
                            <Text as={"span"} fontWeight={400}>
                                {post.caption}
                            </Text>
                        </Text>
                        {post.comments.length > 0 && (
                            <Text fontSize={"sm"} color={'gray'} cursor={'pointer'} onClick={onOpen}>
                                View all {post.comments.length} comments
                            </Text>
                        )}
                        {isOpen && <CommentsModal isOpen={isOpen} onClose={onClose} post={post} />}
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
                            ref={commentRef}
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