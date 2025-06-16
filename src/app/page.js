import Link from 'next/link'; // Import Link for navigation

const PrimaryButton = ({ href, children }) => (
  <Link href={href} className="inline-block px-8 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1">
    {children}
  </Link>
);

const Home = async () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12 md:py-24 text-center overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 opacity-90 z-0"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600 animate-pulse-light">
            MyThoughts
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Your digital sanctuary for capturing, organizing, and reflecting on every idea that sparks.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            
            <PrimaryButton href="/thoughts">Start Thinking Free</PrimaryButton>
            <Link href="/about" className="px-8 py-4 text-lg font-semibold text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition duration-300 ease-in-out">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">Why MyThoughts?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-white transform hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <svg className="h-16 w-16 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.747 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Capture Every Idea</h3>
              <p className="text-gray-600">
                Jot down thoughts, ideas, and inspirations the moment they strike. Never let a brilliant idea slip away.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-white transform hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <svg className="h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Organize with Ease</h3>
              <p className="text-gray-600">
                Categorize, tag, and link your thoughts, creating a personal knowledge network that works for you.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-white transform hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <svg className="h-16 w-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l7 8zm0 0l-2 5L9 9l7 8zm0 0l-2 5L9 9l7 8zm0 0l-2 5L9 9l7 8zM14 5l7 7m-7 0a6 6 0 11-12 0 6 6 0 0112 0z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Reflect & Grow</h3>
              <p className="text-gray-600">
                Revisit past thoughts, connect new ideas, and witness your personal growth over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary CTA Section */}
      <section className="py-20 px-4 md:px-8 text-center bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Unleash Your Mind?</h2>
          <p className="text-xl mb-10 opacity-90">
            Join thousands of thinkers who are already transforming their ideas into action.
          </p>
          <PrimaryButton href="/thoughts" className="bg-white text-indigo-700 hover:bg-gray-100">
            Get Started Now
          </PrimaryButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 px-4 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} MyThoughts. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition duration-200">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition duration-200">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;