# Testing Guide for BobFlow

## Overview

BobFlow includes comprehensive unit tests using **Vitest** and **Testing Library**. All tests are located in the `src/lib/` directory alongside the code they test.

## Test Coverage

### 📦 Package Generator Tests (`packageGenerator.test.ts`)
**16 tests** covering the implementation package generation logic:

- ✅ Complete package generation with all required fields
- ✅ All 9 content sections (summary, plan, fileTree, apiContract, starterCode, tests, docs, cicd, bobPlan)
- ✅ Title inclusion in summary
- ✅ Stack inclusion in plan
- ✅ Node.js-specific file tree generation
- ✅ React-specific file tree generation
- ✅ API endpoint generation based on title
- ✅ TypeScript code generation for TypeScript stacks
- ✅ Test structure with describe/it blocks
- ✅ Title inclusion in test descriptions
- ✅ Documentation generation with title and story
- ✅ CI/CD pipeline configuration
- ✅ Bob usage plan with prompts
- ✅ Extra steps for Large complexity
- ✅ Different tech stack handling
- ✅ Unique content for different inputs

### 📝 Demo Script Tests (`demoScript.test.ts`)
**22 tests** covering the demo script generation and validation:

#### Generation Tests (8 tests)
- ✅ Complete demo script generation
- ✅ All required time sections (0:00-0:30, 0:30-1:30, 1:30-2:15, 2:15-3:00)
- ✅ Section titles inclusion
- ✅ IBM Bob mentions
- ✅ BobFlow mentions
- ✅ Speaker notes
- ✅ Stage directions
- ✅ Markdown formatting

#### Validation Tests (6 tests)
- ✅ Correct script validation
- ✅ Missing time section detection
- ✅ Missing required terms detection
- ✅ Short script detection
- ✅ Multiple error detection
- ✅ Valid script with all elements

#### Extraction Tests (8 tests)
- ✅ Time section extraction from generated script
- ✅ Time range extraction
- ✅ Section title extraction
- ✅ Section content extraction
- ✅ Custom script format handling
- ✅ Empty script handling
- ✅ Script with no sections handling
- ✅ Content formatting preservation

### 💾 Storage Tests (`storage.test.ts`)
**15 tests** covering localStorage operations:

#### Package Storage Tests (8 tests)
- ✅ Save and retrieve packages
- ✅ Multiple package saving
- ✅ Get package by ID
- ✅ Non-existent package handling
- ✅ Package persistence across calls
- ✅ Empty localStorage handling
- ✅ All package fields preservation
- ✅ Special characters handling

#### Tracker Storage Tests (5 tests)
- ✅ Default tracker state
- ✅ Save and retrieve tracker state
- ✅ Complete tracker state update
- ✅ All tracker fields presence
- ✅ Tracker state persistence

#### Integration Tests (2 tests)
- ✅ Correct storage keys usage
- ✅ Corrupted localStorage handling

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Run Specific Test File
```bash
npm test src/lib/packageGenerator.test.ts
```

### Run Tests Matching Pattern
```bash
npm test -- --grep "package generation"
```

## Test Structure

### Test File Organization
```
src/lib/
├── packageGenerator.ts          # Implementation
├── packageGenerator.test.ts     # Tests
├── demoScript.ts                # Implementation
├── demoScript.test.ts           # Tests
├── storage.ts                   # Implementation
└── storage.test.ts              # Tests
```

### Test Naming Convention
- **Describe blocks**: Group related tests by functionality
- **It blocks**: Use clear, descriptive test names starting with "should"
- **Example**: `it('should generate a complete package with all required fields')`

## Writing New Tests

### Example Test Structure
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { yourFunction } from './yourModule';

describe('Your Module', () => {
  beforeEach(() => {
    // Setup code (e.g., clear localStorage)
  });

  describe('yourFunction', () => {
    it('should do something specific', () => {
      // Arrange
      const input = { /* test data */ };
      
      // Act
      const result = yourFunction(input);
      
      // Assert
      expect(result).toBe(expectedValue);
    });
  });
});
```

## Test Dependencies

All testing dependencies are already included in `package.json`:

```json
{
  "devDependencies": {
    "vitest": "^4.1.5",
    "@testing-library/react": "^16.3.2",
    "@testing-library/jest-dom": "^6.9.1",
    "jsdom": "^29.1.1"
  }
}
```

**No additional dependencies are needed!**

## Configuration

Tests are configured in `vite.config.ts`:

```typescript
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
```

## Best Practices

### ✅ Do's
- Write tests for all utility functions
- Test edge cases and error conditions
- Use descriptive test names
- Keep tests isolated and independent
- Mock external dependencies when needed
- Test both success and failure paths

### ❌ Don'ts
- Don't test implementation details
- Don't write tests that depend on other tests
- Don't skip cleanup in `beforeEach`/`afterEach`
- Don't test third-party library code
- Don't write overly complex tests

## Continuous Integration

Tests run automatically on every push via GitHub Actions (`.github/workflows/ci.yml`):

```yaml
- name: Run tests
  run: npm test
```

## Test Results Summary

```
Test Files  3 passed (3)
Tests       53 passed (53)
Duration    ~1.4s
```

### Coverage by Module
- **packageGenerator**: 16 tests
- **demoScript**: 22 tests  
- **storage**: 15 tests

## Troubleshooting

### Tests Failing Locally
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear test cache: `npm test -- --clearCache`
3. Check Node.js version: `node --version` (should be 18+)

### localStorage Issues
- Tests automatically clear localStorage in `beforeEach`
- If issues persist, manually clear: `localStorage.clear()`

### Import Errors
- Ensure all imports use correct relative paths
- Check that TypeScript types are properly exported

## Future Test Additions

Consider adding tests for:
- [ ] React component rendering (using Testing Library)
- [ ] User interaction flows (form submission, navigation)
- [ ] Error boundary behavior
- [ ] Accessibility compliance
- [ ] Performance benchmarks

---

**All tests passing! ✅**

For questions or issues, refer to the [Vitest documentation](https://vitest.dev/).