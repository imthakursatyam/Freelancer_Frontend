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
import  { useRouter } from "next/router"
import { Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import cookie from "cookie";

 function SocialProfileSimple({profile, routeToProfile}) { 
  

  const sendMail = (email) => {

  }
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
          src={profile.profileImg}
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
          {profile.name}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {profile.contactMail}
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
             profile.skills && profile.skills.map((skill, index) => {
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
            onClick={() => routeToProfile(profile.id)}
            >
            View Profile
          </Button>
          <Button
            onClick={() => sendMail(profile.contactMail)}
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
            Message
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


export async function getServerSideProps(context) {
  try {
      
    const cookies = context.req.headers.cookie || '';
    const parsedCookies = cookie.parse(cookies);
    let headersList = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Cookie": cookies
     }
    let response = await fetch("http://localhost:8080/recruiter/getFreelancers", { 
      method: "POST",
      headers: headersList,
      credentials: "include"
    });

    let data = await response.json();

    if(!data.success) throw new Error("No Freelancers");
    
    return {
      props: {
        freelancers: data.freelancers,
      },
    };
  } catch (error) {

    return {
      props: {
        freelancers: [],
      },
    };
  }
 
}


export default function ThreeTierPricing({freelancers}) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isSearching, setSearching] = React.useState(false);
  const [profiles, setProfiles] = React.useState([]);

  const router = useRouter();
  const routeToProfile = (id) => {
    router.push("/recruiter/freelancer/profile/"+id);
  }
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
    let response = await fetch("http://localhost:8080/recruiter/searchFreelancer", { 
      method: "POST",
      body: JSON.stringify({"query": query}),
      headers: headersList,
      credentials: "include"
    });

    let data = await response.json();
    if (data.success) setProfiles(data.profiles)
  }

  return (
    <Box py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Freelancer that fit your need
        </Heading>
        <Text fontSize="lg" color={'gray.500'}>
          Start with 14-day free trial. No credit card needed. Cancel at anytime.
        </Text>
      </VStack>
      <Box width="100%" maxWidth="600px" mx="auto" mt={5}>
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
      <Stack display={"flex"} align="center" py={10}>
        <Wrap spacing={10} justify="center">
        {(isSearching && profiles) && (profiles).map((profile, index) => (
            <WrapItem key={index} >
              <SocialProfileSimple profile={profile} routeToProfile={routeToProfile} />
            </WrapItem>
          ))}
        {(freelancers && !isSearching) && (freelancers).map((profile, index) => (
            <WrapItem key={index}>
              <SocialProfileSimple profile={profile} routeToProfile={routeToProfile} />
            </WrapItem>
          ))}
        </Wrap>
      </Stack>
    </Box>
  )
}
const freelancer = [
  {
    email: "john.doe@example.com",
    contactMail:"john.doe@example.com",
    name: "John Doe",
    bio: "Experienced front-end developer with expertise in building modern, responsive websites and web applications.",
    contactNumber: "+1234567890",
    availableForWork: true,
    hourlyRate: 50.0,
    skills: ["HTML", "CSS", "JavaScript", "React", "Vue.js", "Sass"],
    certifications: ["Certified Web Developer", "React Native Certified"],
    languages: ["English", "Spanish"],
    reviews: [
      "Great work on the website design!",
      "Excellent coding skills, fast delivery."
    ],
    location: { city: "New York", country: "USA" },
    profileImg: "https://example.com/images/john_doe_profile.jpg",  // Added profile image link
    workExperience: [
      { role: "Frontend Developer", desc: "Built modern, responsive websites using React and CSS", startDate: new Date("2020-06-01"), endDate: new Date("2022-06-01") },
      { role: "UI/UX Designer", desc: "Worked on designing intuitive user interfaces for web applications", startDate: new Date("2018-01-01"), endDate: new Date("2020-05-01") }
    ],
    portfolio: [
      { title: "E-commerce Website", description: "E-commerce site built with React", link: "https://example.com/project1", type: "link" },
      { title: "Personal Blog", description: "Personal blog with custom theme", link: "https://example.com/project2", type: "link" }
    ]
  },
  {
    email: "jane.smith@example.com",
    name: "Jane Smith",
    contactMail:"john.doe@example.com",
    bio: "Creative front-end developer with a strong passion for designing seamless user experiences.",
    contactNumber: "+0987654321",
    availableForWork: false,
    hourlyRate: 45.0,
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Bootstrap"],
    certifications: ["Certified JavaScript Developer", "UX Design Specialist"],
    languages: ["English", "French"],
    reviews: [
      "Fantastic developer! Really understood the requirements.",
      "Highly recommend for any front-end project."
    ],
    location: { city: "London", country: "UK" },
    profileImg: "https://example.com/images/jane_smith_profile.jpg",  // Added profile image link
    workExperience: [
      { role: "Frontend Developer", desc: "Developed several high-performance React apps", startDate: new Date("2019-03-01"), endDate: new Date("2022-03-01") },
      { role: "Web Designer", desc: "Created custom themes and templates for WordPress sites", startDate: new Date("2017-04-01"), endDate: new Date("2019-02-01") }
    ],
    portfolio: [
      { title: "Portfolio Website", description: "Portfolio website showcasing my work", link: "https://example.com/portfolio", type: "link" },
      { title: "Landing Page Design", description: "Landing page for SaaS product", link: "https://example.com/project3", type: "link" }
    ]
  },
  {
    email: "mark.taylor@example.com",
    contactMail:"john.doe@example.com",
    name: "Mark Taylor",
    bio: "Passionate front-end developer specializing in mobile-first design and responsive web applications.",
    contactNumber: "+1122334455",
    availableForWork: true,
    hourlyRate: 60.0,
    skills: ["HTML", "CSS", "JavaScript", "Angular", "TypeScript", "Material UI"],
    certifications: ["Angular Certified Developer", "Mobile-First Design Specialist"],
    languages: ["English"],
    reviews: [
      "Amazing work! Delivered ahead of schedule.",
      "Mark has great attention to detail and design skills."
    ],
    location: { city: "Sydney", country: "Australia" },
    profileImg: "https://example.com/images/mark_taylor_profile.jpg",  // Added profile image link
    workExperience: [
      { role: "Frontend Developer", desc: "Worked on Angular projects to build dynamic web apps", startDate: new Date("2020-02-01"), endDate: new Date("2022-02-01") },
      { role: "Junior Frontend Developer", desc: "Assisted in building mobile-first responsive websites using Bootstrap", startDate: new Date("2018-06-01"), endDate: new Date("2020-01-01") }
    ],
    portfolio: [
      { title: "Weather App", description: "Real-time weather app built with Angular", link: "https://example.com/weatherapp", type: "link" },
      { title: "Business Landing Page", description: "Business landing page with custom design", link: "https://example.com/businesslanding", type: "link" }
    ]
  },
  {
    email: "susan.lee@example.com",
    contactMail:"john.doe@example.com",
    name: "Susan Lee",
    bio: "Front-end developer with a focus on performance optimization and user-centered design.",
    contactNumber: "+1230987654",
    availableForWork: true,
    hourlyRate: 55.0,
    skills: ["HTML", "CSS", "JavaScript", "Vue.js", "Vuex", "Webpack"],
    certifications: ["Certified Frontend Developer", "Performance Optimization Specialist"],
    languages: ["English", "Chinese"],
    reviews: [
      "Susan was a great collaborator, and her work is outstanding.",
      "Very reliable and professional."
    ],
    location: { city: "Toronto", country: "Canada" },
    profileImg: "https://example.com/images/susan_lee_profile.jpg",  // Added profile image link
    workExperience: [
      { role: "Frontend Developer", desc: "Optimized web app performance and improved load times", startDate: new Date("2018-11-01"), endDate: new Date("2021-11-01") },
      { role: "Web Developer", desc: "Worked with a team to develop a large-scale e-commerce site", startDate: new Date("2017-01-01"), endDate: new Date("2018-10-01") }
    ],
    portfolio: [
      { title: "Online Store Optimization", description: "Optimized online store for fast loading", link: "https://example.com/onlinestore", type: "link" },
      { title: "Vue.js Blog", description: "Vue.js based blog platform", link: "https://example.com/vueblog", type: "link" }
    ]
  },
  {
    email: "lucas.johnson@example.com",
    contactMail:"john.doe@example.com",
    name: "Lucas Johnson",
    bio: "Innovative front-end developer who loves creating beautiful and interactive user interfaces.",
    contactNumber: "+1928374650",
    availableForWork: false,
    hourlyRate: 70.0,
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Redux"],
    certifications: ["React Certified Developer", "UX/UI Design Fundamentals"],
    languages: ["English", "German"],
    reviews: [
      "A fantastic developer with great communication skills.",
      "Delivered high-quality work quickly and efficiently."
    ],
    location: { city: "Berlin", country: "Germany" },
    profileImg: "https://example.com/images/lucas_johnson_profile.jpg",  // Added profile image link
    workExperience: [
      { role: "Lead Frontend Developer", desc: "Led a team to create an interactive React application", startDate: new Date("2019-08-01"), endDate: new Date("2022-08-01") },
      { role: "UI Developer", desc: "Developed UI components for a SaaS application", startDate: new Date("2017-05-01"), endDate: new Date("2019-07-01") }
    ],
    portfolio: [
      { title: "SaaS Dashboard", description: "SaaS Dashboard built with React", link: "https://example.com/saas-dashboard", type: "link" },
      { title: "Next.js Blog", description: "Personal blog built with Next.js", link: "https://example.com/blog", type: "link" }
    ]
  }
];
