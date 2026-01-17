/**
 * Test script for Revolut Payment Integration
 * This script demonstrates how to test the payment flow
 */

const { RevolutClient } = require('./src/lib/revolut');

// Mock environment variables for testing
process.env.REVOLUT_ACCESS_TOKEN = 'test_token';
process.env.REVOLUT_API_BASE_URL = 'https://sandbox-b2b.revolut.com/api/1.0';

console.log('Testing Revolut Payment Integration...\n');

// Test 1: Initialize Revolut Client
try {
  const client = require('./src/lib/revolut');
  console.log('✅ Revolut client module loaded successfully');
} catch (error) {
  console.error('❌ Error loading Revolut client:', error.message);
}

// Test 2: Validate required types exist
try {
  const paymentTypes = require('./src/types/payment');
  console.log('✅ Payment types module loaded successfully');
} catch (error) {
  console.error('❌ Error loading payment types:', error.message);
}

// Test 3: Check if API routes exist
const fs = require('fs');
const path = require('path');

const apiRoutes = [
  './src/app/api/revolut/create-order/route.ts',
  './src/app/api/revolut/webhook/route.ts'
];

apiRoutes.forEach(route => {
  if (fs.existsSync(path.join(__dirname, route))) {
    console.log(`✅ API route exists: ${route}`);
  } else {
    console.error(`❌ API route missing: ${route}`);
  }
});

// Test 4: Check if frontend components exist
const frontendFiles = [
  './src/app/checkout/page.tsx',
  './src/app/checkout/components/CheckoutForm.tsx',
  './src/app/success/page.tsx',
  './src/app/failure/page.tsx'
];

frontendFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`✅ Frontend file exists: ${file}`);
  } else {
    console.error(`❌ Frontend file missing: ${file}`);
  }
});

console.log('\n🎉 Basic validation completed!');
console.log('\nTo run the application:');
console.log('1. Set up your environment variables in .env');
console.log('2. Run: npm install');
console.log('3. Run: npm run dev');
console.log('4. Visit http://localhost:3000 to test the payment flow');