import React from 'react';
import { 
    Button, 
    Card, CardHeader, CardBody, 
    Heading, Stack, StackDivider, Box, Text, 
    Tag, TagLabel, TagCloseButton, 
    Highlight, Flex, Badge, useToast, 
    Tabs, TabList, TabPanels, Tab, TabPanel, 
    Table, Thead, Tbody, Tfoot, Tr, Th, Td, 
    TableCaption, TableContainer, 
    Modal, ModalOverlay, ModalContent, 
    ModalHeader, ModalFooter, ModalBody, 
    ModalCloseButton, useDisclosure, 
    Avatar, AlertDialog, AlertDialogBody, 
    AlertDialogFooter, AlertDialogHeader, 
    AlertDialogContent, AlertDialogOverlay, 
    AlertDialogCloseButton, UnorderedList, 
    ListItem, 
} from '@chakra-ui/react';


import { MdOutlineDelete, MdEditDocument } from "react-icons/md";
import Link from "next/link";
import cookie from "cookie";

function AcceptDialog({jobPostId, applicationId, fetchJobApplications}) {
  const [spin, setSpin] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef();
  const toast = useToast();

  const handleAccept = async () => {
    try {
      setSpin(true);
      let headersList = {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
      let response = await fetch("http://localhost:8080/recruiter/reviewJobPostApplication", {
        method: "POST",
        headers: headersList,
        credentials: "include",
        body: JSON.stringify({ "applicationId": applicationId, status: "ACCEPTED" }),
      });
      let data = await response.json();
      setSpin(false);
      if (data.success) {
        toast({
          title: 'JobPost',
          description: data.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        fetchJobApplications(jobPostId);
      } else {
        toast({
          title: 'JobPost',
          description: data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }

    } catch (error) {
      setSpin(false);
      toast({
        title: 'JobPost',
        description: "Something went wrong",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    onClose();
  }
  return (
    <>
      <Button mr={2} size={"xs"} bg="green.500" textColor="white" onClick={onOpen}> {spin ? "loading..." : "Accept"}</Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Accept Application</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <UnorderedList className="text-xs my-2 " spacing={3}>
              <ListItem>The freelancer will be notified about the application. </ListItem>
              <ListItem>The freelancer will be able to see your email.</ListItem>
              <ListItem>You both will be able to chat after you accepts the application.</ListItem>
              <ListItem>Your conversation history will be available on our platform for reference.</ListItem>
              <ListItem>If the freelancer is unresponsive, you can explore other candidates on the platform.</ListItem>
            </UnorderedList>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button size="sm" ref={cancelRef} onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => handleAccept()} size="sm" colorScheme='green' ml={3}>
              Accept
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

function RejectDialog({jobPostId, applicationId, fetchJobApplications}) {
  const [spin, setSpin] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();
  const handleReject = async () => {
    try {
      setSpin(true);
      let headersList = {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
      let response = await fetch("http://localhost:8080/recruiter/reviewJobPostApplication", {
        method: "POST",
        headers: headersList,
        credentials: "include",
        body: JSON.stringify({ "applicationId": applicationId, status: "REJECTED" }),
      });
      let data = await response.json();
      setSpin(false);
      if (data.success) {
        toast({
          title: 'JobPost',
          description: data.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        fetchJobApplications(jobPostId);
      } else {
        toast({
          title: 'JobPost',
          description: data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }

    } catch (error) {
      setSpin(false);
      toast({
        title: 'JobPost',
        description: "Something went wrong",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    onClose();
  }

  return (
    <>
      <Button size="xs" colorScheme='red' onClick={onOpen}>
        {spin ? "loading..." : "Reject"}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Reject Application
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={() => handleReject()} colorScheme='red' ml={3}>
                Reject
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
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
        let response = await fetch("http://localhost:8080/recruiter/getJobPosts", {
            method: "POST",
            headers: headersList,
            credentials: "include"
        });


        let data = await response.json();
        if (!data.success) throw new Error("No Jobposts");

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

function ProfileModal({ isOpen, onClose, profile }) {

    return (
        <>
            <Modal onClose={onClose} scrollBehavior='inside' size={"xl"} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {profile && ProfilePage({ fetchedProfile: profile })}
                        {!profile && <div>Loading please wait</div>}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


const ProfilePage = ({ fetchedProfile }) => {
    const [profile, setProfile] = React.useState({
        name: "",
        email: "",
        contactMail: "",
        bio: "",
        contactNumber: "",
        availableForWork: false,
        hourlyRate: 0,
        country: "",
        state: '',
        city: ""
    });
    const [exp, setExp] = React.useState([]);
    const [prf, setPrf] = React.useState([]);
    const [cert, setCert] = React.useState([]);
    const [lang, setLang] = React.useState([]);
    const [skill, setSkill] = React.useState([]);

    const calculateYear = (start, end) => {
        let date1 = new Date(start);
        let date2 = new Date(end);

        // Get the difference in years and months
        let yearsDifference = date2.getFullYear() - date1.getFullYear();
        let monthsDifference = date2.getMonth() - date1.getMonth();

        // If the month difference is negative, adjust the years and months
        if (monthsDifference < 0) {
            yearsDifference--;
            monthsDifference += 12; // Add 12 months to the difference
        }
        return yearsDifference > 0 ? `${yearsDifference} Years ${monthsDifference} Months` : `${monthsDifference} Months`;

    }


    React.useEffect(() => {
        const { name = 'Unknown', email = "not-provided@gmail.com", contactMail = 'not-provided@example.com', bio = 'No bio provided', contactNumber = 'Not available', availableForWork = false, hourlyRate = 0, location = { country: 'Unknown', state: 'Unknown', city: 'Unknown' } } = fetchedProfile || {};
        const { workExperience = [], portfolio = [], certifications = [], languages = [], skills = [] } = fetchedProfile || {};
        const { country, state, city } = location;
        setProfile({ name, email, contactMail, bio, contactNumber, availableForWork, hourlyRate, country, state, city });
        setExp(workExperience);
        setPrf(portfolio);
        setCert(certifications);
        setLang(languages);
        setSkill(skills);
        console.log(fetchedProfile)
    }, [fetchedProfile])

    return (
        <div>
            <div className="mt-10 sm:mt-16 w-full justify-between flex px-6 items-center  border-b-2 border-gray-200 pb-6">
                <div className='flex items-center '>
                    <Avatar size='xl' name='Christian Nwamba' src='https://bit.ly/code-beast' />{' '}
                    <Heading className='inline ml-4' size='lg' fontSize='50px'>
                        {profile.name}
                    </Heading>
                </div>
                <Link className='bg-green-500 p-2 px-3 text-white rounded-md font-bold text-sm' href="/freelancer/user/updateProfile">Message</Link>
            </div>
            <div className="mt-6   border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.name}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Email address</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.contactMail}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Hourly Rate</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">${profile.hourlyRate}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">About</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {profile.bio}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Contact Number</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.contactNumber}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Location</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.city}, {profile.state}, {profile.country}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Languages</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{lang.join(", ")}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Skills</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{skill.join(", ")}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Certifications</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{cert.join(", ")}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Work Experience</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <div className="space-y-4">
                                {exp.map((exp, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm/6 font-medium text-gray-900">{exp.role}</p>
                                            <p className="text-sm/6 text-gray-500">{exp.desc}</p>
                                        </div>
                                        <p className="text-sm/6 text-gray-500">{calculateYear(exp.startDate, exp.endDate)}</p>
                                    </div>
                                ))}
                            </div>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Portfolio</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <div className="space-y-4">
                                {prf.map((exp, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm/6 font-medium text-gray-900">{prf.title}</p>
                                            <p className="text-sm/6 text-gray-500 px-3">{exp.desc}</p>
                                        </div>
                                        <a href={prf.link} className="text-sm/6 text-blue-500 cursor-pointer">View</a>
                                    </div>
                                ))}
                            </div>
                        </dd>
                    </div>



                </dl>
            </div>
        </div>

    );
};


export default function jobposts({ jobPosts }) {
    const [application, setApplications] = React.useState([]);
    const [profile, setProfile] = React.useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [id, setId] = React.useState("");
    const toast = useToast();
    const viewProfile = (id) => {
        setId(id);
        fetchProfile(id);
    }
    const fetchProfile = async (userId) => {
        try {
            let headersList = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
            let response = await fetch("http://localhost:8080/recruiter/getFreelancerProfile", {
                method: "POST",
                headers: headersList,
                credentials: "include",
                body: JSON.stringify({ "id": userId })
            });
            let data = await response.json();
            if (data.success) {
                setProfile(data.profile);
                onOpen();
            } else {
                toast({
                    title: 'JobPost',
                    description: "Unable to Get User Profile",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
        } catch (error) {
            toast({
                title: 'JobPost',
                description: "Unable to Get User Profile",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }

    }

    const fetchJobApplications = async (postId) => {

        try {
            let headersList = {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
            let response = await fetch("http://localhost:8080/recruiter/getJobPostApplications", {
                method: "POST",
                headers: headersList,
                credentials: "include",
                body: JSON.stringify({ "postId": postId })
            });
            let data = await response.json();
            if (data.success) {
                setApplications(data.applications)
            } else {
                toast({
                    title: 'JobPost',
                    description: "Unable to Get Applications",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
        } catch (error) {
            toast({
                title: 'JobPost',
                description: "Unable to Get Applications",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }


    return (<>
        <ProfileModal profile={profile} isOpen={isOpen} onClose={onClose} />
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
                        {jobPosts && jobPosts.map((job, index) => (
                            <Card className='p-4 pt-6 mb-6' key={index}>
                                <Tabs variant='soft-rounded' colorScheme='green'>
                                    <TabList className='pl-4'>
                                        <Tab onClick={() => setApplications([])}>Post</Tab>
                                        <Tab onClick={() => fetchJobApplications(job.id)}>Applications</Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel>
                                            <Flex >
                                                <CardHeader>
                                                    <Heading color={"green.700"} size='md'>{job.title}</Heading>
                                                </CardHeader>

                                            </Flex>
                                            <CardBody>
                                                <Stack divider={<StackDivider />} spacing='4'>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            skills
                                                        </Heading>
                                                        <Stack direction="row" mt={4} spacing={4}>
                                                            {(job.skills && job.skills.length > 0) && job.skills.map((name, idx) => (
                                                                <Badge variant="solid" rounded="md" px={"5px"} py={"3px"} colorScheme='green'>{name}</Badge>
                                                            ))}
                                                        </Stack>
                                                    </Box>
                                                    <Box>
                                                        <Heading size='xs' textTransform='uppercase'>
                                                            Experience
                                                        </Heading>
                                                        <Text pt='2' fontSize='sm'>
                                                            {job.exp && job.exp.map((e) => e + ", ")}
                                                        </Text>
                                                    </Box>

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
                                        </TabPanel>
                                        <TabPanel>
                                            {(application && application.length > 0) ? <TableContainer  >


                                                <div className='w-full' style={{ maxHeight: "300px", overflowY: "auto" }}>
                                                    <Table variant='simple' >

                                                        <Thead>
                                                            <Tr className='text-sm'>
                                                                <Th>S/N</Th>
                                                                <Th>Profile</Th>
                                                                <Th>Applied Date</Th>
                                                                <Th className='' >Message</Th>
                                                                <Th>Status</Th>
                                                                <Th>Action</Th>
                                                            </Tr>
                                                        </Thead>

                                                    </Table>
                                                    <Table variant="simple" className='' >

                                                        <Tbody className=''>
                                                            {application.map((ap, idx) => (
                                                                <Tr key={idx} className="text-sm">
                                                                    <Td >{idx + 1}</Td>
                                                                    <Td onClick={() => viewProfile(ap.freelancerId)} className="cursor-pointer">
                                                                        View Profile
                                                                    </Td>
                                                                    <Td>{new Date(ap.date).toLocaleDateString()}</Td>
                                                                    <Td className="bg-black text-xs">{ap.freelancerMessage}</Td>
                                                                    <Td className=" text-xs">{ap.status}</Td>
                                                                    <Td className=" text-xs">
                                                                       {ap.status == "PENDING" && <AcceptDialog jobPostId={job.id} applicationId={ap.id} fetchJobApplications={fetchJobApplications} />}
                                                                       {ap.status == "PENDING" && <RejectDialog jobPostId={job.id} applicationId={ap.id} fetchJobApplications={fetchJobApplications} />}
                                                                    </Td>
                                                                </Tr>
                                                            ))}
                                                            {!job.applicationList && <Tr><Td colSpan="6" className="text-center">No Job Applications for this Post</Td></Tr>}
                                                        </Tbody>
                                                    </Table>
                                                </div>
                                            </TableContainer> : <div className='text-center text-md p-2  mb-4'>No Job Applications for this Post</div>}

                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>


                            </Card>

                        ))}

                        {(!jobPosts || jobPosts.length == 0) && <div>No Jobposts</div>}
                    </div>
                </div>

            </div>
        </div>
    </>
    )
}

