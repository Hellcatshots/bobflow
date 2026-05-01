import type { TicketPackage } from './storage';

export interface PackageInput {
  title: string;
  story: string;
  criteria: string;
  stack: string;
  complexity: string;
}

/**
 * Generates a complete implementation package from ticket input
 * This simulates AI-powered code generation
 */
export function generatePackage(input: PackageInput, id: string, timestamp: number): TicketPackage {
  return {
    id,
    ...input,
    createdAt: timestamp,
    summary: generateSummary(input),
    plan: generatePlan(input),
    fileTree: generateFileTree(input),
    apiContract: generateApiContract(input),
    starterCode: generateStarterCode(input),
    tests: generateTests(input),
    docs: generateDocs(input),
    cicd: generateCICD(),
    bobPlan: generateBobPlan(input),
  };
}

function generateSummary(input: PackageInput): string {
  const { title, story } = input;
  return `Implementation of "${title}". ${story} This feature requires careful planning of the architecture, API design, and comprehensive testing to ensure reliability and security.`;
}

function generatePlan(input: PackageInput): string {
  const { stack, complexity } = input;
  const steps = [
    '1. Database: Design and implement the required schema changes.',
    '2. Backend: Create API endpoints with proper validation and error handling.',
    '3. Backend: Implement business logic with security best practices.',
    '4. Frontend: Build user interface components.',
    '5. Frontend: Integrate with backend APIs.',
    '6. Testing: Write unit and integration tests.',
    '7. Documentation: Update API docs and user guides.',
  ];
  
  if (complexity === 'Large') {
    steps.push('8. Performance: Add caching and optimization.');
    steps.push('9. Monitoring: Set up logging and alerts.');
  }
  
  return `${steps.join('\n')}\n\nTarget Stack: ${stack}`;
}

function generateFileTree(input: PackageInput): string {
  const { stack } = input;
  const isReact = stack.toLowerCase().includes('react');
  const isNode = stack.toLowerCase().includes('node');
  
  let tree = 'src/\n';
  
  if (isNode) {
    tree += `├── backend/
│   ├── controllers/
│   │   └── featureController.ts
│   ├── routes/
│   │   └── featureRoutes.ts
│   ├── services/
│   │   └── featureService.ts
│   └── models/
│       └── featureModel.ts\n`;
  }
  
  if (isReact) {
    tree += `├── frontend/
│   ├── components/
│   │   └── FeatureComponent.tsx
│   ├── pages/
│   │   └── FeaturePage.tsx
│   └── api/
│       └── featureApi.ts\n`;
  }
  
  tree += `└── tests/
    └── feature.test.ts`;
  
  return tree;
}

function generateApiContract(input: PackageInput): string {
  const { title } = input;
  const endpoint = title.toLowerCase().replace(/\s+/g, '-');
  
  return `POST /api/${endpoint}
Request: { "data": "example" }
Response: 200 OK { "success": true, "message": "Operation completed" }

GET /api/${endpoint}/:id
Response: 200 OK { "id": "123", "data": "example" }

PUT /api/${endpoint}/:id
Request: { "data": "updated" }
Response: 200 OK { "success": true }

DELETE /api/${endpoint}/:id
Response: 204 No Content`;
}

function generateStarterCode(input: PackageInput): string {
  const { title, stack } = input;
  const isTypeScript = stack.toLowerCase().includes('typescript') || stack.toLowerCase().includes('ts');
  const ext = isTypeScript ? 'ts' : 'js';
  
  return `// featureController.${ext}
export const handleFeature = async (req, res) => {
  try {
    // TODO: Implement ${title} logic
    const result = await processFeature(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Helper function
async function processFeature(data) {
  // TODO: Add business logic here
  return data;
}`;
}

function generateTests(input: PackageInput): string {
  const { title } = input;
  
  return `// feature.test.ts
import { describe, it, expect } from 'vitest';
import { handleFeature } from './featureController';

describe('${title}', () => {
  it('should handle valid input', async () => {
    const mockReq = { body: { data: 'test' } };
    const mockRes = { 
      status: (code) => ({ json: (data) => ({ code, data }) })
    };
    
    const result = await handleFeature(mockReq, mockRes);
    expect(result.code).toBe(200);
    expect(result.data.success).toBe(true);
  });
  
  it('should handle errors gracefully', async () => {
    // TODO: Add error test cases
  });
  
  it('should validate input data', async () => {
    // TODO: Add validation tests
  });
});`;
}

function generateDocs(input: PackageInput): string {
  const { title, story, criteria } = input;
  
  return `# ${title}

## Overview
${story}

## Acceptance Criteria
${criteria}

## Setup
1. Install dependencies: \`npm install\`
2. Configure environment variables
3. Run migrations: \`npm run migrate\`

## Usage
See API documentation for endpoint details.

## Testing
Run tests with: \`npm test\``;
}

function generateCICD(): string {
  return `name: CI/CD Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build`;
}

function generateBobPlan(input: PackageInput): string {
  const { title, stack } = input;
  
  return `# How to Use IBM Bob for ${title}

## 1. Architecture Review
**Prompt**: "Review this ${stack} architecture for ${title}. What security considerations and best practices should I implement?"

## 2. Code Generation
**Prompt**: "Generate production-ready code for ${title} using ${stack}. Include error handling, validation, and logging."

## 3. Test Generation
**Prompt**: "Create comprehensive unit and integration tests for ${title}. Cover edge cases, error scenarios, and success paths."

## 4. Documentation
**Prompt**: "Generate API documentation and user guides for ${title}. Include examples and common use cases."

## 5. Optimization
**Prompt**: "Suggest performance optimizations and caching strategies for ${title} in a ${stack} environment."`;
}

// Made with Bob
