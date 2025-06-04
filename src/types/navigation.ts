import { NoticiasType } from "./noticias"

export type RootStackParamList = {
  Home: undefined,
  Favoritos: undefined
  Detalhes: {
    noticia: NoticiasType
  }
  Resultados: { q: string };
  MaisNoticias: {categoria?: string}
}