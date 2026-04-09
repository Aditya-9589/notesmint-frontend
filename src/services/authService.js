
import apiClient from "./apiClient";

export const loginAPI = (data) => {
    return apiClient.post("/auth/login", data);
};

export const registerAPI = (data) => {
    return apiClient.post("/auth/register", data);
}