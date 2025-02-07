import Router from 'next/router';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {setLogin, setCurrRole} from "../../store/slices/authState";
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
  useColorModeValue,
  FormControl
} from '@chakra-ui/react'
import React from 'react'

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


const FreelancerLogin = ({tab, setTab, handleOnSubmit, form, handleOnChange}) => {
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
            Sign In as a Freelancer
            <Text as={'span'} ml={1} bgGradient="linear(to-r, green.400,green.400)" bgClip="text">
              !
            </Text>
          </Heading>
          <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
            We’re looking for amazing engineers just like you! Become a part of our
            rockstar engineering team and skyrocket your career!
          </Text>
        </Stack>
        <Box onSubmit={(e)=>{handleOnSubmit(e)}} as={'form'} mt={10}>
          <Stack spacing={4}>
            <Input
              placeholder="Email"
              type={'email'}
              bg={'gray.100'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              name={"email"}
              value={form.email}
              isRequired
              onChange={handleOnChange}
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
              name={"password"}
              value={form.password}
              isRequired
              minLength={8}
              onChange={handleOnChange}
            />
           
          </Stack>
          <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'} mt={4} px={4}>
              <Link href="/auth/register"  className="text-gray-400 cursor-pointer">Don't have an account?</Link>
              <Text className="cursor-pointer" onClick={() => {setTab(["forgotPassword"])}} color={'blue.400'}>Forgot password?</Text>
            </Stack>
          <Button 
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
            Submit
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
              <Text onClick={() => {setTab(["recruiter"])}} color={'green.400'} className="font-bold cursor-pointer text-xl">Sign In as Recruiter</Text>
              
            </Stack>
        </Box>
        form
      </Stack>
    </Container>
    
  </Box>
)}


const RecruiterLogin = ({tab, setTab, handleOnSubmit, form, handleOnChange}) => {
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
            Sign In as a Recruiter
            <Text as={'span'} ml={1} bgGradient="linear(to-r, green.400,green.400)" bgClip="text">
              !
            </Text>
          </Heading>
          <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
            We’re looking for amazing engineers just like you! Become a part of our
            rockstar engineering team and skyrocket your career!
          </Text>
        </Stack>
        <Box onSubmit={(e)=>{handleOnSubmit(e)}} as={'form'} mt={10}>
          <Stack spacing={4}>
            <Input
              placeholder="Email"
              type={'email'}
              bg={'gray.100'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              name={"email"}
              value={form.email}
              isRequired
              onChange={handleOnChange}
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
              name={"password"}
              value={form.password}
              isRequired
              minLength={8}
              onChange={handleOnChange}
            />
           
          </Stack>
          <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'} mt={4} px={4}>
              <Link href="/auth/register" className="text-gray-400 cursor-pointer">Don't have an account?</Link>
              <Text className="cursor-pointer" onClick={() => {setTab(["forgotPassword"])}} color={'blue.400'}>Forgot password?</Text>
            </Stack>
          <Button
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
            Submit
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
              <Text onClick={() => {setTab(["freelancer"])}} color={'green.400'} className="font-bold text-xl cursor-pointer">Sign In as Freelancer</Text>
              
            </Stack>
        </Box>
        form
      </Stack>
    </Container>
    
  </Box>
)};

const ForgotPassword = ({tab, setTab, handleForgotPassword}) => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            onClick={handleForgotPassword}
            bg={'green.400'}
            color={'white'}
            _hover={{
              bg: 'green.500',
            }}>
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}
export default function register() {
  const [tab, setTab] = React.useState("freelancer");
  const [form, setForm] = React.useState({
     email: "",
     password:""
   })
   const dispatch = useDispatch();

   const handleOnSubmitFreelancer = async (e) => {
     e.preventDefault();    
     let headersList = {
      "Accept": "application/json",
      "Content-Type": "application/json"
     }
     let bodyContent = JSON.stringify({
       "email":form.email,
       "password":form.password,
       "role":"FREELANCER"
     });
     
     let response = await fetch("http://localhost:8080/login", { 
       method: "POST",
       body: bodyContent,
       headers: headersList,
       credentials: "include"
     });
     
     let data = await response.json();
     console.log(data)
     console.log(data.message)
     if (data.success) {
      alert(data.message);
      dispatch(setLogin({val:true}));
      dispatch(setCurrRole({val:"FREELANCER"}));
      Router.push("/");
    } else {
      alert(data.message+", Please try again");
    }
   }

   const handleOnSubmitRecruiter = async (e) => {
    e.preventDefault();   
    let headersList = {
      "Accept": "application/json",
      "Content-Type": "application/json"
     }
     
     let bodyContent = JSON.stringify({
       "email":form.email,
       "password":form.password,
       "role":"RECRUITER"
     });
     
     let response = await fetch("http://localhost:8080/login", { 
       method: "POST",
       body: bodyContent,
       headers: headersList, 
       credentials: "include"
     });
     
     let data = await response.json();
     if (data.success) {
      alert(data.message);
      dispatch(setLogin({val:true}));
      dispatch(setCurrRole({val:"RECRUITER"}));
      Router.push("/");
    } else {
      alert(data.message+", Please try again");
    }
     
   }
   const handleOnChange = (e) => {
     setForm({...form, [e.target.name]:e.target.value});
   }
 
  const handleForgotPassword = () => {
    console.log("forgot password");
    setTab("freelancer");
  }

  return (
    <>
    {tab == "freelancer" && <FreelancerLogin tab={tab} setTab={setTab} handleOnSubmit={handleOnSubmitFreelancer} form={form} handleOnChange={handleOnChange}/>}
    {tab == "recruiter" && <RecruiterLogin tab={tab} setTab={setTab} handleOnSubmit={handleOnSubmitRecruiter} form={form} handleOnChange={handleOnChange}/>}
    {tab == "forgotPassword" && <ForgotPassword tab={tab} setTab={setTab} handleForgotPassword={handleForgotPassword}/>}
    </>
  );
}

/**
 * 
 *       
      
      
 */