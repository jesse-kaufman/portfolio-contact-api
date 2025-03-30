/** @file Controller for /submit endpoint. */
import { Submission } from "@/models/Submission.js"

/**
 * Controller function to handle form submissions.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export const submitController = async (req, res, next) => {
  try {
    const submission = new Submission(req.body)
    await submission.send()
    // eslint-disable-next-line no-magic-numbers
    res.status(200).json({ message: "Submission successful" })
  } catch (error) {
    next(error)
  }
}
