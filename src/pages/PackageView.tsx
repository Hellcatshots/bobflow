import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPackageById, type TicketPackage } from '../lib/storage';
import { Code, FileText, CheckSquare, GitMerge, FileJson, Activity, BookOpen, Bot } from 'lucide-react';

export function PackageView() {
  const { id } = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<TicketPackage | null>(null);
  const [activeTab, setActiveTab] = useState('summary');

  useEffect(() => {
    const loadPackage = () => {
      if (id) {
        const foundPackage = getPackageById(id);
        setPkg(foundPackage || null);
      }
    };
    loadPackage();
  }, [id]);

  if (!pkg) {
    return <div className="p-8 text-center text-gray-500">Package not found</div>;
  }

  const tabs = [
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'plan', label: 'Implementation Plan', icon: CheckSquare },
    { id: 'fileTree', label: 'File Tree', icon: GitMerge },
    { id: 'apiContract', label: 'API Contract', icon: FileJson },
    { id: 'starterCode', label: 'Starter Code', icon: Code },
    { id: 'tests', label: 'Tests', icon: Activity },
    { id: 'docs', label: 'Docs', icon: BookOpen },
    { id: 'cicd', label: 'CI/CD', icon: GitMerge },
    { id: 'bobPlan', label: 'Bob Usage Plan', icon: Bot },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{pkg.title}</h1>
            <p className="text-sm text-gray-500 mt-1">Created on {new Date(pkg.createdAt).toLocaleDateString()}</p>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {pkg.stack}
          </span>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">Original User Story</h3>
          <p className="text-gray-800 italic">"{pkg.story}"</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex gap-6">
        {/* Vertical Tabs */}
        <div className="w-64 flex-shrink-0">
          <nav className="flex flex-col space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[500px]">
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              {(() => {
                const Icon = tabs.find(t => t.id === activeTab)?.icon;
                return Icon ? <Icon className="w-5 h-5 text-blue-600" /> : null;
              })()}
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
            
            {activeTab === 'summary' && (
              <div className="prose max-w-none text-gray-700">
                <p>{pkg.summary}</p>
                <h3 className="text-md font-semibold mt-6 mb-2">Acceptance Criteria</h3>
                <pre className="bg-gray-50 p-4 rounded-md text-sm border border-gray-100 whitespace-pre-wrap font-sans">{pkg.criteria}</pre>
              </div>
            )}
            
            {activeTab === 'plan' && (
              <div className="prose max-w-none">
                <pre className="bg-white whitespace-pre-wrap font-sans text-gray-700">{pkg.plan}</pre>
              </div>
            )}

            {['fileTree', 'apiContract', 'starterCode', 'tests', 'docs', 'cicd'].includes(activeTab) && (
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-100 font-mono">
                  {pkg[activeTab as keyof TicketPackage]}
                </pre>
              </div>
            )}

            {activeTab === 'bobPlan' && (
              <div className="prose max-w-none">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
                  <h4 className="flex items-center gap-2 text-blue-800 font-semibold mb-2">
                    <Bot className="w-5 h-5" />
                    How to accelerate this with IBM Bob
                  </h4>
                  <p className="text-sm text-blue-700">Follow this plan to implement the feature using IBM Bob's assistance.</p>
                </div>
                <pre className="bg-white whitespace-pre-wrap font-sans text-gray-700">{pkg.bobPlan}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
