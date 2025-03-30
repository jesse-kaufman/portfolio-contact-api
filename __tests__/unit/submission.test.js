/** @file Unit tests for Submission class. */
import { describe, it, expect } from "vitest"
import { validSubmission } from "../constants.js"
import { Submission } from "@/models/Submission.js"

describe("Submission validation", () => {
  // Test successful call to validate().
  it("should initialize the instance properly if all required fields are provided and valid", () => {
    let submission = null

    expect(() => (submission = new Submission(validSubmission))).not.toThrow()

    // Check that both toJSON() and getData() return the same object.
    expect(submission.getData()).toEqual(validSubmission)
    expect(submission.toJSON()).toEqual(validSubmission)
  })

  it("should throw an error if required fields are missing or invalid", () => {
    expect(() => new Submission({ ...validSubmission, name: "" })).toThrow()
    expect(() => new Submission({ ...validSubmission, phone: true })).toThrow()
  })
})
