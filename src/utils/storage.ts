import AsyncStorage from "@react-native-async-storage/async-storage"
import { NoticiasType } from "src/types/noticias"

const FAVORITOS_KEY = 'favoritos'

export const getFavoritos = async (): Promise<NoticiasType[]> => {
  try {
    const data = await AsyncStorage.getItem(FAVORITOS_KEY);
    return data ? (JSON.parse(data) as NoticiasType[]) : [];
  } catch (error) {
    return []
  }
}

export const addFavorito = async (noticia: NoticiasType): Promise<void> => {
  const favoritos = await getFavoritos()

  const jaFavorito = favoritos.some(item => {
    return item.url === noticia.url
  })
  if (!jaFavorito) {
    const novosFavoritos = [...favoritos, noticia]
    await AsyncStorage.setItem(FAVORITOS_KEY, JSON.stringify(novosFavoritos))
  } 
};

export const isFavorito = async (noticia: NoticiasType): Promise<boolean> => {
  const favoritos = await getFavoritos()
  return favoritos.some(item => item.url === noticia.url)
}

export const removeFavorito = async (noticia: NoticiasType): Promise<void> => {
  const favoritos = await getFavoritos()
  const atualizados = favoritos.filter(item => item.url !== noticia.url)
  await AsyncStorage.setItem(FAVORITOS_KEY, JSON.stringify(atualizados))
}