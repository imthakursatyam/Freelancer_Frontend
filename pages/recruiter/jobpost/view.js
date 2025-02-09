import React from 'react'
import { Button } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text, Tag, TagLabel, TagCloseButton, Highlight, Flex, Badge } from '@chakra-ui/react'
import { MdOutlineDelete, MdEditDocument } from "react-icons/md";
import Link from "next/link";
import cookie from "cookie";
/*
const jobPosts = [
  {
    "id": "603d2149e9b1a1c92c7a8a5b",
    "name": "Software Developer",
    "desc": "We are looking for a talented Software Developer to join our dynamic team. You will be responsible for developing cutting-edge software solutions.",
    "skills": ["Java", "Spring Boot", "MongoDB", "Git", "Docker"],
    "exp": ["2-3 years", "Familiarity with Agile methodologies"],
    "address": {
      "landmark": "Near Central Park",
      "state": "California",
      "city": "San Francisco",
      "pincode": "94107",
      "country": "USA"
    },
    "otherInfo": "Competitive salary and benefits.",
    "website": "https://www.examplecompany.com",
    "date": "2025-01-30"
  },
  {
    "id": "603d2149e9b1a1c92c7a8a5c2",
    "name": "UX/UI Designer",
    "desc": "Join our design team and help us create seamless user experiences and beautiful interfaces.",
    "skills": ["Figma", "Adobe XD", "User Research", "Wireframing", "Prototyping"],
    "exp": ["3+ years", "Experience in user-centered design process"],
    "address": {
      "landmark": "Near Downtown",
      "state": "New York",
      "city": "New York City",
      "pincode": "10001",
      "country": "USA"
    },
    "otherInfo": "Flexible working hours and remote work options.",
    "website": "https://www.designcompany.com",
    "date": "2025-01-28"
  },
  {
    "id": "603d2149e9b1a1c92c7a8a5c3",
    "name": "Product Manager",
    "desc": "Looking for a skilled product manager to lead our product development team and drive new product initiatives.",
    "skills": ["Agile", "Product Roadmaps", "Market Research", "Leadership", "Strategy"],
    "exp": ["5+ years", "Proven track record in product development"],
    "address": {
      "landmark": "Near Riverside",
      "state": "Texas",
      "city": "Austin",
      "pincode": "73301",
      "country": "USA"
    },
    "otherInfo": "Health benefits and team-building activities.",
    "website": "https://www.productcompany.com",
    "date": "2025-01-29"
  },
  {
    "id": "603d2149e9b1a1c92c7a8a5c4",
    "name": "Data Scientist",
    "desc": "We are looking for an experienced Data Scientist to analyze complex data sets and provide actionable insights.",
    "skills": ["Python", "Machine Learning", "Data Analysis", "SQL", "Statistics"],
    "exp": ["4+ years", "Experience with data-driven decision-making"],
    "address": {
      "landmark": "Near Tech Park",
      "state": "California",
      "city": "Los Angeles",
      "pincode": "90001",
      "country": "USA"
    },
    "otherInfo": "Annual performance bonuses and stock options.",
    "website": "https://www.datacompany.com",
    "date": "2025-01-27"
  },
  {
    "id": "603d2149e9b1a1c92c7a8a5c5",
    "name": "Marketing Specialist",
    "desc": "Seeking a creative marketing specialist to help develop and implement marketing strategies for our brand.",
    "skills": ["SEO", "Social Media Marketing", "Content Strategy", "Google Analytics", "Email Campaigns"],
    "exp": ["3+ years", "Experience in digital marketing"],
    "address": {
      "landmark": "Near City Mall",
      "state": "Florida",
      "city": "Miami",
      "pincode": "33101",
      "country": "USA"
    },
    "otherInfo": "Paid vacations and growth opportunities.",
    "website": "https://www.marketingcompany.com",
    "date": "2025-01-26"
  },
  {
    "id": "603d2149e9b1a1c92c7a8a5c6",
    "name": "Sales Executive",
    "desc": "We are looking for an energetic sales executive to drive sales and build relationships with our clients.",
    "skills": ["Salesforce", "Negotiation", "B2B Sales", "CRM", "Client Relationship"],
    "exp": ["2-4 years", "Proven sales performance"],
    "address": {
      "landmark": "Near Airport",
      "state": "Illinois",
      "city": "Chicago",
      "pincode": "60601",
      "country": "USA"
    },
    "otherInfo": "Great incentives and career growth.",
    "website": "https://www.salescompany.com",
    "date": "2025-01-25"
  }
];
*/



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
