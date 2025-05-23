import React from "react";
import { Github, GitFork, GitPullRequest, GitCommit } from "lucide-react";

interface Contribution {
  project: string;
  repo: string;
  repoUrl: string;
  prUrl: string;
  prNumber: string;
  title: string;
  description: string;
  impact: string;
  linesChanged: {
    additions: number;
    deletions: number;
  };
  status: "merged" | "open";
  tags: string[];
}

const contributions: Contribution[] = [
  // {
  //   project: "Apache DataFusion",
  //   repo: "apache/datafusion",
  //   repoUrl: "https://github.com/apache/datafusion",
  //   prUrl: "https://github.com/apache/datafusion/pull/15736",
  //   prNumber: "#15736",
  //   title: "fix: enhance-CLI-query-header-for-cast-expressions-with-literals",
  //   description: "Fix the CLI query header for cast expressions with literals.",
  //   impact: "A bug fix for the CLI query header",
  //   linesChanged: {
  //     additions: 209,
  //     deletions: 3,
  //   },
  //   status: "open",
  //   tags: ["rust", "sql"],
  // },
  {
    project: "Apache DataFusion",
    repo: "apache/datafusion",
    repoUrl: "https://github.com/apache/datafusion",
    prUrl: "https://github.com/apache/datafusion/pull/16010",
    prNumber: "#16010",
    title: "Migrate Optimizer tests to insta, part7",
    description:
      "Refactor the logical plan optimizer tests to use the insta testing framework.",
    impact: "Improved test reliability and maintainability",
    linesChanged: {
      additions: 618,
      deletions: 512,
    },
    status: "merged",
    tags: ["rust", "sql"],
  },
  {
    project: "Apache DataFusion",
    repo: "apache/datafusion",
    repoUrl: "https://github.com/apache/datafusion",
    prUrl: "https://github.com/apache/datafusion/pull/15984",
    prNumber: "#15984",
    title: "Migrate Optimizer tests to insta, part6",
    description:
      "Refactor the logical plan optimizer tests to use the insta testing framework.",
    impact: "Improved test reliability and maintainability",
    linesChanged: {
      additions: 902,
      deletions: 437,
    },
    status: "merged",
    tags: ["rust", "sql"],
  },
  {
    project: "Apache DataFusion",
    repo: "apache/datafusion",
    repoUrl: "https://github.com/apache/datafusion",
    prUrl: "https://github.com/apache/datafusion/pull/15945",
    prNumber: "#15945",
    title: "Migrate Optimizer tests to insta, part5",
    description:
      "Refactor the logical plan optimizer tests to use the insta testing framework.",
    impact: "Improved test reliability and maintainability",
    linesChanged: {
      additions: 506,
      deletions: 498,
    },
    status: "merged",
    tags: ["rust", "sql"],
  },
  {
    project: "Apache DataFusion",
    repo: "apache/datafusion",
    repoUrl: "https://github.com/apache/datafusion",
    prUrl: "https://github.com/apache/datafusion/pull/15937",
    prNumber: "#15937",
    title: "Migrate Optimizer tests to insta, part4",
    description:
      "Refactor the logical plan optimizer tests to use the insta testing framework.",
    impact: "Improved test reliability and maintainability",
    linesChanged: {
      additions: 995,
      deletions: 756,
    },
    status: "merged",
    tags: ["rust", "sql"],
  },
  {
    project: "Apache DataFusion",
    repo: "apache/datafusion",
    repoUrl: "https://github.com/apache/datafusion",
    prUrl: "https://github.com/apache/datafusion/pull/15893",
    prNumber: "#15893",
    title: "Migrate Optimizer tests to insta, part3",
    description:
      "Refactor the logical plan optimizer tests to use the insta testing framework.",
    impact: "Improved test reliability and maintainability",
    linesChanged: {
      additions: 1026,
      deletions: 778,
    },
    status: "merged",
    tags: ["rust", "sql"],
  },
  {
    project: "Apache DataFusion",
    repo: "apache/datafusion",
    repoUrl: "https://github.com/apache/datafusion",
    prUrl: "https://github.com/apache/datafusion/pull/15884",
    prNumber: "#15884",
    title: "Migrate Optimizer tests to insta, part2",
    description:
      "Refactor the logical plan optimizer tests to use the insta testing framework.",
    impact: "Improved test reliability and maintainability",
    linesChanged: {
      additions: 700,
      deletions: 494,
    },
    status: "merged",
    tags: ["rust", "sql"],
  },
  {
    project: "Apache DataFusion",
    repo: "apache/datafusion",
    repoUrl: "https://github.com/apache/datafusion",
    prUrl: "https://github.com/apache/datafusion/pull/15446",
    prNumber: "#15446",
    title: "Migrate Optimizer tests to insta, part1",
    description:
      "Refactor the logical plan optimizer tests to use the insta testing framework.",
    impact: "Improved test reliability and maintainability",
    linesChanged: {
      additions: 243,
      deletions: 139,
    },
    status: "merged",
    tags: ["rust", "sql"],
  },
  {
    project: "Apache DataFusion",
    repo: "apache/datafusion",
    repoUrl: "https://github.com/apache/datafusion",
    prUrl: "https://github.com/apache/datafusion/pull/15621",
    prNumber: "#15621",
    title: "Migrate datafusion/sql tests to insta, part7",
    description:
      "Refactor the datafusion/sql tests to use the insta testing framework.",
    impact: "Improved test reliability and maintainability",
    linesChanged: {
      additions: 520,
      deletions: 315,
    },
    status: "merged",
    tags: ["rust", "sql"],
  },
  {
    project: "Apache DataFusion",
    repo: "apache/datafusion",
    repoUrl: "https://github.com/apache/datafusion",
    prUrl: "https://github.com/apache/datafusion/pull/15578",
    prNumber: "#15578",
    title: "Migrate datafusion/sql tests to insta, part6",
    description:
      "Refactor the datafusion/sql tests to use the insta testing framework.",
    impact: "Improved test reliability and maintainability",
    linesChanged: {
      additions: 515,
      deletions: 320,
    },
    status: "merged",
    tags: ["rust", "sql"],
  },
  {
    project: "Apache DataFusion",
    repo: "apache/datafusion",
    repoUrl: "https://github.com/apache/datafusion",
    prUrl: "https://github.com/apache/datafusion/pull/15567",
    prNumber: "#15567",
    title: "Migrate datafusion/sql tests to insta, part5",
    description:
      "Refactor the datafusion/sql tests to use the insta testing framework.",
    impact: "Improved test reliability and maintainability",
    linesChanged: {
      additions: 191,
      deletions: 172,
    },
    status: "merged",
    tags: ["rust", "sql"],
  },
  {
    project: "Apache DataFusion",
    repo: "apache/datafusion",
    repoUrl: "https://github.com/apache/datafusion",
    prUrl: "https://github.com/apache/datafusion/pull/15548",
    prNumber: "#15548",
    title: "Migrate datafusion/sql tests to insta, part4",
    description:
      "Refactor the datafusion/sql tests to use the insta testing framework.",
    impact: "Improved test reliability and maintainability",
    linesChanged: {
      additions: 837,
      deletions: 513,
    },
    status: "merged",
    tags: ["rust", "sql"],
  },
  {
    project: "Apache DataFusion",
    repo: "apache/datafusion",
    repoUrl: "https://github.com/apache/datafusion",
    prUrl: "https://github.com/apache/datafusion/pull/15533",
    prNumber: "#15533",
    title: "Migrate datafusion/sql tests to insta, part3",
    description:
      "Refactor the datafusion/sql tests to use the insta testing framework.",
    impact: "Improved test reliability and maintainability",
    linesChanged: {
      additions: 888,
      deletions: 490,
    },
    status: "merged",
    tags: ["rust", "sql"],
  },
  {
    project: "Apache DataFusion",
    repo: "apache/datafusion",
    repoUrl: "https://github.com/apache/datafusion",
    prUrl: "https://github.com/apache/datafusion/pull/15499",
    prNumber: "#15499",
    title: "Migrate datafusion/sql tests to insta, part2",
    description:
      "Refactor the datafusion/sql tests to use the insta testing framework.",
    impact: "Improved test reliability and maintainability",
    linesChanged: {
      additions: 764,
      deletions: 431,
    },
    status: "merged",
    tags: ["rust", "sql"],
  },
  {
    project: "Apache DataFusion",
    repo: "apache/datafusion",
    repoUrl: "https://github.com/apache/datafusion",
    prUrl: "https://github.com/apache/datafusion/pull/15497",
    prNumber: "#15497",
    title: "Migrate datafusion/sql tests to insta, part1",
    description:
      "Refactor the datafusion/sql tests to use the insta testing framework.",
    impact: "Improved test reliability and maintainability",
    linesChanged: {
      additions: 444,
      deletions: 273,
    },
    status: "merged",
    tags: ["rust", "sql"],
  },
  {
    project: "Apache DataFusion",
    repo: "apache/datafusion",
    repoUrl: "https://github.com/apache/datafusion",
    prUrl: "https://github.com/apache/datafusion/pull/15480",
    prNumber: "#15480",
    title: "Migrate subtraits tests to insta, part2",
    description:
      "Refactor the subtraits tests to use the insta testing framework.",
    impact: "Improved test reliability and maintainability",
    linesChanged: {
      additions: 204,
      deletions: 131,
    },
    status: "merged",
    tags: ["rust", "substrait"],
  },
  {
    project: "Apache DataFusion",
    repo: "apache/datafusion",
    repoUrl: "https://github.com/apache/datafusion",
    prUrl: "https://github.com/apache/datafusion/pull/15444",
    prNumber: "#15444",
    title: "Migrate subtraits tests to insta, part1",
    description:
      "Refactor the subtraits tests to use the insta testing framework.",
    impact: "Improved test reliability and maintainability",
    linesChanged: {
      additions: 462,
      deletions: 383,
    },
    status: "merged",
    tags: ["rust", "substrait"],
  },
];

