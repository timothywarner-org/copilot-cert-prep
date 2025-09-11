// copilotTipsApp.test.js
// Business scenario: Testing CopilotTipsApp for an employee directory tips tool
// These tests help ensure your app loads tips and picks random tips reliably

const fs = require('fs');
const path = require('path');
const CopilotTipsApp = require('./app');

// Mock tips data for testing
const mockTips = [
  { id: 1, title: 'Use search filters', content: 'Filter employees by department.', category: 'Best Practices' },
  { id: 2, title: 'Export directory', content: 'Export employee data to CSV.', category: 'Automation' }
];

describe('CopilotTipsApp', () => {
  let app;
  const tipsFile = path.join(__dirname, 'tips.json');

  beforeEach(() => {
    // Write mock tips to tips.json before each test
    fs.writeFileSync(tipsFile, JSON.stringify({ tips: mockTips }));
    app = new CopilotTipsApp();
    app.loadTips();
  });

  afterEach(() => {
    // Remove tips.json after each test to keep things clean
    if (fs.existsSync(tipsFile)) fs.unlinkSync(tipsFile);
  });

  test('loads tips from tips.json', () => {
    // Checks that tips are loaded correctly
    expect(app.tips.length).toBe(2);
    expect(app.tips[0].title).toBe('Use search filters');
  });

  test('getRandomTip returns a tip and marks it as shown', () => {
    // Checks that a random tip is returned and tracked
    const tip = app.getRandomTip();
    expect(tip).toBeDefined();
    expect(app.shownTipIds.has(tip.id)).toBe(true);
  });

  test('getRandomTip cycles when all tips shown', () => {
    // Checks that tips cycle after all have been shown
    app.shownTipIds.add(1);
    app.shownTipIds.add(2);
    const tip = app.getRandomTip();
    expect(tip).toBeDefined();
  });
});

// Next Steps:
// 1. Run these tests with `npm test` (after installing Jest)
// 2. Try adding a test for saving tips or searching tips
// 3. Use Copilot to suggest more edge cases and business scenarios
