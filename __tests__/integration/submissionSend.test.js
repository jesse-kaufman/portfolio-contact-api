/** @file Submission send tests. */
import { describe, it, expect, vi } from "vitest"
import nodemailer from "nodemailer"
import { validSubmission } from "../constants.js"
import { Submission } from "@/models/Submission.js"

describe("Submission > send", () => {
  it("should send an email with the correct parameters", async () => {
    const sendMailMock = vi.fn() // Create a mock function for sendMail

    // Mock the email transporter
    vi.spyOn(nodemailer, "createTransport").mockReturnValueOnce({
      sendMail: sendMailMock,
    })

    // Create a new submission with valid data.
    const submission = new Submission(validSubmission)
    // Send the email.
    await submission.send()

    // Check if sendMail was called with the correct arguments
    expect(sendMailMock).toHaveBeenCalledTimes(1)
    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "glandix@lloydnet.org", // Replace with your actual sender email
        to: "glandix@lloydnet.org", // Replace with your recipient email
        subject: "New contact form submission",
        text: expect.stringContaining("John Locke"),
        html: expect.stringContaining("John Locke"),
      })
    )
  })

  it("should throw an error if sending the email fails", async () => {
    // Mock rejected value from sendMail.
    const sendMailMock = vi
      .fn()
      .mockRejectedValue(new Error("Email sending failed"))

    vi.spyOn(nodemailer, "createTransport").mockReturnValueOnce({
      sendMail: sendMailMock,
    })

    // Create new submission with valid data.
    const submission = new Submission(validSubmission)

    // Expect error thrown if send() fails.
    await expect(submission.send()).rejects.toThrow("Email sending failed")
  })
})
