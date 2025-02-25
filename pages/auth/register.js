
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  Switch,
  FormControl,
  useColorModeValue,
  HStack,
  PinInput,
  PinInputField,
  Center
} from '@chakra-ui/react'
import React from 'react'
import Router from 'next/router';
import { RiArrowLeftLine, RiMailLine } from "react-icons/ri"
import { useToast } from '@chakra-ui/react'

const avatars = [
  {
    name: 'Ryan Florence',
    url: 'https://bit.ly/ryan-florence',
  },
  {
    name: 'Segun Adebayo',
    url: 'https://bit.ly/sage-adebayo',
  },
  {
    name: 'Kent Dodds',
    url: 'https://bit.ly/kent-c-dodds',
  },
  {
    name: 'Prosper Otemuyiwa',
    url: 'https://bit.ly/prosper-baba',
  },
  {
    name: 'Christian Nwamba',
    url: 'https://bit.ly/code-beast',
  },
]

const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  )
}


const FreelancerRegistration = ({ tab, setTab, handleEmailVerification, form, handleOnChange, spin }) => {
  return (<Box position={'relative'}>
    <Container
      as={SimpleGrid}
      maxW={'7xl'}
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 10, lg: 32 }}
      py={{ base: 10, sm: 20, lg: 32 }}>
      <Stack spacing={{ base: 10, md: 20 }}>
        <Heading
          lineHeight={1.1}
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }} mt={20}>
          Senior web designers{' '}

          <Text as={'span'} bgGradient="linear(to-r, green.400,green.400)" bgClip="text">
            &
          </Text>{' '}
          Full-Stack Developers
        </Heading>
        <Stack direction={'row'} spacing={4} align={'center'}>
          <AvatarGroup>
            {avatars.map((avatar) => (
              <Avatar
                key={avatar.name}
                name={avatar.name}
                src={avatar.url}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                size={useBreakpointValue({ base: 'md', md: 'lg' })}
                position={'relative'}
                zIndex={2}
                _before={{
                  content: '""',
                  width: 'full',
                  height: 'full',
                  rounded: 'full',
                  transform: 'scale(1.125)',
                  bgGradient: 'linear(to-bl, green.400,green.400)',
                  position: 'absolute',
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}
              />
            ))}
          </AvatarGroup>
          <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
            +
          </Text>
          <Flex
            align={'center'}
            justify={'center'}
            fontFamily={'heading'}
            fontSize={{ base: 'sm', md: 'lg' }}
            bg={'gray.800'}
            color={'white'}
            rounded={'full'}
            minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
            minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
            position={'relative'}
            _before={{
              content: '""',
              width: 'full',
              height: 'full',
              rounded: 'full',
              transform: 'scale(1.125)',
              bgGradient: 'linear(to-bl, orange.400,yellow.400)',
              position: 'absolute',
              zIndex: -1,
              top: 0,
              left: 0,
            }}>
            YOU
          </Flex>
        </Stack>
      </Stack>
      <Stack
        bg={'gray.50'}
        rounded={'xl'}
        p={{ base: 4, sm: 6, md: 8 }}
        spacing={{ base: 8 }}
        maxW={{ lg: 'lg' }}>
        <Stack spacing={4}>
          <Heading
            color={'gray.800'}
            lineHeight={1.1}
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
            Sign Up as a Freelancer
            <Text as={'span'} ml={1} bgGradient="linear(to-r, green.400,green.400)" bgClip="text">
              !
            </Text>
          </Heading>
          <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
            We’re looking for amazing engineers just like you! Become a part of our
            rockstar engineering team and skyrocket your career!
          </Text>
        </Stack>
        <Box onSubmit={(e) => handleEmailVerification(e)} as={'form'} mt={10}>
          <Stack spacing={4}>
            <Input
              placeholder="Your Good Name"
              bg={'gray.100'}
              name={'name'}
              onChange={handleOnChange}
              value={form.name}
              type={'text'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              minLength={3}
              isRequired
            />
            <Input
              placeholder="Email"
              type={'email'}
              name={'email'}
              onChange={handleOnChange}
              value={form.email}
              bg={'gray.100'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              isRequired
            />
            <Input
              placeholder="password"
              type={'password'}
              name={'password'}
              onChange={handleOnChange}
              value={form.password}
              bg={'gray.100'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              minLength={8}
              isRequired
            />

          </Stack>

          <Button
            isLoading={spin}
            loadingText="Singing Up"
            spinnerPlacement='end'
            type={"submit"}
            fontFamily={'heading'}
            mt={8}
            w={'full'}

            bgGradient="linear(to-r, green.400,green.300)"
            color={'white'}
            _hover={{
              bgGradient: 'linear(to-r, green.600,green.700)',
              boxShadow: 'xl',
            }}>
            Sign Up
          </Button>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            align={'middle'}
            justify={'center'} my={5} px={4}>
            <Text className='font-bold text-lg ' color={'gray.500'}>Or</Text>

          </Stack>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            align={'middle'}
            justify={'center'} mt={4} px={4}>
            <Text onClick={() => { setTab("recruiter") }} color={'green.400'} className="font-bold cursor-pointer text-xl">Sign Un as Recruiter</Text>

          </Stack>
        </Box>
        form
      </Stack>
    </Container>

  </Box>
  )
}


const RecruiterRegistration = ({ tab, setTab, handleEmailVerification, form, handleOnChange, spin }) => {
  return (<Box position={'relative'}>
    <Container
      as={SimpleGrid}
      maxW={'7xl'}
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 10, lg: 32 }}
      py={{ base: 10, sm: 20, lg: 32 }}>
      <Stack spacing={{ base: 10, md: 20 }}>
        <Heading
          lineHeight={1.1}
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }} mt={20}>
          Senior web designers{' '}

          <Text as={'span'} bgGradient="linear(to-r, green.400,green.400)" bgClip="text">
            &
          </Text>{' '}
          Full-Stack Developers
        </Heading>
        <Stack direction={'row'} spacing={4} align={'center'}>
          <AvatarGroup>
            {avatars.map((avatar) => (
              <Avatar
                key={avatar.name}
                name={avatar.name}
                src={avatar.url}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                size={useBreakpointValue({ base: 'md', md: 'lg' })}
                position={'relative'}
                zIndex={2}
                _before={{
                  content: '""',
                  width: 'full',
                  height: 'full',
                  rounded: 'full',
                  transform: 'scale(1.125)',
                  bgGradient: 'linear(to-bl, green.400,green.400)',
                  position: 'absolute',
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}
              />
            ))}
          </AvatarGroup>
          <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
            +
          </Text>
          <Flex
            align={'center'}
            justify={'center'}
            fontFamily={'heading'}
            fontSize={{ base: 'sm', md: 'lg' }}
            bg={'gray.800'}
            color={'white'}
            rounded={'full'}
            minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
            minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
            position={'relative'}
            _before={{
              content: '""',
              width: 'full',
              height: 'full',
              rounded: 'full',
              transform: 'scale(1.125)',
              bgGradient: 'linear(to-bl, orange.400,yellow.400)',
              position: 'absolute',
              zIndex: -1,
              top: 0,
              left: 0,
            }}>
            YOU
          </Flex>
        </Stack>
      </Stack>
      <Stack
        bg={'gray.50'}
        rounded={'xl'}
        p={{ base: 4, sm: 6, md: 8 }}
        spacing={{ base: 8 }}
        maxW={{ lg: 'lg' }}>
        <Stack spacing={4}>
          <Heading
            color={'gray.800'}
            lineHeight={1.1}
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
            Sign Up as a Recruiter
            <Text as={'span'} ml={1} bgGradient="linear(to-r, green.400,green.400)" bgClip="text">
              !
            </Text>
          </Heading>
          <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
            We’re looking for amazing engineers just like you! Become a part of our
            rockstar engineering team and skyrocket your career!
          </Text>
        </Stack>
        <Box onSubmit={(e) => { handleEmailVerification(e) }} as={'form'} mt={10}>
          <Stack spacing={4}>
            <Input
              placeholder="Your Good Name"
              bg={'gray.100'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              name={'name'}
              onChange={handleOnChange}
              value={form.name}
              type={'text'}
              minLength={3}
              isRequired
            />
            <Input
              placeholder="Email"
              type={'email'}
              bg={'gray.100'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              name={'email'}
              onChange={handleOnChange}
              value={form.email}
              isRequired
            />
            <Input
              placeholder="password"
              type={'password'}
              bg={'gray.100'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              name={'password'}
              onChange={handleOnChange}
              value={form.password}
              minLength={8}
              isRequired
            />

          </Stack>

          <Button
            isLoading={spin}
            loadingText="Signing Up"
            spinnerPlacement='end'
            type={'submit'}
            fontFamily={'heading'}
            mt={8}
            w={'full'}
            bgGradient="linear(to-r, green.400,green.300)"
            color={'white'}
            _hover={{
              bgGradient: 'linear(to-r, green.600,green.700)',
              boxShadow: 'xl',
            }}>
            Sign Up
          </Button>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            align={'middle'}
            justify={'center'} my={5} px={4}>
            <Text className='font-bold text-lg ' color={'gray.500'}>Or</Text>

          </Stack>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            align={'middle'}
            justify={'center'} mt={4} px={4}>
            <Text onClick={() => { setTab("freelancer") }} color={'green.400'} className="font-bold text-xl cursor-pointer">Sign Up as Freelancer</Text>

          </Stack>
        </Box>
        form
      </Stack>
    </Container>

  </Box>
  )
};

const VerifyFreelancerEmail = ({ otp, setOtp, handleOnSubmitFreelancer, handleOnChange, setTab, spin }) => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'sm'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={10}>
        <Button className='w-1/5' colorPalette="teal" variant="outline">
          <RiArrowLeftLine onClick={() => setTab("freelancer")} className='' />
        </Button>
        <Center className='text-center'>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Verify your Email
          </Heading>
        </Center>
        <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          We have sent code to your email
        </Center>
        <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          fontWeight="bold"
          color={useColorModeValue('gray.800', 'gray.400')}>
        </Center>
        <FormControl>
          <Center>
            <HStack>
              <PinInput type='alphanumeric'>
                <PinInputField
                  value={otp[0]}
                  onChange={(e) => handleOnChange(e.target.value, 0)} // Extract value from event
                />
                <PinInputField
                  value={otp[1]}
                  onChange={(e) => handleOnChange(e.target.value, 1)} // Extract value from event
                />
                <PinInputField
                  value={otp[2]}
                  onChange={(e) => handleOnChange(e.target.value, 2)} // Extract value from event
                />
                <PinInputField
                  value={otp[3]}
                  onChange={(e) => handleOnChange(e.target.value, 3)} // Extract value from event
                />
                <PinInputField
                  value={otp[4]}
                  onChange={(e) => handleOnChange(e.target.value, 4)} // Extract value from event
                />
                <PinInputField
                  value={otp[5]}
                  onChange={(e) => handleOnChange(e.target.value, 5)} // Extract value from event
                />
              </PinInput>
            </HStack>
          </Center>
          <Stack my={5} spacing={6}>
            <Button
              isLoading={spin}
              loadingText="Verifying"
              spinnerPlacement='end'
              onClick={handleOnSubmitFreelancer}
              bg={'green.400'}
              color={'white'}
              _hover={{
                bg: 'green.500',
              }}>
              Verify
            </Button>
          </Stack>
        </FormControl>

      </Stack>
    </Flex>
  )
}

