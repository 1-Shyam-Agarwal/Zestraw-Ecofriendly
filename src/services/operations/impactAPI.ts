import { apiConnector } from "../apiConnector";
import { impactEndpoints } from "../apis";

export interface ImpactStats {
    totalCo2EmissionsSaved: number;
    totalParaliUsed: number;
    plasticPlatesReplaced: number;
}

export async function getImpactStats(): Promise<ImpactStats> {
    const response = await apiConnector(
        "GET",
        impactEndpoints.GET_IMPACT_STATS_API,
    );

    if (!response?.data?.success) {
        throw new Error(
            response?.data?.error || "Could not fetch impact statistics",
        );
    }

    return response.data.data;
}
