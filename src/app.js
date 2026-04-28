#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ASCII Art Banner
const BANNER = `
╔══════════════════════════════════════════════════════════════╗
║   ____  _ _   _   _       _        ____            _ _       ║
║  / ___||_| |_| | | |_   _| |__    / ___|___  _ __ |_| | ___  ║
║ | |  _ | | __| |_| | | | | '_ \\  | |   / _ \\| '_ \\| | |/ _ \\ ║
║ | |_| || | |_|  _  | |_| | |_) | | |__| (_) | |_) | | | (_) |║
║  \\____|_|\\__|_| |_|\\__,_|_.__/   \\____\\___/| .__/|_|_|\\___/ ║
║                                             |_|              ║
║              🚀 Tips & Tricks Terminal 🚀                    ║
╚══════════════════════════════════════════════════════════════╝
`;

// Color codes for terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
  gray: '\x1b[90m'
};

class CopilotTipsApp {
  constructor() {
    this.tipsFile = path.join(__dirname, 'tips.json');
    this.tips = [];
    this.shownTipIds = new Set();
    this.rl = null;
    this.menuOptions = [
      { key: '1', label: '🎲 See another tip', action: 'another' },
      { key: '2', label: '✨ Create a new tip', action: 'create' },
      { key: '3', label: '📚 View all categories', action: 'categories' },
      { key: '4', label: '🔍 Search tips', action: 'search' },
      { key: '5', label: '📊 Statistics', action: 'stats' },
      { key: '6', label: '🎯 Random category', action: 'random_category' },
      { key: 'q', label: '👋 Quit', action: 'quit' }
    ];
    this.setupErrorHandlers();
  }

