import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { NewTicket } from './pages/NewTicket';
import { PackageView } from './pages/PackageView';
import { Tracker } from './pages/Tracker';
import { DemoScript } from './pages/DemoScript';

/**
 * Main application component that defines the routing structure.
 * 
 * Routes:
 * - "/" - Landing page (public, no layout)
 * - "/new" - Create new implementation package
 * - "/package/:id" - View specific package details
 * - "/tracker" - IBM Bob evidence tracker
 * - "/demo" - Demo script generator
 * 
 * All routes except "/" use the Layout component which provides
 * the sidebar navigation and consistent page structure.
 */
function App() {
  return (
    <Routes>
      {/* Public landing page without sidebar */}
      <Route path="/" element={<Landing />} />
      
      {/* Protected routes with sidebar layout */}
      <Route element={<Layout />}>
        <Route path="/new" element={<NewTicket />} />
        <Route path="/package/:id" element={<PackageView />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/demo" element={<DemoScript />} />
      </Route>
    </Routes>
  );
}

export default App;

// Made with Bob
