import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  // FileText,
  BookOpen,
  Home,
  GitFork,
  Heart,
  Mail,
  Menu,
  X,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import FaviconSwitcher from "./FaviconSwitcher";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    // { path: "/resume", icon: FileText, label: "Resume" },
    { path: "/blog", icon: BookOpen, label: "Blog" },
    { path: "/opensource", icon: GitFork, label: "Open Source" },
    { path: "/life", icon: Heart, label: "Life" },
    { path: "/contact", icon: Mail, label: "Contact" },
  ];

  const isActivePath = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <Link
            to="/"
            className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mr-8"
          >
            TS
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center">
            <div className="flex space-x-4">
              {navItems.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActivePath(path)
                      ? "text-white bg-indigo-600 dark:bg-indigo-500"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  } transition-colors`}
                >
                  <Icon size={16} className="mr-2" />
                  {label}
                </Link>
              ))}
            </div>
            <div className="ml-auto">
              <FaviconSwitcher />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden flex-1 items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="flex md:hidden flex-1 justify-end items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActivePath(path)
                    ? "text-white bg-indigo-600 dark:bg-indigo-500"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                } transition-colors`}
              >
                <div className="flex items-center">
                  <Icon size={16} className="mr-2" />
                  {label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
