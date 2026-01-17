// =======================
// Request types
// =======================
export interface PaymentOrderRequest {
  amount: number;           // Amount in minor units (cents)
  currency?: string;        // Currency code (USD by default)
  customerName: string;     // Customer full name
  customerEmail: string;    // Customer email
  orderReference: string;   // Unique order reference
  description?: string;     // Optional description of the payment
  // Removed serviceId because server computes it from serviceCategory + serviceSubOption
}

// =======================
// Response types
// =======================
export interface PaymentOrderResponse {
  id: string;             // Revolut order ID
  status: string;         // Order status (e.g., 'created', 'pending')
  checkoutUrl: string;    // ✅ Correct property name
  createdAt?: string;     // Optional timestamp from Revolut
}


// =======================
// Webhook event types
// =======================
export interface RevolutWebhookEvent {
  id: string;               // Event ID
  type: string;             // Event type ('order.completed', 'order.failed', etc.)
  created_at: string;       // Timestamp of the event
  data: {
    id: string;             // Revolut order ID
    type: string;           // Order type
    state: string;          // Order state ('completed', 'failed', etc.)
    currency: string;       // Currency code
    amount: number;         // Amount in minor units (cents)
    merchant_order_reference?: string;  // Merchant order reference
    metadata?: Record<string, string>;  // Optional additional info
  };
}

// =======================
// Internal payment record for DB tracking
// =======================
export interface PaymentRecord {
  id: string;                     // Internal payment record ID
  revolutOrderId: string;         // Revolut order ID
  status: 'PENDING' | 'COMPLETED' | 'FAILED'; // Payment status
  amount: number;                 // Amount in major units
  currency: string;               // Currency code
  customerEmail: string;          // Customer email
  serviceId: string;              // Service identifier (from backend mapping)
  orderReference: string;         // Unique merchant order reference
  createdAt: string;              // When record was created
  updatedAt: string;              // Last updated timestamp
  metadata?: Record<string, string>; // Optional additional metadata
}

// =======================
// Revolut API response type
// =======================
export interface RevolutOrderApiResponse {
  id: string;
  state: string;           // API uses 'state' instead of 'status'
  checkout_url: string;    // snake_case from API
  created_at?: string;
  // other fields if needed
}

