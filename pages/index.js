
import { useRouter } from "next/router.js";
import PageSpinner from "@/components/custom/PageSpinner.js";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Box, Image, Img, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { SearchIcon, Stack, Button } from "@chakra-ui/icons";
import { DiMongodb } from "react-icons/di";
import { filter } from "lodash";
import { TypeAnimation } from 'react-type-animation';
import CosmosBackground from "@/components/custom/CosmosBackground.js";
import { SimpleGrid, Text, Link, Card, CardBody, Icon, Avatar, Wrap, WrapItem, Center, Heading, useColorModeValue, Badge } from "@chakra-ui/react";
import { FaPlus, FaStar } from "react-icons/fa";
import { FaBeer, faPlus } from "react-icons/fa";

export default function Home() {


  const startFetch = async () => {
    let headersList = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
    let response = await fetch("http://localhost:8080/recruiter/check-cookie", {
      method: "POST",
      headers: headersList,
      credentials: "include"
    });

    let data = await response.text();
    console.log(data)
  }

  return <>

    <Hero />

    <TopJobs />
    <StaticImages/>
    <SkillGrid />
    <StaticFeatures/>
    <FreelancerProfiles />
    <StaticGrid />
    <FAQ />

  </>
}

const Hero = () => {
  return (<>
    <div className="lg:mx-16  lg:mt-24 mb-12 lg:mb-16 border-b-2 border-gray-800">
      <div className="mt-8 lg:mt-16 bg-black shadow-xl text-gray-100 rounded-lg p-8">
        <div className="flex flex-row w-full">
          <div className="hidden lg:w-1/5 pt-6 lg:flex">
            <Image className="max-h-[90%]" cdrounded="md" src="/images/heroimg2.jpg" alt="Dan Abramov" />
          </div>

          <div className="flex flex-col lg:w-3/5 text-center items-center mt-12 mb-8 ">
            <h1 className="text-5xl lg:text-6xl mb-6  text-bold">We connect people to <br /> bring project to life</h1>
            <h1 className="text-md lg:text-xl mb-6">Find high quality talent or open jobs with the <br /> help of AI tools that keep you in control</h1>
            <div className="py-5 p-1.5 text-center rounded-lg my-4 mx-3  text-xs ">
              <span className="text-md lg:text-xl mx-1 text-pink-500">{"<"}</span><TypeAnimation
                sequence={[
                  'Find Your Dream Project',
                  1300,
                  'Work With Top Clients',
                  1300,
                  'Hire Top-Tier Talent',
                  1300,
                  'Build Your Dream Team',
                  1300,
                  'Unlock Limitless Opportunities',
                  1300,
                  'Grow Your Business & Career',
                  1300
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: '1.5em', display: 'inline-block', }}
                repeat={100}
              />
              <span className="text-pink-500 text-md lg:text-xl mx-1">{"/>"}</span>

            </div>
            <InputGroup className="mb-10" maxW="400px">
              <Input
                type="text"
                placeholder="Search..."
                focusBorderColor="green.500"
                borderRadius="3xl"
                boxShadow="md"
                borderWidth="3px"
                borderColor="gray.600"
                padding="5"
              />
              <InputRightElement className="mr-2" pointerEvents="none">
                <SearchIcon color="gray.50" />
              </InputRightElement>
            </InputGroup>

            <div className="">
              <h1 className="text-xl mb-2 text-gray-300">Powered by</h1>

            </div>
          </div>


          <div className="hidden lg:flex lg:w-1/5 bg-black pt-6">
            <Image className="mx-auto max-h-[90%]" rounded="md" src="/images/heroimg1.png" alt="Dan Abramov" /></div>
        </div>
      </div>
    </div>
  </>)
}


