import { Link } from 'react-router-dom';
import { ArrowRight, Code2, FileText, CheckCircle, Zap } from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100 py-4 px-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl">B</div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">BobFlow</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How it Works</a>
          <Link to="/new" className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
            Try it now
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8 border border-blue-100">
          <Zap className="w-4 h-4 text-blue-500" />
          <span>Powered by IBM Bob</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          Turn idea into impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">faster.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          BobFlow is a developer productivity accelerator that converts your user stories and tickets into implementation-ready code, tests, and documentation using IBM Bob.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link 
            to="/new" 
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40"
          >
            Start from a ticket
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a 
            href="#how-it-works" 
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            See how it works
          </a>
        </div>
      </section>

      {/* Value Prop Section */}
      <section id="features" className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">From blank slate to boilerplate in seconds</h2>
            <p className="text-lg text-gray-600">Stop wasting time setting up files and planning basic logic.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Structured Planning</h3>
              <p className="text-gray-600">Automatically generates step-by-step implementation plans, file trees, and API contracts from a simple user story.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Starter Code</h3>
              <p className="text-gray-600">Creates tailored starter code and test skeletons for your specific tech stack, so you can start writing real logic immediately.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">IBM Bob Integration</h3>
              <p className="text-gray-600">Seamlessly guides you on how to use IBM Bob to refine, refactor, and generate comprehensive tests and docs.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 border-t border-gray-100 mt-20">
        <p>Built for the IBM Bob Hackathon. This is a proof-of-concept application.</p>
      </footer>
    </div>
  );
}
