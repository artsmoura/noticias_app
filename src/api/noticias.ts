import { EXPO_PUBLIC_API_KEY } from '@env';
import axios from "axios";
import { NoticiasType } from 'src/types/noticias';


export const getNoticias = async (params: { country?: string; category?: string; q?: string; page?: number }): Promise<NoticiasType[]> => {
  const baseURL = params.q ? 'https://newsapi.org/v2/everything' : 'https://newsapi.org/v2/top-headlines';
  const response = await axios.get(baseURL, {
    params: {
      apiKey: EXPO_PUBLIC_API_KEY,
      pageSize: 10,
      page: params.page || 1,
      ...params
    }
  })
  return response.data.articles as NoticiasType[]
}