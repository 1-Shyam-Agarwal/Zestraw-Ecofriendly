import { toast } from "sonner";
import { apiConnector } from "../apiConnector";
import { marketplaceEndpoints } from "../apis";
import {
  marketplaceListingsFallback,
  type MarketplaceListing,
} from "@/data/marketplaceListings";

const { GET_LISTINGS_API, SUBMIT_FARMER_DETAILS_API } = marketplaceEndpoints;

export async function getMarketplaceListings(): Promise<MarketplaceListing[]> {
  try {
    const response = await apiConnector("GET", GET_LISTINGS_API);

    if (!response.data.success) {
      throw new Error(response.data.error || "Could not fetch marketplace listings");
    }

    return response.data.data;
  } catch (error) {
    console.error("GET_LISTINGS_API ERROR...", error);
    return marketplaceListingsFallback;
  }
}

export interface FarmerSubmissionInput {
  farmerName: string;
  contactNumber: string;
  quantityTons: number;
  location: string;
}

export async function submitFarmerDetails(data: FarmerSubmissionInput) {
  const toastId = toast.loading("Submitting your details...");

  try {
    const response = await apiConnector("POST", SUBMIT_FARMER_DETAILS_API, data);

    if (!response.data.success) {
      throw new Error(response.data.error || "Submission failed");
    }

    toast.success("Details submitted successfully!", {
      id: toastId,
      description:
        response.data.message ||
        "Our procurement team will contact you shortly.",
      duration: 5000,
    });

    return response.data.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || error.message || "Failed to submit details";

    toast.error("Submission failed", {
      id: toastId,
      description: errorMessage,
      duration: 4000,
    });

    return null;
  }
}
