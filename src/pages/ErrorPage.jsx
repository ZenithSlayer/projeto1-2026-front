import React from "react";
import { useParams } from "react-router-dom";

const ErrorPage = () => {
  const { statusCode } = useParams();
  const code = statusCode || 404;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Error {code}</h1>
      <img
        src={`https://http.cat/${code}`}
        alt={`Error ${code}`}
        style={{ maxWidth: "80%", height: "auto" }}
      />
      <p>Oops! Something went wrong.</p>
    </div>
  );
};

export default ErrorPage;