// src/app/contact/page.js
"use client"; // <--- Mark this as a Client Component

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast"; // Ensure you have react-hot-toast installed

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(false); // Reset submitted state on new submission

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("🚀 Your message has been sent successfully!");
        setIsSubmitted(true);
        // Optionally clear the form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        const errorData = await res.json();
        toast.error(
          `Failed to send message: ${errorData.message || "Please try again."}`
        );
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[60vh] px-4 py-12 md:py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-white to-indigo-100 opacity-90 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-600">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
            Have questions, suggestions, or just want to say hi? We'd love to
            hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        {" "}
        {/* Changed background to gray-50 for contrast */}
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6 sm:p-10 lg:p-12 border border-gray-100">
          {" "}
          {/* Added border, increased padding */}
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            {" "}
            {/* Increased margin bottom */}
            Send Us a Message
          </h2>
          {isSubmitted ? (
            <div className="text-center p-8 bg-green-50 rounded-lg text-green-700 border border-green-200">
              <h3 className="text-2xl font-bold mb-3">Thank You!</h3>
              <p className="text-lg">
                Your message has been received and we'll get back to you
                shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name" // Added name attribute
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm text-lg" // Enhanced input styling
                  required
                  disabled={isSubmitting}
                />
                <input
                  type="email"
                  name="email" // Added name attribute
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm text-lg" // Enhanced input styling
                  required
                  disabled={isSubmitting}
                />
              </div>
              <input
                type="text"
                name="subject" // Added name attribute
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm text-lg" // Enhanced input styling
                required
                disabled={isSubmitting}
              />
              <textarea
                rows="6" // Increased rows for more message space
                name="message" // Added name attribute
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm text-lg resize-y" // Enhanced input styling
                required
                disabled={isSubmitting}
              ></textarea>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75" // Enhanced button styling
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Address & Support Info */}
      <section className="py-16 px-4 md:px-8 bg-white">
        {" "}
        {/* Changed background to white for contrast */}
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Other Ways to Reach Us
          </h2>
          <p className="text-lg text-gray-600">
            You can also connect with us through the following channels:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              {" "}
              {/* Added card styling */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-indigo-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 4v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6m18 0a2 2 0 00-2-2H5a2 2 0 00-2 2"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">
                Email
              </h3>
              <p className="text-gray-700 break-words">
                support@mythoughts.com
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              {" "}
              {/* Added card styling */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-indigo-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.135a11.042 11.042 0 005.516 5.516l1.134-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">
                Phone
              </h3>
              <p className="text-gray-700">+91 98765 43210</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              {" "}
              {/* Added card styling */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-indigo-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">
                Location
              </h3>
              <p className="text-gray-700">
                Innovation Tower, Sector 21, Bengaluru, India
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 px-4 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} MyThoughts. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="hover:text-white transition duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;


