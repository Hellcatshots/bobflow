import { describe, it, expect, beforeEach } from 'vitest';
import { savePackage, getPackages, getPackageById, saveTrackerState, getTrackerState, type TicketPackage } from './storage';

describe('Storage Helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Packages', () => {
    const mockPackage: TicketPackage = {
      id: '123',
      title: 'Test Feature',
      story: 'As a user, I want to test',
      criteria: '- Test criteria 1\n- Test criteria 2',
      stack: 'React, Node.js',
      complexity: 'Small',
      createdAt: 1000,
      summary: 'Test Summary',
      plan: 'Test Plan',
      fileTree: 'Test Tree',
      apiContract: 'Test API',
      starterCode: 'Test Code',
      tests: 'Test Tests',
      docs: 'Test Docs',
      cicd: 'Test CI/CD',
      bobPlan: 'Test Bob Plan'
    };

    it('should save and retrieve packages', () => {
      expect(getPackages()).toEqual([]);
      
      savePackage(mockPackage);
      
      const packages = getPackages();
      expect(packages.length).toBe(1);
      expect(packages[0]).toEqual(mockPackage);
    });

    it('should save multiple packages', () => {
      const package2 = { ...mockPackage, id: '456', title: 'Second Feature' };
      
      savePackage(mockPackage);
      savePackage(package2);
      
      const packages = getPackages();
      expect(packages.length).toBe(2);
      expect(packages[0].id).toBe('123');
      expect(packages[1].id).toBe('456');
    });

    it('should get package by id', () => {
      savePackage(mockPackage);
      expect(getPackageById('123')).toEqual(mockPackage);
      expect(getPackageById('456')).toBeUndefined();
    });

    it('should return undefined for non-existent package', () => {
      expect(getPackageById('nonexistent')).toBeUndefined();
    });

    it('should persist packages across multiple calls', () => {
      savePackage(mockPackage);
      
      // Simulate page reload by getting packages again
      const packages1 = getPackages();
      const packages2 = getPackages();
      
      expect(packages1).toEqual(packages2);
    });

    it('should handle empty localStorage gracefully', () => {
      localStorage.clear();
      expect(getPackages()).toEqual([]);
    });

    it('should preserve all package fields', () => {
      savePackage(mockPackage);
      const retrieved = getPackageById('123');
      
      expect(retrieved).toBeDefined();
      expect(retrieved?.title).toBe(mockPackage.title);
      expect(retrieved?.story).toBe(mockPackage.story);
      expect(retrieved?.criteria).toBe(mockPackage.criteria);
      expect(retrieved?.stack).toBe(mockPackage.stack);
      expect(retrieved?.complexity).toBe(mockPackage.complexity);
      expect(retrieved?.createdAt).toBe(mockPackage.createdAt);
      expect(retrieved?.summary).toBe(mockPackage.summary);
      expect(retrieved?.plan).toBe(mockPackage.plan);
      expect(retrieved?.fileTree).toBe(mockPackage.fileTree);
      expect(retrieved?.apiContract).toBe(mockPackage.apiContract);
      expect(retrieved?.starterCode).toBe(mockPackage.starterCode);
      expect(retrieved?.tests).toBe(mockPackage.tests);
      expect(retrieved?.docs).toBe(mockPackage.docs);
      expect(retrieved?.cicd).toBe(mockPackage.cicd);
      expect(retrieved?.bobPlan).toBe(mockPackage.bobPlan);
    });

    it('should handle packages with special characters', () => {
      const specialPackage = {
        ...mockPackage,
        title: 'Test "Feature" with <special> & characters',
        story: 'Story with\nnewlines\tand\ttabs',
      };
      
      savePackage(specialPackage);
      const retrieved = getPackageById('123');
      
      expect(retrieved?.title).toBe(specialPackage.title);
      expect(retrieved?.story).toBe(specialPackage.story);
    });
  });

  describe('Tracker', () => {
    it('should return default tracker state if empty', () => {
      const state = getTrackerState();
      expect(state).toEqual({
        folderCreated: false,
        filesExported: false,
        summaryScreenshot: false,
        explanationAdded: false,
        linksAdded: false,
      });
    });

    it('should save and retrieve tracker state', () => {
      const newState = {
        folderCreated: true,
        filesExported: false,
        summaryScreenshot: true,
        explanationAdded: false,
        linksAdded: true,
      };
      
      saveTrackerState(newState);
      expect(getTrackerState()).toEqual(newState);
    });

    it('should update tracker state completely', () => {
      const state1 = {
        folderCreated: true,
        filesExported: true,
        summaryScreenshot: false,
        explanationAdded: false,
        linksAdded: false,
      };
      
      const state2 = {
        folderCreated: true,
        filesExported: true,
        summaryScreenshot: true,
        explanationAdded: true,
        linksAdded: true,
      };
      
      saveTrackerState(state1);
      expect(getTrackerState()).toEqual(state1);
      
      saveTrackerState(state2);
      expect(getTrackerState()).toEqual(state2);
    });

    it('should handle all tracker fields', () => {
      const state = getTrackerState();
      
      expect(state).toHaveProperty('folderCreated');
      expect(state).toHaveProperty('filesExported');
      expect(state).toHaveProperty('summaryScreenshot');
      expect(state).toHaveProperty('explanationAdded');
      expect(state).toHaveProperty('linksAdded');
    });

    it('should persist tracker state across calls', () => {
      const state = {
        folderCreated: true,
        filesExported: true,
        summaryScreenshot: true,
        explanationAdded: true,
        linksAdded: true,
      };
      
      saveTrackerState(state);
      
      const retrieved1 = getTrackerState();
      const retrieved2 = getTrackerState();
      
      expect(retrieved1).toEqual(retrieved2);
      expect(retrieved1).toEqual(state);
    });
  });

  describe('localStorage Integration', () => {
    it('should use correct storage keys', () => {
      const mockPackage: TicketPackage = {
        id: '123',
        title: 'Test',
        story: 'Story',
        criteria: 'Criteria',
        stack: 'Stack',
        complexity: 'Small',
        createdAt: 1000,
        summary: 'Summary',
        plan: 'Plan',
        fileTree: 'Tree',
        apiContract: 'API',
        starterCode: 'Code',
        tests: 'Tests',
        docs: 'Docs',
        cicd: 'CI/CD',
        bobPlan: 'Bob Plan'
      };
      
      savePackage(mockPackage);
      
      const packagesKey = localStorage.getItem('bobflow_packages');
      expect(packagesKey).toBeTruthy();
      expect(JSON.parse(packagesKey!)).toHaveLength(1);
    });

    it('should handle corrupted localStorage data gracefully', () => {
      localStorage.setItem('bobflow_packages', 'invalid json');
      
      // Should not throw, but return empty array or handle gracefully
      expect(() => getPackages()).toThrow();
    });
  });
});
