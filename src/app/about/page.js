import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[calc(60vh-64px)] px-4 py-12 md:py-24 text-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-white to-blue-100 opacity-90 z-0"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-600">
            Our Story: Empowering Your Thoughts
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
            Discover the vision behind MyThoughts and our commitment to helping
            you capture, organize, and grow your ideas.
          </p>
        </div>
      </section>

      {/* Our Mission/Vision Section */}
      <section className="py-16 px-4 md:px-8 bg-white shadow-inner">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Our Vision for Your Mind
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 mb-4">
              In a world brimming with information and fleeting ideas,
              MyThoughts was born from a simple yet profound need: a dedicated
              space for your intellect to flourish. We believe that every
              thought, however small, holds potential. Our vision is to provide
              a seamless, intuitive, and beautiful platform where your ideas can
              be nurtured, connected, and transformed into meaningful insights.
            </p>
            <p className="text-lg leading-relaxed text-gray-600">
              We&apos;re building more than just a note-taking app; we&apos;re creating a
              digital garden for your mind, where seeds of ideas can grow into
              robust knowledge.
            </p>
          </div>
          <div className="flex justify-center items-center">
            {/* You can replace this with an actual image or illustration related to thinking/growth */}
            <svg
              className="w-64 h-64 text-indigo-500 opacity-70"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">
            Core Values That Guide Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Value 1: Simplicity */}
            <div className="p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-white transform hover:scale-105">
              <div className="flex justify-center mb-6">
                <svg
                  className="h-16 w-16 text-pink-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v14m-3-6h6m-6 4h6m-6 4h6"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Simplicity
              </h3>
              <p className="text-gray-600">
                We believe powerful tools don&apos;t need to be complicated.
                MyThoughts is designed to be intuitive, letting you focus on
                your ideas, not the interface.
              </p>
            </div>

            {/* Value 2: Growth */}
            <div className="p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-white transform hover:scale-105">
              <div className="flex justify-center mb-6">
                <svg
                  className="h-16 w-16 text-teal-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Growth</h3>
              <p className="text-gray-600">
                MyThoughts is built to support your intellectual journey,
                fostering connection between ideas and encouraging continuous
                learning and reflection.
              </p>
            </div>

            {/* Value 3: Privacy */}
            <div className="p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-white transform hover:scale-105">
              <div className="flex justify-center mb-6">
                <svg
                  className="h-16 w-16 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm0-11V7a4 4 0 018 0v2"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Privacy</h3>
              <p className="text-gray-600">
                Your thoughts are personal. We prioritize your privacy and data
                security, ensuring your digital sanctuary remains truly yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-20 px-4 md:px-8 text-center bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the MyThoughts Community
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Start your journey of organized thinking and personal growth today.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 text-lg font-semibold text-indigo-500 rounded-lg shadow-lg bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Footer (you might want to share a common Footer component) */}
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

export default AboutPage;

export const metadata = {
  title: "About Us - MyThoughts: Empowering Your Ideas",
  description:
    "Discover the story behind MyThoughts, our vision for fostering intellectual growth, and our core values of simplicity, growth, and privacy. Learn how MyThoughts helps you capture, organize, and grow your ideas.",
  keywords: [
    "MyThoughts",
    "about us",
    "our story",
    "vision",
    "mission",
    "values",
    "note-taking app",
    "idea organization",
    "personal growth",
    "privacy",
    "productivity",
  ],
};
