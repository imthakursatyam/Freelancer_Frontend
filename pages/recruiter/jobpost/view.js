import React from 'react'
import { Button } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text, Tag, TagLabel, TagCloseButton, Highlight, Flex, Badge } from '@chakra-ui/react'
import { MdOutlineDelete, MdEditDocument } from "react-icons/md";
import Link from "next/link";
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
    let response = await fetch("http://localhost:8080/recruiter/getJobPosts", { 
      method: "POST",
      headers: headersList,
      credentials: "include"
    });

    
    let data = await response.json();
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



export default function jobposts({jobPosts}) {

  return (
    <div className='min-w-full'> 
        <div className='flex justify-between items-center w-full md:w-3/4 mx-auto my-8'>
            <div className='w-full'>
            <Heading className='my-4' lineHeight='tall'>
              <Highlight
                query={['spotlight', 'emphasize', 'Accentuate']}
                styles={{ px: '2', py: '1', rounded: 'full', bg: 'green.200' }}
              >
                With the Highlight component, you can spotlight, emphasize and accentuate
                words.
              </Highlight>
            </Heading>
                <div className='mt-8 '>
                    {jobPosts.length > 0 && jobPosts.map((job, index) => (
                       <Card className='mb-5 p-2 '  key={index}>
                       <Flex >
                       <CardHeader>
                         <Heading color={"green.700"} size='md'>{job.title}</Heading>
                       </CardHeader>
                        <Link href={"#"} className='my-auto mr-4 ml-auto'><Button  bg="red.500" ><MdOutlineDelete className='text-white' /></Button></Link>
                        <Link href={`/recruiter/jobpost/update/${job.id}`} className='my-auto mr-4'><Button my="auto" bg="yellow.400" justifySelf={"end"}><MdEditDocument className='text-black'/></Button></Link>
                        </Flex>
                       <CardBody>
                         <Stack divider={<StackDivider />} spacing='4'>
                           <Box>
                             <Heading size='xs' textTransform='uppercase'>
                              Description
                             </Heading>
                             <Text pt='2' fontSize='sm'>
                               {job.desc}
                             </Text>
                           </Box>
                           <Box>
                             <Heading size='xs' textTransform='uppercase'>
                               skills
                             </Heading>
                              <Stack direction="row" mt={4} spacing={4}>
                                {(job.skills && job.skills.length > 0) && job.skills.map((name, idx) => (
                                   <Badge variant="solid" rounded="md" px={"5px"} py={"3px"}  colorScheme='green'>{name}</Badge>
                                ))}
                             </Stack>
                           </Box>

                           <Box>
                             <Heading size='xs' textTransform='uppercase'>
                               Experience
                             </Heading>
                             <Text pt='2' fontSize='sm'>
                               {job.exp.length> 0 && job.exp.map((e) => e+", ")}
                             </Text>
                           </Box>
                           <Box>
                           <Heading size='xs' textTransform='uppercase'>
                              Location
                             </Heading>
                             <Text pt='2' fontSize='sm'>
                               {(job.address && Object.values(job.address).length > 0) && Object.values(job.address).map((e)=> e+", ")}
                             </Text>
                             </Box>
                             <Box>
                              <Heading size='xs' textTransform='uppercase'>
                                Other Info
                              </Heading>
                              <Text pt='2' fontSize='sm'>
                                {job.otherInfo}
                            </Text>
                            </Box>
                            {(job.website && job.website.length > 0) && <Box>
                              <Heading size='xs' textTransform='uppercase'>
                                Website
                              </Heading>
                              <Text pt='2' fontSize='sm'>
                                {job.website}
                            </Text>
                            </Box>}
                            <Box>
                              <Heading size='xs' textTransform='uppercase'>
                                Posted On
                              </Heading>
                              <Text pt='2' fontSize='sm'>
                                {job.date}
                            </Text>
                            </Box>
                         </Stack>
                       </CardBody>
                      
                     </Card>
                        
                    ))}

                    {jobPosts.length == 0 && <div>No Jobposts</div>}
                </div>
            </div>

        </div>
    </div>
  )
}
