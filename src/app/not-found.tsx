import React from "react";
import Link from "next/link";
import "../styles/NotFound.css";

export default function NotFoundPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="container">
        <div className="error-404">
          <h2>Whooos!!!</h2>
          <div className="page-404">
            <p>404</p>
            <span>The page can not be found</span>
          </div>
          <p>
            We could not found the page you are looking for. Please try another page and verify the URL you have
            entered.
          </p>
          <Link href="/" className="go-back">
            Go back to home page
          </Link>
        </div>
      </div>
    </div>
  );
}
