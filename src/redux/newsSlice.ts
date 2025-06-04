import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getNoticias } from "src/api/noticias";
import { NoticiasType } from "src/types/noticias";

interface NoticiasStateGeral {
  noticias: NoticiasType[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  page: number
  hasMore: boolean
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
  hasMore: true
}

const initialState: NoticiaState = {
  home: {...initialStateGeral},
  maisNoticiaState: {...initialStateGeral}
}


export const buscarNoticias = createAsyncThunk<
  { noticias: NoticiasType[]; page: number, target: keyof NoticiaState}, 
  { country?: string; category?: string; q?: string; page?: number; target: keyof NoticiaState}
>(
  'noticias/buscarNoticias',
  async (params) => {
    const noticias = await getNoticias(params);
    return {noticias, page: params.page || 1, target: params.target};
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
        const { noticias, page, target } = action.payload;
        const estadoAtual = state[target];
        estadoAtual.status = "succeeded";
        estadoAtual.page = page;
        estadoAtual.hasMore = noticias.length > 0;

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