  setupErrorHandlers() {
    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      this.logError('Uncaught Exception', error);
      this.cleanup();
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      this.logError('Unhandled Promise Rejection', reason);
      this.cleanup();
      process.exit(1);
    });

    // Handle SIGINT (Ctrl+C)
    process.on('SIGINT', () => {
      console.log('\n\n👋 Goodbye! Thanks for using GitHub Copilot Tips!\n');
      this.cleanup();
      process.exit(0);
    });

    // Handle SIGTERM
    process.on('SIGTERM', () => {
      this.cleanup();
      process.exit(0);
    });
  }

  logError(type, error) {
    console.error(`\n${colors.red}❌ ${type}:${colors.reset}`);
    console.error(`${colors.dim}${error.message || error}${colors.reset}`);
    if (error.stack) {
      console.error(`${colors.gray}${error.stack}${colors.reset}`);
    }
  }

  cleanup() {
    if (this.rl) {
      this.rl.close();
    }
  }

  clearScreen() {
    // Clear screen and move cursor to top
    process.stdout.write('\x1Bc');
  }

  loadTips() {
    try {
      if (!fs.existsSync(this.tipsFile)) {
        console.error(`${colors.red}❌ Tips file not found: ${this.tipsFile}${colors.reset}`);
        this.tips = [];
        return false;
      }

      const data = fs.readFileSync(this.tipsFile, 'utf8');
      if (!data.trim()) {
        console.error(`${colors.yellow}⚠️  Tips file is empty${colors.reset}`);
        this.tips = [];
        return false;
      }

      const parsed = JSON.parse(data);
      this.tips = parsed.tips || [];
      
      if (this.tips.length === 0) {
        console.warn(`${colors.yellow}⚠️  No tips found in file${colors.reset}`);
        return false;
      }

      return true;
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error(`${colors.red}❌ Invalid JSON in tips file: ${error.message}${colors.reset}`);
      } else {
        console.error(`${colors.red}❌ Error loading tips: ${error.message}${colors.reset}`);
      }
      this.tips = [];
      return false;
    }
  }

  saveTips() {
    try {
      const data = JSON.stringify({ tips: this.tips }, null, 2);
      fs.writeFileSync(this.tipsFile, data, 'utf8');
      return true;
    } catch (error) {
      console.error(`${colors.red}❌ Error saving tips: ${error.message}${colors.reset}`);
      return false;
    }
  }

  getRandomTip() {
    if (this.tips.length === 0) {
      return null;
    }

    const unshownTips = this.tips.filter(tip => !this.shownTipIds.has(tip.id));
    
    if (unshownTips.length === 0) {
      this.shownTipIds.clear();
      return this.tips[Math.floor(Math.random() * this.tips.length)];
    }

    const tip = unshownTips[Math.floor(Math.random() * unshownTips.length)];
    this.shownTipIds.add(tip.id);
    return tip;
  }

  displayTip(tip, showAnimation = true) {
    if (!tip) {
      console.log(`\n${colors.yellow}📭 No tips available.${colors.reset}\n`);
      return;
    }

    if (showAnimation) {
      this.showLoadingAnimation();
    }

    const categoryColors = {
      'Best Practices': colors.green,
      'Security': colors.red,
      'Testing': colors.yellow,
      'Chat Features': colors.cyan,
      'Editor Tips': colors.magenta,
      'Enterprise': colors.blue,
      'Debugging': colors.red,
      'AI Features': colors.cyan,
      'MCP': colors.magenta
    };

    const categoryColor = categoryColors[tip.category] || colors.gray;

    console.log('\n┌' + '─'.repeat(62) + '┐');
    const idPart = `  💡 TIP #${tip.id}: `;
    const titleWidth = 62 - idPart.length;
    console.log(`│${colors.bright}${idPart}${tip.title.substring(0, titleWidth).padEnd(titleWidth)}${colors.reset}│`);
    console.log('├' + '─'.repeat(62) + '┤');
    
    // Wrap content to fit in box
    const words = tip.content.split(' ');
    let line = '│  ';
    let lineLength = 2;
    
    for (const word of words) {
      if (lineLength + word.length + 1 > 60) {
        console.log(line.padEnd(63) + '│');
        line = '│  ';
        lineLength = 2;
      }
      line += word + ' ';
      lineLength += word.length + 1;
    }
    if (lineLength > 2) {
      console.log(line.padEnd(63) + '│');
    }
    
    console.log('├' + '─'.repeat(62) + '┤');
    console.log(`│  ${categoryColor}📂 Category: ${tip.category}${colors.reset}`.padEnd(63 + categoryColor.length + colors.reset.length) + '│');
    console.log('└' + '─'.repeat(62) + '┘');
  }

  showLoadingAnimation() {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;
    
    const interval = setInterval(() => {
      process.stdout.write(`\r${colors.cyan}${frames[i]} Loading tip...${colors.reset}`);
      i = (i + 1) % frames.length;
    }, 80);

    setTimeout(() => {
      clearInterval(interval);
      process.stdout.write('\r' + ' '.repeat(20) + '\r');
    }, 500);
  }

  promptUser(question) {
    return new Promise((resolve) => {
      if (!this.rl) {
        this.rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
      }
      
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  async createNewTip() {
    console.log(`\n${colors.cyan}✨ Create a New Tip${colors.reset}`);
    console.log('─'.repeat(40));
    
    const title = await this.promptUser(`${colors.yellow}📝 Title: ${colors.reset}`);
    if (!title) {
      console.log(`${colors.red}❌ Title cannot be empty. Cancelled.${colors.reset}`);
      return;
    }

    const content = await this.promptUser(`${colors.yellow}💭 Content: ${colors.reset}`);
    if (!content) {
      console.log(`${colors.red}❌ Content cannot be empty. Cancelled.${colors.reset}`);
      return;
    }

    console.log(`\n${colors.dim}Available categories: AI Features, Best Practices, Testing, Security,`);
    console.log(`Chat Features, Editor Tips, MCP, Debugging, Enterprise, etc.${colors.reset}`);
    
    const category = await this.promptUser(`${colors.yellow}📂 Category: ${colors.reset}`);
    if (!category) {
      console.log(`${colors.red}❌ Category cannot be empty. Cancelled.${colors.reset}`);
      return;
    }

    const newTip = {
      id: this.tips.length > 0 ? Math.max(...this.tips.map(t => t.id)) + 1 : 1,
      title,
      content,
      category
    };

    this.tips.push(newTip);
    
    if (this.saveTips()) {
      console.log(`\n${colors.green}✅ Tip #${newTip.id} added successfully!${colors.reset}`);
      this.displayTip(newTip, false);
    } else {
      console.log(`\n${colors.red}❌ Failed to save the new tip.${colors.reset}`);
      this.tips.pop();
    }
  }

  async displayInteractiveMenu() {
    console.log(`\n${colors.cyan}╔════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.cyan}║${colors.reset}     ${colors.bright}🎯 MAIN MENU${colors.reset}               ${colors.cyan}║${colors.reset}`);
    console.log(`${colors.cyan}╚════════════════════════════════╝${colors.reset}\n`);

    this.menuOptions.forEach(option => {
      const key = option.key === 'q' ? 'q' : option.key;
      console.log(`  ${colors.bright}[${key}]${colors.reset} ${option.label}`);
    });

    console.log(`\n${colors.dim}💡 Type to filter or enter choice:${colors.reset}`);
  }

  filterMenuOptions(input) {
    if (!input) return this.menuOptions;
    
    const filtered = this.menuOptions.filter(option => 
      option.label.toLowerCase().includes(input.toLowerCase()) ||
      option.key === input
    );
    
    return filtered.length > 0 ? filtered : this.menuOptions;
  }

  viewCategories() {
    const categories = [...new Set(this.tips.map(tip => tip.category))].sort();
    
    if (categories.length === 0) {
      console.log(`\n${colors.yellow}📭 No categories found.${colors.reset}\n`);
      return;
    }

    console.log(`\n${colors.cyan}📚 Tip Categories${colors.reset}`);
    console.log('─'.repeat(40));
    
    categories.forEach((category, index) => {
      const count = this.tips.filter(tip => tip.category === category).length;
      const emoji = this.getCategoryEmoji(category);
      console.log(`  ${emoji} ${colors.bright}${category}${colors.reset} ${colors.dim}(${count} tips)${colors.reset}`);
    });
  }

  getCategoryEmoji(category) {
    const emojis = {
      'Best Practices': '⭐',
      'Security': '🔒',
      'Testing': '🧪',
      'Chat Features': '💬',
      'Editor Tips': '✏️',
      'Enterprise': '🏢',
      'Debugging': '🐛',
      'AI Features': '🤖',
      'MCP': '🔌',
      'Git': '📦',
      'CLI': '⌨️',
      'Database': '🗄️',
      'Documentation': '📖',
      'Automation': '⚙️',
      'Code Quality': '✨',
      'Workflow': '🔄'
    };
    return emojis[category] || '📌';
  }

  async searchTips() {
    const keyword = await this.promptUser(`${colors.yellow}🔍 Search: ${colors.reset}`);
    
    if (!keyword) {
      console.log(`${colors.red}Search cancelled.${colors.reset}`);
      return;
    }

    const searchLower = keyword.toLowerCase();
    const results = this.tips.filter(tip => 
      tip.title.toLowerCase().includes(searchLower) ||
      tip.content.toLowerCase().includes(searchLower) ||
      tip.category.toLowerCase().includes(searchLower)
    );

    if (results.length === 0) {
      console.log(`\n${colors.yellow}😔 No tips found matching "${keyword}".${colors.reset}\n`);
      return;
    }

    console.log(`\n${colors.green}✨ Found ${results.length} tip(s) matching "${keyword}"${colors.reset}`);
    console.log('─'.repeat(50) + '\n');
    
    for (const tip of results) {
      const emoji = this.getCategoryEmoji(tip.category);
      console.log(`${emoji} ${colors.bright}#${tip.id} ${tip.title}${colors.reset}`);
      console.log(`   ${colors.dim}${tip.content.substring(0, 70)}${tip.content.length > 70 ? '...' : ''}${colors.reset}`);
      console.log();
    }
  }

  showStatistics() {
    console.log(`\n${colors.cyan}📊 Statistics${colors.reset}`);
    console.log('─'.repeat(40));
    
    const totalTips = this.tips.length;
    const shownTips = this.shownTipIds.size;
    const categories = [...new Set(this.tips.map(tip => tip.category))];
    
    console.log(`  📝 Total tips: ${colors.bright}${totalTips}${colors.reset}`);
    console.log(`  ✅ Tips shown this session: ${colors.bright}${shownTips}${colors.reset}`);
    console.log(`  📚 Categories: ${colors.bright}${categories.length}${colors.reset}`);
    console.log(`  🎯 Completion: ${colors.bright}${Math.round((shownTips / totalTips) * 100)}%${colors.reset}`);
    
    // Most popular category
    const categoryCounts = {};
    this.tips.forEach(tip => {
      categoryCounts[tip.category] = (categoryCounts[tip.category] || 0) + 1;
    });
    
    const topCategory = Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])[0];
    
    if (topCategory) {
      console.log(`  🏆 Top category: ${colors.bright}${topCategory[0]}${colors.reset} (${topCategory[1]} tips)`);
    }
  }

  async showRandomCategory() {
    const categories = [...new Set(this.tips.map(tip => tip.category))];
    if (categories.length === 0) {
      console.log(`\n${colors.yellow}📭 No categories available.${colors.reset}\n`);
      return;
    }

    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const categoryTips = this.tips.filter(tip => tip.category === randomCategory);
    const randomTip = categoryTips[Math.floor(Math.random() * categoryTips.length)];
    
    console.log(`\n${colors.magenta}🎲 Random category: ${randomCategory}${colors.reset}`);
    this.displayTip(randomTip);
  }

  async handleMenuChoice(choice) {
    const normalizedChoice = choice.toLowerCase();
    
    // Direct key match
    const directMatch = this.menuOptions.find(opt => opt.key === normalizedChoice);
    if (directMatch) {
      return directMatch.action;
    }

    // Filter by text
    const filtered = this.filterMenuOptions(normalizedChoice);
    if (filtered.length === 1) {
      return filtered[0].action;
    }

    // Check for partial matches
    if (normalizedChoice.includes('tip') || normalizedChoice === 'another') return 'another';
    if (normalizedChoice.includes('create') || normalizedChoice.includes('new')) return 'create';
    if (normalizedChoice.includes('categ')) return 'categories';
    if (normalizedChoice.includes('search')) return 'search';
    if (normalizedChoice.includes('stat')) return 'stats';
    if (normalizedChoice.includes('random')) return 'random_category';
    if (normalizedChoice.includes('quit') || normalizedChoice.includes('exit')) return 'quit';

    return null;
  }

  async run() {
    try {
      this.clearScreen();
      console.log(`${colors.cyan}${BANNER}${colors.reset}`);

      const loaded = this.loadTips();
      if (!loaded || this.tips.length === 0) {
        console.log(`${colors.yellow}⚠️  Starting with empty tips database.${colors.reset}`);
        console.log(`${colors.dim}Use 'Create a new tip' to add your first tip!${colors.reset}\n`);
      } else {
        const initialTip = this.getRandomTip();
        this.displayTip(initialTip);
      }

      let running = true;
      
      while (running) {
        await this.displayInteractiveMenu();
        const choice = await this.promptUser(`${colors.green}➜${colors.reset} `);
        
        const action = await this.handleMenuChoice(choice);

        switch (action) {
          case 'another':
            const tip = this.getRandomTip();
            if (tip) {
              this.clearScreen();
              console.log(`${colors.cyan}${BANNER}${colors.reset}`);
              this.displayTip(tip);
            } else {
              console.log(`${colors.yellow}📭 No tips available. Create some first!${colors.reset}`);
            }
            break;
          
          case 'create':
            await this.createNewTip();
            break;
          
          case 'categories':
            this.viewCategories();
            break;
          
          case 'search':
            await this.searchTips();
            break;
          
          case 'stats':
            this.showStatistics();
            break;
          
          case 'random_category':
            await this.showRandomCategory();
            break;
          
          case 'quit':
            console.log(`\n${colors.green}✨ Thanks for using GitHub Copilot Tips!${colors.reset}`);
            console.log(`${colors.dim}Keep learning and happy coding! 🚀${colors.reset}\n`);
            running = false;
            break;
          
          default:
            console.log(`\n${colors.red}❓ Invalid choice. Try typing part of the menu option.${colors.reset}`);
            console.log(`${colors.dim}Example: type 'search' or 'cat' or use numbers 1-6${colors.reset}\n`);
        }
      }

      this.cleanup();
    } catch (error) {
      this.logError('Runtime Error', error);
      this.cleanup();
      process.exit(1);
    }
  }
}

// Initialize and run the app
const app = new CopilotTipsApp();
app.run().catch(error => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});