function OpenSource() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Open Source Contributions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Making meaningful contributions to the developer community
          </p>
        </div>

        <div className="space-y-8">
          {contributions.map((contribution) => (
            <div
              key={contribution.prNumber}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {contribution.project}
                    </h3>
                    <span
                      className={`px-2 py-1 text-sm rounded-full ${
                        contribution.status === "merged"
                          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                          : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                      }`}
                    >
                      {contribution.status === "merged" ? "Merged" : "Open"}
                    </span>
                  </div>
                  <a
                    href={contribution.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center"
                  >
                    <Github size={16} className="mr-1" />
                    {contribution.repo}
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {contribution.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm rounded-full whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <a
                  href={contribution.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-2"
                >
                  <GitPullRequest size={20} />
                  {contribution.title}
                  <span className="text-gray-500 dark:text-gray-400 text-base">
                    {contribution.prNumber}
                  </span>
                </a>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {contribution.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <GitFork
                    className="text-gray-400 dark:text-gray-500"
                    size={16}
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Impact:
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {contribution.impact}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <GitCommit
                    className="text-gray-400 dark:text-gray-500"
                    size={16}
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Changes:
                  </span>
                  <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    <span className="text-green-600 dark:text-green-400">
                      +{contribution.linesChanged.additions}
                    </span>
                    <span className="mx-1">/</span>
                    <span className="text-red-600 dark:text-red-400">
                      -{contribution.linesChanged.deletions}
                    </span>
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OpenSource;
