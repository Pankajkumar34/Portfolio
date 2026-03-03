"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import ExprienceSec from '@/components/dashboardComponents/experienceSec';

const defaultSections = {
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
};

interface ApiSection {
  sectionName: string;
  content: any;
}

export default function ExperienceSectionPage() {
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
      <ExprienceSec 
        handleSave={handleSave} 
        sections={sections} 
        updateSection={updateSection} 
        saving={saving} 
      />
    </div>
  );
}

