export interface NoticiasType {
  title: string
  description?: string
  url: string
  urlToImage?: string;
  publishedAt: string
  source: {name: string}
  content?: string
  page?: string
}

export interface NoticiasApiResponse {
  totalResults: number
  articles: NoticiasType[]
}