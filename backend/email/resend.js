const { Resend } = require('resend');
const resend = new Resend('re_5egY6BkP_9fG1zHyCXzVvk4toQGRfWMpq'); // Replace with your Resend API key

// Send email function
const sendStatusEmail = async (email, driverName, status) => {
  try {
    const response = await resend.emails.send({
      from: 'no-reply@Pack-N-Go.com', // Verified domain in Resend
      to: email,
      subject: `Job Status Update for ${driverName}`,
      html: `
        <h3>Hello,</h3>
        <p>The status of the assigned job for <strong>${driverName}</strong> has been updated.</p>
        <p><strong>New Status:</strong> ${status}</p>
        <p>Thank you.</p>
      `,
    });
    console.log('Email sent:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendStatusEmail;
