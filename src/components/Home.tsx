import React, { useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Briefcase,
  User,
  ChevronDown,
  Laptop,
  Layout,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";

const projects = [
  {
    title: "Simple-Chat",
    description:
      "AI-powered chat bot that helps users learn web information through natural conversation. Built with Flask, OpenAI API, React, and Redux.",
    image: "/qstommyshu.github.io/pictures/simple_chat.png",
    technologies: ["React", "Redux", "Flask", "OpenAI"],
    demoUrl: "https://qstommyshu.com/",
    githubUrl: "https://github.com/qstommyshu/simple-chat",
    icon: Layout,
  },
  {
    title: "Personal Website",
    description:
      "Modern, responsive personal website built with React and TypeScript. Features dark mode, blog system, and animations.",
    image: "/qstommyshu.github.io/pictures/personal_site.png",
    technologies: ["React", "TypeScript", "Tailwind", "Vite"],
    githubUrl: "https://github.com/qstommyshu/portfolio",
    icon: Laptop,
  },
];

function Home() {
  useEffect(() => {
    // Add fade-in class to elements on mount
    const elements = document.querySelectorAll(".fade-in-up");
    elements.forEach((element) => {
      element.classList.add("opacity-0");
    });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center relative px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-10 dark:opacity-20"></div>
          <div className="absolute inset-0">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="hero-pattern"
                  width="30"
                  height="30"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="2"
                    className="text-gray-200 dark:text-gray-700"
                    fill="currentColor"
                  ></circle>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-pattern)"></rect>
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/80 dark:from-gray-900 dark:via-gray-900/80"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-6xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-6 fade-in-up">
            Hi, I'm Tommy Shu
          </h1>
          <div className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 h-[60px] fade-in-up delay-200">
            <TypeAnimation
              sequence={[
                "Full Stack Developer crafting beautiful and functional web experiences",
                2000,
                "Building scalable solutions with modern technologies",
                2000,
                "Turning ideas into elegant digital realities",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
          <div className="flex justify-center space-x-4 mb-12 fade-in-up delay-300">
            <a
              href="https://github.com/qstommyshu"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors transform hover:scale-110"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/qi-shu/"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors transform hover:scale-110"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:qstommyshu@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors transform hover:scale-110"
            >
              <Mail size={24} />
            </a>
          </div>
          <div className="animate-bounce fade-in-up delay-400">
            <ChevronDown
              size={24}
              className="text-gray-400 dark:text-gray-500 mx-auto"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-12">
            <User className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              About Me
            </h2>
          </div>
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <p className="text-gray-600 dark:text-gray-300 text-center">
              I'm a passionate Full Stack Developer with expertise in building
              modern web applications and distributed systems. Currently
              pursuing my M.S. in Computer Science at Georgia Institute of
              Technology while working on exciting projects and contributing to
              open source.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-12">
            <Briefcase className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Experience
            </h2>
          </div>
          <div className="space-y-12">
            <div className="relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-200 dark:bg-indigo-800 rounded"></div>
              <div className="space-y-12 relative">
                <div className="relative pl-8">
                  <div className="absolute left-0 -translate-x-1/2 w-4 h-4 bg-indigo-600 dark:bg-indigo-500 rounded-full border-4 border-white dark:border-gray-900"></div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Full Stack Software Developer Intern
                      </h3>
                      <div className="text-indigo-600 dark:text-indigo-400 font-medium">
                        May 2023 - Dec 2023
                      </div>
                    </div>
                    <div className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                      TD Securities
                    </div>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                      <li>Led front-end development as the lead developer</li>
                      <li>
                        Increased test coverage from 30% to 95% through Test
                        Driven Development implementation
                      </li>
                      <li>
                        Developed 20+ trader-facing pages with TypeScript, React
                        and AgGrid
                      </li>
                      <li>
                        Improved service reliability by 30% with backend data
                        cache
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-0 -translate-x-1/2 w-4 h-4 bg-indigo-600 dark:bg-indigo-500 rounded-full border-4 border-white dark:border-gray-900"></div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Full Stack Software Developer Intern
                      </h3>
                      <div className="text-indigo-600 dark:text-indigo-400 font-medium">
                        May 2022 - Aug 2022
                      </div>
                    </div>
                    <div className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                      TD Securities
                    </div>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                      <li>
                        Developed graph database migration POC with 40% query
                        performance improvement
                      </li>
                      <li>Built 20+ REST APIs serving 500+ traders</li>
                      <li>
                        Created trading reports generation tool using Elixir and
                        GraphQL
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-0 -translate-x-1/2 w-4 h-4 bg-indigo-600 dark:bg-indigo-500 rounded-full border-4 border-white dark:border-gray-900"></div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Software Developer in Test Intern
                      </h3>
                      <div className="text-indigo-600 dark:text-indigo-400 font-medium">
                        May 2021 - Apr 2022
                      </div>
                    </div>
                    <div className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                      Caseware International
                    </div>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                      <li>Developed AWS S3 parquet file validation system</li>
                      <li>
                        Built Fintech BI Microservice used by 2,000+ clients
                      </li>
                      <li>Created 20+ E2E tests with Cypress.io</li>
                      <li>Designed 10+ CI/CD pipelines in GitHub Actions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Some of my recent work and open source contributions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.title}
                  className={`bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 fade-in-up delay-${
                    (index + 1) * 100
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <Icon className="absolute top-4 right-4 w-8 h-8 text-white opacity-75" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        <Github size={20} className="mr-2" />
                        Code
                      </a>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          <ExternalLink size={20} className="mr-2" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-12">
            <Code2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Skills
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Programming Languages
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Python",
                  "JavaScript",
                  "TypeScript",
                  "Rust",
                  "Java",
                  "C/C++",
                  "Go",
                  "Haskell",
                  "Ruby",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Frameworks & Tools
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "React.js",
                  "Redux",
                  "Spring Boot",
                  "FastAPI",
                  "Flask",
                  "GraphQL",
                  "Docker",
                  "MongoDB",
                  "Neo4j",
                  "CI/CD",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Cloud & Infrastructure
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "AWS",
                  "Azure",
                  "Git",
                  "Linux/Unix",
                  "Postman",
                  "Distributed Systems",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/qstommyshu"
              className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/qi-shu/"
              className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:qstommyshu@gmail.com"
              className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
          <p className="mt-8 text-center text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} Tommy Shu. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Home;
