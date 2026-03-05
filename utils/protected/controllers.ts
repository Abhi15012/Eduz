import { API_URL, GET_COURSES, USERS } from "@/config/endpoints";
import { getRequest } from "@/config/requests";
import {  setTutors } from "@/config/store.functions";

export const GET_PRODUCTS = async () => {
const res = await getRequest(`${API_URL}${GET_COURSES}`);

return res;

}
export const GET_USERS = async () => {
    const res = await getRequest(`${API_URL}${USERS}`);
    setTutors(res.data);
    return res;
}