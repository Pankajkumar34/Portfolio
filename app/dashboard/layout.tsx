"use client";

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  sectionName: string;
  sectionType: string;
  order: number;
  path?: string;
}

const defaultMenuItems = [
  { id: 'hero', label: 'Hero Section', icon: '🏠', sectionName: 'hero', sectionType: 'hero', order: 1, path: '/dashboard' },
  { id: 'profile', label: 'Profile', icon: '👤', sectionName: 'profile', sectionType: 'profile', order: 2, path: '/dashboard/profile-section' },
  { id: 'experience', label: 'Experience', icon: '💼', sectionName: 'experience', sectionType: 'experience', order: 3, path: '/dashboard/experience-section' },
  { id: 'skills', label: 'Skills', icon: '⚡', sectionName: 'skills', sectionType: 'skills', order: 4, path: '/dashboard/skills-section' },
  { id: 'companies', label: 'Companies', icon: '🏢', sectionName: 'companies', sectionType: 'companies', order: 5, path: '/dashboard/companies-section' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultMenuItems);
  const [menuLoading, setMenuLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadMenuItems();
    }
  }, [user]);

  const loadMenuItems = async () => {
    try {
      const res = await fetch('/api/menu');
      if (res.ok) {
        const data = await res.json();
        if (data.items && Array.isArray(data.items)) {
          const itemsWithPaths = data.items.map((item: MenuItem) => ({
            ...item,
            path:item.sectionName==="hero"?"/dashboard": `/dashboard/${item.sectionName}-section`
          }));
          setMenuItems(itemsWithPaths);
        }
      }
    } catch (error) {
      console.error('Error loading menu:', error);
    } finally {
      setMenuLoading(false);
    }
  };

  // Helper function to check if a menu item is active
  const isActive = (path: string) => pathname === path;

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
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">
          <h1 className="text-2xl font-bold text-indigo-400">
            Dashboard
          </h1>
          <span>Welcome, {user.name}</span>
        </div>
      </header>

      <div className="flex">
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

                {/* Dropdown Items - Now using Link for routing */}
                {isOpen && (
                  <div className="mt-2 space-y-2 px-2 pb-2">
                    {menuItems.map((item) =>{
                      console.log(item,"= ")
return(
    <Link
                        key={item.id}
                        href={item.path || `#`}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition ${
                          isActive(item.path || `#`)
                            ? "bg-indigo-600 text-white"
                            : "text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </Link>
)
                    } )}
                  </div>
                )}
              </div>
            </nav>
          )}

          {/* Chat AI Link */}
          <div className="mt-6 pt-4 border-gray-700">
            <Link
              href="/dashboard/add-chat"
              className="flex items-center gap-3 px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
            >
              <span className="text-xl">💬</span>
              <span className="font-semibold">Chat AI</span>
            </Link>
          </div>
        </aside>

        {/* Main Content - Outlet equivalent */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

