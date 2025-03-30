/** @file Submission controller unit tests. */
/* eslint-disable no-magic-numbers */
import { describe, it, expect, vi } from "vitest"
import { validSubmission } from "../constants.js"
import { submitController } from "@/controllers/submitController.js"
import { Submission } from "@/models/Submission.js"

describe("submitController", () => {
  it("should call .send() on the Submission instance", async () => {
    const sendMock = vi.fn().mockResolvedValueOnce() // Mocking send() method
    vi.spyOn(Submission.prototype, "send").mockImplementation(sendMock) // Mock .send()

    const req = {
      body: { ...validSubmission },
    }
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() }
    const next = vi.fn()

    await submitController(req, res, next)

    expect(Submission.prototype.send).toHaveBeenCalledTimes(1)
    expect(Submission.prototype.send).toHaveBeenCalledWith()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: "Submission successful" })
  })

  it("should handle errors when .send() fails", async () => {
    const sendMock = vi.fn().mockRejectedValueOnce(new Error("Sending failed"))
    vi.spyOn(Submission.prototype, "send").mockImplementation(sendMock)

    const req = {
      body: { ...validSubmission },
    }
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() }
    const next = vi.fn()

    await submitController(req, res, next)

    expect(next).toHaveBeenCalledWith(new Error("Sending failed"))
  })
})
