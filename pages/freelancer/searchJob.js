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
  WrapItem
} from '@chakra-ui/react'
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'
import cookie from "cookie";

import { Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import jobposts from '../recruiter/jobpost/view';



export async function getServerSideProps(context) {
  try {
      
    const cookies = context.req.headers.cookie || '';
    const parsedCookies = cookie.parse(cookies);
    let headersList = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Cookie": cookies
     }
    let response = await fetch("http://localhost:8080/jobPost/getAllPost", { 
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
   console.log(error)
    return {
      props: {
        jobPosts: [],
      },
    };
  }
 
}
export default function ThreeTierPricing({jobPosts}) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isSearching, setSearching] = React.useState(false);
  const [searchedJobPosts, setSearchedJobPosts] = React.useState([]);
  
    
    const handleSearchChange =  (event) => {
      console.log(event.target.value)
      if (event.target.value.length >= 3) {
         setSearching(true);
         handleSearch(event.target.value);
         // is user is already typing  no need to change state
      }
      setSearchTerm(event.target.value);
      if (event.target.value.length <= 2) setSearching(false); 
    };
    const handleSearch = async (query) => {
      let headersList = {
        "Accept": "application/json",
        "Content-Type": "application/json"
       }
      let response = await fetch("http://localhost:8080/jobPost/searchJobPost", { 
        method: "POST",
        body: JSON.stringify({"query": query}),
        headers: headersList,
        credentials: "include"
      });
  
      let data = await response.json();
      if (data.success) setSearchedJobPosts(data.jobPosts);
    }
 
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto flex items-center justify-between min-w-full max-w-2xl lg:mx-0">
        <Box className="" mt={5} >
        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">From The Top Recruiters</h2>
        <p className="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p>
        </Box>
         <Box className='' mt={5}>
              <InputGroup bg={"white"} rounded={"lg"}>
                <InputLeftElement pointerEvents="none">
                  <Icon className='mt-1.5 text-bold' as={SearchIcon} color="green.500" />
                </InputLeftElement>
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e)}
                  placeholder="Search..."
                  size="lg"
                  borderRadius="md"
                  boxShadow="sm"
                />
              </InputGroup>
            </Box>
      </div>
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-300 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
        {(jobPosts && !isSearching) && jobPosts.map((post) => (
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
                <Button size='sm' colorScheme='green' variant='solid'>
                   Apply
                </Button>
                <Button  size='sm' colorScheme='green' variant='outline'>
                  Details
               </Button>
q           </Stack>
          </article>
        ))}
         {(isSearching && searchedJobPosts) && searchedJobPosts.map((post) => (
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
                <Button size='sm' colorScheme='green' variant='solid'>
                   Apply
                </Button>
                <Button  size='sm' colorScheme='green' variant='outline'>
                  Details
               </Button>
q           </Stack>
          </article>
        ))}
      </div>
    </div>
  </div>
  )
}
