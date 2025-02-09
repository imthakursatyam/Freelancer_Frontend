// ProfilePage.js
import React from 'react';

const ProfilePage = () => {
  const profile = {
    name: "John Doe",
    bio: "Experienced front-end developer with expertise in building modern, responsive websites and web applications.",
    contactNumber: "+1234567890",
    email: "john.doe@example.com",
    skills: ["HTML", "CSS", "JavaScript", "React", "Vue.js", "Sass"],
    certifications: ["Certified Web Developer", "React Native Certified"],
    languages: ["English", "Spanish"],
    reviews: [
      "Great work on the website design!",
      "Excellent coding skills, fast delivery."
    ],
    location: { city: "New York", country: "USA" },
    profileImg: "https://example.com/images/john_doe_profile.jpg",
    workExperience: [
      { role: "Frontend Developer", desc: "Built modern, responsive websites using React and CSS", startDate: new Date("2020-06-01"), endDate: new Date("2022-06-01") },
      { role: "UI/UX Designer", desc: "Worked on designing intuitive user interfaces for web applications", startDate: new Date("2018-01-01"), endDate: new Date("2020-05-01") }
    ],
    portfolio: [
      { title: "E-commerce Website", description: "E-commerce site built with React", link: "https://example.com/project1", type: "link" },
      { title: "Personal Blog", description: "Personal blog with custom theme", link: "https://example.com/project2", type: "link" }
    ]
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl py-12 rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center p-8 space-y-6 md:space-y-0 md:space-x-8">
          <img src={profile.profileImg} alt="Profile" className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-gray-300" />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-800">{profile.name}</h1>
            <p className="text-gray-600 mt-2">{profile.bio}</p>
            <div className="mt-4 text-gray-500">
              <p>Location: {profile.location.city}, {profile.location.country}</p>
              <p>Contact: {profile.contactNumber}</p>
              <p>Email: {profile.email}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Skills</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {profile.skills.map((skill, index) => (
                <span key={index} className="text-sm bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-medium text-center hover:bg-gray-300 transition">{skill}</span>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Certifications</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {profile.certifications.map((cert, index) => (
                <li key={index} className="text-sm">{cert}</li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Languages</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {profile.languages.map((lang, index) => (
                <li key={index} className="text-sm">{lang}</li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reviews</h2>
            <div className="space-y-4">
              {profile.reviews.map((review, index) => (
                <div key={index} className="p-4 bg-gray-50 border-l-4 border-blue-500 text-gray-700 rounded-lg shadow hover:shadow-md transition-all">
                  <p>"{review}"</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Work Experience</h2>
            <div className="space-y-6">
              {profile.workExperience.map((job, index) => (
                <div key={index} className="p-6 bg-gray-50 shadow rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800">{job.role}</h3>
                  <p className="text-gray-600">{job.desc}</p>
                  <p className="text-gray-500 text-sm">({job.startDate.toLocaleDateString()} - {job.endDate.toLocaleDateString()})</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Portfolio</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.portfolio.map((project, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-lg font-semibold hover:underline">{project.title}</a>
                  <p className="text-gray-700 mt-2">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
