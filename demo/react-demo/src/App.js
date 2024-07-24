import  {ColorModeScript, extendTheme } from "@chakra-ui/react";
import {ChakraProvider} from "@chakra-ui/provider";
import ProjectPage from "./ProjectPage";

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

const App = () => (
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ProjectPage />
  </ChakraProvider>
);

export default App;
