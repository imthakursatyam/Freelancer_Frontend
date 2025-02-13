import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text, Tag, TagLabel, TagCloseButton, Highlight, Flex, Badge } from '@chakra-ui/react'
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

export default function Example() {
    return (
        <div className=" lg:pb-10 ">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:max-h-fit lg:px-8">

                <div className="grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2 ">
                    <div className="relative lg:row-span-2">
                        <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
                        <div className="relative flex h-full p-10 flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                            <PersonalInfo />
                        </div>

                    </div>

                    <div className="relative max-lg:row-start-1 lg:col-span-2 bg-white p-8 rounded">

                        <div>
                            <div className="px-4 sm:px-0">
                                <h3 className="text-base/7 font-semibold text-gray-900">Applicant Experience Information</h3>
                                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details and application.</p>
                            </div>
                            <div className="mt-6 border-t border-gray-100 p-3 max-h-60 overflow-y-scroll no-scrollbar">
                                <table class="table-auto border w-full p-8 ">
                                    <thead>
                                        <tr className=''>
                                            <th className='text-start p-2'>Role</th>
                                            <th className='text-start p-2'>Description</th>
                                            <th className='text-start p-2'>Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody className='p-2'>
                                        {[1, 2, 3, 4].map((e) => <tr>
                                            <td className='text-start p-2'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                                            <td className='text-start p-2'>Malcolm Lockyer</td>
                                            <td className='text-start p-2'>1961</td>
                                        </tr>)}

                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>
                    <div className="relative max-lg:row-start-3 lg:col-span-2 lg:col-start-2 lg:row-start-2">
                        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] p-8">
                            <div>
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-base/7 font-semibold text-gray-900">Other Information</h3>
                                    <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details and application.</p>
                                </div>
                                <div className="mt-6 border-t border-gray-100">
                                    <dl className="divide-y divide-gray-100">
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Skills</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Margot Foster</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Certifications</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
                                        </div>
                                      
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm/6 font-medium text-gray-900">Portfolio Links</dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Hindi, English</dd>
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




const PersonalInfo = () => {
    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-base/7 font-semibold text-gray-900">Applicant Information</h3>
                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details and application.</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Margot Foster</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Email Address</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Work Email address</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Hourly Rate</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">languages</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Hindi, English</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Bio</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur.
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Location</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            Delhi, India
                        </dd>
                    </div>

                </dl>
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