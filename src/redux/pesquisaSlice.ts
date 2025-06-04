import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getNoticias } from "src/api/noticias";
import { NoticiasType } from "src/types/noticias";

interface PesquisaState {
  noticias: NoticiasType[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pesquisaTermo: string
}

const initialState: PesquisaState = {
  noticias: [],
  status: 'idle',
  error: null,
  pesquisaTermo: '',
}

export const pesquisaNoticias = createAsyncThunk<NoticiasType[], { q?: string }>(
  'pesquisa/getResultados',
  async (params) => {
    const noticias = await getNoticias(params);
    return noticias;
  }
);

const pesquisaSlice = createSlice({
  name: 'pesquisa',
  initialState,
  reducers: {
    setPesquisa: (state, action) => {
      state.pesquisaTermo = action.payload
    }
  },
  extraReducers(builder) {
      builder
        .addCase(pesquisaNoticias.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(pesquisaNoticias.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.noticias = action.payload;
        })
        .addCase(pesquisaNoticias.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message ?? 'Erro ao buscar notícias';
        });
    },
})

export const {setPesquisa} = pesquisaSlice.actions
export default pesquisaSlice.reducer