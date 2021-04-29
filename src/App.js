import { Grid } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./App.css";
import Search from "./components/Search";

const theme1 = createMuiTheme({
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
    <MuiThemeProvider theme={theme1}>
      <Grid
        className="App"
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <div className="content-container">
          <h1 className="title">Link Shortener</h1>
          <Search />
        </div>
      </Grid>
    </MuiThemeProvider>
  );
}

export default App;
