import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  BellIcon
} from '@chakra-ui/icons'
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrRole, setLogin } from '@/store/slices/authState';
import { addNotification, removeNotification, clearNotifications} from '@/store/slices/notificationState';
import { clearChatState } from '@/store/slices/chatState.js';
import { useRouter } from 'next/router';
import useWebSocket from '../../services/webSocket.js';
import React from 'react';
import {
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,

} from '@chakra-ui/react'
import { FaRegBell } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";


const Notifications = () => {
  const notifications = useSelector((state) => state.Notification);
  const { removeNt } = useWebSocket();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const handleRemoveNotification = (Notification) => {
    removeNt({type: "DELETE_NOTIFICATION", notification: Notification});
    dispatch(removeNotification({id: Notification.id}));
  };


  // Handle mouse enter to open the popover
 //  <FaRegBell className={isOpen ? "text-green-500 mx-4": "mx-4"} onMouseOver={onOpen} onMouseOut={onClose}  />

  return (<>
      <Button size="sm" mx={4} ref={btnRef} colorScheme='green' onClick={onOpen}>
        <FaRegBell/>
      </Button>
    <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
 
      >
        <DrawerOverlay />
        <DrawerContent >
          <DrawerCloseButton />
          <DrawerHeader className=''> Notifications</DrawerHeader>
          <DrawerBody className=''>

            {(notifications && notifications.length > 0 ) && notifications.map((item) => {
              return <div className='w-full border min-h-20 p-2 pb-4 mb-3'>
              <div className='w-full flex justify-between'>
                <h1>{item.subject}</h1>
                <MdDeleteOutline onClick={()=> handleRemoveNotification(item)} className='inline-block cursor-pointer text-red-500'/>
              </div>
              <div className='w-full'>
                <p className='text-xs pt-2'>{item.message}</p>
              </div>
            </div>
            })}
            {(!notifications || notifications.length == 0 ) && <div className='w-full  flex min-h-full p-2 pb-4 mb-3'>
              <div className='w-full flex justify-center items-center'>
                <p className='inline'><MdDeleteOutline className='inline-block cursor-pointer mx-2 mb-1'/>
                 No Notifications 
                </p>
                
              </div>
            </div>
            }

            
          </DrawerBody>

          <DrawerFooter>
           
            
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  </>)
}










