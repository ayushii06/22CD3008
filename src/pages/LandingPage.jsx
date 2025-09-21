import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import handleShorten from "../api/Api";
import { Log } from "../../../logging/middleware";


export default function LandingPage() {
  const [inputs, setInputs] = useState([{ url: "", validity: "", code: "" }]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleInputChange = (index, field, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][field] = value;
    setInputs(updatedInputs);
  };

  const addInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: "", validity: "", code: "" }]);
    }

  };

  const removeInput = (index) => {
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
  };

  const validateInputs = () => {
    for (const input of inputs) {
      if (!input.url) {
        Log(new Error().stack, "error", "LandingPage", "Each entry must have a long URL.");
        setError("Each entry must have a long URL.");
        return false;
      }

      //if url already exists in the list
      const urlCount = inputs.filter(i => i.url === input.url).length;
      if (urlCount > 1) {
            Log(new Error().stack, "error", "LandingPage", `Duplicate URL found: ${input.url}`);
        setError(`Duplicate URL found: ${input.url}`);
        return false;
      }

      try {
        new URL(input.url); // validate URL format
      } catch {
            Log(new Error().stack, "error", "LandingPage", `Invalid URL format: ${input.url}`);
        setError(`Invalid URL format: ${input.url}`);
        return false;
      }
      if (input.validity && isNaN(Number(input.validity))) {
            Log(new Error().stack, "error", "LandingPage", "Validity must be a number (minutes).");
        setError("Validity must be a number (minutes).");
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleOnClick = async () => {
  if (!validateInputs()) return;

  setProcessing(true);
  setError("");

  try {
    const res = await handleShorten({ list: inputs });

    if (!res) {
      //error
      Log(new Error().stack, "error", "LandingPage", "A custom shortcode you provided already exists.");
      setError("A custom shortcode you provided already exists. Please try another.");
      return;
    }

    Log(new Error().stack, "info", "LandingPage", `Successfully shortened URLs: ${res.map(r => r.longUrl).join(", ")}`);
    // URLs are successfully shortened
    if (res.length === 0) {
      setError("No valid URLs were shortened by the server.");
      return;
    }

    setResults(res.map(r => ({
      original: r.longUrl,
      shortened: `${window.location.origin}/${r.shortCode}`,
      expiryDate: r.expiry ? new Date(r.expiry).toLocaleString() : "Never"
    })));

    setInputs([{ url: "", validity: "", code: "" }]);

  } catch (err) {
    Log(new Error().stack, "error", "LandingPage", `API Error: ${err.message}`);
    console.error("API Error:", err);
    setError("An error occurred while shortening URLs. Please try again.");
  } finally {
    setProcessing(false);
  }
};

  return (
      <>
      
    <Container maxWidth="md">
      <Typography
        variant="h4"
        fontWeight="600"
        textAlign="center"
        marginY={4}
      >
        URL Shortener
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Typography variant="body1" color="text.secondary" marginBottom={2}>
          Enter up to 5 URLs, with optional validity period and shortcode.
        </Typography>

        {inputs.map((input, index) => (
          <Box
            key={index}
            display="grid"
            gridTemplateColumns="1fr 150px 150px auto"
            gap={2}
            marginBottom={2}
            alignItems="center"
          >
            <TextField
              label="Long URL"
              value={input.url}
              onChange={(e) =>
                handleInputChange(index, "url", e.target.value)
              }
              fullWidth
            />
            <TextField
              label="Validity (min)"
              value={input.validity || ""}
              onChange={(e) =>
                handleInputChange(index, "validity", e.target.value)
              }
              type="number"
            />
            <TextField
              label="Shortcode"
              value={input.code || ""}
              onChange={(e) =>
                handleInputChange(index, "code", e.target.value)
              }
            />
            {inputs.length > 1 && (
              <IconButton
                color="error"
                onClick={() => removeInput(index)}
                sx={{ marginLeft: 1 }}
              >
                <Delete />
              </IconButton>
            )}
          </Box>
        ))}

        {inputs.length < 5 && (
          <Button
            onClick={addInput}
            variant="outlined"
            startIcon={<Add />}
            sx={{ marginBottom: 2 }}
            fullWidth
          >
            Add Another Link
          </Button>
        )}

        <Button
          onClick={handleOnClick}
          variant="contained"
          color="primary"
          fullWidth
          disabled={processing}
        >
          {processing ? "Processing..." : "Shorten URLs"}
        </Button>

        {results.length > 0 && (
          <Box marginTop={4}>
            <Typography variant="h6" fontWeight="600" textAlign="center">
              Shortened URLs
            </Typography>
            {results.map((res, index) => (
              <Paper
                key={index}
                sx={{
                  padding: 2,
                  marginTop: 2,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                }}
              >
                <Typography>
                  <strong>Original:</strong> {res.original}
                </Typography>
                <Typography color="primary">
                  <strong>Shortened:</strong> {res.shortened}
                </Typography>
                {res.expiryDate && (
                  <Typography>
                    <strong>Expires At:</strong> {res.expiryDate}
                  </Typography>
                )}
              </Paper>
            ))}
          </Box>
        )}
      </Paper>
    </Container>
    </>
  );
}