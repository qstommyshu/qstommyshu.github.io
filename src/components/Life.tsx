import React from "react";
import { MonitorPlay, MountainSnow, GlassWater } from "lucide-react";
// import snowboardAction from "../assets/snowboard_action.png";

function Life() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Life Beyond Code
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Exploring the world one adventure at a time
          </p>
        </div>

        {/* Featured Interests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Snowboarding Section */}
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="/pictures/snowboard_action.jpg"
              alt="Snowboarding action"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Professional Snowboarder
              </h3>
              <p className="text-gray-200">
                Level 2 Professional and Park Level 1 Certified Instructor,
                chasing the dream of earning a "RedBull helmet" through
                dedication and progression in the sport. Passionate about
                sharing the thrill of snowboarding with others.
              </p>
            </div>
          </div>

          {/* Culinary Adventures Section */}
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80"
              alt="Healthy smoothies"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Smoothie Artisan
              </h3>
              <p className="text-gray-200">
                Crafting nutritious and delicious smoothie recipes. Current
                favorite: The Green Energy (Avocado + Banana blend).
                Experimenting with seasonal berries and superfoods to create the
                perfect balance of health and taste.
              </p>
            </div>
          </div>
        </div>

        {/* Hobbies & Interests */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Hobbies & Interests
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow">
              <MountainSnow className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Snowboarding
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Professional instructor with Level 2 and Park 1 certifications.
                Training hard to achieve the coveted "RedBull" helmet status.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow">
              <GlassWater className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Smoothie Crafting
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Creating healthy smoothie recipes with a focus on nutrition and
                taste. Signature blend: Avocado-Banana Energy Boost.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow">
              <MonitorPlay className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Movies
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                A passionate film enthusiast exploring stories from around the
                world. Whether it's indie gems or blockbuster hits, each movie
                is a journey that fuels my love for cinema.
              </p>
            </div>

            {/* <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow">
              <Camera className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Photography
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Street photography enthusiast capturing the beauty of urban
                life. My camera helps me see the world differently.
              </p>
            </div> */}

            {/* <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow">
              <Plane className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Travel</h3>
              <p className="text-gray-600 dark:text-gray-300">
                20+ countries and counting. Each journey teaches me something new about myself and the world.
              </p>
            </div> */}

            {/* <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow">
              <Book className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Reading
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                From sci-fi to philosophy, books are my gateway to new ideas and
                perspectives.
              </p>
            </div> */}

            {/* <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow">
              <Music className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Music
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Amateur guitarist and vinyl collector. Music is my creative
                outlet and source of inspiration.
              </p>
            </div> */}
          </div>
        </div>

        {/* Recipe Highlight */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Signature Smoothie Recipe
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                The Green Energy Boost
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ingredients:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                    <li>1 ripe avocado</li>
                    <li>1 large banana</li>
                    <li>1 cup mixed berries (seasonal)</li>
                    <li>1 handful of spinach</li>
                    <li>1 cup almond milk</li>
                    <li>1 tbsp honey (optional)</li>
                    <li>Ice cubes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Instructions:
                  </h4>
                  <ol className="list-decimal list-inside text-gray-600 dark:text-gray-400">
                    <li>Combine all ingredients in a blender</li>
                    <li>Blend until smooth and creamy</li>
                    <li>
                      Add more almond milk if needed for desired consistency
                    </li>
                    <li>Serve immediately and enjoy!</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-2xl p-12 text-center">
          <blockquote className="text-2xl font-medium text-white italic mb-4">
            "Life is not measured by the number of breaths we take, but by the
            moments that take our breath away."
          </blockquote>
          <p className="text-white opacity-80">
            This quote guides my approach to both life and work
          </p>
        </div>
      </div>
    </div>
  );
}

export default Life;
