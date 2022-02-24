/* eslint-disable react/no-unescaped-entities */
import theme from '../theme'
import store from "../store/app"
import { AppProps } from 'next/app'
import { Provider } from "react-redux";
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style>
        @import url("https://fonts.googleapis.com/css2?family=Questrial&display=swap");
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');
      </style>
      <Provider store={store}>
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </>

  )
}

export default MyApp
