import { describe, it, expect } from 'vitest';
import { generateDemoScript, validateDemoScript, extractTimeSections } from './demoScript';

describe('Demo Script Generator', () => {
  describe('generateDemoScript', () => {
    it('should generate a complete demo script', () => {
      const script = generateDemoScript();
      
      expect(script).toBeTruthy();
      expect(script.length).toBeGreaterThan(0);
    });

    it('should include all required time sections', () => {
      const script = generateDemoScript();
      
      expect(script).toContain('0:00 - 0:30');
      expect(script).toContain('0:30 - 1:30');
      expect(script).toContain('1:30 - 2:15');
      expect(script).toContain('2:15 - 3:00');
    });

    it('should include section titles', () => {
      const script = generateDemoScript();
      
      expect(script).toContain('The Problem & Introduction');
      expect(script).toContain('The Solution & Live Walkthrough');
      expect(script).toContain('How IBM Bob Was Used');
      expect(script).toContain('The Impact & Conclusion');
    });

    it('should mention IBM Bob', () => {
      const script = generateDemoScript();
      
      expect(script).toContain('IBM Bob');
    });

    it('should mention BobFlow', () => {
      const script = generateDemoScript();
      
      expect(script).toContain('BobFlow');
    });

    it('should include speaker notes', () => {
      const script = generateDemoScript();
      
      expect(script).toContain('**Speaker**:');
    });

    it('should include stage directions', () => {
      const script = generateDemoScript();
      
      expect(script).toContain('*(');
      expect(script).toContain(')*');
    });

    it('should be formatted as markdown', () => {
      const script = generateDemoScript();
      
      expect(script).toContain('# BobFlow');
      expect(script).toContain('##');
    });
  });

  describe('validateDemoScript', () => {
    it('should validate a correct demo script', () => {
      const script = generateDemoScript();
      const result = validateDemoScript(script);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing time sections', () => {
      const incompleteScript = '# Demo\n\n## 0:00 - 0:30 | Intro\nSome content';
      const result = validateDemoScript(incompleteScript);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some(e => e.includes('0:30 - 1:30'))).toBe(true);
    });

    it('should detect missing required terms', () => {
      const script = '## 0:00 - 0:30 | Intro\n## 0:30 - 1:30 | Demo\n## 1:30 - 2:15 | Usage\n## 2:15 - 3:00 | End\nSome content without key terms';
      const result = validateDemoScript(script);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('IBM Bob'))).toBe(true);
    });

    it('should detect scripts that are too short', () => {
      const shortScript = 'Short script';
      const result = validateDemoScript(shortScript);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('too short'))).toBe(true);
    });

    it('should return all errors for invalid script', () => {
      const badScript = 'Bad';
      const result = validateDemoScript(badScript);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });

    it('should validate script with all required elements', () => {
      const validScript = `# Demo
## 0:00 - 0:30 | Intro
IBM Bob and BobFlow implementation package with lots of content to make it long enough.
## 0:30 - 1:30 | Demo
More content here about IBM Bob and BobFlow and implementation package generation.
## 1:30 - 2:15 | Usage
Even more content about how to use IBM Bob with BobFlow for implementation package creation.
## 2:15 - 3:00 | Conclusion
Final thoughts about IBM Bob and BobFlow with implementation package details and how it helps developers turn ideas into impact faster with comprehensive testing and documentation.`;
      
      const result = validateDemoScript(validScript);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('extractTimeSections', () => {
    it('should extract all time sections from generated script', () => {
      const script = generateDemoScript();
      const sections = extractTimeSections(script);
      
      expect(sections).toHaveLength(4);
    });

    it('should extract time ranges correctly', () => {
      const script = generateDemoScript();
      const sections = extractTimeSections(script);
      
      expect(sections[0].timeRange).toBe('0:00 - 0:30');
      expect(sections[1].timeRange).toBe('0:30 - 1:30');
      expect(sections[2].timeRange).toBe('1:30 - 2:15');
      expect(sections[3].timeRange).toBe('2:15 - 3:00');
    });

    it('should extract section titles correctly', () => {
      const script = generateDemoScript();
      const sections = extractTimeSections(script);
      
      expect(sections[0].title).toContain('Problem');
      expect(sections[1].title).toContain('Solution');
      expect(sections[2].title).toContain('IBM Bob');
      expect(sections[3].title).toContain('Impact');
    });

    it('should extract section content', () => {
      const script = generateDemoScript();
      const sections = extractTimeSections(script);
      
      sections.forEach(section => {
        expect(section.content).toBeTruthy();
        expect(section.content.length).toBeGreaterThan(0);
      });
    });

    it('should handle custom script format', () => {
      const customScript = `## 0:00 - 1:00 | First Section
Content for first section
More content

## 1:00 - 2:00 | Second Section
Content for second section`;
      
      const sections = extractTimeSections(customScript);
      
      expect(sections).toHaveLength(2);
      expect(sections[0].timeRange).toBe('0:00 - 1:00');
      expect(sections[0].title).toBe('First Section');
      expect(sections[0].content).toContain('Content for first section');
    });

    it('should handle empty script', () => {
      const sections = extractTimeSections('');
      
      expect(sections).toHaveLength(0);
    });

    it('should handle script with no sections', () => {
      const script = 'Just some text without sections';
      const sections = extractTimeSections(script);
      
      expect(sections).toHaveLength(0);
    });

    it('should preserve content formatting', () => {
      const script = `## 0:00 - 1:00 | Test
**Bold text**
*Italic text*
- List item`;
      
      const sections = extractTimeSections(script);
      
      expect(sections[0].content).toContain('**Bold text**');
      expect(sections[0].content).toContain('*Italic text*');
      expect(sections[0].content).toContain('- List item');
    });
  });
});

// Made with Bob
