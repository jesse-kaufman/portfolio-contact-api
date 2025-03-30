/* eslint-disable max-lines-per-function */
/** @file Submission validation tests. */
import { describe, expect, it } from "vitest"
import {
  validateEmail,
  validateName,
  validateMessage,
  validatePhone,
} from "@/services/validation.js"

describe("property validation", () => {
  describe("email", () => {
    // Test email property validation.
    it("validates proper email", () => {
      expect(() => validateEmail("john.locke@example.com")).not.toThrow()
    })

    it("throws an error for invalid email", () => {
      expect(() => validateEmail("john locke@example")).toThrow()
      expect(() => validateEmail("Sayid")).toThrow()
    })
  })

  // Test name property validation.
  describe("name", () => {
    it("validates proper name", () => {
      // Test if first name only was provided.
      expect(() => validateName("Jack")).not.toThrow()
      // Test if full name was provided.
      expect(() => validateName("Jack Sawyer")).not.toThrow()
      // Test if extra-long full name was provided.
      expect(() => validateName("Jack L. Sawyer III")).not.toThrow()
    })

    it("throws an error for invalid name", () => {
      // Test too-short name.
      expect(() => validateName("a")).toThrow()
      // Test too-long name.
      // eslint-disable-next-line no-magic-numbers
      expect(() => validateName("a".repeat(255))).toThrow()
      // Test name with invalid characters.
      expect(() => validateName("#$%@#$^@#^")).toThrow()
    })
  })

  // Test phone property validation.
  describe("phone", () => {
    it("validates proper phone", () => {
      // Test multiple valid phone number formats.
      expect(() => validatePhone("3213213214")).not.toThrow()
      expect(() => validatePhone("(321) 321-3214")).not.toThrow()
      expect(() => validatePhone("321-321-3214")).not.toThrow()
    })

    it("throws an error for invalid phone", () => {
      // Test invalid phone number.
      expect(() => validatePhone("481516")).toThrow()
    })
  })

  // Test message property validation.
  describe("property validation", () => {
    it("validates proper message", () => {
      // Test validating valid message.
      expect(() => validateMessage("This is a message.")).not.toThrow()
    })

    it("throws an error for invalid message", () => {
      expect(() => validateMessage("Hey.")).toThrow()
    })
  })
})