const VerifyRecruiterEmail = ({ otp, setOtp, handleOnSubmitRecruiter, handleOnChange, setTab, spin }) => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'sm'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={10}>
        <Button className='w-1/5' colorPalette="teal" variant="outline">
          <RiArrowLeftLine onClick={() => setTab("recruiter")} className='' />
        </Button>
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Verify your Email
          </Heading>
        </Center>
        <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          We have sent code to your email
        </Center>
        <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          fontWeight="bold"
          color={useColorModeValue('gray.800', 'gray.400')}>

        </Center>
        <FormControl>
          <Center>
            <HStack>
              <PinInput type='alphanumeric'>
                <PinInputField
                  value={otp[0]}

                  onChange={(e) => handleOnChange(e.target.value, 0)} // Extract value from event
                />
                <PinInputField
                  value={otp[1]}
                  onChange={(e) => handleOnChange(e.target.value, 1)} // Extract value from event
                />
                <PinInputField
                  value={otp[2]}
                  onChange={(e) => handleOnChange(e.target.value, 2)} // Extract value from event
                />
                <PinInputField
                  value={otp[3]}
                  onChange={(e) => handleOnChange(e.target.value, 3)} // Extract value from event
                />
                <PinInputField
                  value={otp[4]}
                  onChange={(e) => handleOnChange(e.target.value, 4)} // Extract value from event
                />
                <PinInputField
                  value={otp[5]}
                  onChange={(e) => handleOnChange(e.target.value, 5)} // Extract value from event
                />
              </PinInput>
            </HStack>
          </Center>
          <Stack my={5} spacing={6}>
            <Button
              isLoading={spin}
              loadingText="Verifying"
              spinnerPlacement='end'
              onClick={handleOnSubmitRecruiter}
              bg={'green.400'}
              color={'white'}
              _hover={{
                bg: 'green.500',
              }}>
              Verify
            </Button>
          </Stack>
        </FormControl>

      </Stack>
    </Flex>
  )
}


