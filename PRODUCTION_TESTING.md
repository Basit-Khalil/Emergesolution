# Testing with Production Credentials

This guide explains how to configure and test the payment system with Revolut production credentials.

## Configuration

### 1. Update Environment Variables

Replace the placeholder values in your `.env` file with your actual production credentials:

```env
# Revolut Business API Configuration
REVOLUT_ACCESS_TOKEN=your_real_production_access_token
REVOLUT_WEBHOOK_SECRET=your_real_production_webhook_secret
REVOLUT_API_BASE_URL=https://b2b.revolut.com/api/1.0
REVOLUT_ENV=production

# Application Configuration
NEXT_PUBLIC_BASE_URL=https://yourdomain.com  # Update to your production domain
```

### 2. Production vs Sandbox

The application supports both production and sandbox environments:

- **Production**: Set `REVOLUT_ENV=production` to use live Revolut API
- **Sandbox**: Set `REVOLUT_ENV=sandbox` to use test Revolut API
- **Default**: If `REVOLUT_ENV` is not set, it will use the base URL from `REVOLUT_API_BASE_URL`

## Testing the Payment Flow

### Safe Testing Method (Recommended)

1. Start with small amounts (e.g., $1.00) for initial testing
2. Use the test script to verify configuration:
   ```bash
   node test-production-payment.js
   ```
3. The script will warn you before creating real charges
4. Only proceed with real payment methods when ready for live transactions

### Manual Testing Steps

1. Ensure your environment is properly configured:
   ```bash
   # Verify environment variables are set
   echo $REVOLUT_ACCESS_TOKEN
   echo $REVOLUT_ENV
   ```

2. Start your application:
   ```bash
   npm run dev
   # or
   npm start
   ```

3. Navigate to the checkout page and submit a test order with:
   - Small amount (e.g., $1.00)
   - Valid customer information
   - Real payment details (when ready for live testing)

4. Monitor your Revolut Business dashboard for the transaction

5. Verify webhook delivery by checking your server logs

### Webhook Configuration

For production, ensure your webhook endpoint is properly configured in your Revolut Business dashboard:

- **Endpoint URL**: `https://yourdomain.com/api/revolut/webhook`
- **HTTP Method**: POST
- **Authentication**: Signature verification (handled automatically by the application)
- **Events to subscribe**: order.completed, order.failed, order.cancelled, order.refund.completed

## Important Security Notes

- Never commit production credentials to version control
- Use strong, unique webhook secrets
- Implement proper logging for audit trails
- Monitor your Revolut dashboard for suspicious activity
- Regularly rotate your access tokens

## Troubleshooting

### Common Issues:

1. **401 Unauthorized Error**:
   - Verify your `REVOLUT_ACCESS_TOKEN` is correct
   - Check that the token has the right permissions
   - Ensure you're using the correct environment (sandbox vs production)
   - If developing locally, make sure you're using sandbox credentials and `REVOLUT_ENV=sandbox`
   - If using production credentials locally, be aware that this creates real charges

2. **Switching Between Environments**:
   - For development: Use sandbox credentials with `REVOLUT_ENV=sandbox`
   - For production: Use production credentials with `REVOLUT_ENV=production`
   - Remember to update your .env file appropriately for each environment

2. **Invalid Signature Error**:
   - Verify your `REVOLUT_WEBHOOK_SECRET` matches what's in your Revolut dashboard
   - Ensure your webhook endpoint is accessible from the internet

3. **Webhook Not Receiving Events**:
   - Check that your webhook endpoint is publicly accessible
   - Verify the webhook URL in your Revolut dashboard
   - Check server logs for errors

### Verification Steps:

1. Confirm all environment variables are properly set
2. Test API connectivity independently
3. Verify SSL certificate is valid (required for webhooks)
4. Check firewall/network settings allow incoming webhook requests

## Going Live Checklist

- [ ] Production credentials are securely configured
- [ ] Webhook endpoint is tested and verified
- [ ] Payment flow tested with small amounts
- [ ] Error handling verified
- [ ] Logging and monitoring in place
- [ ] SSL certificate is valid
- [ ] Security measures implemented
- [ ] Legal compliance verified (PCI DSS, etc.)