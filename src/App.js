import { Grid } from "@material-ui/core";
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
    <MuiThemeProvider theme={theme}>
      <Grid
        className="App"
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <div className="content-container">
          <h1 className="title">Link Shortener</h1>
          <Shortener />
          <h3 className="title">Save your sites</h3>

          <SaveSite />
        </div>
      </Grid>
    </MuiThemeProvider>
  );
}

export default App;
