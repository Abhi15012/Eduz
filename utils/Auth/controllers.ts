import postRequest from "@/config/requests";
import { LoginInput, RegisterInput } from "./types";
import { API_URL, FGP, REGISTER, SIGNIN } from "@/config/endpoints";




export async function useSignin({
    username,
    password
}: LoginInput) {

     try {
        const res = await postRequest({
            url: `${API_URL}${SIGNIN}`,
            body: {
                username,
                password
            }
        });
       
        return res;
     } catch (error) {
        console.error('Error signing in:', error);
        throw error;
     }
  
}

export async function useRegister({
    username,
    password,
    email,
    role
}: RegisterInput) {

     try {
        const res = await postRequest({
            url: `${API_URL}${REGISTER}`,
            body: {
                username,
                password,
                email,
                role
            }
        });
       
        return res;
     } catch (error) {
        console.error('Error signing up:', error);
        throw error;
     }
  
}

export async function useForgotPassword({
    email
}: {
    email: string;
}) {

     try {
        const res = await postRequest({
            url: `${API_URL}${FGP}`,
            body: {
                email
            }
        });
       
        return res;
     } catch (error) {
        console.error('Error in forgot password:', error);
        throw error;
     }
  
}

