import React, { useState, useEffect } from "react";
import "./SaveSite.css";
import Site from "./Site";
import { Input, Button } from "@material-ui/core/";

export default function SaveSite() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [sites, setSites] = useState([]);

  useEffect(() => {
    const json = localStorage.getItem("sites");
    const loadedSites = JSON.parse(json);
    if (loadedSites) {
      setSites(loadedSites);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(sites);
    localStorage.setItem("sites", json);
  }, [sites]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addSite(title, text);
    setTitle("");
    setText("");
  };

  const addSite = (title, text) => {
    const newSite = [...sites, { title, text }];
    setSites(newSite);
  };

  const removeSite = (index) => {
    const newSite = [...sites];
    newSite.splice(index, 1);
    setSites(newSite);
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Site name"
            autoComplete="false"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            style={{ marginTop: "10px" }}
            placeholder="Link"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="form-buttons">
            <Button
              style={{ marginTop: "15px" }}
              className="submit-button"
              type="submit"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </div>
        </form>
        <h3 className="title">Your saved sites:</h3>
      </div>
      <div className="sites">
        {[...sites].map((site, index) => (
          <Site key={index} index={index} site={site} removeSite={removeSite} />
        ))}
      </div>
    </>
  );
}
