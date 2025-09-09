"use client";
import { useState,useEffect, use } from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [themeMode,setThemeMode]=useState('');
  const { data: session } = useSession();
  const path =  usePathname();
  console.log(path.replace('/dashboard','')) 
  useEffect(()=>{
    setThemeMode(theme)
  },[theme])
  const links = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 card-shadow rounded-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-pink-600">
          MySite
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={session && link.href === '/blogs' || session && link.href === '/projects' ?`/dashboard${link.href}`:link.href}
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

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            {themeMode === "light" ? "🌙" : "🔆"}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800 dark:text-gray-200 text-2xl"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="flex flex-col space-y-4 p-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={session && link.href === '/blogs' || session && link.href === '/projects' ?`/dashboard${link.href}`:link.href}
                onClick={() => setMenuOpen(false)}
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
            <button
              onClick={() => {
                toggleTheme();
                setMenuOpen(false);
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
