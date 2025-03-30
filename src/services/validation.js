/** @file Submission validation module. */

/**
 * Validates name input field.
 * @param {string} name - Input to be validated.
 * @throws {Error} If validation fails.
 */
export const validateName = (name) => {
  // Check that name is between 2 and 254 characters.
  // eslint-disable-next-line no-magic-numbers
  if (name.length < 2 || name.length >= 255) {
    throw Error("Name must be between 2 and 254 characters long.")
  }

  if (!name.match(/^[a-z.\- ]/i)) {
    throw Error("Name contains an invalid character.")
  }
}

/**
 * Validates email input field.
 * @param {string} email - Input to be validated.
 * @throws {Error} If validation fails.
 */
export const validateEmail = (email) => {
  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)) {
    throw Error("Invalid email address.")
  }
}

/**
 * Validates phone input field.
 * @param {string} phone - Input to be validated.
 * @throws {Error} If validation fails.
 */
export const validatePhone = (phone) => {
  if (!phone.match(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i)) {
    throw Error("Invalid phone number.")
  }
}

/**
 * Validates message input field.
 * @param {string} msg - Input to be validated.
 * @throws {Error} If validation fails.
 */
export const validateMessage = (msg) => {
  // Check that message is at least 10 characters.
  // eslint-disable-next-line no-magic-numbers
  if (msg.length < 10) {
    throw Error("Message must be at least 10 characters long.")
  }
}
