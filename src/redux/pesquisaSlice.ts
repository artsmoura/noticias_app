import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getNoticias } from "src/api/noticias";
import { NoticiasType } from "src/types/noticias";

interface PesquisaState {
  noticias: NoticiasType[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  pesquisaTermo: string
  page: number
  hasMore: boolean
  totalResults: number
}

const initialState: PesquisaState = {
  noticias: [],
  status: 'idle',
  error: null,
  pesquisaTermo: '',
  page: 1,
  hasMore: true,
  totalResults: 0
}

export const pesquisaNoticias = createAsyncThunk(
  'pesquisa/getResultados',
  async ({q, page= 1}: {q: string, page?: number}) => {
    const {articles, totalResults} = await getNoticias({q, page});
    return {noticias: articles, totalResults, page};
  }
);

const pesquisaSlice = createSlice({
  name: 'pesquisa',
  initialState,
  reducers: {
    setPesquisa: (state, action) => {
      state.pesquisaTermo = action.payload
    },
    resetPesquisa: (state) => {
      state.noticias = []
      state.status = 'idle'
      state.error = null
      state.page = 1
      state.hasMore = true
      state.totalResults = 0
    }
  },
  extraReducers(builder) {
      builder
        .addCase(pesquisaNoticias.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(pesquisaNoticias.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.page = action.payload.page
          state.totalResults = action.payload.totalResults

          const totalNoticias = action.payload.page > 1 ? state.noticias.length + action.payload.noticias.length : action.payload.noticias.length

          state.hasMore = totalNoticias < action.payload.totalResults
          if (action.payload.page > 1) {
            state.noticias = [...state.noticias, ...action.payload.noticias]
          } else {
            state.noticias = action.payload.noticias
          }
        })
        .addCase(pesquisaNoticias.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message ?? 'Erro ao buscar notícias';
        });
    },
})

export const {setPesquisa, resetPesquisa} = pesquisaSlice.actions
export default pesquisaSlice.reducer