import React, { useState } from "react";
import { TextField, Button, LinearProgress } from "@material-ui/core";
import shrtcode from "../api/shrtcode";
import "./Search.css";

const Search = () => {
  const [link, setLink] = useState("");
  const [short, setShort] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    getLink();
    setLink("");
    setIsLoading(!isLoading);
  };

  const getLink = async () => {
    await shrtcode
      .get(`shorten?url=${link}`)
      .then((response) => {
        setShort(response.data.result.short_link);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
        <TextField
          style={{ marginBottom: "20px" }}
          className="textField"
          label="Input Your Link"
          variant="outlined"
          value={link}
          onChange={(event) => setLink(event.target.value)}
        />
        {!isLoading && (
          <Button
            style={{ marginBottom: "20px" }}
            className="button"
            onClick={(event) => handleSubmit(event)}
            variant="contained"
            color="primary"
          >
            Generate
          </Button>
        )}
        {isLoading && <LinearProgress />}
      </form>
      {short && <div>Your short link: {short}</div>}
    </>
  );
};

export default Search;
