/**
 * Generates a 3-minute hackathon demo script
 */
export function generateDemoScript(): string {
  return `# BobFlow: 3-Minute Hackathon Demo Script

## 0:00 - 0:30 | The Problem & Introduction
**Speaker**: "Hi everyone. As developers, we know that starting a new feature is slow. You get a vague Jira ticket, and before writing any real logic, you have to plan the architecture, figure out the API contract, setup the boilerplate, and write test skeletons."
*(Show a complex, vague Jira ticket on screen)*
**Speaker**: "This manual setup phase can take hours. That's why we built BobFlow—a Ticket-to-Code Accelerator powered by IBM Bob."

## 0:30 - 1:30 | The Solution & Live Walkthrough
**Speaker**: "Let me show you how it works."
*(Switch to BobFlow Landing Page)*
**Speaker**: "We paste that exact same user story into BobFlow, select our target stack, and hit generate."
*(Fill out the form and hit Generate)*
**Speaker**: "Instantly, BobFlow uses IBM Bob to analyze the ticket and generate a complete implementation package. We get a step-by-step plan, a suggested file tree, and the exact API contracts we need."
*(Click through the tabs: Summary, Plan, API Contract)*

## 1:30 - 2:15 | How IBM Bob Was Used (The Secret Sauce)
**Speaker**: "But we don't just stop at planning. We used IBM Bob's advanced code generation capabilities to produce real starter code and test skeletons tailored to this specific ticket."
*(Show Starter Code and Tests tabs)*
**Speaker**: "During our hackathon development, we actually used IBM Bob to build BobFlow itself. We used it to architect this React frontend, generate our Vite configuration, and write our unit tests. You can see the full logs of our Bob sessions in the 'bob_sessions' folder in our repo."
*(Briefly show the Bob Evidence Tracker or the GitHub repo folder)*

## 2:15 - 3:00 | The Impact & Conclusion
**Speaker**: "The impact is clear: Before Bob, moving from a ticket to writing business logic took hours of boilerplate and planning. After Bob, it takes seconds. BobFlow demonstrates how IBM Bob transforms the developer experience, turning vague ideas into concrete impact faster than ever before. Thank you!"`;
}

/**
 * Validates that the demo script has all required sections
 */
export function validateDemoScript(script: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  // Check for required sections
  const requiredSections = [
    '0:00 - 0:30',
    '0:30 - 1:30',
    '1:30 - 2:15',
    '2:15 - 3:00',
  ];
  
  for (const section of requiredSections) {
    if (!script.includes(section)) {
      errors.push(`Missing required section: ${section}`);
    }
  }
  
  // Check for key terms
  const requiredTerms = ['IBM Bob', 'BobFlow', 'implementation package'];
  for (const term of requiredTerms) {
    if (!script.includes(term)) {
      errors.push(`Missing required term: ${term}`);
    }
  }
  
  // Check minimum length (should be substantial)
  if (script.length < 500) {
    errors.push('Script is too short (minimum 500 characters)');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Extracts the time sections from the demo script
 */
export function extractTimeSections(script: string): Array<{
  timeRange: string;
  title: string;
  content: string;
}> {
  const sections: Array<{ timeRange: string; title: string; content: string }> = [];
  const lines = script.split('\n');
  
  let currentSection: { timeRange: string; title: string; content: string } | null = null;
  
  for (const line of lines) {
    // Match section headers like "## 0:00 - 0:30 | The Problem"
    const headerMatch = line.match(/^##\s+(\d+:\d+\s+-\s+\d+:\d+)\s+\|\s+(.+)$/);
    
    if (headerMatch) {
      // Save previous section if exists
      if (currentSection) {
        sections.push(currentSection);
      }
      
      // Start new section
      currentSection = {
        timeRange: headerMatch[1],
        title: headerMatch[2],
        content: '',
      };
    } else if (currentSection && line.trim()) {
      currentSection.content += line + '\n';
    }
  }
  
  // Add last section
  if (currentSection) {
    sections.push(currentSection);
  }
  
  return sections;
}

// Made with Bob
