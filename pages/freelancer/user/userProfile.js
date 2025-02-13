import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text, Tag, TagLabel, TagCloseButton, Highlight, Flex, Badge, Avatar } from '@chakra-ui/react'
import Link from 'next/link';
import React from 'react';
import cookie from "cookie";
const freelancer = JSON.parse(`{
    "freelancerId": {
      "timestamp": 1739094281,
      "date": "2025-02-09T09:44:41.000+00:00"
    },
    "email": "john.doe@example.com",
    "name": "John Doe",
    "contactMail": null,
    "bio": "Experienced front-end developer with expertise in building modern, responsive websites and web applications.",
    "contactNumber": "+1234567890",
    "availableForWork": true,
    "hourlyRate": 50.0,
    "skills": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Vue.js",
      "Sass"
    ],
    "certifications": [
      "Certified Web Developer",
      "React Native Certified"
    ],
    "languages": [
      "English",
      "Spanish"
    ],
    "reviews": [
      "Great work on the website design!",
      "Excellent coding skills, fast delivery."
    ],
    "location": {
      "city": "New York",
      "country": "USA"
    },
    "workExperience": [
      {
        "role": "Frontend Developer",
        "desc": "Built modern, responsive websites using React and CSS",
        "startDate": "2020-06-01T00:00:00.000Z",
        "endDate": "2022-06-01T00:00:00.000Z"
      },
      {
        "role": "UI/UX Designer",
        "desc": "Worked on designing intuitive user interfaces for web applications",
        "startDate": "2018-01-01T00:00:00.000Z",
        "endDate": "2020-05-01T00:00:00.000Z"
      }
    ],
    "portfolio": [
      {
        "title": "E-commerce Website",
        "desc": null,
        "link": "https://example.com/project1"
      },
      {
        "title": "Personal Blog",
        "desc": null,
        "link": "https://example.com/project2"
      }
    ]
  }`);

const items = [
    { label: "First Name", value: "Jassie" },
    { label: "Last Name", value: "Bhatia" },
    { label: "Email", value: "jassie@jassie.dev" },
    { label: "Phone", value: "1234567890" },
    { label: "Address", value: "1234 Main St, Anytown, USA" },
]


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




