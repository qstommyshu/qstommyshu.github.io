import React, { useRef, useEffect, useState } from "react";
import { Download, Mail, Github, Linkedin, Globe } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

function Resume() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    // use MutationObserver to detect theme changes in the class attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDarkMode(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const handleDownload = async () => {
    const element = resumeRef.current;
    if (!element) return;

    try {
      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: window.devicePixelRatio,
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      const pdf = new jsPDF("p", "pt", "a4");
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Tommy_Shu_Resume.pdf");
    } catch (error) {
      console.error("PDF generation error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 print:bg-white">
      {/* Download Button */}
      <div className="max-w-6xl mx-auto mb-4 flex justify-end">
        <button
          onClick={handleDownload}
          disabled={isDarkMode}
          className={`${
            isDarkMode
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          } text-white px-4 py-2 rounded-lg flex items-center transition-colors`}
        >
          <Download size={20} className="mr-2" />
          {isDarkMode
            ? "Please switch to light mode to proceed"
            : "Download PDF"}
        </button>
      </div>

      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Resume Content */}
        <div ref={resumeRef} id="resume-content">
          {/* Header */}
          <div className="bg-indigo-600 dark:bg-indigo-700 text-white px-8 py-12">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold mb-2">Tommy Shu</h1>
                <h2 className="text-xl">Full Stack Software Developer</h2>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a
                  href="mailto:qstommyshu@gmail.com"
                  className="hover:underline"
                >
                  qstommyshu@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <Github size={16} className="mr-2" />
                <a
                  href="https://github.com/qstommyshu"
                  className="hover:underline"
                >
                  github.com/qstommyshu
                </a>
              </div>
              <div className="flex items-center">
                <Linkedin size={16} className="mr-2" />
                <a
                  href="https://www.linkedin.com/in/qi-shu/"
                  className="hover:underline"
                >
                  linkedin.com/in/qi-shu
                </a>
              </div>
              <div className="flex items-center">
                <Globe size={16} className="mr-2" />
                <a
                  href="https://qstommyshu.github.io/"
                  className="hover:underline"
                >
                  qstommyshu.github.io
                </a>
              </div>
            </div>
          </div>

          <div className="px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-12">
                {/* Education */}
                <section>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Education
                  </h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Georgia Institute of Technology
                        </h4>
                        <p className="text-indigo-600 dark:text-indigo-400">
                          M.S. Computer Science (Computing System Stream)
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Courses: Graduate Introduction to Operating Systems,
                          Advance Operating Systems
                        </p>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400">
                        Part-time
                      </span>
                    </div>

                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                          McMaster University
                        </h4>
                        <p className="text-indigo-600 dark:text-indigo-400">
                          B.A.Sc. Computer Science (Co-op) Honours | cGPA:
                          3.91/4.00
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Courses: Distributed Systems, Networks, Graphics,
                          Compilers, Machine Learning, Algorithms
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Extracurricular: VP logistics at competitive
                          programming club, ICPC 2023 Contestant
                        </p>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        Graduated: Jun.2024
                      </span>
                    </div>
                  </div>
                </section>

                {/* Experience */}
                <section>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Work Experience
                  </h3>
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Full Stack Software Developer
                          </h4>
                          <p className="text-indigo-600 dark:text-indigo-400">
                            TD Securities
                          </p>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400">
                          May 2023 - Dec 2023
                        </span>
                      </div>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                        <li>
                          Led front-end development as the lead developer
                          throughout the term
                        </li>
                        <li>
                          Led TDD initiative, increasing test coverage from 30%
                          to 95% and reducing bug reports by 40%
                        </li>
                        <li>
                          Developed 10+ consumer-facing pages with TypeScript
                          and React, improving user engagement by 25%
                        </li>
                        <li>
                          Implemented backend data cache using Liquibase with
                          MSSQL, improving service reliability by 30%
                        </li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Full Stack Software Developer
                          </h4>
                          <p className="text-indigo-600 dark:text-indigo-400">
                            TD Securities
                          </p>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400">
                          May 2022 - Aug 2022
                        </span>
                      </div>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                        <li>
                          Developed graph database migration POC with Spring
                          Boot and Neo4j, improving query performance by 40%
                        </li>
                        <li>
                          Built 20+ REST APIs with FastAPI and MongoDB, used by
                          500+ traders
                        </li>
                        <li>
                          Created trading reports generation tool using Elixir
                          and GraphQL
                        </li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Software Developer in Test
                          </h4>
                          <p className="text-indigo-600 dark:text-indigo-400">
                            Caseware International
                          </p>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400">
                          May 2021 - Apr 2022
                        </span>
                      </div>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                        <li>
                          Developed AWS S3 parquet file validation system,
                          increasing testing efficiency by 30%
                        </li>
                        <li>
                          Built Fintech BI Microservice in Spring Boot, used by
                          2,000+ clients
                        </li>
                        <li>
                          Created 20+ E2E UI automation tests with Cypress.io
                        </li>
                        <li>Designed 10+ CI/CD pipelines in GitHub Actions</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Projects */}
                <section>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Selected Projects
                  </h3>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      <a
                        href="https://github.com/qstommyshu/simple-chat"
                        className="hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        Simple-Chat
                      </a>
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      An AI-powered chat bot that helps users learn web
                      information through natural conversation. Built with
                      Flask, OpenAI API, React, and Redux.
                    </p>
                    <a
                      href="https://qstommyshu.com/"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline mt-1 inline-block"
                    >
                      View Demo →
                    </a>
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Technical Skills */}
                <section>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Technical Skills
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Programming Languages
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Python, JavaScript/TypeScript, Rust, Java, C, C++, Go,
                        Haskell, Ruby
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Frameworks & Tools
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        React.js, Redux, Spring Boot, FastAPI, Flask, GraphQL,
                        RESTful API, Docker, MongoDB, Neo4j, CI/CD pipeline,
                        gRPC
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Cloud & Infrastructure
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        AWS, Microsoft Azure, Git, Linux/Unix, Distributed
                        Systems
                      </p>
                    </div>
                  </div>
                </section>

                {/* Other Interests */}
                <section>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Other Interests
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>
                      <span className="font-semibold">Open Source:</span> Active
                      contributor to various projects including Hyperswitch
                    </li>
                    <li>
                      <span className="font-semibold">Snowboarding:</span> Level
                      2 & Park 1 Professional Instructor
                    </li>
                    <li>
                      <span className="font-semibold">Sports:</span> Ping-Pong
                      enthusiast
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
