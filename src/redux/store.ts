import { configureStore } from "@reduxjs/toolkit";
import noticiasReducer from './newsSlice'
import pesquisaReducer from './pesquisaSlice'

export const store = configureStore({
  reducer: {
    noticias: noticiasReducer,
    pesquisa: pesquisaReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch