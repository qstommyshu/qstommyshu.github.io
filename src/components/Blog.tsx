import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight, Tag, Search } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import Fuse from 'fuse.js';

const allCategories = Array.from(
  new Set(blogPosts.flatMap(post => post.categories))
).sort();

const allTags = Array.from(
  new Set(blogPosts.flatMap(post => post.tags))
).sort();

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  // Initialize Fuse.js for fuzzy search
  const fuse = new Fuse(blogPosts, {
    keys: ['title', 'description', 'content'],
    threshold: 0.3,
    includeScore: true
  });

  useEffect(() => {
    setIsSearching(true);
    
    // Debounce search to improve performance
    const timer = setTimeout(() => {
      let results = [...blogPosts];

      // Apply search filter if query exists
      if (searchQuery) {
        const searchResults = fuse.search(searchQuery);
        results = searchResults.map(result => result.item);
      }

      // Apply category and tag filters
      results = results.filter(post => {
        if (selectedCategory && !post.categories.includes(selectedCategory)) {
          return false;
        }
        if (selectedTag && !post.tags.includes(selectedTag)) {
          return false;
        }
        return true;
      });

      setFilteredPosts(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, selectedTag]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Thoughts, learnings, and insights about web development and technology
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === null
                    ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              {allCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedTag === null
                    ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedTag === tag
                      ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isSearching && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {/* No Results */}
        {!isSearching && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No posts found matching your criteria
            </p>
          </div>
        )}

        {/* Posts Grid */}
        {!isSearching && filteredPosts.length > 0 && (
          <div className="space-y-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <Calendar size={16} className="mr-2" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span className="mx-2">•</span>
                    <Clock size={16} className="mr-2" />
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                      Read more
                      <ChevronRight size={16} className="ml-1" />
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {post.categories.map(category => (
                        <span
                          key={category}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full flex items-center whitespace-nowrap"
                        >
                          <Tag size={12} className="mr-1" />
                          {category}
                        </span>
                      ))}
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm rounded-full flex items-center whitespace-nowrap"
                        >
                          <Tag size={12} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;