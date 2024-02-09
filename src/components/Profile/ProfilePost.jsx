import { Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"

const ProfilePost = ({ img }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
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
                                7
                            </Text>
                        </Flex>
                        <Flex>
                            <FaComment size={20} />
                            <Text fontWeight={"bold"} ml={2}>
                                7
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Image src={img} alt="profile post" w={"100%"} h={"100%"} objectFit={"cover"} />
            </GridItem >

            <Modal isOpen={isOpen} onClose={onClose}
                isCentered={true}
                size={{ base: "3xl", md: "5xl" }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody bg={"black"} pb={5}>
                        <Flex gap={4} width={{ base: "90%", sm: "70%", md: "full" }}>

                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProfilePost;