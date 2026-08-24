import { CatalogItem } from "@/types/CatalogItem";
import { apiClient } from "./apiClient";
import { CatalogItemDetailed } from "@/types/CatalogItemDetailed";


const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const catalogService = {
    async getCatalogItems(): Promise<CatalogItem[]> {
        return apiClient.get(`${BASE_URL}`);
    },

    async getItemDetails(slug: string):Promise<CatalogItemDetailed> {
        return apiClient.get(`${BASE_URL}show/${slug}`);
    }
}