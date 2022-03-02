import * as React from "react";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CRUDButtons = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "right",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        variant="text"
        aria-label="text button group"
        className="CRUDButtons_Group"
      >
        <IconButton aria-label="add" className="CRUDButtons_add">
          <AddCircleIcon sx={{ color: "var(--text-primary)" }} />
        </IconButton>
        <IconButton aria-label="edit" className="CRUDButtons_edit">
          <EditIcon sx={{ color: "var(--text-primary)" }} />
        </IconButton>
        <IconButton aria-label="delete" className="CRUDButtons_delete">
          <DeleteIcon sx={{ color: "var(--text-primary)" }} />
        </IconButton>
      </ButtonGroup>
    </Box>
  );
};
export default CRUDButtons;
