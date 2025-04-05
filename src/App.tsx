import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './components/Home';
import Resume from './components/Resume';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import OpenSource from './components/OpenSource';
import Life from './components/Life';
import Contact from './components/Contact';
import Navbar from './components/Navbar';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/opensource" element={<OpenSource />} />
            <Route path="/life" element={<Life />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;