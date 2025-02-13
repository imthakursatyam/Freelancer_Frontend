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
  Flex
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import React from 'react'

const ExperienceModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

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
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const ArrayFields = ({ name, array, arrayOnChange }) => {

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
          rounded="md" value={''} size={'sm'}   w={"30%"} mr={2} type='text' />
        <Button size={'sm'} color={"white"} bg={"green.400"} mr={2} >Add</Button>
        <Button size={'sm'}  color={"white"} bg={"green.400"} >Reset</Button>
      </Flex>
      <textarea
        id={`${name}`}
        name={`${name}`}
        rows={3}
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        defaultValue={''}
      />
    </div>
    <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p>
  </div>

}



export default function ProfileUpdatePage() {
  const [basic, setBasic] = React.useState({
    name: "",
    contactMail: "",
    bio: "",
    contactNumber: "",
    availableForWork: false,
    hourlyRate: 0,
    country:"",
    state:'',
    city:""
  });
  const [exp, setExp] = React.useState([]);
  const [prf, setPrf] = React.useState([]);
  const [cert, setCert] = React.useState([]);
  const [lang, setLang] = React.useState([]);
  const [skill, setSkill] = React.useState([]);

  const basicOnChange = () => {

  }

  const arrayOnChange = ({event, name}) => {

  }

  return (
    <form className="max-w-5xl mx-auto pb-16 pt-20 ">
      <div className=" px-6 py-12 rounded-md ">


        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 border-t border-gray-900/10  sm:grid-cols-6">
            <div className="sm:col-span-4  pt-6">
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
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
                  value={basic.email}
                  disabled
                  placeholder='Please Enter Your Email'
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <p className="mt-3 text-sm/6 text-gray-600">This email can't be changed and will not shown publically</p>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="workEmail" className="block text-sm/6 font-medium text-gray-900">
                Work Email address
              </label>
              <div className="mt-2">
                <input
                  id="workEmail"
                  name="contactMail"
                  type="email"
                  autoComplete="email"
                  value={basic.workEmail}
                  onChange={(e) => basicOnChange(e)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <p className="mt-3 text-sm/6 text-gray-600">This email will be shown publically</p>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
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
              <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
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
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                  <option>India</option>
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

            <ArrayFields name="Skills" array={skill} arrayOnChange={arrayOnChange} />
            <ArrayFields name="Certifications" array={cert} arrayOnChange={arrayOnChange} />
            <ArrayFields name="Languages" array={lang} arrayOnChange={arrayOnChange} />

            <div className="sm:col-span-6">
              <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                Portfolio
              </label>
              <div className="mt-2">

               { exp.length > 0 &&  <div className="mt-6 mb-3 border-t w-full bg-gray-50 rounded-md  p-3 max-h-60 ">
                  <table class="table-auto  w-full p-8 ">
                    <thead>
                      <tr className='text-sm'>
                        <th className='text-start p-2'>Role</th>
                        <th className='text-start p-2'>Description</th>
                        <th className='text-start p-2'>Duration</th>
                      </tr>
                    </thead>
                    <tbody className='p-2 text-sm'>
                      {[1, 2].map((e) => <tr>
                        <td className='text-start p-2'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                        <td className='text-start p-2'>Malcolm Lockyer</td>
                        <td className='text-start p-2'>1961</td>
                      </tr>)}

                    </tbody>
                  </table>
                </div>}
                <ExperienceModal exp={exp} setExp={setExp}/>
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                Experience
              </label>
              <div className="mt-2">

                {prf.length > 0 && <div className="mt-6 mb-3 border-t w-full bg-gray-50 rounded-md  p-3 max-h-60 ">
                  <table class="table-auto  w-full p-8 ">
                    <thead>
                      <tr className='text-sm'>
                        <th className='text-start p-2'>Role</th>
                        <th className='text-start p-2'>Description</th>
                        <th className='text-start p-2'>Duration</th>
                      </tr>
                    </thead>
                    <tbody className='p-2 text-sm '>
                      {[1, 2].map((e) => <tr>
                        <td className='text-start p-2'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                        <td className='text-start p-2'>Malcolm Lockyer</td>
                        <td className='text-start p-2'>1961</td>
                      </tr>)}

                    </tbody>
                  </table>
                </div>}
                <ExperienceModal prf={prf} setPrf={setPrf} />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="hourlyRate" className="block text-sm/6 font-medium text-gray-900">
                Hourly Rate
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
                  <option>Yes</option>
                  <option>No</option>
                 
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
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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