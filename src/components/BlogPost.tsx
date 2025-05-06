import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BlogPost } from "../types/blog";
import { blogPosts } from "../data/blogData";

function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  useEffect(() => {
    async function loadPost() {
      try {
        if (!slug) throw new Error("No slug provided");

        const response = await fetch(`/content/blog/${slug}.md`);
        if (!response.ok) throw new Error("Failed to load blog post");

        const text = await response.text();
        const frontmatterMatch = text.match(/^---([\s\S]*?)---/);
        if (!frontmatterMatch) throw new Error("Invalid frontmatter");

        const frontmatter = frontmatterMatch[1];
        const content = text.slice(frontmatterMatch[0].length).trim();

        const getFrontmatterValue = (field: string): string => {
          const match = frontmatter.match(new RegExp(`${field}:\\s*(.+)`));
          return match ? match[1].trim() : "";
        };

        const getArrayValue = (field: string): string[] => {
          return getFrontmatterValue(field)
            .replace(/[[\]]/g, "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        };

        const blogPost: BlogPost = {
          id: currentIndex.toString(),
          title: getFrontmatterValue("title"),
          description: getFrontmatterValue("description"),
          author: getFrontmatterValue("author"),
          date: getFrontmatterValue("date"),
          readTime: "10 min read",
          categories: getArrayValue("categories"),
          tags: getArrayValue("tags"),
          content,
          slug,
        };

        setPost(blogPost);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load blog post"
        );
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug, currentIndex]);

  if (loading || error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {loading ? "Loading..." : error || "Post not found"}
          </h1>
          {!loading && (
            <Link
              to="/blog"
              className="text-indigo-600 hover:text-indigo-700 mt-4 inline-block"
            >
              Back to Blog
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-8 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Blog
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {[...post.categories, ...post.tags].map((label, i) => (
                <span
                  key={label + i}
                  className={`px-3 py-1 text-sm rounded-full flex items-center transition-colors ${
                    post.categories.includes(label)
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      : "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                  }`}
                >
                  <Tag size={12} className="mr-2" />
                  {label}
                </span>
              ))}
            </div>

            <div className="prose prose-indigo dark:prose-invert max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-code:before:content-none prose-code:after:content-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          margin: "1.5em 0",
                          borderRadius: "0.5rem",
                          fontSize: "0.875rem",
                        }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code
                        className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-sm font-normal"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {post.content || ""}
              </ReactMarkdown>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-3 gap-4">
                {previousPost ? (
                  <Link
                    to={`/blog/${previousPost.slug}`}
                    className="col-start-1 flex items-start group p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <ChevronLeft
                      size={20}
                      className="mr-2 mt-1 text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors"
                    />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Previous
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {previousPost.title}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                <Link
                  to="/blog"
                  className="col-start-2 flex items-center justify-center px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                  View All Posts
                </Link>

                {nextPost ? (
                  <Link
                    to={`/blog/${nextPost.slug}`}
                    className="col-start-3 flex items-start justify-end group p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Next
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {nextPost.title}
                      </div>
                    </div>
                    <ChevronRight
                      size={20}
                      className="ml-2 mt-1 text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors"
                    />
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default BlogPostPage;
