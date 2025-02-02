import React from 'react'
import { Button } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text, HStack, Tag, TagLabel, TagCloseButton, Highlight } from '@chakra-ui/react'
const jobPosts = [{
    "id": "60d8b6d0f0e4c3b2f1a8b2a1",
    "email": "hr@techcompany.com",
    "name": "Frontend Developer",
    "desc": "We are looking for a talented and experienced Frontend Developer to join our team. You will be responsible for creating user-friendly web interfaces, ensuring responsive design, and improving the overall user experience.",
    "skills": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Vue.js",
      "Bootstrap",
      "Sass"
    ],
    "exp": "2-3 years of experience in frontend development.",
    "date": "2025-01-24"
  },
  {
    "id": "60d8b6d0f0e4c3b2f1a8b2a1",
    "email": "hr@techcompany.com",
    "name": "Frontend Developer",
    "desc": "We are looking for a talented and experienced Frontend Developer to join our team. You will be responsible for creating user-friendly web interfaces, ensuring responsive design, and improving the overall user experience.",
    "skills": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Vue.js",
      "Bootstrap",
      "Sass"
    ],
    "exp": "2-3 years of experience in frontend development.",
    "date": "2025-01-24"
  },
  {
    "id": "60d8b6d0f0e4c3b2f1a8b2a1",
    "email": "hr@techcompany.com",
    "name": "Frontend Developer",
    "desc": "We are looking for a talented and experienced Frontend Developer to join our team. You will be responsible for creating user-friendly web interfaces, ensuring responsive design, and improving the overall user experience.",
    "skills": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Vue.js",
      "Bootstrap",
      "Sass"
    ],
    "exp": "2-3 years of experience in frontend development.",
    "date": "2025-01-24"
  },
  {
    "id": "60d8b6d0f0e4c3b2f1a8b2a1",
    "email": "hr@techcompany.com",
    "name": "Frontend Developer",
    "desc": "We are looking for a talented and experienced Frontend Developer to join our team. You will be responsible for creating user-friendly web interfaces, ensuring responsive design, and improving the overall user experience.",
    "skills": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Vue.js",
      "Bootstrap",
      "Sass"
    ],
    "exp": "2-3 years of experience in frontend development.",
    "date": "2025-01-24"
  },
  {
    "id": "60d8b6d0f0e4c3b2f1a8b2a1",
    "email": "hr@techcompany.com",
    "name": "Frontend Developer",
    "desc": "We are looking for a talented and experienced Frontend Developer to join our team. You will be responsible for creating user-friendly web interfaces, ensuring responsive design, and improving the overall user experience.",
    "skills": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Vue.js",
      "Bootstrap",
      "Sass"
    ],
    "exp": "2-3 years of experience in frontend development.",
    "date": "2025-01-24"
  }
]  



export default function jobposts() {
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
                    {jobPosts.map((job, index) => (
                       <Card className='mb-5 p-2 '  key={index}>
                       <CardHeader>
                         <Heading color={"green.700"} size='md'>{job.name}</Heading>
                       </CardHeader>
                     
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
                              <HStack mt={4} spacing={4}>
                                {job.skills.map((name, idx) => (
                                  <Tag
                                    size={"sm"}
                                    key={idx}
                                    borderRadius='full'
                                    variant='solid'
                                    colorScheme='green'
                                    padding={2}
                                  >
                                    <TagLabel>{name}</TagLabel>
                                   
                                  </Tag>
                                ))}
                             </HStack>
                           </Box>
                           <Box>
                             <Heading size='xs' textTransform='uppercase'>
                               Experience
                             </Heading>
                             <Text pt='2' fontSize='sm'>
                               {job.exp}
                             </Text>
                           </Box>
                            <Box>
                              <Heading size='xs' textTransform='uppercase'>
                                Date
                              </Heading>
                              <Text pt='2' fontSize='sm'>
                                {job.date}
                            </Text>
                            </Box>
                         </Stack>
                       </CardBody>
                       <div className='flex justify-start p-4'>
                       <Button colorScheme='green' className='mx-1'>Button</Button>
                       <Button colorScheme='green' className='mx-1'>Button</Button>
                       </div>
                      
                     </Card>
                        
                    ))}
                </div>
            </div>

        </div>
    </div>
  )
}
