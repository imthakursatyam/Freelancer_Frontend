'use client'

import { ChakraProvider, extendTheme} from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'light', // or 'dark', depending on your preference
    useSystemColorMode: false, // Use system default color mode if true
  },
});
export function Provider(props) {
  return (
    <ChakraProvider theme={theme} {...props}>
      
    </ChakraProvider>
  )
}
