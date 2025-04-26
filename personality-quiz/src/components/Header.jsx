import React from "react";

export default function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Personality Quiz: Discover Your Element!</h1>
      <p style={styles.subtitle}>
        Elements and their Colors:
      </p>
      <ul style={styles.list}>
        <li><span style={{ color: "red" }}>Fire 🔥 - Red</span></li>
        <li><span style={{ color: "blue" }}>Water 🌊 - Blue</span></li>
        <li><span style={{ color: "green" }}>Earth 🌿 - Green</span></li>
        <li><span style={{ color: "goldenrod" }}>Air 🌬️ - Yellow</span></li>
      </ul>
    </header>
  );
}

const styles = {
  header: {
    textAlign: "center",
    padding: "1rem",
    backgroundColor: "#f0f8ff",
    borderBottom: "2px solid #ccc",
    marginBottom: "2rem"
  },
  title: {
    fontSize: "2rem",
    margin: "0.5rem 0",
  },
  subtitle: {
    fontSize: "1.2rem",
    margin: "0.5rem 0",
  },
  list: {
    listStyle: "none",
    padding: 0,
    fontSize: "1rem",
    lineHeight: "1.5rem",
  }
};
