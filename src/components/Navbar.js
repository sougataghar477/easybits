"use client";
import { useState,useEffect } from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";

export default function Navbar() {
  // State to control mobile menu open/close
  const [menuOpen, setMenuOpen] = useState(false);

  // Theme handling from next-themes
  const { theme, setTheme } = useTheme();
  const [themeMode,setThemeMode]=useState('');

  // Auth session (to check if user is logged in)
  const { data: session } = useSession();

  // Get current path from Next.js router
  const path =  usePathname();
  console.log(path.replace('/dashboard','')) 

  // Sync local state with current theme
  useEffect(()=>{
    setThemeMode(theme)
  },[theme])

  // Navbar links
  const links = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  // Toggle light/dark theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 card-shadow rounded-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo / Brand */}
        <Link href="/" className="text-2xl font-bold text-pink-600">
          MySite
        </Link>

        {/* Desktop Menu (visible on md+ screens) */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              // If logged in, /blogs and /projects redirect under /dashboard
              href={session && link.href === '/blogs' || session && link.href === '/projects' 
                ? `/dashboard${link.href}`
                : link.href}
              // Add underline to active route
              className={`${
                (path === "/dashboard" && link.href === "/dashboard") ||
                (path !== "/dashboard" &&
                path.replace("/dashboard", "") === link.href)
                ? "underline"
                : ""
                } underline-offset-6 decoration-2 text-white hover:text-pink-600 dark:hover:text-pink-400 transition`}
            >
              {link.label}
            </Link>
          ))}

          {/* Theme Toggle Button (desktop) */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            {themeMode === "light" ? "🌙" : "🔆"}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800 dark:text-gray-200 text-2xl"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu (dropdown when menuOpen is true) */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="flex flex-col space-y-4 p-4">
            {links.map((link) => (
              <Link
                key={link.href}
                // Handle logged-in redirect for /blogs & /projects
                href={session && link.href === '/blogs' || session && link.href === '/projects' 
                  ? `/dashboard${link.href}`
                  : link.href}
                // Close menu after clicking a link
                onClick={() => setMenuOpen(false)}
                // Highlight active link
                className={`${
                (path === "/dashboard" && link.href === "/dashboard") ||
                (path !== "/dashboard" &&
                path.replace("/dashboard", "") === link.href)
                ? "underline"
                : ""
                } underline-offset-6 decoration-2 text-white hover:text-pink-600 dark:hover:text-pink-400 transition`}
              >
                {link.label}
              </Link>
            ))}

            {/* Theme Toggle (mobile) */}
            <button
              onClick={() => {
                toggleTheme();
                setMenuOpen(false); // close menu after toggle
              }}
              className="flex items-center gap-2 mt-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              {themeMode === "light" ? "🌙" : "🔆"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
