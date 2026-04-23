import apiClient from "./apiClient";

export const getMyPurchases = () => {
    return apiClient.get("/user/my-purchases");
};