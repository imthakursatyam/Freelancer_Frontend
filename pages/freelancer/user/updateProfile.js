import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Textarea,
  Badge
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import React from 'react'
import Example from './userProfile'
import { IoIosClose } from "react-icons/io";
import cookie from 'cookie';
import { useToast } from '@chakra-ui/react'

const ExperienceModal = ({ exp, setExp }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [data, setData] = React.useState({
    role: "",
    desc: "",
    startDate: "",
    endDate: ""
  });
  const dataOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleOnSumit = () => {
    setExp([...exp, data]);
    console.log(data);
    setData({ title: "", desc: '', startDate: '', endDate: '' });
    onClose();
  }

  return (
    <>
      <Button size={"sm"} colorScheme='green' onClick={onOpen}>Add Experience</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Experience</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='text-sm' pb={6}>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Input value={data.role} name='role' onChange={(e) => dataOnChange(e)} size="sm" ref={initialRef} placeholder='Role' />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Description</FormLabel>
              <Textarea value={data.desc} name='desc' onChange={(e) => dataOnChange(e)} size="sm" placeholder='Here is a sample placeholder' />
            </FormControl>


            <FormControl mt={2}>
              <FormLabel>Start Date</FormLabel>
              <Input size="sm" value={data.startDate} name='startDate' onChange={(e) => dataOnChange(e)} type='date' placeholder='Start Date' />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>End Date</FormLabel>
              <Input size="sm" value={data.endDate} name="endDate" onChange={(e) => dataOnChange(e)} type='date' placeholder='End Date' />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button onClick={handleOnSumit} size="sm" colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button size="sm" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const PortfolioModal = ({ prf, setPrf }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [data, setData] = React.useState({
    title: "",
    desc: "",
    link: ""
  });
  const dataOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleOnSumit = () => {
    setPrf([...prf, data]);
    console.log(data);
    setData({ title: "", desc: '', link: '' });
    onClose();
  }

  return (
    <>
      <Button size={"sm"} colorScheme='green' onClick={onOpen}>Add Portfolio</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='text-sm' pb={6}>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Input name="title" size="sm" onChange={(e) => dataOnChange(e)} ref={initialRef} placeholder='Title' />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Description</FormLabel>
              <Textarea name="desc" size="sm" onChange={(e) => dataOnChange(e)} placeholder='Write a Short Description About Your Portfolio Item' />
            </FormControl>


            <FormControl mt={2}>
              <FormLabel>Link</FormLabel>
              <Input name="link" size="sm" type="link" onChange={(e) => dataOnChange(e)} placeholder='Any Link of Your Portfolio Item' />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button onClick={handleOnSumit} size="sm" colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button size="sm" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const ArrayFields = ({ name, arr, setArr, deleteItem }) => {
  const [input, setInput] = React.useState('');


  return <div className="col-span-full">
    <label htmlFor={`${name}`} className="block text-sm/6 font-medium text-gray-900">
      {name}
    </label>
    <div className="mt-2">
      <Flex my={2}>
        <Input bg="gray.50"
          _dark={{
            bg: 'gray.800',
          }}
          color="gray.500"
          rounded="md" value={input} onChange={(e) => setInput(e.target.value)} size={'sm'} w={"30%"} mr={2} type='text' />
        <Button onClick={input.length > 0 ? () => { setArr([...arr, input]); setInput("") } : () => { }} size={'sm'} color={"white"} bg={"green.400"} mr={2} >Add</Button>
        <Button onClick={() => { setArr([]) }} size={'sm'} color={"white"} bg={"green.400"} >Reset</Button>
      </Flex>
      <div className='w-full flex bg-gray-50 rounded-md  p-3 min-h-16 max-h-60 '>
        {arr.length > 0 && arr.map((item, idx) => {
          return <Badge key={idx} ml='1' className='max-h-5 ' colorScheme='green'>
            {item} <IoIosClose onClick={() => deleteItem(idx, arr, setArr)} className='inline text-lg mb-0.5 cursor-pointer' />
          </Badge>
        })}

      </div>
    </div>
    <p className="mt-3 text-sm/6 text-gray-600">Tip: (Use Shift + BackSpace) for backward cursor</p>
  </div>

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
    let response = await fetch("http://localhost:8080/freelancer/getProfile", {
      method: "POST",
      headers: headersList,
      credentials: "include"
    });

    let data = await response.json();
 
    if (!data.success) throw new Error("No Jobposts");

    return {
      props: {
        profile: data.profile,
      },
    };
  } catch (error) {
   
    return {
      props: {
        profile: {},
      },
    };
  }

}


export default function ProfileUpdatePage({ profile }) {
  const [basic, setBasic] = React.useState({
    name: "",
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
  const toast = useToast();

  React.useEffect(() => {
    const { name = 'Unknown', contactMail = 'not-provided@example.com', bio = 'No bio provided', contactNumber = 'Not available', availableForWork = false, hourlyRate = 0, location = { country: 'Unknown', state: 'Unknown', city: 'Unknown' }} = profile || {};
        const { workExperience = [], portfolio = [], certifications = [], languages = [], skills = [] } = profile || {};
        const {country, state, city} = location;
        setBasic({ name, contactMail, bio, contactNumber, availableForWork, hourlyRate, country, state, city });
        setExp(workExperience);
        setPrf(portfolio);
        setCert(certifications);
        setLang(languages);
        setSkill(skills);
  }, [])

  const basicOnChange = (e) => {
    setBasic({ ...basic, [e.target.name]: e.target.value });
  }

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

  const deleteItem = (idx, arr, setArr) => {
    const newArr = arr.filter((item, index) => index !== idx);
    setArr(newArr);
  }

  const handleOnSave = async (e) => {
    e.preventDefault();

    let headersList = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "name": basic.name,  // Using name from state
      "contactMail": basic.contactMail,  // Contact mail from state
      "bio": basic.bio,  // Bio from state
      "contactNumber": basic.contactNumber,  // Contact number from state
      "availableForWork": basic.availableForWork,  // Availability from state
      "hourlyRate": basic.hourlyRate,  // Hourly rate from state
      "skills": skill,  // Skills array from state
      "certifications": cert,  // Certifications from state
      "languages": lang,  // Languages from state
      "reviews": [],  // If you have reviews, you can replace this with actual data
      "location": {
        "country": basic.country,  // Country from state
        "state": basic.state,  // State from state
        "city": basic.city  // City from state
        },
      "workExperience": exp,  // Work experience from state
      "portfolio": prf  // Portfolio
      });

    let response = await fetch("http://localhost:8080/freelancer/updateProfile", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
      credentials: "include"
    });

    let data = await response.json();
  
    if (data.success) {
      toast({
        title: 'Profile',
        description: data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Profile',
        description: data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <form className="max-w-5xl mx-auto pb-16 pt-20 ">
      <div className=" px-6 py-12 rounded-md ">


        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 border-t border-gray-900/10  sm:grid-cols-6">
            <div className="sm:col-span-4  pt-6">
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={basic.name}
                  onChange={(e) => basicOnChange(e)}
                  placeholder='Please Enter Your Full Name'
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={profile.email}
                  disabled
                  placeholder='Please Enter Your Email'
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <p className="mt-3 text-sm/6 text-gray-600">This email can't be changed and will not shown publically</p>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="contactEmail" className="block text-sm/6 font-medium text-gray-900">
                Work Email address
              </label>
              <div className="mt-2">
                <input
                  id="contactMail"
                  name="contactMail"
                  type="email"
                  autoComplete="email"
                  value={basic.contactMail}
                  onChange={(e) => basicOnChange(e)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <p className="mt-3 text-sm/6 text-gray-600">This email will be shown publically</p>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="number" className="block text-sm/6 font-medium text-gray-900">
                Contact Number
              </label>
              <div className="mt-2">
                <input
                  id="number"
                  name="contactNumber"
                  type="number"
                  autoComplete="number"
                  placeholder='Please Enter Your Phone Number'
                  value={basic.contactNumber}
                  onChange={(e) => basicOnChange(e)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>


            <div className="col-span-full">
              <label htmlFor="bio" className="block text-sm/6 font-medium text-gray-900">
                Bio
              </label>
              <div className="mt-2">
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={basic.bio}
                  onChange={(e) => basicOnChange(e)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                Country
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  value={basic.country}
                  onChange={(e) => basicOnChange(e)}
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value="united states">United States</option>
                  <option value="canada">Canada</option>
                  <option value="mexico">Mexico</option>
                  <option value="india">India</option>
                </select>

              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={basic.city}
                  onChange={(e) => basicOnChange(e)}
                  autoComplete="address-level2"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="state"
                  name="state"
                  type="text"
                  value={basic.state}
                  onChange={(e) => basicOnChange(e)}
                  autoComplete="state"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>


          </div>
        </div>

        <div className="pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <ArrayFields name="Skills" arr={skill} setArr={setSkill} deleteItem={deleteItem} />
            <ArrayFields name="Certifications" arr={cert} setArr={setCert} deleteItem={deleteItem} />
            <ArrayFields name="Languages" arr={lang} setArr={setLang} deleteItem={deleteItem} />

            <div className="sm:col-span-6">
              <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                Portfolio
              </label>
              <div className="mt-2">

                {prf.length > 0 && <div className="mt-6 mb-3 border-t w-full bg-gray-50 rounded-md  p-3 max-h-60 ">
                  <table class="table-auto  w-full p-8 ">
                    <thead>
                      <tr className='text-sm'>
                        <th className='text-start p-2'>Tilte</th>
                        <th className='text-start p-2'>Description</th>
                        <th className='text-start p-2'>Link</th>
                        <th className='text-start p-2'>Action</th>
                      </tr>
                    </thead>
                    <tbody className='p-2 text-sm'>
                      {(prf).map((obj, idx) => <tr>
                        <td key={idx} className='text-start p-2'>{obj.title || ""}</td>
                        <td key={idx} className='text-start p-2'>{obj.desc || ""}</td>
                        <td key={idx} className='text-start p-2'>{obj.link || ""}</td>
                        <td key={idx} className='text-center p-2'><IoIosClose onClick={() => deleteItem(idx, prf, setPrf)} className='bg-red-400 text-lg rounded-full text-white cursor-pointer ' /></td>
                      </tr>)}

                    </tbody>
                  </table>
                </div>}
                <PortfolioModal prf={prf} setPrf={setPrf} />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                Experience
              </label>
              <div className="mt-2">

                {exp.length > 0 && <div className="mt-6 mb-3 border-t w-full bg-gray-50 rounded-md  p-3 max-h-60 ">
                  <table class="table-auto  w-full p-8 ">
                    <thead>
                      <tr className='text-sm'>
                        <th className='text-start p-2'>Role</th>
                        <th className='text-start p-2'>Description</th>
                        <th className='text-start p-2'>Duration</th>
                        <th className='text-start p-2'>Action</th>
                      </tr>
                    </thead>
                    <tbody className='p-2 text-sm '>
                      {(exp).map((obj, idx) => <tr>
                        <td key={idx} className='text-start p-2'>{obj.role || ""}</td>
                        <td key={idx} className='text-start p-2'>{obj.desc || ""}</td>
                        <td key={idx} className='text-start p-2'>{calculateYear(obj.startDate, obj.endDate) || ""}</td>
                        <td key={idx} className='text-center p-2'><IoIosClose onClick={() => deleteItem(idx, exp, setExp)} className='bg-red-400 text-lg rounded-full text-white cursor-pointer ' /></td>
                      </tr>)}

                    </tbody>
                  </table>
                </div>}
                <ExperienceModal exp={exp} setExp={setExp} />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="hourlyRate" className="block text-sm/6 font-medium text-gray-900">
                Hourly Rate (USD)
              </label>
              <div className="mt-2">
                <input
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  autoComplete="rate"
                  value={basic.hourlyRate}
                  onChange={(e) => basicOnChange(e)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">rounded off value  eg: 1, 2 etc</p>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                Available For Work
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="available"
                  name="availableForWork"
                  autoComplete="available"
                  value={basic.availableForWork}
                  onChange={(e) => basicOnChange(e)}
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>

                </select>

              </div>
            </div>




          </div>
        </div>


        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Declaration</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            We'll always let you know about important changes, but you pick what else you want to hear about.
          </p>

        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={(e) => { handleOnSave(e) }}
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}


const profile = {
  freelancerId: {
    timestamp: 1739094281,
    date: "2025-02-09T09:44:41.000+00:00"
  },
  email: "john.doe@example.com",
  name: "John Doe",
  contactMail: null,
  bio: "Experienced front-end developer with expertise in building modern, responsive websites and web applications.",
  contactNumber: "+1234567890",
  availableForWork: true,
  hourlyRate: 50,
  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Vue.js",
    "Sass"
  ],
  certifications: [
    "Certified Web Developer",
    "React Native Certified"
  ],
  languages: [
    "English",
    "Spanish"
  ],
  reviews: [
    "Great work on the website design!",
    "Excellent coding skills, fast delivery."
  ],
  location: {
    city: "New York",
    country: "USA"
  },
  workExperience: [
    {
      role: "Frontend Developer",
      desc: "Built modern, responsive websites using React and CSS",
      startDate: "2020-06-01T00:00:00.000Z",
      endDate: "2022-06-01T00:00:00.000Z"
    },
    {
      role: "UI/UX Designer",
      desc: "Worked on designing intuitive user interfaces for web applications",
      startDate: "2018-01-01T00:00:00.000Z",
      endDate: "2020-05-01T00:00:00.000Z"
    }
  ],
  portfolio: [
    {
      title: "E-commerce Website",
      desc: null,
      link: "https://example.com/project1"
    },
    {
      title: "Personal Blog",
      desc: null,
      link: "https://example.com/project2"
    }
  ]
};