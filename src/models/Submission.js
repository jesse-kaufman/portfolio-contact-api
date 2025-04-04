/** @file Submission model class. */

import nodemailer from "nodemailer"
import { sendMail } from "../services/sendMail.js"
import {
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
} from "@/services/validation.js"

/**
 * Submission class.
 */
export class Submission {
  #name
  #email
  #phone
  #message

  /**
   * Constructor for Submission class.
   * @param {object} formData - Data to create new Submission.
   */
  constructor(formData) {
    this.#name = formData.name
    this.#email = formData.email
    this.#phone = formData.phone
    this.#message = formData.message
    this.#validate()
  }

  /**
   * Gets submission data.
   * @returns {object} Data from the submission.
   */
  getData() {
    return {
      name: this.#name,
      email: this.#email,
      phone: this.#phone,
      message: this.#message,
    }
  }

  /**
   * Returns plain JSON representation of Submission instance.
   * @returns {object} Plain JSON representation of Submission.
   */
  toJSON() {
    return this.getData()
  }

  /**
   * Validates a submission.
   * @throws {Error} If submission is not valid.
   */
  #validate() {
    // Check for required properties.
    if (!this.#name || !this.#email || !this.#message) {
      throw new Error("Name, email, and message are required fields.")
    }
    // Conditionally validate phone.
    if (this.#phone != null) validatePhone(this.#phone)
    // Validate the rest of the properties.
    validateName(this.#name)
    validateEmail(this.#email)
    validateMessage(this.#message)
  }

  /** Sends the email. */
  async send() {
    const config = {
      host: process.env.SMTP_SERVER, // Your local mail server address (use 'localhost' for local)
      port: process.env.SMTP_PORT, // Port for SSL (usually 465 or 587 for TLS)
      secure: true, // Use SSL/TLS
      auth: {
        user: "", // Leave empty if no authentication is required
        pass: "", // Leave empty if no authentication is required
      },
    }

    // Configure nodemailer transport with encryption (SSL or TLS)
    const transporter = nodemailer.createTransport(config)

    await sendMail(transporter, this.getData())
  }
}
