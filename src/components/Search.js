import React, { useState } from "react";
import { TextField, Button, LinearProgress } from "@material-ui/core";
import shrtcode from "../api/shrtcode";
import "./Search.css";

const HTTP_URL_VALIDATOR_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

const Search = () => {
  const [link, setLink] = useState("");
  const [short, setShort] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateURL = (string) => {
    return string.match(HTTP_URL_VALIDATOR_REGEX);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateURL(link)) {
      getLink();
      setLink("");
      setIsLoading(!isLoading);
    } else {
      setShort("Please input a valid URL");
    }
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
