export const API_URL = "https://api.freeapi.app/api/v1/"

// AUTH
  const auth = "users"
  export  const REGISTER = `${auth}/register`
 export const SIGNIN = `${auth}/login`
 export  const FGP = `${auth}/forgot-password`
 export const  RESET_PWD = `${auth}/reset-password/{resetToken}`
 export const VERIFY_EMAIL = `${auth}/verify-email/{verificationToken}`
 export const  RESEND_VERIFICATION = `${auth}/resend-verification`
 export const LOGOUT = `${auth}/logout`
 export const REFRESH_TOKEN = `${auth}/refresh-token`

 //PUBLIC
const  Api = "public"
 export const GET_COURSES = `${Api}/randomproducts`
 export const USERS = `${Api}/randomusers`
