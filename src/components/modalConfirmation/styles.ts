import Button from "@mui/material/Button";
import { styled } from "@stitches/react";

export const ButtonConfirm = styled(Button, {
  padding: "0.3rem 0.8rem",
  fontWeight: "bold",
  color: "$green",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.675rem",
  backgroundColor: "#00b37e!important",
});

export const ButtonCancel = styled(Button, {
  padding: "0.3rem 0.8rem",
  fontWeight: "bold",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.675rem",
  color: "white !important",
});
export const Delete = styled("button", {
  background: "transparent",
  border: "0",
  display: "flex",
  alignItems: "center",
  gap: "0.2rem",
  cursor: "pointer",
  color: "#c4424e",
  transition: "all 0.1s ease 0s",
});
