import { API_URL, GET_COURSES, USERS } from "@/config/endpoints";
import { getRequest } from "@/config/requests";

export const GET_PRODUCTS = async () => {
    return await getRequest(`${API_URL}${GET_COURSES}`);
}
export const GET_USERS = async () => {
    return await getRequest(`${API_URL}${USERS}`);
}