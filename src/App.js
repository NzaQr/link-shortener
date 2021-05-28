import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./App.css";
import Shortener from "./components/Shortener";
import SaveSite from "./components/SaveSite";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1e3d59",
    },
    secondary: {
      main: "#1e3d59",
    },
  },
});

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <div className="content-container">
          <h1 className="title">Link Shortener</h1>
          <Shortener />
          <h3 className="title">Save your sites</h3>

          <SaveSite />
        </div>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
