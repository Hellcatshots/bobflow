import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { savePackage } from '../lib/storage';
import { generatePackage } from '../lib/packageGenerator';
import { Sparkles, Loader2 } from 'lucide-react';

export function NewTicket() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [formData, setFormData] = useState({
    title: 'Password Reset Flow',
    story: 'As a user, I want to reset my password using email so that I can recover access to my account.',
    criteria: '- User can request a password reset email\n- User receives a time-limited reset token\n- User can set a new password\n- Expired or invalid tokens are rejected\n- Unit tests cover success and failure cases',
    stack: 'Node.js, Express, PostgreSQL, React',
    complexity: 'Medium'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    // Simulate AI generation time
    setTimeout(() => {
      const id = Date.now().toString();
      const timestamp = Date.now();
      
      // Use the package generator utility
      const newPackage = generatePackage(formData, id, timestamp);

      savePackage(newPackage);
      // Trigger event so sidebar updates
      window.dispatchEvent(new Event('bobflow-packages-updated'));
      navigate(`/package/${id}`);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Implementation Package</h1>
        <p className="text-gray-600">Enter your user story or ticket details below. BobFlow will generate a structured starter package to accelerate your development.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleGenerate} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Feature Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Story</label>
            <textarea
              name="story"
              value={formData.story}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Acceptance Criteria</label>
            <textarea
              name="criteria"
              value={formData.criteria}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Stack</label>
              <input
                type="text"
                name="stack"
                value={formData.stack}
                onChange={handleChange}
                placeholder="e.g., React, Node, Postgres"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Complexity</label>
              <select
                name="complexity"
                value={formData.complexity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={isGenerating}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-70"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Package...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Implementation Package
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
