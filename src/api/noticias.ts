import { EXPO_PUBLIC_API_KEY } from '@env';
import axios from "axios";
import { NoticiasApiResponse } from 'src/types/noticias';


export const getNoticias = async (params: { country?: string; category?: string; q?: string; page?: number }): Promise<NoticiasApiResponse> => {
  const isSearch = !!params.q;
  const baseURL = isSearch ? 'https://newsapi.org/v2/everything' : 'https://newsapi.org/v2/top-headlines';

  const queryParams: any = {
    apiKey: EXPO_PUBLIC_API_KEY,
    pageSize: 10,
    page: params.page || 1
  };

  if (isSearch) {
    queryParams.q = params.q;
  } else {
    queryParams.country = params.country || 'us';
    if (params.category) {
      queryParams.category = params.category;
    }
  }

  try {
    const response = await axios.get(baseURL, { params: queryParams });
    console.log('Resposta da API:', response.data);

    return {
      totalResults: response.data.totalResults,
      articles: response.data.articles
    }
  } catch (error: any) {
    console.error("Erro na requisição:", error?.response?.data || error.message || error);
    throw error;
  }
}