export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure()
  const authStatus = useSelector((state) => state.Auth.isLogin);
  const currRole = useSelector((state) => state.Auth.currRole);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      let headersList = {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
      let response = await fetch("http://localhost:8080/auth/logout", {
        method: "GET",
        headers: headersList,
        credentials: "include"
      });

      let data = await response.json();
      if (data.success == true) {
        dispatch(setLogin({ val: false }));
        dispatch(setCurrRole({ val: "" }));
        dispatch(clearNotifications());
        dispatch(clearChatState());
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }

  };




  return (
    <Box className='fixed  w-full top-0 z-50 '>
      <Flex
        className='font-lato'
        bg={useColorModeValue('black', 'gray.800')}
        color={useColorModeValue('gray.100', 'white')}
        minH={'65px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('black', 'gray.900')}
        shadow={"lg"}
        justify={""}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          className=''
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            className=' text-gray-100'
            icon={isOpen ? <CloseIcon className='text-gray-50' w={3} h={3} /> : <HamburgerIcon className='text-gray-50' w={5} h={5} />}
            variant={'ghost'}
            color={useColorModeValue('gray.100', 'white')}
            aria-label={'Toggle Navigation'}
            _hover={{
              bg: useColorModeValue('black', 'gray.900'),
            }}
            _active={{ bg: useColorModeValue('black', 'gray.900') }}
          />
        </Flex>
        <Flex className='' flex={{ base: 1 }}  justify={{ base: 'center', md: 'start' }}>
          <Link href="http://localhost:3000/">
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              color={useColorModeValue('pink.500', 'pink')}
              className='font-bold font-lato text-xl '
            >
              Freelancer
            </Text>
          </Link>

          <Flex ml="auto" mr={6} display={{ base: 'none', md: 'flex' }} justify={'center'} align={'center'}>
            {authStatus && <Notifications />}
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>

          {!authStatus && <Link href="/auth/login"><Button mt={2.5} fontSize={'sm'} fontWeight={400} variant={'link'} href={'#'}>
            Sign In
          </Button></Link>}


          {!authStatus && <Link href="/auth/register"><Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            href={'#'}
            _hover={{
              bg: 'pink.400',
            }}>
            Sign Up
          </Button></Link>}

          {authStatus && <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}>
              <Avatar
                size={'sm'}
                src={
                  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                }
              />
            </MenuButton>
            <MenuList p={2}>
              <MenuItem onClick={currRole == "FREELANCER" ? () => router.push("/freelancer/user/userProfile") : () => router.push("/recruiter/user/userProfile")} className='hover:text-green-400 rounded-md' _hover={{ bg: useColorModeValue('green.50', 'gray.900') }} >Profile
                <Flex
                  transition={'all .2s ease'}
                  className='hover:opacity-100 hover:transform hover:translate-x-0 transition-all'
                  transform={'translateX(-10px)'}
                  opacity={0}
                  Hover={{ opacity: '100%', transform: 'translateX(0)' }}
                  justify={'flex-end'}
                  align={'center'}
                  flex={1}>
                  <Icon color={'green.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
              </MenuItem>
              <MenuItem onClick={() => router.push("/chat/chatPage")} className='hover:text-green-400 rounded-md' _hover={{ bg: useColorModeValue('green.50', 'gray.900') }} >Chats
                <Flex
                  transition={'all .2s ease'}
                  className='hover:opacity-100 hover:transform hover:translate-x-0'
                  transform={'translateX(-10px)'}
                  opacity={0}
                  Hover={{ opacity: '100%', transform: 'translateX(0)' }}
                  justify={'flex-end'}
                  align={'center'}
                  flex={1}>
                  <Icon color={'green.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout} className='hover:text-red-500 rounded-md hover:font-bold' _hover={{ bg: useColorModeValue('red.100', 'gray.900') }} >Logout
                <Flex
                  transition={'all .2s ease'}
                  className='hover:opacity-100 hover:transform hover:translate-x-0'
                  transform={'translateX(-10px)'}
                  opacity={0}
                  Hover={{ opacity: '100%', transform: 'translateX(0)' }}
                  justify={'flex-end'}
                  align={'center'}
                  flex={1}>
                  <Icon color={'red.500'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
              </MenuItem>
            </MenuList>
          </Menu>}

        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')
  const currRole = useSelector((state) => state.Auth.currRole);
  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => {
        return navItem.role == currRole && <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>

              <Box
                p={2}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Box>

            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => {
                    return <DesktopSubNav key={child.label} {...child} />
                  })}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      })}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link href={href}>
      <Box
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('green.50', 'gray.900') }}>
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: 'green.400' }}
              fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}>
            <Icon color={'green.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Box>
    </Link>
  )
}

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('black', 'gray.800')} minH={"full"} style={{minHeight:"100%"}} className='font-lato min-h-full' p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack minH={60} bg={"black"} spacing={4} onClick={children && onToggle}>
      <Box
        className='flex justify-between'
        py={2}
        as="a"
        href={href ?? '#'}
        
        _hover={{
          textDecoration: 'none',
        }}>
        <Text className='' fontWeight={600} color={useColorModeValue('gray.100', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            color={useColorModeValue('gray.100', 'gray.200')}
            mr={2}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen}   animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          my={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          color={useColorModeValue('gray.200', 'gray.700')} 
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}


const NAV_ITEMS = [
  {
    label: 'Jobpost',
    children: [
      {
        label: 'Make a Jobpost',
        subLabel: 'Create a public jobpost for freelancers',
        href: '/recruiter/jobpost/create',
      },
      {
        label: 'Your Jobposts',
        subLabel: 'View posted jobposts',
        href: '/recruiter/jobpost/view',
      },
      {
        label: 'Update a Jobpost',
        subLabel: 'Update or delete you posted jobposts',
        href: '/recruiter/jobpost/view',
      },
      {
        label: 'Applicatons',
        subLabel: 'List of all freelancer application for your posted Jobpost',
        href: '/recruiter/jobpost/jobApplication',
      }
    ],
    role: "RECRUITER"
  },
  {
    label: 'Find Work',
    children: [
      {
        label: 'Explore',
        subLabel: 'Find your dream job from our top recruiters',
        href: '/freelancer/jobpost/exploreJobs',
      },
      {
        label: 'Applied Jobposts',
        subLabel: 'Manage your applied jobposts',
        href: '/freelancer/jobpost/appliedJobpost',
      }
    ],
    role: "FREELANCER"
  },
  {
    label: 'Hire a Freelancer',
    children: [
      {
        label: 'Find a Freelancer',
        subLabel: 'List of top rated active freelancers',
        href: '/recruiter/freelancer/searchFreelancer',
      }
    ],
    role: "RECRUITER"
  },
]