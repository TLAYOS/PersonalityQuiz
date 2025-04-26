import React, { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Results({ element, artwork }) {
  const { name } = useContext(UserContext);

  return (
    <div>
      <h2>Congratulations, {name}!</h2>
      <p>Your personality element is: <strong>{element}</strong></p>

      {artwork ? (
        <div className="artwork">
          <h3>{artwork.title}</h3>
          <img src={artwork.primaryImage} alt={artwork.title} style={{ maxWidth: "300px" }} />
          <p>Artist: {artwork.artistDisplayName || "Unknown"}</p>
          <p>Date: {artwork.objectDate}</p>
        </div>
      ) : (
        <p>No artwork found for your element!</p>
      )}
    </div>
  );
}
