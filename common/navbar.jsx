"use client"
import {  useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/authContext";

export default function Navbar() {
  const { user, login, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
    const [activeHash, setActiveHash] = useState("");
 
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/#hero" },
    { name: "Last Companies", href: "/#last-company" },
    { name: "Experience", href: "/#exprience" },
    { name: "Skills", href: "/#skills" },
    { name: "My Project", href: "/my-project" },
  ];
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between w-full h-18 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur bg-black/50">
      {/* Logo */}
      <Link href="/#!">
        <Image
          className="h-9 w-auto rounded-2xl"
          width={138}
          height={36}
          priority={true}
          alt="logo"
          src="https://avatars.githubusercontent.com/u/136339307?v=4"
        />
      </Link>

   <div className="hidden lg:flex items-center gap-8 relative">
      {navItems.map((item) => {
        const itemHash = item.href.includes("#")
          ? item.href.substring(item.href.indexOf("#"))
          : "";

        const isActive =
          pathname === "/my-project"
            ? pathname === item.href
            : activeHash === itemHash;

        return (
          <Link
            key={item.name}
            href={item.href}
            className="relative group text-white font-medium"
          >
            <span
              className={`transition duration-300 ${
                isActive ? "text-amber-400" : "group-hover:text-orange-400"
              }`}
            >
              {item.name}
            </span>

            {/* Fire Hover Glow */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-md bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 transition duration-500 -z-10 rounded-md"></span>

            {/* Active Animated Underline */}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 -bottom-2 h-[3px] w-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 rounded-full rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
          </Link>
        );
      })}
    </div>

     {/* Desktop CV Button & Login */}
      <div className="hidden lg:flex items-center gap-3">
       
        <Link
          href="/Pankaj.pdf"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition text-white active:scale-95 rounded-lg px-7 h-11"
        >
          CV View
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>

        {user ? (
          <>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 transition text-white active:scale-95 rounded-lg px-5 h-11"
            >
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition text-white active:scale-95 rounded-lg px-5 h-11"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 transition text-white active:scale-95 rounded-lg px-5 h-11"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile FAB */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative z-50 p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg focus:outline-none transition-transform active:scale-95"
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu: Always rendered, toggle visibility with CSS */}
      <div
        className={`fixed top-20 right-6 bg-black/90 backdrop-blur-lg rounded-xl shadow-lg flex flex-col gap-4 p-6 z-40 transition-all duration-300 transform ${mobileMenuOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        <Link href="/#hero" className="hover:text-slate-300 transition" onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link href="/#last-company" className="hover:text-slate-300 transition" onClick={() => setMobileMenuOpen(false)}>Last Companies</Link>
        <Link href="/#exprience" className="hover:text-slate-300 transition" onClick={() => setMobileMenuOpen(false)}>Experience</Link>
        <Link href="/#skills" className="hover:text-slate-300 transition" onClick={() => setMobileMenuOpen(false)}>Skills</Link>
        <Link href="/my-project" className="hover:text-slate-300 transition" onClick={() => setMobileMenuOpen(false)}>My Project</Link>
         <Link
          href="/Pankaj.pdf"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition text-white active:scale-95 rounded-lg px-7 h-11"
        >
          CV View
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
        {user ? (
          <>
            <Link href="/dashboard" className="text-emerald-400 hover:text-emerald-300 transition" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
            <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-red-400 hover:text-red-300 transition text-left">Logout</button>
          </>
        ) : (
          <button onClick={() => { setShowLoginModal(true); setMobileMenuOpen(false); }} className="mt-2 text-purple-400 hover:text-purple-300 transition text-left">Login</button>
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm t-[100px] " onClick={() => setShowLoginModal(false)}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-gray-800 rounded-2xl p-8 w-full max-w-md mx-4 border border-gray-700 shadow-2xl top-[282px]"
          >
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
            
            {loginError && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {loginError}
              </div>
            )}
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              setLoggingIn(true);
              setLoginError('');
              try {
                await login(loginForm.email, loginForm.password);
                setShowLoginModal(false);
                window.location.href = '/dashboard';
              } catch (err) {
                setLoginError(err.message);
              }
              setLoggingIn(false);
            }}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
              
              <button
                type="submit"
                disabled={loggingIn}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 rounded-lg font-medium transition"
              >
                {loggingIn ? 'Logging in...' : 'Login'}
              </button>
            </form>
            
            <p className="mt-4 text-center text-sm text-gray-400">
              Need an account?{' '}
              <button 
                onClick={() => {
                  setShowLoginModal(false);
                  alert('Please contact admin to create your account, or use the API /api/auth/signup');
                }}
                className="text-indigo-400 hover:text-indigo-300"
              >
                Contact Admin
              </button>
            </p>
          </motion.div>
        </div>
      )}
    </nav>
  );
}
