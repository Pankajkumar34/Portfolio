"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import ProfileSec from '@/components/dashboardComponents/profileSec';

const defaultSections = {
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
};

interface ApiSection {
  sectionName: string;
  content: any;
}

export default function ProfileSectionPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
const [sections, setSections] = useState<any>(defaultSections);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

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
          const merged: any = { ...defaultSections };
          data.forEach((section: ApiSection) => {
            if (section?.sectionName && section?.content) {
              merged[section.sectionName] = section.content;
            }
          });
          setSections(merged);
        }
      }
    } catch (error) {
      console.error('Error loading sections:', error);
    } finally {
      setLoading(false);
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
    setSections((prev: any) => ({
      ...prev,
      [sectionName]: value,
    }));
  };

  if (authLoading || loading) {
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
    <div className="space-y-6">
      {message && (
        <div className={`p-4 rounded-lg ${message.includes('success') ? 'bg-green-600' : 'bg-red-600'}`}>
          {message}
        </div>
      )}
      <ProfileSec 
        handleSave={handleSave} 
        sections={sections} 
        updateSection={updateSection} 
        saving={saving} 
      />
    </div>
  );
}

