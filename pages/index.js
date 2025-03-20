import { Hero, Footer, Static1, Static2, Static3, Static4 } from "../components/ui/export.js";
import { useRouter } from "next/router.js";
import PageSpinner from "@/components/custom/PageSpinner.js";
import React from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  AlertDialogCloseButton,
  UnorderedList,
  ListItem
} from "@chakra-ui/react";

function AcceptDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef();
  const handleAccept = () => {
    onClose();
  }
  return (
    <>
      <Button size={"xs"} bg="green.500" textColor="white" onClick={onOpen}>Accept</Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Accept Application</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <UnorderedList className="text-xs my-2 " spacing={3}>
              <ListItem>The freelancer will be notified about the application. </ListItem>
              <ListItem>The freelancer will be able to see your email.</ListItem>
              <ListItem>You both will be able to chat after you accepts the application.</ListItem>
              <ListItem>Your conversation history will be available on our platform for reference.</ListItem>
              <ListItem>If the freelancer is unresponsive, you can explore other candidates on the platform.</ListItem>
            </UnorderedList>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button size="sm" ref={cancelRef} onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => handleAccept()} size="sm" colorScheme='green' ml={3}>
              Accept
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

function RejectDialog() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const handleReject = () => {
    onClose();
  }

  return (
    <>
      <Button size="xs" colorScheme='red' onClick={onOpen}>
        Reject
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Reject Application
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={() => handleReject()} colorScheme='red' ml={3}>
                Reject
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
export default function Home() {


  const startFetch = async () => {
    let headersList = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
    let response = await fetch("http://localhost:8080/recruiter/check-cookie", {
      method: "POST",
      headers: headersList,
      credentials: "include"
    });

    let data = await response.text();
    console.log(data)
  }



  return <>

    <Hero />
    <AcceptDialog />
    <RejectDialog />
    <Static2 />
    <Static1 />
    <Static3 />
    <Static4 />
  </>
}