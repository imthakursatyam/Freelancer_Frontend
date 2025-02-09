import React from 'react'


const freelancerProfiles = [
  {
    email: "john.doe@example.com",
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
  },
  {
    email: "jane.smith@example.com",
    name: "Jane Smith",
    bio: "Creative front-end developer with a strong passion for designing seamless user experiences.",
    contactNumber: "+0987654321",
    availableForWork: false,
    hourlyRate: 45.0,
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Bootstrap"],
    certifications: ["Certified JavaScript Developer", "UX Design Specialist"],
    languages: ["English", "French"],
    reviews: [
      "Fantastic developer! Really understood the requirements.",
      "Highly recommend for any front-end project."
    ],
    location: { city: "London", country: "UK" },
    profileImg: "https://example.com/images/jane_smith_profile.jpg",  // Added profile image link
    workExperience: [
      { role: "Frontend Developer", desc: "Developed several high-performance React apps", startDate: new Date("2019-03-01"), endDate: new Date("2022-03-01") },
      { role: "Web Designer", desc: "Created custom themes and templates for WordPress sites", startDate: new Date("2017-04-01"), endDate: new Date("2019-02-01") }
    ],
    portfolio: [
      { title: "Portfolio Website", description: "Portfolio website showcasing my work", link: "https://example.com/portfolio", type: "link" },
      { title: "Landing Page Design", description: "Landing page for SaaS product", link: "https://example.com/project3", type: "link" }
    ]
  },
  {
    email: "mark.taylor@example.com",
    name: "Mark Taylor",
    bio: "Passionate front-end developer specializing in mobile-first design and responsive web applications.",
    contactNumber: "+1122334455",
    availableForWork: true,
    hourlyRate: 60.0,
    skills: ["HTML", "CSS", "JavaScript", "Angular", "TypeScript", "Material UI"],
    certifications: ["Angular Certified Developer", "Mobile-First Design Specialist"],
    languages: ["English"],
    reviews: [
      "Amazing work! Delivered ahead of schedule.",
      "Mark has great attention to detail and design skills."
    ],
    location: { city: "Sydney", country: "Australia" },
    profileImg: "https://example.com/images/mark_taylor_profile.jpg",  // Added profile image link
    workExperience: [
      { role: "Frontend Developer", desc: "Worked on Angular projects to build dynamic web apps", startDate: new Date("2020-02-01"), endDate: new Date("2022-02-01") },
      { role: "Junior Frontend Developer", desc: "Assisted in building mobile-first responsive websites using Bootstrap", startDate: new Date("2018-06-01"), endDate: new Date("2020-01-01") }
    ],
    portfolio: [
      { title: "Weather App", description: "Real-time weather app built with Angular", link: "https://example.com/weatherapp", type: "link" },
      { title: "Business Landing Page", description: "Business landing page with custom design", link: "https://example.com/businesslanding", type: "link" }
    ]
  },
  {
    email: "susan.lee@example.com",
    name: "Susan Lee",
    bio: "Front-end developer with a focus on performance optimization and user-centered design.",
    contactNumber: "+1230987654",
    availableForWork: true,
    hourlyRate: 55.0,
    skills: ["HTML", "CSS", "JavaScript", "Vue.js", "Vuex", "Webpack"],
    certifications: ["Certified Frontend Developer", "Performance Optimization Specialist"],
    languages: ["English", "Chinese"],
    reviews: [
      "Susan was a great collaborator, and her work is outstanding.",
      "Very reliable and professional."
    ],
    location: { city: "Toronto", country: "Canada" },
    profileImg: "https://example.com/images/susan_lee_profile.jpg",  // Added profile image link
    workExperience: [
      { role: "Frontend Developer", desc: "Optimized web app performance and improved load times", startDate: new Date("2018-11-01"), endDate: new Date("2021-11-01") },
      { role: "Web Developer", desc: "Worked with a team to develop a large-scale e-commerce site", startDate: new Date("2017-01-01"), endDate: new Date("2018-10-01") }
    ],
    portfolio: [
      { title: "Online Store Optimization", description: "Optimized online store for fast loading", link: "https://example.com/onlinestore", type: "link" },
      { title: "Vue.js Blog", description: "Vue.js based blog platform", link: "https://example.com/vueblog", type: "link" }
    ]
  },
  {
    email: "lucas.johnson@example.com",
    name: "Lucas Johnson",
    bio: "Innovative front-end developer who loves creating beautiful and interactive user interfaces.",
    contactNumber: "+1928374650",
    availableForWork: false,
    hourlyRate: 70.0,
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Redux"],
    certifications: ["React Certified Developer", "UX/UI Design Fundamentals"],
    languages: ["English", "German"],
    reviews: [
      "A fantastic developer with great communication skills.",
      "Delivered high-quality work quickly and efficiently."
    ],
    location: { city: "Berlin", country: "Germany" },
    profileImg: "https://example.com/images/lucas_johnson_profile.jpg",  // Added profile image link
    workExperience: [
      { role: "Lead Frontend Developer", desc: "Led a team to create an interactive React application", startDate: new Date("2019-08-01"), endDate: new Date("2022-08-01") },
      { role: "UI Developer", desc: "Developed UI components for a SaaS application", startDate: new Date("2017-05-01"), endDate: new Date("2019-07-01") }
    ],
    portfolio: [
      { title: "SaaS Dashboard", description: "SaaS Dashboard built with React", link: "https://example.com/saas-dashboard", type: "link" },
      { title: "Next.js Blog", description: "Personal blog built with Next.js", link: "https://example.com/blog", type: "link" }
    ]
  }
];

console.log(freelancerProfiles);

export default function test() {
    
  return (
    <div>
        <button onClick={startFetch}>fetch</button>
    </div>
  )
}
