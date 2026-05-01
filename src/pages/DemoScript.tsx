import { Video, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { generateDemoScript } from '../lib/demoScript';

export function DemoScript() {
  const [copied, setCopied] = useState(false);
  const script = generateDemoScript();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Video className="w-8 h-8 text-blue-600" />
            Pitch Demo Script
          </h1>
          <p className="text-gray-600">A suggested 3-minute video pitch for your IBM Bob Hackathon submission.</p>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              Copy Script
            </>
          )}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8 prose max-w-none">
          <pre className="bg-gray-50 p-6 rounded-lg border border-gray-100 whitespace-pre-wrap font-sans text-gray-800 text-base leading-relaxed">
            {script}
          </pre>
        </div>
      </div>
    </div>
  );
}
