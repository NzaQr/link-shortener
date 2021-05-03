import { MdDelete } from "react-icons/md";
import { TextField } from "@material-ui/core/";

import "./Site.css";

export default function Site({ site, index, removeSite }) {
  return (
    <>
      <div className="site-container">
        <TextField
          style={{ marginRight: "15px" }}
          size="small"
          variant="outlined"
          className="site-title"
          value={site.title}
        ></TextField>
        <TextField
          size="small"
          variant="outlined"
          className="site-text"
          value={site.text}
        ></TextField>
        <MdDelete className="site-delete" onClick={() => removeSite(index)} />
      </div>
    </>
  );
}
