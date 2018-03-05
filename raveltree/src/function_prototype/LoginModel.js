/* CREATE USER/LOGIN FUNCTIONS */

/**
 * @param: registered user's email address 
 * @returns: nothing
 * actions: fires an email that will enable a user to reset their password
 * 
 */
export const userResetPassword = (email) => {

}

/**
 * @param: registered user's email and password
 * @returns: nothing
 * actions: attempts to log a registered user into the db. 
 * 
 */
export const signInWithEmail = (email, password) => {

}

/**
 * @param: an email and password
 * @returns: nothing
 * actions: attempts to create a new user and sets their user profile to null 
 * 
 */
export const createUserWithEmail = (email, password) => {

}

/**
 * @param: nothing
 * @returns: nothing
 * actions: logs the current user off 
 * 
 */
export const userLogOff = () => { 

}
