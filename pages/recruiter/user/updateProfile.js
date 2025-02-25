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
    Badge,
    ButtonGroup
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import React from 'react'
import Example from './userProfile'
import { IoIosClose } from "react-icons/io";
import cookie from 'cookie';
import { useToast } from '@chakra-ui/react'


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
                {(arr && arr.length > 0) && arr.map((item, idx) => {
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
        let response = await fetch("http://localhost:8080/recruiter/getProfile", {
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
        contactNumber: "",
        bio: "",
        companyName: "",
        companyDescription: "",
        companyIndustry: "",
        websiteUrl: "",
        addressLine: "",
        country: "",
        state: '',
        city: ""
    });
    const [lang, setLang] = React.useState([]);
    const [skill, setSkill] = React.useState([]);
    const [spin, setSpin] = React.useState(false);
    const toast = useToast();

    React.useEffect(() => {
        const { name = 'Unknown', contactMail = 'not-provided@example.com', bio = 'No bio provided', contactNumber = 'Not available', companyDescription = "Unknown", companyName = "Unknown", companyIndustry = "Unknown", companyLocation, websiteUrl = "Not Provided" } = profile || {};
        const { preferredLanguages = [], preferredSkills = [] } = profile || {};
        const { addressLine = "unknown", country = 'Unknown', state = 'Unknown', city = 'Unknown' } = companyLocation || {};
        setBasic({ name, contactMail, bio, contactNumber, addressLine, country, state, city, companyDescription, companyName, companyIndustry, websiteUrl, addressLine, country, state, city });
        setLang(preferredLanguages || []);
        setSkill(preferredSkills || []);
    }, [])

    const basicOnChange = (e) => {
        setBasic({ ...basic, [e.target.name]: e.target.value });
    }


    const deleteItem = (idx, arr, setArr) => {
        const newArr = arr.filter((item, index) => index !== idx);
        setArr(newArr);
    }

    const handleOnSave = async (e) => {
        e.preventDefault();
        setSpin(true);
        try {
            let headersList = {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "name": basic.name,  // Using name from state
                "contactMail": basic.contactMail,  // Contact mail from state
                "bio": basic.bio,  // Bio from state
                "contactNumber": basic.contactNumber,  // Contact number from state  
                "preferredSkills": skill,  // Skills array from state
                "preferredLanguages": lang,  // Languages from state
                "companyLocation": {
                    "addressLine": basic.addressLine,  // Address from state
                    "country": basic.country,  // Country from state
                    "state": basic.state,  // State from state
                    "city": basic.city  // City from state
                },
                "companyName": basic.companyName,
                "companyDescription": basic.companyDescription,
                "companyIndustry": basic.companyIndustry,
                "websiteUrl": basic.websiteUrl
            });

            let response = await fetch("http://localhost:8080/recruiter/updateProfile", {
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
        } catch (error) {
            toast({
                title: 'Profile',
                description: "unable to update profile",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } finally {
            setSpin(false);
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
                        <div className="sm:col-span-4">
                            <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                                Address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="address"
                                    name="addressLine"
                                    type="text"
                                    value={basic.addressLine}
                                    onChange={(e) => basicOnChange(e)}
                                    autoComplete="street-address"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>

                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="companyName" className="block text-sm/6 font-medium text-gray-900">
                                Company Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="companyName"
                                    name="companyName"
                                    type="text"
                                    value={basic.companyName}
                                    onChange={(e) => basicOnChange(e)}
                                    placeholder='Please Enter Your Company Name'
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="companyDescription" className="block text-sm/6 font-medium text-gray-900">
                                Company Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="companyDescription"
                                    name="companyDescription"
                                    rows={3}
                                    value={basic.companyDescription}
                                    onChange={(e) => basicOnChange(e)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    defaultValue={''}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="companyIndustry" className="block text-sm/6 font-medium text-gray-900">
                                Industry
                            </label>
                            <div className="mt-2">
                                <input
                                    id="companyIndustry"
                                    name="companyIndustry"
                                    type="text"
                                    value={basic.companyIndustry}
                                    onChange={(e) => basicOnChange(e)}
                                    placeholder='Please Enter Your Company Industry'
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>

                        </div>
                        <div>
                            <label htmlFor="website" className="block text-sm/6 font-medium text-gray-900">
                                Website URL
                            </label>
                            <div className="mt-2">
                                <input
                                    id="website"
                                    name="websiteUrl"
                                    type="text"
                                    value={basic.websiteUrl}
                                    onChange={(e) => basicOnChange(e)}
                                    placeholder='Please Enter Your Company Website URL'
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>

                        </div>
                    </div>
                </div>

                <div className="pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <ArrayFields name="Preferred Skills" arr={skill} setArr={setSkill} deleteItem={deleteItem} />
                        <ArrayFields name="Preferred Languages" arr={lang} setArr={setLang} deleteItem={deleteItem} />


                    </div>
                </div>


                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Declaration</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">
                        We'll always let you know about important changes, but you pick what else you want to hear about.
                    </p>

                </div>
            </div>

            <ButtonGroup mt="5%" w="100%">
                <Flex w="100%" justifyContent="space-between">
                    <Button
                        isLoading={spin}
                        loadingText="Updating"
                        spinnerPlacement='end'
                        className='px-4'
                        colorScheme="green"
                        variant="solid"
                        onClick={(e)=> handleOnSave(e)}>
                        Update
                    </Button>

                </Flex>
            </ButtonGroup>
        </form>
    )
}
/*
const profile = {
    "_id": "60f8e2b3b8a3f3d7589e6c84",
    "email": "recruiter@techjobs.com",
    "recruiterId": "60f8e2b3b8a3f3d7589e6c85",
    "name": "John Doe",
    "companyName": "Tech Jobs Inc.",
    "companyDescription": "Tech Jobs Inc. connects top talent with exciting opportunities in the tech industry.",
    "companyIndustry": "Information Technology",
    "websiteUrl": "https://www.techjobs.com",
    "contactNumber": "+1-800-555-1234",
    "contactMail": "contact@techjobs.com",
    "preferredSkills": [
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "Cloud Computing"
    ],
    "companyLocation": {
        "city": "San Francisco",
        "state": "California",
        "country": "USA"
    },
    "preferredLanguages": [
        "English",
        "Spanish"
    ]
};
*/