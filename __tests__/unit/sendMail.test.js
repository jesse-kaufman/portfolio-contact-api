/** @file Send mail unit tests. */
import { describe, it, expect, vi } from "vitest"
import nodemailer from "nodemailer"
import { validSubmission } from "../constants.js"
import { sendMail } from "@/services/sendMail.js"

// Mock nodemailer module
vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn().mockReturnValue({
      sendMail: vi.fn().mockResolvedValue("Email sent"),
    }),
  },
}))

describe("sendMail", () => {
  const mockTransport = nodemailer.createTransport()
  const { name, email, phone, message } = validSubmission

  it("should send an email with correct parameters", async () => {
    await sendMail(mockTransport, validSubmission)

    expect(mockTransport.sendMail).toHaveBeenCalledOnce()
    expect(mockTransport.sendMail).toHaveBeenCalledWith({
      from: "glandix@lloydnet.org",
      subject: "New contact form submission",
      to: "glandix@lloydnet.org",
      text: `Message from ${name} (${email}):\n\nPhone: ${phone}\n\n${message}`,
      html: `<p>Message from ${name} (${email}):</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Message:</strong><br/>${message}</p>`,
      replyTo: email,
    })
  })

  it("should handle errors when sending fails", async () => {
    mockTransport.sendMail.mockRejectedValue(
      new Error("SMTP connection failed")
    )

    await expect(sendMail(mockTransport, validSubmission)).rejects.toThrow(
      "SMTP connection failed"
    )
  })
})
