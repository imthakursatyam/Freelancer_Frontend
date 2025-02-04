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

import { Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

 function SocialProfileSimple({profile}) {
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

export default function ThreeTierPricing() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
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
          onChange={handleSearchChange}
          placeholder="Search..."
          size="lg"
          borderRadius="md"
          boxShadow="sm"
        />
      </InputGroup>
    </Box>
      <Stack display={"flex"} align="center" py={10}>
        <Wrap spacing={10} justify="center">
          {(freelancers).map((profile, index) => (
            <WrapItem key={index}>
              <SocialProfileSimple profile={profile} />
            </WrapItem>
          ))}
        </Wrap>
      </Stack>
    </Box>
  )
}

const freelancers = [
    {
      "freelancerId": "609c72ef7f53d201f1d0e12d",
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "location": "San Francisco, CA",
      "bio": "Experienced full-stack developer with a passion for building scalable web applications. Expert in JavaScript, React, Node.js, and MongoDB.",
      "contactNumber": "+1 (555) 123-4567",
      "contactEmail": "john.doe@example.com",
      "availableForWork": true,
      "hourlyRate": 45.0,
      "skills": ["JavaScript", "React", "Node.js", "MongoDB"],
      "certifications": ["Certified JavaScript Developer", "AWS Certified Solutions Architect"],
      "languages": ["English", "Spanish"]
    },
    {
      "freelancerId": "609c72ef7f53d201f1d0e12e",
      "email": "alice.smith@example.com",
      "firstName": "Alice",
      "lastName": "Smith",
      "location": "New York, NY",
      "bio": "Creative graphic designer with 5+ years of experience in branding, UI/UX design, and print media. I turn ideas into visually stunning designs.",
      "contactNumber": "+1 (555) 234-5678",
      "contactEmail": "alice.smith@example.com",
      "availableForWork": true,
      "hourlyRate": 60.0,
      "skills": ["Photoshop", "Illustrator", "UI/UX Design", "Branding"],
      "certifications": ["Adobe Certified Expert", "UI/UX Design Specialist"],
      "languages": ["English", "French"]
    },
    {
      "freelancerId": "609c72ef7f53d201f1d0e12f",
      "email": "michael.jones@example.com",
      "firstName": "Michael",
      "lastName": "Jones",
      "location": "Los Angeles, CA",
      "bio": "Experienced marketing strategist specializing in digital marketing, SEO, and content creation. Helping brands grow their online presence and engagement.",
      "contactNumber": "+1 (555) 345-6789",
      "contactEmail": "michael.jones@example.com",
      "availableForWork": false,
      "hourlyRate": 80.0,
      "skills": ["SEO", "Digital Marketing", "Content Strategy", "Social Media Marketing"],
      "certifications": ["Google Analytics Certified", "HubSpot Content Marketing Certification"],
      "languages": ["English"]
    },
    {
      "freelancerId": "609c72ef7f53d201f1d0e130",
      "email": "emily.brown@example.com",
      "firstName": "Emily",
      "lastName": "Brown",
      "location": "Chicago, IL",
      "bio": "Professional software engineer with a focus on Python, Django, and cloud technologies. Enthusiastic about automation and DevOps practices.",
      "contactNumber": "+1 (555) 456-7890",
      "contactEmail": "emily.brown@example.com",
      "availableForWork": true,
      "hourlyRate": 55.0,
      "skills": ["Python", "Django", "AWS", "DevOps"],
      "certifications": ["AWS Certified Developer", "Certified Kubernetes Administrator"],
      "languages": ["English", "German"]
    },
    {
      "freelancerId": "609c72ef7f53d201f1d0e131",
      "email": "chris.miller@example.com",
      "firstName": "Chris",
      "lastName": "Miller",
      "location": "Austin, TX",
      "bio": "Passionate about data analysis and machine learning. I specialize in transforming raw data into actionable insights to help businesses make informed decisions.",
      "contactNumber": "+1 (555) 567-8901",
      "contactEmail": "chris.miller@example.com",
      "availableForWork": true,
      "hourlyRate": 70.0,
      "skills": ["Data Analysis", "Machine Learning", "Python", "SQL", "R"],
      "certifications": ["Certified Data Scientist", "Google Cloud Data Engineer"],
      "languages": ["English", "Portuguese"]
    }
  ]