const SkillGrid = () => {
  const categories = [
    { name: "Development & IT", rating: 4.85, skills: 1853 },
    { name: "AI Services", rating: 4.8, skills: 294 },
    { name: "Design & Creative", rating: 4.91, skills: 968 },
    { name: "Sales & Marketing", rating: 4.77, skills: 392 },
    { name: "Writing & Translation", rating: 4.92, skills: 505 },
    { name: "Admin & Customer Support", rating: 4.77, skills: 508 },
    { name: "Finance & Accounting", rating: 4.79, skills: 214 },
    { name: "Engineering & Architecture", rating: 4.85, skills: 650 },
    { name: "Engineering & Architecture", rating: 4.85, skills: 650 },
  ];

  return (<>
    <Box maxW="" className="border-b-2 mt-10 mb-16 mx-4 border-gray-800 pb-8 lg:mx-16" bg={"black"} >
      <Text className="text-pink-600 text-4xl lg:text-5xl" fontWeight="bold">Browse talent by category</Text>
      <Text color="gray.100" mt={2}>
        Looking for work? <Link color="gray.100" fontWeight="bld" >Browse jobs</Link>
      </Text>
      <SimpleGrid className="mt-2 py-8" columns={{ base: 2, sm: 2, md: 3, lg: 3 }} spacing={2}>
        {categories.map((category, index) => (
          <Card className="bg-gray-800 " bg="gray.900" style={{ backgroundColor: "#111827" }} key={index} shadow="sm" borderRadius="" borderWidth={1} borderColor="gray.900">
            <CardBody className="p-0">
              <Text color="gray.100" className="text-xs lg:mb-3 lg:text-3xl" fontWeight="semibold">{category.name}</Text>
              <Box display="flex" className="text-xs lg:mb-3 gap-1 mt-1" alignItems="center" color="pink.600">
                <Icon className="" as={FaStar} boxSize={4} />
                {category.rating}/5
              </Box>
              <Text className="text-xs lg:text-xl " color="gray.100" mt={1}>{category.skills} skills</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  </>)
}


const StaticGrid = () => {
  const features = [
    {
      name: 'Push to deploy',
      description:
        'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
      icon: FaBeer,
    },
    {
      name: 'SSL certificates',
      description:
        'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
      icon: FaBeer,
    },
    {
      name: 'Simple queues',
      description:
        'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
      icon: FaBeer,
    },
    {
      name: 'Advanced security',
      description:
        'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
      icon: FaBeer,
    },
  ]
  return (
    <div className="bg-black border-b-2 border-gray-800 px-2 lg:mx-16 lg:my-12 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-pink-500">Deploy faster</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-100 sm:text-5xl lg:text-balance">
            Everything you need to deploy your app
          </p>
          <p className="mt-6 text-lg/8 text-gray-300">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
            pulvinar et feugiat blandit at. In mi viverra elit nunc.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16 ">
                <dt className="text-base/7 font-semibold text-pink-500">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-pink-600">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-200">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}



const TopJobs = () => {
  const post = {
    id: "abcddfasjd",
    title: "Full Stack Developer",
    desc: "We are seeking a Full Stack Developer with expertise in both front-end and back-end development. The ideal candidate will have experience with modern web technologies and the ability to build scalable applications.",
    skills: [
      "JavaScript",
      "Node.js",
      "React",
      "MongoDB",
      "Express.js",
      "HTML",
      "CSS"
    ],
    exp: "3-5 years",
    date: "2024-12-10"
  }

  return (<>
    <div className="mx-4 lg:mx-16 border-b-2 border-gray-800 pb-16">
      <Text className="text-pink-600 text-4xl lg:text-5xl" fontWeight="bold">Browse talent by category</Text>
      <Text className="text-sm" color="gray.100" mt={2}>
        Looking for work? <Link color="gray.100" fontWeight="bld" >Browse jobs</Link>
      </Text>
      <div className=" flex overflow-x-auto space-x-8 border-t border-gray-900  mt-4 pt-8 max-w-none scroll-smooth snap-x snap-mandatory no-scrollbar">

        {post &&
          Array.from({ length: 8 }).map((_, idx) => (
            <article
              key={idx}
              className="flex min-w-full lg:min-w-[28.33%] max-w-xl p-3 flex-col items-start justify-between rounded-md bg-gray-900 snap-start"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.date} className="text-gray-500">
                  {post.date}
                </time>
              </div>
              <div className="group relative border-b border-gray-700 pb-4">
                <h3 className="mt-3 text-lg font-semibold text-gray-200 group-hover:text-gray-400">
                  <a href={"#"}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm text-gray-400">{post.desc}</p>
              </div>
              <span className="text-lg mt-4 font-semibold text-gray-200">Skills</span>
              <div className="relative min-w-full flex items-center gap-x-4 border-b border-gray-700 pb-4">
                <div className="text-sm p-1 ">
                  {post.skills &&
                    post.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-block z-10 rounded-full bg-gray-800 px-3 py-1.5 font-medium text-gray-100  m-1"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
              <Stack className="my-3 px-2" direction="row" spacing={4} align="center">
                <Button className="text-white" color="white" bg="pink.500" size="sm"  >
                  Apply
                </Button>
                <Button size="sm" colorScheme="pink" variant="solid">
                  Details
                </Button>
              </Stack>
            </article>
          ))}
      </div>
    </div>

  </>)
}

const FreelancerProfiles = () => {
  const profile = {
    email: "john.doe@example.com",
    contactMail: "john.doe@example.com",
    name: "John Doe",
    bio: "Experienced front-end developer with expertise in building modern, responsive websites and web applications.",
    contactNumber: "+1234567890",
    availableForWork: true,
    hourlyRate: 50.0,
    skills: ["HTML", "CSS", "JavaScript", "React", "Vue.js", "Sass"],
    certifications: ["Certified Web Developer", "React Native Certified"],
    languages: ["English", "Spanish"],
    reviews: [
      "Great work on the website design!",
      "Excellent coding skills, fast delivery."
    ],
    location: { city: "New York", country: "USA" },
    profileImg: "https://example.com/images/john_doe_profile.jpg",  // Added profile image link
    workExperience: [
      { role: "Frontend Developer", desc: "Built modern, responsive websites using React and CSS", startDate: new Date("2020-06-01"), endDate: new Date("2022-06-01") },
      { role: "UI/UX Designer", desc: "Worked on designing intuitive user interfaces for web applications", startDate: new Date("2018-01-01"), endDate: new Date("2020-05-01") }
    ],
    portfolio: [
      { title: "E-commerce Website", description: "E-commerce site built with React", link: "https://example.com/project1", type: "link" },
      { title: "Personal Blog", description: "Personal blog with custom theme", link: "https://example.com/project2", type: "link" }
    ]
  };
  return (<>
    <div className="mx-4 lg:mx-16 border-b-2  border-gray-800 pb-16">
      <Text className="text-pink-600 text-4xl lg:text-5xl" fontWeight="bold">Browse talent by category</Text>
      <Text className="text-sm" color="gray.100" mt={2}>
        Looking for work? <Link color="gray.100" fontWeight="bld" >Browse jobs</Link>
      </Text>
      <div className=" flex overflow-x-auto space-x-8 border-t border-gray-900  mt-4 pt-6 max-w-none scroll-smooth snap-x snap-mandatory no-scrollbar">

        {profile && Array.from({ length: 12 }).map((_, idx) => {
          return <Center py={2}>
            <Box
              maxW={'250px'}
              minW={"250px"}
              w={'full'}
              className="bg-gray-900"
              rounded={'lg'}
              p={6}
              textAlign={'center'}>
              <Avatar
                size={'md'}
                src={profile.profileImg}
                mb={1}
                pos={'relative'}
                _after={{
                  content: '""',
                  w: 4,
                  h: 4,
                  bg: 'green.300',
                  border: '2px solid white',
                  rounded: 'full',
                  pos: 'absolute',
                  bottom: 0,
                  right: 3,
                }}
              />
              <Heading fontSize={'2xl'} color={"gray.100"} fontFamily={'body'}>
                {profile.name}
              </Heading>
              <Text fontWeight={600} color={'gray.400'} mb={4}>
                {profile.contactMail}
              </Text>
              <Text
                textAlign={'center'}
                color={useColorModeValue('gray.600', 'gray.400')}
                px={3} className='text-xs'>
                {profile.bio}

              </Text>



              <Stack display={"flex"} align="center" py={5}>
                <Wrap maxWidth={"95%"} mt={2} spacing={5} overflow={"hidden"}>
                  <WrapItem>
                    {
                      profile.skills && profile.skills.map((skill, index) => {
                        return <Badge display={"block"} className='mx-1 bg-gray-700' key={index}
                          px={3}
                          py={1}
                          style={{ backgroundColor: "#374151" }}
                          fontWeight={'400'} rounded={"full"} color={"gray.100"} >
                          #{skill}
                        </Badge>
                      })
                    }
                  </WrapItem>
                </Wrap>
              </Stack>



              <Stack mt={4} direction={'row'} spacing={4}>
                <Button
                  px={8}
                  size={"md"}
                  fontSize={'xs'}
                  rounded={'full'}
                  className="bg-gray-700 text-gray-100 mx-auto"
                  color={"gray.100"}
                  style={{ backgroundColor: "#DB2777" }}
                >
                  View Profile
                </Button>

              </Stack>
            </Box>
          </Center>
        })}
      </div>
    </div>

  </>)
}


const FAQ = () => {
  const faqs = [
    {
      question: "How does the billing work?",
      answer:
        "Springerdata offers a variety of billing options, including monthly and annual subscription plans, as well as pay-as-you-go pricing for certain services. Payment is typically made through a credit card or other secure online payment method.",
    },
    {
      question: "Can I get a refund for my subscription?",
      answer:
        "We offer a 30-day money-back guarantee for most of its subscription plans. If you are not satisfied with your subscription within the first 30 days, you can request a full refund. Refunds for subscriptions that have been active for longer than 30 days may be considered on a case-by-case basis.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "To cancel your subscription, you can log in to your account and navigate to the subscription management page. From there, you should be able to cancel your subscription and stop future billing.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "We offer a free trial of our software for a limited time. During the trial period, you will have access to a limited set of features and functionality, but you will not be charged.",
    },
    {
      question: "How do I contact support?",
      answer:
        "If you need help with our platform or have any other questions, you can contact the company's support team by submitting a support request through the website or by emailing support@ourwebsite.com.",
    },
    {
      question: "Do you offer any discounts or promotions?",
      answer:
        "We may offer discounts or promotions from time to time. To stay up-to-date on the latest deals and special offers, you can sign up for the company's newsletter or follow it on social media.",
    },
  ];

  const [openIndex, setOpenIndex] = React.useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(index == openIndex ? null : openIndex);
  };

  return (<>
    <div className="relative max-w-7xl border-b-2  border-gray-800 text-gray-100  pt-10 pb-8 mt-8 shadow-xl ring-1 ring-gray-900/5 md:mx-auto sm:rounded-lg mb-8">
      <div className="mx-auto px-5">
        <div className="flex flex-col items-center">
          <h2 className="mt-5 text-center text-pink-600 text-5xl font-bold tracking-tight md:text-6xl">FAQ</h2>
          <p className="mt-3 text-lg text-gray-100 md:text-xl">Frequently asked questions</p>
        </div>
        <div className="mx-auto mt-8 grid  divide-y divide-gray-800">
          {faqs.map((faq, index) => (
            <div key={index} className="py-5">
              <details
                className="group"
                open={openIndex == index}
                onClick={() => toggleFAQ(index)}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                  <span className="text-xl">{faq.question}</span>
                  <span className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : "rotate-180"}`}>
                    <FaPlus />
                  </span>
                </summary>
                <p className="group-open:animate-fadeIn py-2 mt-3 text-neutral-300">{faq.answer}</p>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>)
}

const StaticImages = () => {
  return (
    <div className=" text-gray-100">
      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-2 py-10 text-left grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl mb-3 font-bold text-pink-600">3 million</h2>
          <p className="text-lg">rated freelancers, covering 8,766 skills</p>
        </div>
        <div>
          <h2 className="text-5xl mb-3 text-center font-bold text-pink-600">$150 million</h2>
          <p className="text-lg text-center">earned by freelancers, with top freelancers earning over $7,000/m</p>
        </div>
        <div>
          <h2 className="text-5xl mb-3 text-right font-bold text-pink-600">10 minutes</h2>
          <p className="text-lg text-right">to task a freelancer, with 90% of projects completed in 7 days</p>
        </div>
      </div>

      {/* Trusted Section */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 bg-gray-900 text-white rounded-lg overflow-hidden">
        <div className="p-10 my-auto">
          <h3 className="text-xl text-pink-400">Grow your business</h3>
          <h2 className="text-7xl font-bold mt-2">Trusted globally by over 1 million businesses, small to large</h2>
          <button className="mt-8 px-6 py-4 bg-pink-600 text-white ">START NOW FOR FREE</button>
        </div>
        <div>
          <img src="/images/promo-business--desktop.webp" alt="Business Woman" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Brands Section */}
      <div className="max-w-6xl mx-auto py-8 flex flex-wrap justify-center gap-6">
        {['BBC', 'BUSINESS INSIDER', 'CNBC', 'FT', 'Forbes', 'The Independent'].map((brand, index) => (
          <span key={index} className="text-lg font-semibold uppercase">{brand}</span>
        ))}
      </div>

     
    </div>
  );
};


const StaticFeatures = () => {
  const Feature = ({ title, description }) => {
    return (
      <div className="flex w-1/3 items-start ">
       
        <div>
          <h3 className="font-semibold text-md mb-2 text-pink-600">{title}</h3>
          <p className="text-gray-200 text-xs">{description}</p>
        </div>
      </div>
    );
  };
  return (<>
  <div className="bg-black min-h-screen flex items-center justify-center p-6">
      <div className="bg-gray-900 p-10 px-20 w-full rounded-xl max-w-7xl flex flex-col md:flex-row items-center gap-10 shadow-lg ">
        {/* Left Side */}
        <div className="flex-1">
          <h1 className="text-5xl font-semibold text-gray-100">
            The <span className="text-pink-600">premium</span> freelance solution for businesses
          </h1>
          <div className="mt-12 items-center gap-x-20 gap-y-10 flex flex-wrap ">
            <Feature title="Dedicated hiring experts" description="Count on an account manager to find you the right talent and see to your project’s every need." />
            <Feature title="Satisfaction guarantee" description="Order confidently, with guaranteed refunds for less-than-satisfactory deliveries." />
            <Feature title="Advanced management tools" description="Seamlessly integrate freelancers into your team and projects." />
            <Feature title="Flexible payment models" description="Pay per project or opt for hourly rates to facilitate longer-term collaboration." />
          </div>
          <button className="mt-10 px-6 py-3 bg-pink-600 text-white rounded-lg shadow-md hover:bg-gray-800 transition">
            Try Now
          </button>
        </div>
        {/* Right Side */}
        <div className="flex-1 relative">
          <img
            src="/images/promo-business--desktop.webp"
            alt="Fiverr Pro"
            className="rounded-lg shadow-md"
          />
          <div className="absolute top-5 right-5 bg-white p-2 rounded-full shadow-md flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
            <span>Project Status</span>
            <span className="font-semibold">92%</span>
          </div>
        </div>
      </div>
    </div>
  </>)
}
