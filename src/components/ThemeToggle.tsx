import React from 'react';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Light Mode Animation */}
        <div
          className={`absolute inset-0 transform transition-transform duration-700 ${
            isDark ? 'translate-y-full' : 'translate-y-0'
          }`}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-yellow-400 rounded-full animate-sun-rays">
              {/* Sun Rays */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-2 bg-yellow-400 origin-bottom"
                  style={{
                    top: '-0.5rem',
                    left: '50%',
                    transform: `translateX(-50%) rotate(${i * 45}deg)`,
                    transformOrigin: 'bottom center',
                    animation: 'sun-ray 2s infinite'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Dark Mode Animation */}
        <div
          className={`absolute inset-0 transform transition-transform duration-700 ${
            isDark ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-5 h-5">
              {/* Moon */}
              <div className="absolute inset-0 bg-gray-200 rounded-full">
                <div
                  className="absolute w-4 h-4 bg-gray-700 rounded-full"
                  style={{ top: '-15%', right: '-15%' }}
                />
              </div>
              {/* Stars */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default ThemeToggle;