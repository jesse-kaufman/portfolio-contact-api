/** @file Constants for tests. */
export const validSubmission = {
  name: "John Locke",
  email: "john.locke@example.com",
  phone: "3213213214",
  message: "This is a message.",
}

/** Valid mail config object. */
export const mailConfig = {
  host: process.env.SMTP_SERVER, // Your local mail server address (use 'localhost' for local)
  port: process.env.SMTP_PORT, // Port for SSL (usually 465 or 587 for TLS)
  secure: true, // Use SSL/TLS
  auth: {
    user: "", // Leave empty if no authentication is required
    pass: "", // Leave empty if no authentication is required
  },
}
