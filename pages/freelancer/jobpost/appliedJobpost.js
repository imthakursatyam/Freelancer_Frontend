import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Badge,
  useColorModeValue,
  Stack,
  HStack,
  VStack,
  List,
  ListItem,
  ListIcon,
  Button,
  Wrap,
  WrapItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox

} from '@chakra-ui/react'
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'
import { useDisclosure } from '@chakra-ui/react';
import { Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import cookie from "cookie";
export async function getServerSideProps(context) {
  try {
      
    const cookies = context.req.headers.cookie || '';
    const parsedCookies = cookie.parse(cookies);
    let headersList = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Cookie": cookies
     }
    let response = await fetch("http://localhost:8080/freelancer/getAppliedJobPosts", { 
      method: "POST",
      headers: headersList,
      credentials: "include"
    });

    let data = await response.json();
    //console.log(data)
    if(!data.success) throw new Error("No Jobposts");
    
    return {
      props: {
        jobPosts: data.jobPosts,
      },
    };
  } catch (error) {
 
    return {
      props: {
        jobPosts: [],
      },
    };
  }
 
}

function InfoModal({ isOpen, onClose, info }) {
  return (
    <>
      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>{info.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxHeight={80} overflowY={"scroll"} >
            <div className="mt-6   border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">Title</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{info.title}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">Description</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{info.desc}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">Required Skills</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{info.skills && info.skills.join(", ")}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">Required Experience</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{info.exp && info.exp.join(", ")}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">Location</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{info.address && Object.values(info.address).join(", ")}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">Other Info</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{info.otherInfo}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">Post Date</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{info.date}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm/6 font-medium text-gray-900">Contact Info</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{info.website}</dd>
                  <dt className="text-sm/6 font-medium text-gray-900"></dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{info.email}</dd>
                </div>


              </dl>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default function AppliedJobPosts({jobPosts}) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [info, setInfo] = React.useState({});


  const showInfo = (post) => {
    setInfo(post);
    onOpen();
  };
  return (<>
    {<InfoModal info={info} isOpen={isOpen} onClose={onClose} />}
   
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex items-center justify-between min-w-full max-w-2xl lg:mx-0">
          <Box className="" mt={5} >
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Applied JobPosts</h2>
            <p className="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p>
          </Box>
         
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-300 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
          {jobPosts && jobPosts.map((post) => (
            <article key={post.id} className="flex max-w-xl p-3 flex-col items-start justify-between rounded-md bg-white">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.date} className="text-gray-500">
                  {post.date}
                </time>

              </div>
              <div className="group relative border-b border-gray-200 pb-4">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href={"#"}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.desc}</p>
              </div>


              <span className='text-lg/6 mt-4 font-semibold text-gray-900 '>
                Skills
              </span>
              <div className="relative min-w-full flex items-center gap-x-4 border-b border-gray-200 pb-4">

                <div className="text-sm/6 p-1 ">
                  {post.skills && post.skills.map((skill, index) => {
                    return <span
                      className="inline-block z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 m-1 "
                    >
                      {skill}
                    </span>
                  })}
                </div>
              </div>
              <Stack className='my-3 px-2' direction='row' spacing={4} align='center'>
                <Button onClick={() => showInfo(post)} size='sm' colorScheme='green' variant='solid'>
                  Details
                </Button>

              </Stack>
            </article>
          ))}
        </div>
      </div>
    </div>
  </>
  )
}
