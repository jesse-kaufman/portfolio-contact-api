/** @file Unit tests for Submission class. */
import { describe, it, expect } from "vitest"
import { Submission } from "@/models/Submission.js"

describe("Submission validation", () => {
  // Test successful call to validate().
  it("should initialize the instance properly if all required fields are provided and valid", () => {
    const data = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      message: "This is a message.",
    }
    let submission = null

    expect(() => (submission = new Submission(data))).not.toThrow()
    expect(submission.getData()).toEqual(data)
    expect(submission.toJSON()).toEqual(data)
  })

  it("should throw an error if required fields are missing", () => {
    expect(
      () =>
        new Submission({
          name: "",
          email: "",
          phone: "1234567890",
          message: "",
        })
    ).toThrow("Name, email, and message are required fields.")
  })
})
