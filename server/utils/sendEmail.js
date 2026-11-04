// Email notification service helper
export const sendEmail = async ({ to, subject, html, text }) => {
  console.log(`✉️ [Email Service] Sending email to: ${to}`);
  console.log(`📋 [Email Service] Subject: ${subject}`);
  
  // In a production environment with SENDGRID / RESEND / AWS SES:
  // await transport.sendMail({ from: 'noreply@lunawear.com', to, subject, html, text });

  return {
    success: true,
    messageId: `msg_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    recipient: to
  };
};

export const sendOrderConfirmationEmail = async (order) => {
  const subject = `Order Confirmation #${order.orderNumber} - Luna Wear`;
  const html = `
    <h1>Thank you for your order, ${order.customer?.fullName}!</h1>
    <p>Your order #${order.orderNumber} has been received and is being processed.</p>
    <p>Total: $${order.totalPrice.toFixed(2)}</p>
    <p>Shipping to: ${order.shippingAddress?.address}, ${order.shippingAddress?.city}</p>
  `;
  return sendEmail({ to: order.customer?.email, subject, html, text: `Order #${order.orderNumber} confirmed.` });
};

export default sendEmail;
