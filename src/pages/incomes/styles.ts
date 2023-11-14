import { styled } from "../../styles";

export const Container = styled("div", {
  height: "100vh",
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "1.5rem 0",
});

export const Header = styled("header", {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

export const ButtonContainer = styled("div", {
  display: "flex",
  justifyContent: "flex-start",
  flex: "1",
});

export const ButtonBack = styled("button", {
  span: {
    fontSize: "1rem",
    "&:hover": {
      color: "#00a272",
    },
  },

  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
  border: "0",
  background: "none",
  color: "#fff",
  fontSize: "1.4rem",
  cursor: "pointer",
});

export const ContentContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  marginTop: "10rem",
});

export const Content = styled("div", {
  width: "60%",

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",

    input: {
      borderRadius: "6px",
      border: "0",
      background: "#121214",
      color: "#7C7C8A",
      padding: "1rem",
    },

    select: {
      borderRadius: "6px",
      border: "0",
      background: "#121214",
      color: "#7C7C8A",
      padding: "1rem",
    },

    button: {
      height: "58px",
      border: "0",
      background: "#00875F",
      color: "#fff",
      fontWeight: "bold",
      padding: "0 1.25rem",
      borderRadius: "6px",
      marginTop: "1.5rem",
      cursor: "pointer",
      transition: "all 0.1s ease 0s",
      "&:hover": {
        backgroundColor: "#00a272",
      },
    },
  },
});
