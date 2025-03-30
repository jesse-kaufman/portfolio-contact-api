/** @file Tests for checkEnv module. */
/* eslint-disable max-lines-per-function */
import { beforeEach, describe, expect, it, vi } from "vitest"
import { checkEnv } from "@/services/checkEnv.js" // Adjust the import path accordingly

// Mock color function to pass as an argument
const mockColorFn = (msg) => msg

describe("checkEnv", () => {
  beforeEach(() => {
    // Reset the environment variables before each test to avoid side effects
    process.env = {} // Clear out the env variables
  })

  it("should not log an error and not exit if all required environment variables are set", () => {
    // Set environment variables
    process.env.SMTP_SERVER = "smtp.example.com"
    process.env.SMTP_PORT = "587"

    // Spy on console.error to ensure no error is logged
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {})

    // Run the checkEnv function
    checkEnv(mockColorFn)

    // Assert that console.error was not called
    expect(consoleErrorSpy).not.toHaveBeenCalled()

    // Clean up the spy
    consoleErrorSpy.mockRestore()
  })

  it("should log an error and exit if SMTP_SERVER is missing", () => {
    // Only set SMTP_PORT
    process.env.SMTP_PORT = "587"

    // Spy on console.error to ensure the error message is logged
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {})

    // Mock process.exit to prevent actual exit during the test
    const processExitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation(() => {})

    // Run the checkEnv function
    checkEnv(mockColorFn)

    // Check that console.error was called with the correct message
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "The SMTP_SERVER environment variable must be set."
    )

    // Ensure process.exit(1) was called to indicate failure
    expect(processExitSpy).toHaveBeenCalledWith(1)

    // Clean up spies
    consoleErrorSpy.mockRestore()
    processExitSpy.mockRestore()
  })

  it("should log an error and exit if SMTP_PORT is missing", () => {
    // Only set SMTP_SERVER
    process.env.SMTP_SERVER = "smtp.example.com"

    // Spy on console.error to ensure the error message is logged
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {})

    // Mock process.exit to prevent actual exit during the test
    const processExitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation(() => {})

    // Run the checkEnv function
    checkEnv(mockColorFn)

    // Check that console.error was called with the correct message
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "The SMTP_PORT environment variable must be set."
    )

    // Ensure process.exit(1) was called to indicate failure
    expect(processExitSpy).toHaveBeenCalledWith(1)

    // Clean up spies
    consoleErrorSpy.mockRestore()
    processExitSpy.mockRestore()
  })
})
