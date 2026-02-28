"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const defaultSections = {
  hero: {
    title: 'MERN Stack Developer',
    subtitle: 'I am a passionate MERN Stack Developer with 2.5+ years of experience building scalable web applications using the MERN stack.',
    name: 'Pankaj Kumar Kushwaha',
    profileImage: 'https://avatars.githubusercontent.com/u/136339307?v=4',
    cvLink: '/Pankaj.pdf',
    githubLink: 'https://github.com/Pankajkumar34',
    openToWork: true,
  },
  profile: {
    personalDetails: [
      { label: 'Name', value: 'Pankaj Kumar Kushwaha' },
      { label: 'Mobile No', value: '8115809072' },
      { label: 'Current Location', value: 'Mohali, Punjab' },
      { label: 'Designation', value: 'MERN Stack Developer' },
      { label: 'Experience', value: '2.5 Years' },
      { label: 'Completed Projects', value: '6+' },
    ],
    education: [
      {
        degree: 'Diploma in Computer Science',
        institute: 'Delhi Institute of Management & Engineering Studies',
        year: '2019 – 2022',
      },
      {
        degree: '12th & 10th (U.P. Board)',
        institute: 'JSI College, Kushinagar',
        year: '2017 – 2019',
        languages: 'Hindi, English (Proficient)',
      },
    ],
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.2345678912345!2d76.64278451501716!3d30.704649181779038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fedf6a7c12345%3A0xabcdef123456789!2sMohali%2C+Punjab%2C+India!5e0!3m2!1sen!2sin!4v1709022331234!5m2!1sen!2sin',
  },
  experience: [
    {
      role: 'Full Stack Developer',
      company: 'QuantumCrafters Studio Pvt. Ltd.',
      duration: 'Aug 2025 – Feb 2026',
      project: 'ElevatrX (Live Platform)',
      link: '#',
      points: [
        'Engineered social media automation platform integrating Meta & Instagram APIs.',
        'Implemented OAuth secure authentication & AI-assisted post creation.',
        'Built scalable backend using Node.js, MongoDB & Redis caching.',
        'Deployed on AWS with S3 and Firebase Cloud Messaging (FCM).',
      ],
    },
    {
      role: 'MERN Stack Developer',
      company: 'CQLSYS Technologies Pvt. Ltd.',
      duration: 'Feb 2024 – May 2025',
      project: 'Palmetto Pickleball (Live)',
      link: 'https://palmettopickleball.com/',
      points: [
        'Developed real-time multiplayer sports platform with chat systems.',
        'Implemented push notifications & cron automation.',
        'Built reusable React components with Redux Toolkit.',
        'Deployed on AWS using S3 & FCM.',
      ],
    },
    {
      role: 'MERN Stack Developer',
      company: 'Baseline IT Development',
      duration: 'May 2023 – Feb 2024',
      project: 'HostTravel.org (Live)',
      link: 'https://hosttravel.org/',
      points: [
        'Built travel booking platform using Next.js with SSR optimization.',
        'Implemented caching strategies & REST APIs.',
        'Integrated AWS S3 for storage & FCM for notifications.',
      ],
    },
  ],
  skills: {
    title: 'Full Stack Developer',
    description: 'I specialize in building modern web applications using the latest frontend and backend technologies with scalable cloud deployment.',
    frontend: 'React.js, Next.js, Redux Toolkit, TypeScript, Tailwind CSS, MUI, HTML, CSS',
    backend: 'Node.js, Express.js, Socket.IO, RESTful APIs, Redis, MongoDB, MySQL',
    devops: 'AWS (S3, CloudFront, EC2), Git/GitHub, Firebase, Postman',
  },
  companies: [
    {
      name: 'QuantumCrafters Studio Private Limited',
      logo: 'https://www.qcsstudio.com/logo.png',
      link: 'https://www.qcsstudio.com/',
      period: 'Aug 2025 – Present',
      description: 'Worked on ElevatrX - social media automation platform.',
    },
    {
      name: 'CQLsys Technologies Private Limited',
      logo: 'https://www.cqlsys.com/logo.png',
      link: 'https://www.cqlsys.com/',
      period: 'Feb 2024 – May 2025',
      description: 'Worked on Palmetto Pickleball and LetMeCU platforms.',
    },
    {
      name: 'Baseline IT Development Private Limited',
      logo: 'https://baselineitdevelopment.com/logo.png',
      link: 'https://baselineitdevelopment.com',
      period: 'May 2023 – Feb 2024',
      description: 'Contributed to HostTravel development.',
    },
  ],
};

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('hero');
  const [sections, setSections] = useState(defaultSections);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadSections();
    }
  }, [user]);

  const loadSections = async () => {
    try {
      const res = await fetch('/api/section');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          const merged = { ...defaultSections };
          data.forEach((section) => {
            if (section.sectionName && section.content) {
              merged[section.sectionName] = section.content;
            }
          });
          setSections(merged);
        }
      }
    } catch (error) {
      console.error('Error loading sections:', error);
    }
  };

  const handleSave = async (sectionName) => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionName,
          content: sections[sectionName],
        }),
        credentials: 'include',
      });

      if (res.ok) {
        setMessage('Saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error saving. Please login again.');
      }
    } catch (error) {
      setMessage('Error saving section');
    }
    setSaving(false);
  };

  const updateSection = (sectionName, value) => {
    setSections((prev) => ({
      ...prev,
      [sectionName]: value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: '🏠' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'companies', label: 'Companies', icon: '🏢' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <span className="text-sm text-gray-400">Manage your portfolio</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">Welcome, {user.name}</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 min-h-screen p-4 border-r border-gray-700">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg ${
                message.includes('success')
                  ? 'bg-green-600'
                  : 'bg-red-600'
              }`}
            >
              {message}
            </motion.div>
          )}

          {/* Hero Section Editor */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Hero Section</h2>
                <button
                  onClick={() => handleSave('hero')}
                  disabled={saving}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 rounded-lg font-medium transition"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={sections.hero.title}
                    onChange={(e) => updateSection('hero', { ...sections.hero, title: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <textarea
                    value={sections.hero.subtitle}
                    onChange={(e) => updateSection('hero', { ...sections.hero, subtitle: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={sections.hero.name}
                    onChange={(e) => updateSection('hero', { ...sections.hero, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Profile Image URL</label>
                  <input
                    type="text"
                    value={sections.hero.profileImage}
                    onChange={(e) => updateSection('hero', { ...sections.hero, profileImage: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CV Link</label>
                  <input
                    type="text"
                    value={sections.hero.cvLink}
                    onChange={(e) => updateSection('hero', { ...sections.hero, cvLink: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">GitHub Link</label>
                  <input
                    type="text"
                    value={sections.hero.githubLink}
                    onChange={(e) => updateSection('hero', { ...sections.hero, githubLink: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={sections.hero.openToWork}
                    onChange={(e) => updateSection('hero', { ...sections.hero, openToWork: e.target.checked })}
                    className="w-5 h-5 rounded bg-gray-700 border-gray-600"
                  />
                  <label className="text-sm font-medium">Open to Work</label>
                </div>
              </div>
            </div>
          )}

          {/* Profile Section Editor */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Profile Section</h2>
                <button
                  onClick={() => handleSave('profile')}
                  disabled={saving}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 rounded-lg font-medium transition"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold">Personal Details</h3>
                {sections.profile.personalDetails.map((detail, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={detail.label}
                      onChange={(e) => {
                        const newDetails = [...sections.profile.personalDetails];
                        newDetails[index].label = e.target.value;
                        updateSection('profile', { ...sections.profile, personalDetails: newDetails });
                      }}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      placeholder="Label"
                    />
                    <input
                      type="text"
                      value={detail.value}
                      onChange={(e) => {
                        const newDetails = [...sections.profile.personalDetails];
                        newDetails[index].value = e.target.value;
                        updateSection('profile', { ...sections.profile, personalDetails: newDetails });
                      }}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      placeholder="Value"
                    />
                  </div>
                ))}
                
                <h3 className="text-lg font-semibold pt-4">Map Embed URL</h3>
                <input
                  type="text"
                  value={sections.profile.mapEmbed}
                  onChange={(e) => updateSection('profile', { ...sections.profile, mapEmbed: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Experience Section Editor */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Experience Section</h2>
                <button
                  onClick={() => handleSave('experience')}
                  disabled={saving}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 rounded-lg font-medium transition"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              {sections.experience.map((exp, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Role</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const newExp = [...sections.experience];
                          newExp[index].role = e.target.value;
                          updateSection('experience', newExp);
                        }}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const newExp = [...sections.experience];
                          newExp[index].company = e.target.value;
                          updateSection('experience', newExp);
                        }}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Duration</label>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => {
                          const newExp = [...sections.experience];
                          newExp[index].duration = e.target.value;
                          updateSection('experience', newExp);
                        }}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Link</label>
                      <input
                        type="text"
                        value={exp.link}
                        onChange={(e) => {
                          const newExp = [...sections.experience];
                          newExp[index].link = e.target.value;
                          updateSection('experience', newExp);
                        }}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Points (one per line)</label>
                    <textarea
                      value={exp.points.join('\n')}
                      onChange={(e) => {
                        const newExp = [...sections.experience];
                        newExp[index].points = e.target.value.split('\n').filter(p => p.trim());
                        updateSection('experience', newExp);
                      }}
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills Section Editor */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Skills Section</h2>
                <button
                  onClick={() => handleSave('skills')}
                  disabled={saving}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 rounded-lg font-medium transition"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={sections.skills.title}
                    onChange={(e) => updateSection('skills', { ...sections.skills, title: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={sections.skills.description}
                    onChange={(e) => updateSection('skills', { ...sections.skills, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Frontend</label>
                  <input
                    type="text"
                    value={sections.skills.frontend}
                    onChange={(e) => updateSection('skills', { ...sections.skills, frontend: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Backend</label>
                  <input
                    type="text"
                    value={sections.skills.backend}
                    onChange={(e) => updateSection('skills', { ...sections.skills, backend: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">DevOps</label>
                  <input
                    type="text"
                    value={sections.skills.devops}
                    onChange={(e) => updateSection('skills', { ...sections.skills, devops: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Companies Section Editor */}
          {activeTab === 'companies' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Companies Section</h2>
                <button
                  onClick={() => handleSave('companies')}
                  disabled={saving}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 rounded-lg font-medium transition"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              {sections.companies.map((company, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-semibold">Company {index + 1}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        value={company.name}
                        onChange={(e) => {
                          const newCompanies = [...sections.companies];
                          newCompanies[index].name = e.target.value;
                          updateSection('companies', newCompanies);
                        }}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Period</label>
                      <input
                        type="text"
                        value={company.period}
                        onChange={(e) => {
                          const newCompanies = [...sections.companies];
                          newCompanies[index].period = e.target.value;
                          updateSection('companies', newCompanies);
                        }}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Logo URL</label>
                      <input
                        type="text"
                        value={company.logo}
                        onChange={(e) => {
                          const newCompanies = [...sections.companies];
                          newCompanies[index].logo = e.target.value;
                          updateSection('companies', newCompanies);
                        }}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Website Link</label>
                      <input
                        type="text"
                        value={company.link}
                        onChange={(e) => {
                          const newCompanies = [...sections.companies];
                          newCompanies[index].link = e.target.value;
                          updateSection('companies', newCompanies);
                        }}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={company.description}
                      onChange={(e) => {
                        const newCompanies = [...sections.companies];
                        newCompanies[index].description = e.target.value;
                        updateSection('companies', newCompanies);
                      }}
                      rows={2}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
