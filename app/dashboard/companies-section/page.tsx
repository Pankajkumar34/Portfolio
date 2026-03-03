"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import LastCompnieseSec from '@/components/dashboardComponents/companiesSec';

const defaultSections = {
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

interface ApiSection {
  sectionName: string;
  content: any;
}

export default function CompaniesSectionPage() {
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
      <LastCompnieseSec 
        handleSave={handleSave} 
        sections={sections} 
        updateSection={updateSection} 
        saving={saving} 
      />
    </div>
  );
}

