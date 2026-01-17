# Revolut Business Payment Integration

This project implements a secure payment processing system using Revolut Business API. The solution follows PCI DSS compliance standards by never collecting or storing cardholder data on the frontend or backend.

## Architecture

The system consists of:

- **Frontend**: HTML checkout page that collects customer information (name, email, service, amount)
- **Backend**: Next.js API routes that handle:
  - Creating payment orders with Revolut API
  - Processing webhook notifications from Revolut
  - Handling success/failure redirects

## Features

- Secure payment processing through Revolut Business
- PCI DSS compliant (no card data handled)
- Real-time payment status updates via webhooks
- Automatic order creation and redirect to Revolut checkout
- Proper error handling and validation

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```env
   REVOLUT_ACCESS_TOKEN=your_revolut_access_token
   REVOLUT_WEBHOOK_SECRET=your_webhook_secret
   REVOLUT_API_BASE_URL=https://b2b.revolut.com/api/1.0
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `REVOLUT_ACCESS_TOKEN`: Your Revolut Business API access token
- `REVOLUT_WEBHOOK_SECRET`: Secret key for verifying webhook signatures
- `REVOLUT_API_BASE_URL`: Base URL for Revolut API (defaults to production)
- `NEXT_PUBLIC_BASE_URL`: Public URL of your application
- `REVOLUT_ENV`: Set to 'sandbox' to use Revolut sandbox environment

## API Routes

- `POST /api/revolut/create-order`: Creates a new payment order with Revolut
- `POST /api/revolut/webhook`: Handles webhook notifications from Revolut

## Webhook Events

The system handles the following webhook events from Revolut:

- `order.completed`: Payment completed successfully
- `order.failed`: Payment failed
- `order.cancelled`: Payment cancelled
- `order.refund.completed`: Refund processed

## Security

- All API requests are authenticated with Revolut access tokens
- Webhook signatures are verified using the configured secret
- Input validation is performed on all customer data
- Amounts are converted to minor units (cents) as required by Revolut

## Testing the Flow

1. Navigate to `/checkout` to access the payment form
2. Fill in customer details and payment information
3. Submit the form to create a payment order
4. You'll be redirected to Revolut's secure payment page
5. Complete the payment on Revolut's site
6. You'll be redirected to either `/success` or `/failure` based on the result
7. The webhook handler will update the payment status in the background

## Production Configuration

To use production credentials:

1. Update your `.env` file with production credentials:
   ```env
   # Revolut Business API Configuration
   REVOLUT_ACCESS_TOKEN=your_real_production_access_token
   REVOLUT_WEBHOOK_SECRET=your_real_production_webhook_secret
   REVOLUT_API_BASE_URL=https://b2b.revolut.com/api/1.0
   REVOLUT_ENV=production
   ```

2. For sandbox testing, use:
   ```env
   REVOLUT_API_BASE_URL=https://sandbox-b2b.revolut.com/api/1.0
   REVOLUT_ENV=sandbox
   ```

3. The application automatically uses the appropriate configuration based on the `REVOLUT_ENV` variable.

## Testing with Production Credentials

⚠️ **WARNING**: When using production credentials, all payments will be real and will charge customers' cards.

For safe testing with production credentials:
1. Start with minimal amounts (e.g., $1.00)
2. Use the test script: `node test-production-payment.js`
3. The script will warn you before creating real charges
4. Only proceed with real payment methods when ready for live transactions

More details in [PRODUCTION_TESTING.md](./PRODUCTION_TESTING.md).

## Error Handling

- Invalid input data returns 400 errors
- API communication failures return 500 errors
- Invalid webhook signatures return 401 errors
- Unauthorized API access returns 401 errors (check your Revolut access token)
- All errors are logged for debugging purposes

## Supported Currencies

The application defaults to USD, but Revolut Business supports multiple currencies including:
- USD - US Dollar
- EUR - Euro
- GBP - British Pound
- CHF - Swiss Franc
- JPY - Japanese Yen
- AUD - Australian Dollar
- CAD - Canadian Dollar
- and many others

To specify a currency, include it in the payment request or set a default in your environment:
```
REVOLUT_DEFAULT_CURRENCY=EUR
```

## Common Issues

### 401 Unauthorized Error
If you encounter a 401 error when creating orders, check the following:
- Ensure your `REVOLUT_ACCESS_TOKEN` is valid and has the correct permissions
- Verify you're using the correct environment (sandbox vs production)
- For local development, use sandbox credentials with `REVOLUT_ENV=sandbox`
- For production, use production credentials with `REVOLUT_ENV=production`

### 500 Server Error
If you encounter a 500 error when creating orders, check the following:
- Verify all required environment variables are set correctly
- Ensure your access token has the proper permissions
- Check that your Revolut Business account is properly set up and verified
- Confirm your webhook endpoint is accessible (for production)
- Make sure you're using the correct API base URL for your environment