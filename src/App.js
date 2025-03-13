import React, { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const res = await axios.post(
        "https://4eioym6kvc.execute-api.ap-south-1.amazonaws.com/dev/ask",
        { prompt }, // Send the prompt as a JSON object
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.REACT_APP_API_KEY // Replace YOUR_API_KEY with the actual API key
          },
        }
      );

      // Assuming the response structure is { response: "response text", ... }
      const responseData = res.data.response;
      setResponse(responseData); // Update the state with API response
      setError(""); // Clear any previous error
    } catch (err) {
      console.error("Error calling the API:", err);
      setError("Failed to get a response. Check the API or CORS settings.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>AI Assistant</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your question..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Ask</button>
      </form>

      {response && <div style={styles.response}><strong>Response:</strong> {response}</div>}
      {error && <div style={styles.error}>{error}</div>}

      <div className="footer" style={styles.footer}>
        <p>Built and Deployed by <a href="https://akindukodithuwakku.com" target="_blank" rel="noopener noreferrer">Akindu Kodithuwakku</a></p>
        <p>Follow me on <a href="https://github.com/akindukodithuwakku" target="_blank" rel="noopener noreferrer">GitHub</a></p>
        <p>&copy; {new Date().getFullYear()} Akindu Kodithuwakku. All rights reserved. </p>
        <h3>This site is designed and developed for test purposes. Site won't generate any response as of now due to the discontinuity of lambda function</h3>
      </div>
    </div>
  );
}

// Basic inline styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  response: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  footer: {
    marginTop: "40px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderTop: "1px solid #e9ecef",
    textAlign: "center",
  },
};

export default App;