// src/components/LandingPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
// Optional: If you have a custom Button component, import it:
// import { Button } from './ui/button';

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
          <motion.h1
            className="text-4xl sm:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to JerseyGirl
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl mb-8 max-w-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Serving up local favorites and weekly specials right to your inbox or phone.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* If you have a custom Button component, replace <button> with <Button> */}
            <button className="px-6 py-3 rounded-full bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-all">
              Sign Up for Specials
            </button>
          </motion.div>
        </div>
      </header>

      {/* About Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h2
              className="text-3xl font-semibold mb-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              About JerseyGirl
            </motion.h2>
            <motion.p
              className="text-lg leading-relaxed"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              JerseyGirl is a local kitchen dedicated to bringing our community the freshest,
              tastiest dishes every week. Whether you’re craving classic comfort food
              or something a little more adventurous, we’ve got you covered. 
            </motion.p>
          </div>
          <motion.div
            className="bg-gray-100 rounded-xl h-64 flex items-center justify-center text-2xl font-bold"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Placeholder for an image or illustration */}
            <span className="text-gray-500">Your Image Here</span>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <motion.h3
            className="text-2xl font-semibold text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose JerseyGirl
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature #1 */}
            <motion.div
              className="p-6 bg-white rounded-2xl shadow text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-3xl mb-3">🍽️</div>
              <h4 className="text-xl font-bold mb-2">Fresh Ingredients</h4>
              <p className="text-gray-600">
                We use locally sourced produce and top-quality meats to ensure the freshest taste.
              </p>
            </motion.div>
            {/* Feature #2 */}
            <motion.div
              className="p-6 bg-white rounded-2xl shadow text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-3xl mb-3">⏰</div>
              <h4 className="text-xl font-bold mb-2">Weekly Specials</h4>
              <p className="text-gray-600">
                Receive notifications for new dishes and special deals every week.
              </p>
            </motion.div>
            {/* Feature #3 */}
            <motion.div
              className="p-6 bg-white rounded-2xl shadow text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-3xl mb-3">📱</div>
              <h4 className="text-xl font-bold mb-2">Easy Sign-Up</h4>
              <p className="text-gray-600">
                Enter your phone or email to get the latest updates—no passwords required.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-12 text-center">
        <div className="container mx-auto px-4">
          <motion.h3
            className="text-3xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ready to Taste the Best of JerseyGirl?
          </motion.h3>
          <motion.p
            className="text-lg max-w-xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Sign up now and never miss out on our exciting weekly specials!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all">
              Join Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-300 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} JerseyGirl. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
