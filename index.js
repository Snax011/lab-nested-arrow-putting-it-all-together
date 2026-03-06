function createLoginTracker(userInfo) {
  // Validate the user object once when creating a tracker.
  const hasValidUserInfo =
    userInfo &&
    typeof userInfo === 'object' &&
    typeof userInfo.username === 'string' &&
    typeof userInfo.password === 'string';

  // This variable is enclosed by the returned function (closure).
  // It cannot be modified directly from outside createLoginTracker.
  let attemptCount = 0;

  // Inner arrow function: handles each login attempt.
  const loginAttempt = (passwordAttempt) => {
    // Account is already locked if more than 3 calls have happened.
    if (attemptCount >= 3) {
      console.log('Login blocked: account already locked.');
      return 'Account locked due to too many failed login attempts';
    }

    // Count every login attempt.
    attemptCount += 1;

    // Helpful debugging output while developing/testing.
    console.log(`Attempt ${attemptCount} received.`);

    // Graceful handling for invalid setup or attempt input.
    if (!hasValidUserInfo || typeof passwordAttempt !== 'string') {
      return `Attempt ${attemptCount}: Login failed`;
    }

    // If password matches within 3 attempts, allow login.
    if (passwordAttempt === userInfo.password) {
      return 'Login successful';
    }

    // If password doesn't match within the limit, return failed message.
    return `Attempt ${attemptCount}: Login failed`;
  };

  return loginAttempt;
}

module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};