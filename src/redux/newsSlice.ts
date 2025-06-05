import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getNoticias } from "src/api/noticias";
import { NoticiasType } from "src/types/noticias";

interface NoticiasStateGeral {
  noticias: NoticiasType[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  page: number
  hasMore: boolean
  totalResults: number
}

interface NoticiaState {
  home: NoticiasStateGeral
  maisNoticiaState: NoticiasStateGeral
}

const initialStateGeral: NoticiasStateGeral = {
  noticias: [],
  status: 'idle',
  error: null,
  page: 1,
  hasMore: true,
  totalResults: 0
}

const initialState: NoticiaState = {
  home: {...initialStateGeral},
  maisNoticiaState: {...initialStateGeral}
}


export const buscarNoticias = createAsyncThunk<
  { noticias: NoticiasType[]; totalResults: number; page: number, target: keyof NoticiaState}, 
  { country?: string; category?: string; q?: string; page?: number; target: keyof NoticiaState}
>(
  'noticias/buscarNoticias',
  async (params, {rejectWithValue}) => {
    try {
      const {articles, totalResults} = await getNoticias(params);
      await AsyncStorage.setItem(`cache_${params.target}`, JSON.stringify(articles))
      return {noticias: articles, totalResults, page: params.page || 1, target: params.target};
    } catch (error) {
      const noticiaCached = await AsyncStorage.getItem(`cache_${params.target}`)
      if (noticiaCached) {
        const noticias = JSON.parse(noticiaCached) as NoticiasType[]
        return {noticias, totalResults: noticias.length, page: 1, target: params.target};
      }
    }
    return rejectWithValue('Nenhuma notícia disponível ou cache de notícia')
  }
);

const noticiasSlice = createSlice({
  name: 'noticias',
  initialState,
  reducers: {
    resetPagina: (state, action: PayloadAction<{target: keyof NoticiaState}>) => {
      const {target} = action.payload
      state[target] = {
        ...initialStateGeral
      }
    },
    resetNoticias: (state, action: PayloadAction<{target: keyof NoticiaState}>) => {
      const {target} = action.payload
      state[target] = {
        ...initialStateGeral
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(buscarNoticias.pending, (state, action) => {
        const target = action.meta.arg.target

        state[target].status = 'loading';
        state[target].error = null;
      })
      .addCase(buscarNoticias.fulfilled, (state, action) => {
        const { noticias, page, target, totalResults } = action.payload;
        const estadoAtual = state[target];
        estadoAtual.status = "succeeded";
        estadoAtual.page = page;
        estadoAtual.totalResults = totalResults;

        const totalNoticias = page > 1 ? estadoAtual.noticias.length + noticias.length : noticias.length

        estadoAtual.hasMore = noticias.length > 0 && totalNoticias < totalResults

        if (page > 1) {
          estadoAtual.noticias = [...estadoAtual.noticias, ...noticias];
        } else {
          estadoAtual.noticias = noticias;
        }
      })
      .addCase(buscarNoticias.rejected, (state, action) => {
        const target = action.meta.arg.target;
        state[target].status = "failed";
        state[target].error = action.error.message ?? "Erro ao buscar notícias";
      });
  }
})

export const {resetPagina, resetNoticias} = noticiasSlice.actions
export default noticiasSlice.reducer