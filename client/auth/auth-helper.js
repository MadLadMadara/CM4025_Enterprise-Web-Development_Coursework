/**
 * @fileoverview Handels session storage with the 'jwt' token
 * @exports auth
 * @author Sam McRuvie
 */
// ----Project imports
import { signout } from './api-auth.js'

/**
 * @name auth
 * @type {JSON}
 * @description Handels interactions with session storage
 */
const auth = {
  /**
   * @name isAuthenticated
   * @description checks if user is athenticated
   * @returns {JSON or Boolean} user session data or fales
   */
  isAuthenticated () {
    if (typeof window === 'undefined') { return false }

    if (sessionStorage.getItem('jwt')) { return JSON.parse(sessionStorage.getItem('jwt')) } else { return false }
  },
  /**
   * @name authenticate
   * @description stores 'jwt' session token in session storage
   * @param {JSON} jwt user data to be stored as 'jwt' session token
   * @param {Function} cb callback, to be executed after 'jwt' storage attempt
   */
  authenticate (jwt, cb) {
    if (typeof window !== 'undefined') { sessionStorage.setItem('jwt', JSON.stringify(jwt)) }
    cb()
  },
  /**
   * @name clearJWT
   * @description cleares 'jwt' session token
   * @param {Function} cb callback, executed after 'jwt' removel attempt
   */
  clearJWT (cb) {
    if (typeof window !== 'undefined') { sessionStorage.removeItem('jwt') }
    cb()
    // optional
    signout().then((data) => {
      document.cookie = 't=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    })
  },
  /**
   * @name isAdmin
   * @description checks 'jwt' session token if admin has has been set to true
   * @returns {JSON or Boolean} User session data or fales
   */
  isAdmin () {
    const auth = this.isAuthenticated()
    if (auth === false) {
      return false
    } else {
      if (auth.user.admin) { return auth } else { return false }
    }
  }
}

export default auth
