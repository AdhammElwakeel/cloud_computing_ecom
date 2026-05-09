import { Container } from "react-bootstrap";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  let errorStatus: number;
  let errorStatusText: string;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorStatusText = error.statusText;
  } else {
    errorStatus = 404;
    errorStatusText = "Page Not Found";
  }
  
  return (
    <Container>
      <div className="notFound">
        <h1>{errorStatus}</h1>
        <p>{errorStatusText}</p>
      </div>
    </Container>
  );
}
