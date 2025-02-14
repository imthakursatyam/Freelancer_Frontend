// ProfilePage.js
import React from 'react';
import { Avatar, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import cookie from 'cookie';

export async function getServerSideProps(context) {

    try {
        const id = context.params.id;
        const cookies = context.req.headers.cookie || '';
        const parsedCookies = cookie.parse(cookies);
        let headersList = {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Cookie": cookies
         }
        let response = await fetch("http://localhost:8080/recruiter/getFreelancerProfile", { 
          method: "POST",
          headers: headersList,
          credentials: "include",
          body: JSON.stringify({"id":id})
        });
    
        
        let data = await response.json();
        if(!data.success) throw new Error("No Jobposts");
        console.log(data);
        const responses = {
            "success": true,
            "profile": {
                "freelancerId": {
                    "timestamp": 1739202263,
                    "date": "2025-02-10T15:44:23.000+00:00"
                },
                "email": "imthakursatyam@gmail.com",
                "name": "Satyam Thakur",
                "contactMail": "imshauryathakur@gmail.com",
                "bio": "this is a short bio about me",
                "contactNumber": "9528679086",
                "availableForWork": true,
                "hourlyRate": 5.0,
                "skills": [
                    "javascript",
                    "java",
                    "NExtjs",
                    "reactjs",
                    "nodejs",
                    "express"
                ],
                "certifications": [
                    "Certified Web Dev",
                    "certified nextjs dev"
                ],
                "languages": [
                    "English",
                    "Hindi"
                ],
                "reviews": [],
                "location": {
                    "country": "india",
                    "state": "Uttar Pradesh",
                    "city": "Moradabad"
                },
                "workExperience": [
                    {
                        "role": "Web Developer",
                        "desc": "Worked as a web developer in wipro ",
                        "startDate": "2022-11-17",
                        "endDate": "2025-02-06"
                    },
                    {
                        "role": "Full Stack Android Developer",
                        "desc": "Worked as a senior full stack android developer",
                        "startDate": "2023-10-31",
                        "endDate": "2025-02-01"
                    }
                ],
                "portfolio": [
                    {
                        "title": "Job App",
                        "desc": "Designed and Build a Job App for both freelancer and Recruiter with user authentication and web sockets for push Notifications",
                        "link": "www.example.com"
                    },
                    {
                        "title": "E Commerce Store",
                        "desc": "Designed and Build an e-commerce store with authentication, easy checkout and cart service.w",
                        "link": "www.example.com"
                    },
                    {
                        "title": "Notification Service ",
                        "desc": "Designed and Build a robust notification service using kafka",
                        "link": "www.example.com"
                    }
                ]
            },
            "message": "Profile Fetched Successfully"
        };

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
    // Assuming you have an API that fetches the job post by id
    //const res = await fetch(`https://your-backend-api.com/jobpost/${id}`);

}
const ProfilePage = ({profile}) => {
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
        <div className="bg-gray-100 min-h-screen py-12 px-6">
            <div className="max-w-5xl mx-auto bg-white shadow-xl py-12 rounded-lg overflow-hidden p-12">


                <div>
                <div className="mt-10 sm:mt-16 w-full justify-between flex px-6 items-center  border-b-2 border-gray-200 pb-6">
                <div className='flex items-center '>
                <Avatar size='xl' name='Christian Nwamba' src='https://bit.ly/code-beast' />{' '}
                    <Heading className='inline ml-4' size='lg' fontSize='50px'>
                        {basic.name}
                    </Heading>
                </div>
                    <Link className='bg-green-500 p-2 px-3 text-white rounded-md font-bold text-sm' href="/freelancer/user/updateProfile">Message</Link>
                </div>
                    <div className="mt-6   border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{basic.name}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">Email address</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{basic.contactMail}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">Hourly Rate</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">${basic.hourlyRate}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">About</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {basic.bio}
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">Contact Number</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{basic.contactNumber}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">Location</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{basic.city}, {basic.state}, {basic.country}</dd>
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


            </div>
        </div>
    );
};

export default ProfilePage;
