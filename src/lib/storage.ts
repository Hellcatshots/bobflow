export interface TicketPackage {
  id: string;
  title: string;
  story: string;
  criteria: string;
  stack: string;
  complexity: string;
  createdAt: number;
  // Generated content
  summary: string;
  plan: string;
  fileTree: string;
  apiContract: string;
  starterCode: string;
  tests: string;
  docs: string;
  cicd: string;
  bobPlan: string;
}

const STORAGE_KEY = 'bobflow_packages';

export function savePackage(pkg: TicketPackage): void {
  const packages = getPackages();
  packages.push(pkg);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(packages));
}

export function getPackages(): TicketPackage[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getPackageById(id: string): TicketPackage | undefined {
  return getPackages().find(p => p.id === id);
}

const TRACKER_KEY = 'bobflow_tracker';

export interface TrackerState {
  folderCreated: boolean;
  filesExported: boolean;
  summaryScreenshot: boolean;
  explanationAdded: boolean;
  linksAdded: boolean;
}

export function saveTrackerState(state: TrackerState): void {
  localStorage.setItem(TRACKER_KEY, JSON.stringify(state));
}

export function getTrackerState(): TrackerState {
  const data = localStorage.getItem(TRACKER_KEY);
  if (data) return JSON.parse(data);
  return {
    folderCreated: false,
    filesExported: false,
    summaryScreenshot: false,
    explanationAdded: false,
    linksAdded: false,
  };
}
