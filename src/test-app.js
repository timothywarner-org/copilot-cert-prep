const { spawn } = require('child_process');
const path = require('path');

function testApp() {
  console.log('Testing GitHub Copilot Tips App...\n');
  
  // Test sequence: view tip, view categories, search, quit
  const testInputs = [
    '1\n',     // See another tip
    '3\n',     // View categories
    '4\n',     // Search
    'test\n',  // Search keyword
    '5\n'      // Quit
  ];

  const child = spawn('node', [path.join(__dirname, 'app.js')], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  let currentInput = 0;
  let output = '';

  child.stdout.on('data', (data) => {
    output += data.toString();
    process.stdout.write(data);
    
    // Send next input after a small delay
    if (currentInput < testInputs.length && data.toString().includes('Enter your choice')) {
      setTimeout(() => {
        child.stdin.write(testInputs[currentInput]);
        currentInput++;
      }, 100);
    }
  });

  child.stderr.on('data', (data) => {
    console.error('Error:', data.toString());
  });

  child.on('close', (code) => {
    console.log(`\nApp exited with code ${code}`);
    if (code === 0) {
      console.log('✅ All tests passed successfully!');
    } else {
      console.log('❌ Tests failed');
    }
  });
}

testApp();