export default function Example({ profile }) {
    const [basic, setBasic] = React.useState({
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
        const { name = 'Unknown', email = "not-provided@gmail.com", contactMail = 'not-provided@example.com', bio = 'No bio provided', contactNumber = 'Not available', availableForWork = false, hourlyRate = 0, location = { country: 'Unknown', state: 'Unknown', city: 'Unknown' } } = profile || {};
        const { workExperience = [], portfolio = [], certifications = [], languages = [], skills = [] } = profile || {};
        const { country, state, city } = location;
        setBasic({ name, email, contactMail, bio, contactNumber, availableForWork, hourlyRate, country, state, city });
        setExp(workExperience);
        setPrf(portfolio);
        setCert(certifications);
        setLang(languages);
        setSkill(skills);
    }, [])
    return (
        <div className=" lg:pb-10 ">

            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:max-h-fit lg:px-8">
                <div className="mt-10 sm:mt-16 w-full justify-between flex px-6 items-center  border-b-2 border-gray-200 pb-6">
                <div className='flex items-center '>
                <Avatar size='xl' name='Christian Nwamba' src='https://bit.ly/code-beast' />{' '}
                    <Heading className='inline ml-4' size='lg' fontSize='50px'>
                        User Profile
                    </Heading>
                </div>
                    <Link className='bg-green-500 p-2 px-3 text-white rounded-md font-bold text-sm' href="/freelancer/user/updateProfile">update Profile</Link>
                </div>
                <div className="grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2 ">
                    <div className="relative  lg:row-span-2">
                        <div className="absolute inset-px rounded-lg  lg:rounded-l-[2rem]"></div>
                        <div className="relative flex bg-gray-50 h-full p-10 flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                            {/* <PersonalInfo /> */}

                            <div className=''>
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-base/7 font-semibold text-gray-900">Applicant Information</h3>
                                    <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details and application.</p>
                                </div>
                                <div className="mt-6 border-t border-gray-100">
                                    <dl className="divide-y divide-gray-100">
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{basic.name}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Email Address</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{basic.email}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Work Email address</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{basic.contactMail}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Hourly Rate</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">${basic.hourlyRate}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">languages</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {lang > 0 ? lang.join(", ") : "Not Provided"}
                                            </dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Bio</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {basic.bio}
                                            </dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Location</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {basic.city}, {basic.state}, {basic.country}
                                            </dd>
                                        </div>

                                    </dl>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="relative max-lg:row-start-2 lg:col-span-2 rounded ">
                        <div className='bg-gray-50 min-h-full rounded-md p-8'>
                            <div className="px-4 sm:px-0 ">
                                <h3 className="text-base/7 font-semibold text-gray-900">Applicant Experience Information</h3>
                                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500"></p>
                            </div>
                            <div className="mt-6 border-t border-gray-100 p-3 max-h-80 overflow-y-scroll no-scrollbar">
                                {exp.length > 0 ? <table class="table-auto border w-full p-8 text-sm">
                                    <thead>
                                        <tr className=''>
                                            <th className='text-start p-2'>Role</th>
                                            <th className='text-start p-2'>Description</th>
                                            <th className='text-start p-2'>Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody className='p-2'>
                                        {exp.map((obj, idx) => <tr>
                                            <td className='text-start p-2'>{obj.role}</td>
                                            <td className='text-start p-2'>{obj.desc}</td>
                                            
                                            <td key={idx} className='text-start p-2'>{calculateYear(obj.startDate, obj.endDate) || ""}</td>
                                        </tr>)}

                                    </tbody>
                                </table> : <p className="text-center">No Experience Provided</p>}
                            </div>
                        </div>


                    </div>
                    <div className="relative max-lg:row-start-3 lg:col-span-2 lg:col-start-2 lg:row-start-2">
                        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] p-8">
                            <div>
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-base/7 font-semibold text-gray-900">Other Information</h3>
                                    <p className="mt-1 max-w-2xl text-sm/6 text-gray-500"></p>
                                </div>
                                <div className="mt-6 border-t border-gray-100">
                                    <dl className="divide-y divide-gray-100">
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Skills</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{skill.length > 0 ? skill.join(", ")
                                             : "Not Provided"}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Certifications</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{cert.length > 0 ? cert.join(", ") : "Not Provided"}</dd>
                                        </div>

                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Portfolio Links</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {prf.length > 0 ? prf.map((obj, idx) => <a href={obj.link} className="text-blue-500">{obj.title+", "}</a>) : "Not Provided"}
                                            </dd>
                                        </div>


                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}





/*
<div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
<div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] px-4 pb-5">


    <div className="px-8 border-b border-gray-150  pb-4  sm:px-10 sm:pt-10">
    <p className="mt-1 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">CERTIFICATIONS</p>
        
    <div>
            <Stack direction="row" mt={4} spacing={4}>
                {(freelancer.skills && freelancer.skills.length > 0) && freelancer.skills.map((name, idx) => (
                    <Badge variant="solid" rounded="md" px={"5px"} py={"3px"} colorScheme='green'>{name}</Badge>
                ))}
            </Stack>
    </div>

    </div>
    <div className="px-8  border-b border-gray-150  pb-4 sm:px-10 sm:pt-10">
        <p className="mt-1 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Skills</p>
        
        <div>
            <Stack direction="row" mt={4} spacing={4}>
                {freelancer.certifications && freelancer.certifications.map((name, idx) => (
                    <Badge variant="solid" rounded="md" px={"5px"} py={"3px"} colorScheme='green'>{name}</Badge>
                ))}
            </Stack>
        </div>
    </div>
    <div className="px-8  border-b border-gray-150 pb-4 sm:px-10 sm:pt-10">
        <p className="mt-1 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Portfolio Links</p>
        
        <div>
            <Stack direction="row" mt={4} spacing={4}>
                {freelancer.portfolio && freelancer.portfolio.map((obj, idx) => (
                    <Badge variant="solid" rounded="md" px={"5px"} py={"3px"} colorScheme='green'>{obj.title}</Badge>
                ))}
            </Stack>
        </div>
    </div>
 
</div>
*/