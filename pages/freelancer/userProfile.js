import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
} from '@chakra-ui/react'


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
        <div className="bg-gray-50  sm:py-10">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">



                    <div className="relative lg:row-span-2">
                        <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                            <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                    Personal Info
                                </p>

                            </div>
                            <div className="@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm p-4 px-8">
                                <Stat className='mt-3'>
                                    <StatLabel>Collected Fees</StatLabel>
                                    <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                                </Stat>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
                    </div>



                    <div className="relative max-lg:row-start-1">
                        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Performance</p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit maiores impedit.
                                </p>
                            </div>
                            <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                                <img
                                    className="w-full max-lg:max-w-xs"
                                    src="https://tailwindui.com/plus-assets/img/component-images/bento-03-performance.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]"></div>
                    </div>


                    <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                        <div className="absolute inset-px rounded-lg bg-white"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Security</p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                    Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi.
                                </p>
                            </div>
                            <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                                <img
                                    className="h-[min(152px,40cqw)] object-cover"
                                    src="https://tailwindui.com/plus-assets/img/component-images/bento-03-security.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5"></div>
                    </div>


                    <div className="relative lg:row-span-2">
                        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                            <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                    Powerful APIs
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                    Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget sem sodales gravida.
                                </p>
                            </div>
                            <div className="relative min-h-[30rem] w-full grow">
                                <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                                    <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                                        <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                                            <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                                                NotificationSetting.jsx
                                            </div>
                                            <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                                        </div>
                                    </div>
                                    <div className="px-6 pt-6 pb-14">{/* Your code example */}</div>
                                </div>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                    </div>


                </div>
            </div>
        </div>
    )
}
