import { Avatar, Button, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter"
import useProfileStore from "../../store/useProfileStore"
import useAuthStore from "../../store/useAuthStore";
import usePostStore from "../../store/usePostStore";
import useShowToast from "../../hooks/useShowToast"
import { useState } from "react";
import { firestore, storage } from "../../firbase/firebase.config";
import { deleteObject, ref } from "firebase/storage";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";

const ProfilePost = ({ post: { imageUrl, likes, comments, id }, post }) => {
    console.log(post, 'd');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, setUser } = useAuthStore();
    const showToast = useShowToast();
    const { userProfile: { userName, profilePictureUrl, uid }, deleteprofilePost, userProfile } = useProfileStore(); console.log(userProfile.posts.length, 'e');
    const { deletePost, posts, } = usePostStore();
    const [isDeleting, setIsDeleting] = useState(false);
    const handleDelPost = async () => {
        if (isDeleting) return;
        if (!window.confirm("Are you sure want to delete the user")) return;
        try {
            setIsDeleting(true);
            const imageRef = ref(storage, `posts/${id}`);
            await deleteObject(imageRef);
            const userRef = doc(firestore, "users", user.uid);
            await deleteDoc(doc(firestore, "posts", id));

            await updateDoc(userRef, {
                posts: arrayRemove(id)
            })
            deletePost(id);
            deleteprofilePost(id);
            showToast("Success", "Post deleted successfully", "success")
        } catch (error) {
            showToast("Error", error.message, "error");
            console.log(error);

        }
        finally {
            setIsDeleting(false);
        }
    };
    return (
        <>


            <GridItem
                cursor={"pointer"}
                borderRadius={3}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                position={"relative"}
                aspectRatio={1 / 1}
                onClick={onOpen}
            >
                <Flex
                    opacity={0}
                    _hover={{ opacity: 1 }}
                    position={"absolute"}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg={"blackAlpha.700"}
                    transition={"all 0.3s ease"}
                    zIndex={1}
                    justifyContent={"center"}
                >
                    <Flex
                        alignItems={"center"}
                        justifyContent={"center"} gap={50}
                    >
                        <Flex>
                            <AiFillHeart size={20} />
                            <Text fontWeight={"bold"} ml={2}>
                                {likes.length}
                            </Text>
                        </Flex>
                        <Flex>
                            <FaComment size={20} />
                            <Text fontWeight={"bold"} ml={2}>
                                {comments.length}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Image src={imageUrl} alt="profile post" w={"100%"} h={"100%"} objectFit={"cover"} />
            </GridItem >

            <Modal isOpen={isOpen} onClose={onClose}
                isCentered={true}
                size={{ base: "3xl", md: "5xl" }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody bg={"black"} pb={5}>
                        <Flex gap={4} w={{ base: "90%", sm: "70%", md: "full" }} mx={"auto"}
                            maxH={"90vh"}
                            minH={"50vh"}
                        >
                            <Flex
                                borderRadius={4}
                                overflow={"hidden"}
                                border={"1px solid "}
                                borderColor={"whiteAlpha.300"}
                                flex={1.5}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Image src={imageUrl} alt="profie post" />
                            </Flex>
                            <Flex flex={1}
                                flexDir={"column"}
                                display={{ base: "none", md: "flex" }}
                                px={10}>
                                <Flex justifyContent={"space-between"} alignItems={"center"}>
                                    <Flex
                                        alignItems={"center"}
                                        gap={4}
                                    >
                                        <Avatar src={profilePictureUrl} size={"sm"} name={userName} />
                                        <Text fontWeight={"bold"} fontSize={12}>
                                            {userName}
                                        </Text>
                                    </Flex>
                                    {/*  */}
                                    {user?.uid === uid && <Button size={"sm"} bg={"transparent"} _hover={{ bg: "whiteAlpha.300", color: "red.600" }} borderRadius={4} p={1} onClick={handleDelPost}
                                        isLoading={isDeleting}
                                    >
                                        <MdDelete size={20} cursor={"pointer"} />
                                    </Button>}
                                </Flex>
                                <Divider my={4} bg={"gray.500"} />
                                <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                                    {post.comments.map((comment, index) => <Comment key={index} comment={comment} />)}

                                </VStack>
                                <Divider my={4} bg={"gray.800"} />
                                <PostFooter isProfilePage={true} post={post} />
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProfilePost;