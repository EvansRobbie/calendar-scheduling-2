/**
 * List of routes that accessible to the public
 * These routes do not require authentivation
 * @type {string[]}
 */
export const publicRoutes: (string | RegExp)[] = ['/'];

/**
 * List of routes that are used for authentication
 * These will require a callback url if user is not authenticated
 * @type {string[]}
 */

export const authRoutes = ['/login', ''];

/**
 * The prefix for API authentication routes
 * Routes wuith this prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = '/api/auth';