import React, { useState, useRef } from "react";
import { TextField, Button, LinearProgress } from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import shrtcode from "../api/shrtcode";
import "./Search.css";

const HTTP_URL_VALIDATOR_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

const Search = () => {
  const [link, setLink] = useState("");
  const [short, setShort] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const inputRef = useRef(null);

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
      setShort("Not a valid URL");
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

  function copyToClipboard(e) {
    inputRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopySuccess("Copied!");
  }

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
        <TextField
          color="secondary"
          style={{ marginBottom: "20px" }}
          label="Enter the link here"
          variant="outlined"
          value={link}
          onChange={(event) => setLink(event.target.value)}
        />
        {!isLoading && (
          <Button
            style={{ marginBottom: "20px" }}
            size="large"
            onClick={(event) => handleSubmit(event)}
            variant="contained"
            color="primary"
          >
            Generate
          </Button>
        )}
        {isLoading && <LinearProgress />}
      </form>
      <div>
        {short && (
          <div className="new-link-container">
            <input className="new-link" value={short} ref={inputRef}></input>
            <div className="copy-container">
              <FileCopyIcon
                style={{
                  position: "relative",
                  left: "15px",
                  top: "5px",
                  cursor: "pointer",
                }}
                onClick={copyToClipboard}
              />
              <div className="copied">{copySuccess}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
