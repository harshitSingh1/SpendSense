import express from "express";

const app = express();

app.get("/api/arsenal/tools/:slug", (req, res) => {
  res.send("Matched slug: " + req.params.slug);
});

app.get("/api/arsenal/tools", (req, res) => {
  res.send("Matched tools");
});

const req = { url: "/api/arsenal/tools" };
app.handle({ url: "/api/arsenal/tools", method: "GET" }, { send: console.log });
