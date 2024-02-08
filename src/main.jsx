import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/routes.jsx'
const style = {
  global: (props) => ({
    body: {
      bg: mode("gray.100", "#000")(props),
      color: mode("gray.800", "whiteAlpha.900")(props),
    }
  })
}
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ config, style })
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode >
    <ChakraProvider theme={theme}>
      <RouterProvider router={routes}></RouterProvider>
    </ChakraProvider>

  </React.StrictMode>,
)
