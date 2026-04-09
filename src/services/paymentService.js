
import apiClient from "./apiClient";

export const createOrder = async (bundleId) => {
    const res = await apiClient.post("/payment/create-order", {
        bundleId,
    });
    return res.data;
}