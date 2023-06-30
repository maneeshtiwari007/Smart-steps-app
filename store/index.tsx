import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './RootReducer'

//const debounceNotify = debounce((notify:any) => notify())

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production'
})