/** @file Send mail service. */

/**
 * Sends the email using nodemailer.
 * @param {object} transporter - Mail transport.
 * @param {object} data - Data from submission.
 * @returns {object} - Result of transporter.sendMail().
 */
export const sendMail = async (transporter, data) => {
  const { name, email, phone, message } = data

  // Setup email data
  const mailOptions = {
    from: "glandix@lloydnet.org", // From address
    to: "glandix@lloydnet.org", // Recipient address
    subject: "New contact form submission",
    text: `Message from ${name} (${email}):\n\nPhone: ${phone}\n\n${message}`, // Plain text body
    html: `<p>Message from ${name} (${email}):</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Message:</strong><br/>${message}</p>`, // HTML body
    replyTo: email, // Use sender email for reply-to header
  }

  try {
    // Send the email
    return await transporter.sendMail(mailOptions)
  } catch (error) {
    throw new Error(`Email failed: ${error.message}`)
  }
}
