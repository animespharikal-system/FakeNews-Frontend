import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface PredictResponse {
  prediction: string;
  confidence: number;
}

export const predictNews = async (text: string): Promise<PredictResponse> => {
  const response = await apiClient.post<PredictResponse>('/predict', { text });
  return response.data;
};

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return `API request failed with status ${error.response.status}. Please check the submitted content and try again.`;
    }

    if (error.request) {
      return 'Unable to reach the FastAPI backend at http://127.0.0.1:8000. Please make sure it is running.';
    }
  }

  return 'Something went wrong while analyzing this content. Please try again.';
};
