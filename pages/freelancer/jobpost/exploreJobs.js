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


function SocialProfileSimple({ profile }) {
  return (
    <Center py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}>
        <Avatar
          size={'xl'}
          src={
            'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
          }
          mb={4}
          pos={'relative'}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {profile.firstName + " " + profile.lastName}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {profile.email}
        </Text>
        <Text
          textAlign={'center'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3} className='text-sm'>
          {profile.bio}

        </Text>

        <Stack display={"flex"} align="center" py={5}>
          <Wrap maxWidth={"95%"} mt={6} spacing={5} overflow={"hidden"}>
            <WrapItem display={"flex"}>
              {
                profile.skills.map((skill, index) => {
                  return <Badge key={index}
                    px={2}
                    py={1}
                    bg={useColorModeValue('gray.50', 'gray.800')}
                    fontWeight={'400'} >
                    #{skill}
                  </Badge>
                })
              }
            </WrapItem>
          </Wrap>
        </Stack>



        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
          >
            Message
          </Button>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'green.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'green.500',
            }}
            _focus={{
              bg: 'green.500',
            }}>
            Follow
          </Button>
        </Stack>
      </Box>
    </Center>
  )
}


function PriceWrapper(props) {
  const { children } = props

  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}>
      {children}
    </Box>
  )
}

function ApplyModal({ isOpen, onClose, info }) {
  const [message, setMessage] = React.useState("");
  const handleApply = async () => {
    console.log(message, info.id);
    let headersList = {
      "Accept": "application/json",
      "Content-Type": "application/json"
     }
     
     let response = await fetch("http://localhost:8080/jobPost/applyJobPost", { 
       method: "POST",
       body: JSON.stringify({id:info.id, message: message}),
       headers: headersList,
       credentials: "include"
     });
     
     let data = await response.json();
     console.log(data)
     if (data.success){
      console.log("applied to post successfully");
      onClose();
     }
  }

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
                  <dt className="text-sm/6 font-medium text-gray-900">Applying For</dt>
                  <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{info.title}</dd>
                </div>
              </dl>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Message</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500" placeholder="Write your message here..."></textarea>              
                  </dd>
              </div>
              <div className="flex px-4 py-6  sm:px-0">
              <Checkbox mx={2} spacing='1rem'></Checkbox>
              <p className='px-1 text-s'>I am ready to share my email info and this message with the recruiter</p>
              </div>
              
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleApply} mx={2} size='sm' colorScheme='green' variant='solid'>
              Send Mail
            </Button>
            <Button size="sm" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
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

