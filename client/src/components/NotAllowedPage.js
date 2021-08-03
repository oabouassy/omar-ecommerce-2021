import React from "react";
import { Container } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const NotAllowedPage = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "9rem", maxWidth: "35rem" }}>
      <Alert variant="filled" severity="error">
        Sorry, this page is for admins only
      </Alert>
    </Container>
  );
};

export default NotAllowedPage;
