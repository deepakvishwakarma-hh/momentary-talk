import theme from '../theme'
import store from "../store/app"
import { AppProps } from 'next/app'
import { Provider } from "react-redux";
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <style>
        @import url("https://fonts.googleapis.com/css2?family=Questrial&display=swap")
      </style> */}



      <Provider store={store}>
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </>

  )
}

export default MyApp
