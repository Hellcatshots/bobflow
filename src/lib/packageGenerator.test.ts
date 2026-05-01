import { describe, it, expect } from 'vitest';
import { generatePackage, type PackageInput } from './packageGenerator';

describe('Package Generator', () => {
  const mockInput: PackageInput = {
    title: 'User Authentication',
    story: 'As a user, I want to log in securely',
    criteria: '- Secure password hashing\n- JWT tokens\n- Rate limiting',
    stack: 'Node.js, Express, PostgreSQL, React',
    complexity: 'Medium',
  };

  describe('generatePackage', () => {
    it('should generate a complete package with all required fields', () => {
      const id = '123';
      const timestamp = 1000;
      
      const pkg = generatePackage(mockInput, id, timestamp);
      
      expect(pkg.id).toBe(id);
      expect(pkg.title).toBe(mockInput.title);
      expect(pkg.story).toBe(mockInput.story);
      expect(pkg.criteria).toBe(mockInput.criteria);
      expect(pkg.stack).toBe(mockInput.stack);
      expect(pkg.complexity).toBe(mockInput.complexity);
      expect(pkg.createdAt).toBe(timestamp);
    });

    it('should generate all 9 content sections', () => {
      const pkg = generatePackage(mockInput, '123', 1000);
      
      expect(pkg.summary).toBeTruthy();
      expect(pkg.plan).toBeTruthy();
      expect(pkg.fileTree).toBeTruthy();
      expect(pkg.apiContract).toBeTruthy();
      expect(pkg.starterCode).toBeTruthy();
      expect(pkg.tests).toBeTruthy();
      expect(pkg.docs).toBeTruthy();
      expect(pkg.cicd).toBeTruthy();
      expect(pkg.bobPlan).toBeTruthy();
    });

    it('should include title in summary', () => {
      const pkg = generatePackage(mockInput, '123', 1000);
      
      expect(pkg.summary).toContain(mockInput.title);
    });

    it('should include stack in plan', () => {
      const pkg = generatePackage(mockInput, '123', 1000);
      
      expect(pkg.plan).toContain(mockInput.stack);
    });

    it('should generate appropriate file tree for Node.js stack', () => {
      const pkg = generatePackage(mockInput, '123', 1000);
      
      expect(pkg.fileTree).toContain('backend/');
      expect(pkg.fileTree).toContain('controllers/');
      expect(pkg.fileTree).toContain('routes/');
    });

    it('should generate appropriate file tree for React stack', () => {
      const pkg = generatePackage(mockInput, '123', 1000);
      
      expect(pkg.fileTree).toContain('frontend/');
      expect(pkg.fileTree).toContain('components/');
      expect(pkg.fileTree).toContain('.tsx');
    });

    it('should generate API endpoints based on title', () => {
      const pkg = generatePackage(mockInput, '123', 1000);
      
      expect(pkg.apiContract).toContain('POST /api/');
      expect(pkg.apiContract).toContain('GET /api/');
      expect(pkg.apiContract).toContain('PUT /api/');
      expect(pkg.apiContract).toContain('DELETE /api/');
    });

    it('should generate TypeScript code for TypeScript stack', () => {
      const tsInput = { ...mockInput, stack: 'TypeScript, Node.js' };
      const pkg = generatePackage(tsInput, '123', 1000);
      
      expect(pkg.starterCode).toContain('.ts');
    });

    it('should generate test structure with describe and it blocks', () => {
      const pkg = generatePackage(mockInput, '123', 1000);
      
      expect(pkg.tests).toContain('describe');
      expect(pkg.tests).toContain('it(');
      expect(pkg.tests).toContain('expect');
    });

    it('should include title in test descriptions', () => {
      const pkg = generatePackage(mockInput, '123', 1000);
      
      expect(pkg.tests).toContain(mockInput.title);
    });

    it('should generate documentation with title and story', () => {
      const pkg = generatePackage(mockInput, '123', 1000);
      
      expect(pkg.docs).toContain(mockInput.title);
      expect(pkg.docs).toContain(mockInput.story);
      expect(pkg.docs).toContain(mockInput.criteria);
    });

    it('should generate CI/CD pipeline configuration', () => {
      const pkg = generatePackage(mockInput, '123', 1000);
      
      expect(pkg.cicd).toContain('name: CI/CD');
      expect(pkg.cicd).toContain('npm test');
      expect(pkg.cicd).toContain('npm run build');
    });

    it('should generate Bob usage plan with prompts', () => {
      const pkg = generatePackage(mockInput, '123', 1000);
      
      expect(pkg.bobPlan).toContain('IBM Bob');
      expect(pkg.bobPlan).toContain('Prompt');
      expect(pkg.bobPlan).toContain(mockInput.title);
      expect(pkg.bobPlan).toContain(mockInput.stack);
    });

    it('should add extra steps for Large complexity', () => {
      const largeInput = { ...mockInput, complexity: 'Large' };
      const pkg = generatePackage(largeInput, '123', 1000);
      
      expect(pkg.plan).toContain('Performance');
      expect(pkg.plan).toContain('Monitoring');
    });

    it('should handle different tech stacks appropriately', () => {
      const pythonInput = { ...mockInput, stack: 'Python, Django, PostgreSQL' };
      const pkg = generatePackage(pythonInput, '123', 1000);
      
      // Should not include React-specific files
      expect(pkg.fileTree).not.toContain('.tsx');
      // Python stack without Node.js won't have backend/ folder in current implementation
      // but will have tests
      expect(pkg.fileTree).toContain('tests/');
    });

    it('should generate unique content for different inputs', () => {
      const input1 = { ...mockInput, title: 'Feature A' };
      const input2 = { ...mockInput, title: 'Feature B' };
      
      const pkg1 = generatePackage(input1, '1', 1000);
      const pkg2 = generatePackage(input2, '2', 2000);
      
      expect(pkg1.summary).not.toBe(pkg2.summary);
      expect(pkg1.apiContract).not.toBe(pkg2.apiContract);
    });
  });
});

// Made with Bob
