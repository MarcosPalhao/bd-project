import Button from "@mui/material/Button";
import { styled } from "@stitches/react";

export const ButtonConfirm = styled(Button, {
  padding: "0.3rem 0.8rem",
  fontWeight: "bold",
  color: "$green",
  backgroundColor: "transparent",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.675rem",
});

export const ButtonCancel = styled(Button, {
  padding: "0.3rem 0.8rem",
  fontWeight: "bold",
  color: "$red",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.675rem",
});
export const Delete = styled("button", {
  background: "transparent",
  border: "0",
  display: "flex",
  alignItems: "center",
  gap: "0.2rem",
  cursor: "pointer",
  color: "#f75a68",
});