export default function register() {
  const [tab, setTab] = React.useState("freelancer");
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: ""
  })
  const toast = useToast();
  const [spin, setSpin] = React.useState(false);
  const [otp, setOtp] = React.useState([1, 2, 3, 4, 5, 6]);
  const handleOnChangeOtp = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value; 
    setOtp(newOtp);
  }

  const handleOnSubmitFreelancer = async () => {
    try {
      setSpin(true);
      if (otp.join("").toString().length != 6) alert("Invalid OTP");
      let headersList = {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
  
      let bodyContent = JSON.stringify({
        "name": form.name,
        "email": form.email,
        "password": form.password,
        "role": "FREELANCER", //must be in uppercase
        "otp": otp.join("").toString()
      });
  
      let response = await fetch("http://localhost:8080/register/freelancer", {
        method: "POST",
        body: bodyContent,
        headers: headersList
      });
  
      let data = await response.json();
      setSpin(false);
      if (data.success) {
        toast({
          title: 'Success',
          description: data.message,
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
        Router.push("/auth/login");
      } else {
        toast({
          title: `${data.message}`,
          status: "error",
          isClosable: true,
          duration: 4000,
          isClosable: true
        })
        setTab("freelancer");
        setForm({ name: "", email: "", password: "" });
      }
    } catch (error) {
      setSpin(false);
      toast({
        title: "Some Error Occurred",
        status: "error",
        isClosable: true,
        duration: 4000,
        isClosable: true
      })
    }
   
    
  }

  const handleOnSubmitRecruiter = async () => {
    try {
      setSpin(true);
      if (otp.length != 6) alert("Invalid OTP");
      let headersList = {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
  
      let bodyContent = JSON.stringify({
        "name": form.name,
        "email": form.email,
        "password": form.password,
        "role": "RECRUITER", //must be in uppercase
        "otp": otp.join("").toString()
      });
  
      let response = await fetch("http://localhost:8080/register/recruiter", {
        method: "POST",
        body: bodyContent,
        headers: headersList
      });
  
      let data = await response.json();
      setSpin(false);
      if (data.success) {
        toast({
          title: 'Success',
          description: data.message,
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
        Router.push("/auth/login");
      } else {
        toast({
          title: `${data.message}`,
          status: "error",
          isClosable: true,
          duration: 4000,
          isClosable: true
        })
        setTab("recruiter");
        setForm({ name: "", email: "", password: "" })
        setOtp()
      }  
    } catch (error) {
      setSpin(false);
      toast({
        title: "Some Error Occurred",
        status: "error",
        isClosable: true,
        duration: 4000,
        isClosable: true
      })
    }
 
  }

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleEmailVerification = async (e) => {
    try {
      setSpin(true);
    e.preventDefault();
    if (form.name.length < 3) alert("Name must be atleast 3 characters long");
    if (form.password.length < 8) alert("Password must be atleast 8 characters long");
    if (!form.email.includes("@")) alert("Invalid email");
    let headersList = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "email": form.email,
      "password": form.password,
      "role": tab.toUpperCase() //must be in uppercase
    });

    let response = await fetch("http://localhost:8080/sendOTP", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.json();
    setSpin(false);
    if (!data.success) {
      toast({
        title: `${data.message}`,
        status: "error",
        isClosable: true,
        duration: 4000,
        isClosable: true
      })
      return;
    }
    toast({
      title: 'Success',
      description: data.message,
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
    if (tab == "freelancer") setTab("verifyFreelancerEmail");
    if (tab == "recruiter") setTab("verifyRecruiterEmail");
    } catch (error) {
      setSpin(false);
      toast({
        title: "Some Error Occurred",
        status: "error",
        isClosable: true,
        duration: 4000,
        isClosable: true
      })
    }
    
  }
  return (
    <>
      {tab == "freelancer" && <FreelancerRegistration handleEmailVerification={handleEmailVerification} tab={tab} setTab={setTab} form={form} handleOnChange={handleOnChange} spin={spin} />}
      {tab == "recruiter" && <RecruiterRegistration handleEmailVerification={handleEmailVerification} tab={tab} setTab={setTab} form={form} handleOnChange={handleOnChange} spin={spin} />}
      {tab == "verifyFreelancerEmail" && <VerifyFreelancerEmail otp={otp} setOtp={setOtp} handleOnSubmitFreelancer={handleOnSubmitFreelancer} handleOnChange={handleOnChangeOtp} setTab={setTab} spin={spin} />}
      {tab == "verifyRecruiterEmail" && <VerifyRecruiterEmail otp={otp} setOtp={setOtp} handleOnSubmitRecruiter={handleOnSubmitRecruiter} handleOnChange={handleOnChangeOtp} setTab={setTab} spin={spin} />}
    </>
  );
}
/*
 
*/