export default function ThreeTierPricing() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [apply, setApply] = React.useState(false);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [info, setInfo] = React.useState({});

  const applyPost =  (post) => {
    setInfo(post);
    setApply(true);
    onOpen();
  }
  const showInfo = (post) => {
    setApply(false);
    setInfo(post);
    onOpen();
  };
  return (<>
    {!apply && <InfoModal info={info} isOpen={isOpen} onClose={onClose} />}
    {apply && <ApplyModal info={info} isOpen={isOpen} onClose={onClose} />}
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
          {jobPosts.map((post) => (
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
                <Button onClick={() => applyPost(post)} size='sm' colorScheme='green' variant='solid'>
                  Apply
                </Button>
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
const jobPosts = [
  {
    "email": "imthakursatyam@gmail.com",
    "id": "67a385bdcbe8b02bd1d54321",
    "title": "Software Developer",
    "desc": "Full-stack developer with experience in building scalable applications.",
    "skills": [
      "next js",
      "java",
      "c++",
      "rust",
      "ruby on rails"
    ],
    "exp": [
      "5 years in web development",
      "3 years leading teams",
      "Worked on microservices architectures"
    ],
    "address": {
      "country": "Mexico",
      "state": "London",
      "pincode": "255215",
      "landmark": "New High Streets",
      "city": "New York"
    },
    "otherInfo": "Passionate about open-source contributions.",
    "website": "https://johndoe.dev",
    "date": "2025-01-20"
  },
  {
    "email": "imthakursatyam@gmail.com",
    "id": "67a385bdcbe8b02bd1d54322",
    "title": "UX/UI Designer",
    "desc": "Experienced designer creating intuitive and user-friendly interfaces.",
    "skills": [
      "javascript",
      "reactjs",
      "figma",
      "canva"
    ],
    "exp": [
      "8 years in design",
      "Led design teams for large projects",
      "Focus on user-centered design"
    ],
    "address": {
      "country": "Canada",
      "state": "CA",
      "pincode": "124512",
      "landmark": "High Streets",
      "city": "San Francisco"
    },
    "otherInfo": "Enjoys collaborating with developers to create seamless experiences.",
    "website": "https://sarahsmithdesigns.com",
    "date": null
  },
  {
    "email": null,
    "id": "67a385bdcbe8b02bd1d54323",
    "title": "Project Manager",
    "desc": "Project manager with expertise in agile methodologies and cross-functional teams.",
    "skills": null,
    "exp": [
      "10 years managing software projects",
      "Certified ScrumMaster",
      "Experienced with international teams"
    ],
    "address": {
      "state": "IL",
      "pincode": "5455555",
      "city": "Chicago"
    },
    "otherInfo": "Focused on delivering projects on time and within budget.",
    "website": "https://mikejonesprojects.com",
    "date": "2025-01-25"
  },
  {
    "email": "imthakursatyam@gmail.com",
    "id": "67a385bdcbe8b02bd1d54324",
    "title": "Data Scientist",
    "desc": "Expert in machine learning, data analysis, and statistical modeling.",
    "skills": [
      "Python",
      "R",
      "SQL",
      "TensorFlow",
      "Data Visualization"
    ],
    "exp": [
      "4 years in data science",
      "Worked with large datasets",
      "Experience in predictive modeling"
    ],
    "address": {
      "street": "101 Maple Ave",
      "city": "Austin",
      "state": "TX",
      "zip": "73301"
    },
    "otherInfo": "Passionate about making data-driven decisions.",
    "website": "https://emilydata.com",
    "date": "2025-02-02"
  },
  {
    "email": "imthakursatyam@gmail.com",
    "id": "67a385bdcbe8b02bd1d54325",
    "title": "Backend Developer",
    "desc": "Backend developer with expertise in API development and database design.",
    "skills": [
      "Node.js",
      "MongoDB",
      "REST APIs",
      "GraphQL",
      "Docker"
    ],
    "exp": [
      "6 years in backend development",
      "Designed APIs for e-commerce platforms",
      "Built scalable microservices"
    ],
    "address": {
      "street": "202 Birch Dr",
      "city": "Los Angeles",
      "state": "CA",
      "zip": "90001"
    },
    "otherInfo": "Always looking for opportunities to improve application performance.",
    "website": "https://robertbackenddev.com",
    "date": "2025-02-04"
  },
  {
    "email": "imthakursatyam@gmail.com",
    "id": "67a385bdcbe8b02bd1d54326",
    "title": "Marketing Specialist",
    "desc": "Marketing expert with a focus on digital marketing strategies and brand management.",
    "skills": [
      "SEO",
      "Social Media",
      "Google Analytics",
      "Content Marketing",
      "Email Campaigns"
    ],
    "exp": [
      "7 years in digital marketing",
      "Managed SEO for large brands",
      "Experience in email marketing campaigns"
    ],
    "address": {
      "street": "303 Cedar Blvd",
      "city": "Miami",
      "state": "FL",
      "zip": "33101"
    },
    "otherInfo": "Strong communicator with a passion for building brand awareness.",
    "website": "https://lisabrownmarketing.com",
    "date": "2025-01-15"
  },
  {
    "email": "imthakursatyam@gmail.com",
    "id": "67a385bdcbe8b02bd1d54327",
    "title": "DevOps Engineer",
    "desc": "DevOps engineer focused on automating infrastructure and continuous integration.",
    "skills": [
      "Kubernetes",
      "Terraform",
      "CI/CD",
      "AWS",
      "Linux"
    ],
    "exp": [
      "5 years in DevOps",
      "Automated infrastructure for cloud-based applications",
      "Implemented CI/CD pipelines"
    ],
    "address": {
      "street": "404 Elm St",
      "city": "Seattle",
      "state": "WA",
      "zip": "98101"
    },
    "otherInfo": "Enjoys optimizing workflows for development teams.",
    "website": "https://daviddevops.com",
    "date": "2025-01-10"
  },
  {
    "email": "imthakursatyam@gmail.com",
    "id": "67a385bdcbe8b02bd1d54328",
    "title": "Business Analyst",
    "desc": "Experienced business analyst skilled in data collection, analysis, and reporting.",
    "skills": [
      "Data Analysis",
      "Excel",
      "Power BI",
      "Business Intelligence",
      "SQL"
    ],
    "exp": [
      "6 years in business analysis",
      "Worked with cross-functional teams",
      "Created actionable reports for stakeholders"
    ],
    "address": {
      "street": "505 Willow Ave",
      "city": "Denver",
      "state": "CO",
      "zip": "80202"
    },
    "otherInfo": "Detail-oriented and results-driven.",
    "website": "https://lilydavisanalyst.com",
    "date": "2025-02-01"
  },
  {
    "email": "imthakursatyam@gmail.com",
    "id": "67a385bdcbe8b02bd1d54329",
    "title": "Frontend Developer",
    "desc": "Frontend developer with a passion for creating beautiful and responsive user interfaces.",
    "skills": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Vue.js"
    ],
    "exp": [
      "4 years in frontend development",
      "Specialized in responsive web design",
      "Worked on e-commerce websites"
    ],
    "address": {
      "street": "606 Aspen Rd",
      "city": "Boston",
      "state": "MA",
      "zip": "02110"
    },
    "otherInfo": "Loves working on design-driven projects.",
    "website": "https://charlesfrontenddev.com",
    "date": "2025-01-18"
  },
  {
    "email": "imthakursatyam@gmail.com",
    "id": "67a385bdcbe8b02bd1d5432a",
    "title": "HR Manager",
    "desc": "HR manager with a focus on talent acquisition and employee relations.",
    "skills": [
      "Recruitment",
      "Employee Engagement",
      "Conflict Resolution",
      "Payroll",
      "Training & Development"
    ],
    "exp": [
      "9 years in HR management",
      "Experience with both large and small organizations",
      "Developed employee wellness programs"
    ],
    "address": {
      "street": "707 Pine St",
      "city": "Dallas",
      "state": "TX",
      "zip": "75201"
    },
    "otherInfo": "Passionate about fostering a positive workplace culture.",
    "website": "https://oliviahr.com",
    "date": "2025-01-25"
  }
]