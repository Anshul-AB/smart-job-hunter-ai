import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen overflow-hidden">

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-24">
        
        {/* Background Glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-3xl rounded-full top-10"></div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight z-10">
          Get Hired Faster with{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Smart AI
          </span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl z-10">
          Analyze your resume, match with the best jobs, and track everything —
          all in one intelligent platform.
        </p>

        <Link
          to="/signup"
          className="mt-8 z-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 px-8 py-3 rounded-xl font-medium shadow-lg transition"
        >
          Get Started
        </Link>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-3">AI Resume Analysis</h3>
          <p className="text-gray-400">
            Instantly extract skills and insights from your resume using AI.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-3">Smart Job Matching</h3>
          <p className="text-gray-400">
            Discover jobs tailored to your profile automatically.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-3">Track Applications</h3>
          <p className="text-gray-400">
            Stay organized and track every application in one place.
          </p>
        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-20 text-center max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-left">

          <div>
            <span className="text-blue-400 text-2xl font-bold">01</span>
            <h4 className="text-xl font-semibold mt-2">Upload Resume</h4>
            <p className="text-gray-400 mt-2">
              Add your resume and let AI analyze your skills.
            </p>
          </div>

          <div>
            <span className="text-blue-400 text-2xl font-bold">02</span>
            <h4 className="text-xl font-semibold mt-2">Get Matches</h4>
            <p className="text-gray-400 mt-2">
              Receive personalized job recommendations instantly.
            </p>
          </div>

          <div>
            <span className="text-blue-400 text-2xl font-bold">03</span>
            <h4 className="text-xl font-semibold mt-2">Apply & Track</h4>
            <p className="text-gray-400 mt-2">
              Apply and manage all applications effortlessly.
            </p>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="text-center py-20 px-6">
        <h2 className="text-3xl font-bold">
          Ready to land your dream job?
        </h2>

        <p className="text-gray-400 mt-4">
          Start using Smart Job AI today.
        </p>

        <Link
          to="/signup"
          className="inline-block mt-6 bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 rounded-xl font-medium shadow-lg hover:opacity-90 transition"
        >
          Get Started
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 py-6 border-t border-gray-800">
        © {new Date().getFullYear()} Smart Job AI
      </footer>

    </div>
  );
};

export default Home;