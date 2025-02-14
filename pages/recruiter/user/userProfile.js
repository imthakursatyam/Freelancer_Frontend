// ProfilePage.js
import React from 'react';
import { Avatar, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import cookie from 'cookie';

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
          credentials: "include",
        });
    
        
        let data = await response.json();
        if(!data.success) throw new Error("No Jobposts");
        console.log(data);
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
       
        React.useEffect(() => {
            const { name = 'Unknown', contactMail = 'not-provided@example.com', bio = 'No bio provided', contactNumber = 'Not available', companyDescription="Unknown", companyName="Unknown", companyIndustry="Unknown",  companyLocation, websiteUrl="Not Provided"} = profile || {};
            const { preferredLanguages = [], preferredSkills = [] } = profile || {};
            const { addressLine="unknown", country='Unknown', state='Unknown', city='Unknown' } = companyLocation || {};
            setBasic({ name, contactMail, bio, contactNumber, addressLine, country, state, city, companyDescription, companyName, companyIndustry, websiteUrl, addressLine, country, state, city });
            setLang(preferredLanguages || []);
            setSkill(preferredSkills || []);
           
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
                    <Link className='bg-green-500 p-2 px-3 text-white rounded-md font-bold text-sm' href="/recruiter/user/updateProfile">Edit Profile</Link>
                </div>
                    <div className="mt-6   border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{basic.name}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">Email address</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{profile.email}</dd>
                            </div>
                           
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">Contact Number</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{basic.contactNumber}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">About</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {basic.bio}
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">Company Name</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{basic.companyName}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">Company Description</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{basic.companyDescription}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">Company Industry</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{basic.companyIndustry}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">Website</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{basic.websiteUrl}</dd>
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">Location</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{basic.addressLine}, {basic.city}, {basic.state}, {basic.country}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">Preferred Languages</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{lang.join(", ")}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">Preferred Skills</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{skill.join(", ")}</dd>
                            </div>
                    
                            
                        </dl>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ProfilePage;
