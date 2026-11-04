import { successResponse, errorResponse } from '../utils/formatResponse.js';

export const getPaymentMethods = async (req, res) => {
  const methods = [
    {
      id: 'credit_card',
      name: 'Credit or Debit Card',
      description: 'Visa, Mastercard, American Express',
      supportedCards: ['visa', 'mastercard', 'amex'],
      instant: true
    },
    {
      id: 'apple_pay',
      name: 'Apple Pay',
      description: 'One-touch checkout with Apple ID',
      instant: true
    },
    {
      id: 'google_pay',
      name: 'Google Pay',
      description: 'Fast, secure checkout with Google',
      instant: true
    },
    {
      id: 'klarna',
      name: 'Klarna - Pay in 4',
      description: '4 interest-free installments of 25%',
      instant: true
    },
    {
      id: 'cash_on_delivery',
      name: 'Cash on Delivery (COD)',
      description: 'Pay with cash upon receipt of order',
      instant: false
    }
  ];

  return successResponse(res, methods);
};

export const processPayment = async (req, res) => {
  try {
    const { paymentMethod, amount, currency = 'USD', cardDetails } = req.body;

    if (!amount || amount <= 0) {
      return errorResponse(res, 'Valid amount is required', 400);
    }

    // Simulate payment transaction
    const transactionId = `TXN-${paymentMethod.toUpperCase()}-${Date.now()}`;

    // Validate card details if credit_card
    if (paymentMethod === 'credit_card' && cardDetails) {
      const sanitizedNumber = (cardDetails.number || '').replace(/\s+/g, '');
      if (sanitizedNumber.length < 13) {
        return errorResponse(res, 'Invalid card number provided', 400);
      }
    }

    return successResponse(res, {
      transactionId,
      status: 'succeeded',
      amount,
      currency,
      paymentMethod,
      timestamp: new Date().toISOString()
    }, 'Payment processed successfully');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};
