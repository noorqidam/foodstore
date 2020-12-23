import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, LayoutOne, Text } from "upkit";

export default function RegisterSuccess() {
  return (
    <LayoutOne>
      <Card color="white">
        <Text as="h3">Pendaftaran Berhasil</Text>
        <Text>Silahkan masuk ke aplikasi</Text>
        <br />
        <Link to="/login">
          <Button fitContainer>Masuk</Button>
        </Link>
      </Card>
    </LayoutOne>
  );
}
