import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  Instagram,
  ExternalLink,
  MapPin,
  Clock,
} from "lucide-react";

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Let's Connect
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Feel free to reach out through any of these platforms
          </p>
        </div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Email */}
          <a
            href="mailto:qstommyshu@gmail.com"
            className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Email
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  qstommyshu@gmail.com
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/qi-shu/"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg">
                <Linkedin className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  LinkedIn
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Connect professionally
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/qstommyshu"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg">
                <Github className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  GitHub
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Check out my code
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/tommyshu_/"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg">
                <Instagram className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Instagram
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Follow my journey
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            </div>
          </a>
        </div>

        {/* Additional Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Location */}
            <div className="flex items-start">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Location
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Toronto, Ontario, Canada
                </p>
              </div>
            </div>

            {/* Time Zone */}
            <div className="flex items-start">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Time Zone
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Eastern Standard Time (EST)
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              I'm always open to discussing new projects, opportunities, or just
              having a friendly chat!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
