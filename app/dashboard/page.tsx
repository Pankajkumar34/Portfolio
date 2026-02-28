"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const defaultSections: Record<string, any> = {
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

// Default menu items
const defaultMenuItems = [
  { id: 'hero', label: 'Hero Section', icon: '🏠', sectionName: 'hero', sectionType: 'hero', order: 1 },
  { id: 'profile', label: 'Profile', icon: '👤', sectionName: 'profile', sectionType: 'profile', order: 2 },
  { id: 'experience', label: 'Experience', icon: '💼', sectionName: 'experience', sectionType: 'experience', order: 3 },
  { id: 'skills', label: 'Skills', icon: '⚡', sectionName: 'skills', sectionType: 'skills', order: 4 },
  { id: 'companies', label: 'Companies', icon: '🏢', sectionName: 'companies', sectionType: 'companies', order: 5 },
];

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  sectionName: string;
  sectionType: string;
  order: number;
}
type SectionKey = "hero" | "profile" | "experience" | "skills" | "companies";
interface ApiSection {
  sectionName: SectionKey;
  content: any;
}
export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('hero');
  const [sections, setSections] = useState<Record<string, any>>(defaultSections);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultMenuItems);
  const [menuLoading, setMenuLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [newMenuItem, setNewMenuItem] = useState({ label: '', icon: '📄', sectionName: '', sectionType: 'custom' });
  const [menuSaving, setMenuSaving] = useState(false);
  const [menuMessage, setMenuMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadSections();
      loadMenuItems();
    }
  }, [user]);

  const loadMenuItems = async () => {
    try {
      const res = await fetch('/api/menu');
      if (res.ok) {
        const data = await res.json();
        if (data.items && Array.isArray(data.items)) {
          setMenuItems(data.items);
        }
      }
    } catch (error) {
      console.error('Error loading menu:', error);
    } finally {
      setMenuLoading(false);
    }
  };
  const loadSections = async () => {
    try {
      const res = await fetch('/api/section');
      if (res.ok) {
        const data = await res.json();
              console.log(data,"data")

        if (Array.isArray(data)) {
          const merged = { ...defaultSections };
          data.forEach((section: ApiSection) => {
            if (section?.sectionName && section?.content) {
              merged[section?.sectionName] = section?.content;
            }
          });
          setSections(merged);
        }
      }

    } catch (error) {
      console.error('Error loading sections:', error);
    }
  };

  const handleSave = async (sectionName: string) => {
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

  const updateSection = (sectionName: string, value: any) => {
    setSections((prev) => ({
      ...prev,
      [sectionName]: value,
    }));
  };

  // Menu functions
  const handleSaveMenu = async () => {
    setMenuSaving(true);
    setMenuMessage('');
    try {
      const res = await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: menuItems }),
        credentials: 'include',
      });

      if (res.ok) {
        setMenuMessage('Menu saved successfully!');
        setTimeout(() => setMenuMessage(''), 3000);
      } else {
        setMenuMessage('Error saving menu');
      }
    } catch (error) {
      setMenuMessage('Error saving menu');
    }
    setMenuSaving(false);
  };

  const handleAddMenuItem = () => {
    if (!newMenuItem.label || !newMenuItem.sectionName) {
      setMenuMessage('Please fill in label and section name');
      return;
    }

    const newItem: MenuItem = {
      id: `custom_${Date.now()}`,
      label: newMenuItem.label,
      icon: newMenuItem.icon,
      sectionName: newMenuItem.sectionName,
      sectionType: newMenuItem.sectionType,
      order: menuItems.length + 1,
    };

    // Initialize empty section data
    setSections((prev) => ({
      ...prev,
      [newMenuItem.sectionName]: newMenuItem.sectionType === 'custom' ? { content: '' } : {},
    }));

    setMenuItems([...menuItems, newItem]);
    setNewMenuItem({ label: '', icon: '📄', sectionName: '', sectionType: 'custom' });
    setShowAddModal(false);
    setMenuMessage('Item added! Save menu to apply changes.');
  };

  const handleDeleteMenuItem = (id: string) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      setMenuItems(menuItems.filter((item) => item.id !== id));
      setMenuMessage('Item removed! Save menu to apply changes.');
    }
  };

  const handleMoveMenuItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...menuItems];
    if (direction === 'up' && index > 0) {
      [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    } else if (direction === 'down' && index < newItems.length - 1) {
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    }
    setMenuItems(newItems);
    setMenuMessage('Order changed! Save menu to apply changes.');
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
         
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 bg-gray-800 min-h-screen p-4 border-r border-gray-700">

          <div className="flex items-center justify-between mb-4">

            <h2 className="text-lg font-semibold">Menu</h2>
            
          </div>

          {menuLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <nav className="space-y-2">

              {/* Main Menu */}
              <div className="bg-gray-800 rounded-lg">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-200 hover:bg-gray-700 rounded-lg"
                >
                  <span className="font-semibold">Dynamic Page</span>
                  <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>

                {/* Dropdown Items */}
                {isOpen && (
                  <div className="mt-2 space-y-2 px-2 pb-2">
                    {menuItems.map((item, index) => (
                      <div key={item.id} className="group relative">
                        <button
                          onClick={() => setActiveTab(item.sectionName)}
                          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition ${activeTab === item.sectionName
                            ? "bg-indigo-600 text-white"
                            : "text-gray-300 hover:bg-gray-700"
                            }`}
                        >
                          <span className="text-xl">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </button>

                        {/* Move/Delete buttons */}
                        <div className="absolute right-2 top-2 hidden group-hover:flex gap-1">
                          <button
                            onClick={() => handleMoveMenuItem(index, "up")}
                            disabled={index === 0}
                            className="p-1 bg-gray-600 hover:bg-gray-500 rounded text-xs disabled:opacity-30"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => handleMoveMenuItem(index, "down")}
                            disabled={index === menuItems.length - 1}
                            className="p-1 bg-gray-600 hover:bg-gray-500 rounded text-xs disabled:opacity-30"
                          >
                            ↓
                          </button>
                          <button
                            onClick={() => handleDeleteMenuItem(item.id)}
                            className="p-1 bg-red-600 hover:bg-red-500 rounded text-xs"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 pt-4 border-t border-gray-700">
                      <button
                        onClick={handleSaveMenu}
                        disabled={menuSaving}
                        className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-medium transition"
                      >
                        {menuSaving ? 'Saving...' : 'Save Menu'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          )}

          {/* Save Menu Button */}

        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {menuMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg ${menuMessage.includes('success') || menuMessage.includes('added') || menuMessage.includes('changed')
                ? 'bg-green-600'
                : 'bg-red-600'
                }`}
            >
              {menuMessage}
            </motion.div>
          )}

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg ${message.includes('success')
                ? 'bg-green-600'
                : 'bg-red-600'
                }`}
            >
              {message}
            </motion.div>
          )}

          {/* Hero Section Editor */}
          {activeTab === 'hero' && sections.hero && (
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
                    value={sections.hero.title || ''}
                    onChange={(e) => updateSection('hero', { ...sections.hero, title: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <textarea
                    value={sections.hero.subtitle || ''}
                    onChange={(e) => updateSection('hero', { ...sections.hero, subtitle: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={sections.hero.name || ''}
                    onChange={(e) => updateSection('hero', { ...sections.hero, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Profile Image URL</label>
                  <input
                    type="text"
                    value={sections.hero.profileImage || ''}
                    onChange={(e) => updateSection('hero', { ...sections.hero, profileImage: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CV Link</label>
                  <input
                    type="text"
                    value={sections.hero.cvLink || ''}
                    onChange={(e) => updateSection('hero', { ...sections.hero, cvLink: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">GitHub Link</label>
                  <input
                    type="text"
                    value={sections.hero.githubLink || ''}
                    onChange={(e) => updateSection('hero', { ...sections.hero, githubLink: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={sections.hero.openToWork || false}
                    onChange={(e) => updateSection('hero', { ...sections.hero, openToWork: e.target.checked })}
                    className="w-5 h-5 rounded bg-gray-700 border-gray-600"
                  />
                  <label className="text-sm font-medium">Open to Work</label>
                </div>
              </div>
            </div>
          )}

          {/* Profile Section Editor */}
          {activeTab === 'profile' && sections.profile && (
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
                {(sections.profile.personalDetails || []).map((detail: any, index: number) => (
                  <div key={index} className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={detail.label || ''}
                      onChange={(e) => {
                        const newDetails = [...(sections.profile.personalDetails || [])];
                        newDetails[index].label = e.target.value;
                        updateSection('profile', { ...sections.profile, personalDetails: newDetails });
                      }}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                      placeholder="Label"
                    />
                    <input
                      type="text"
                      value={detail.value || ''}
                      onChange={(e) => {
                        const newDetails = [...(sections.profile.personalDetails || [])];
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
                  value={sections.profile.mapEmbed || ''}
                  onChange={(e) => updateSection('profile', { ...sections.profile, mapEmbed: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Experience Section Editor */}
          {activeTab === 'experience' && sections.experience && (
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

              {(sections.experience || []).map((exp: any, index: number) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Role</label>
                      <input
                        type="text"
                        value={exp.role || ''}
                        onChange={(e) => {
                          const newExp = [...(sections.experience || [])];
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
                        value={exp.company || ''}
                        onChange={(e) => {
                          const newExp = [...(sections.experience || [])];
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
                        value={exp.duration || ''}
                        onChange={(e) => {
                          const newExp = [...(sections.experience || [])];
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
                        value={exp.link || ''}
                        onChange={(e) => {
                          const newExp = [...(sections.experience || [])];
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
                      value={(exp.points || []).join('\n')}
                      onChange={(e) => {
                        const newExp = [...(sections.experience || [])];
                        newExp[index].points = e.target.value.split('\n').filter((p: string) => p.trim());
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
          {activeTab === 'skills' && sections.skills && (
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
                    value={sections.skills.title || ''}
                    onChange={(e) => updateSection('skills', { ...sections.skills, title: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={sections.skills.description || ''}
                    onChange={(e) => updateSection('skills', { ...sections.skills, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Frontend</label>
                  <input
                    type="text"
                    value={sections.skills.frontend || ''}
                    onChange={(e) => updateSection('skills', { ...sections.skills, frontend: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Backend</label>
                  <input
                    type="text"
                    value={sections.skills.backend || ''}
                    onChange={(e) => updateSection('skills', { ...sections.skills, backend: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">DevOps</label>
                  <input
                    type="text"
                    value={sections.skills.devops || ''}
                    onChange={(e) => updateSection('skills', { ...sections.skills, devops: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Companies Section Editor */}
          {activeTab === 'companies' && sections.companies && (
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

              {(sections.companies || []).map((company: any, index: number) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-semibold">Company {index + 1}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        value={company.name || ''}
                        onChange={(e) => {
                          const newCompanies = [...(sections.companies || [])];
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
                        value={company.period || ''}
                        onChange={(e) => {
                          const newCompanies = [...(sections.companies || [])];
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
                        value={company.logo || ''}
                        onChange={(e) => {
                          const newCompanies = [...(sections.companies || [])];
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
                        value={company.link || ''}
                        onChange={(e) => {
                          const newCompanies = [...(sections.companies || [])];
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
                      value={company.description || ''}
                      onChange={(e) => {
                        const newCompanies = [...(sections.companies || [])];
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

          {/* Custom Section Editor */}
          {activeTab && !['hero', 'profile', 'experience', 'skills', 'companies'].includes(activeTab) && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{menuItems.find(m => m.sectionName === activeTab)?.label || 'Custom Section'}</h2>
                <button
                  onClick={() => handleSave(activeTab)}
                  disabled={saving}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 rounded-lg font-medium transition"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <textarea
                    value={sections[activeTab]?.content || ''}
                    onChange={(e) => updateSection(activeTab, { content: e.target.value })}
                    rows={10}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your custom content here..."
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Menu Item Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-800 rounded-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Add New Menu Item</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Label</label>
                  <input
                    type="text"
                    value={newMenuItem.label}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, label: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                    placeholder="e.g., Projects"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Icon (emoji)</label>
                  <input
                    type="text"
                    value={newMenuItem.icon}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, icon: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                    placeholder="e.g., 🚀"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Section Name (key)</label>
                  <input
                    type="text"
                    value={newMenuItem.sectionName}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, sectionName: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                    placeholder="e.g., projects"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Section Type</label>
                  <select
                    value={newMenuItem.sectionType}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, sectionType: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  >
                    <option value="custom">Custom (Text Content)</option>
                    <option value="hero">Hero</option>
                    <option value="profile">Profile</option>
                    <option value="experience">Experience</option>
                    <option value="skills">Skills</option>
                    <option value="companies">Companies</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMenuItem}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                >
                  Add
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
