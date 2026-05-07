const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// -------------------- DATA --------------------
let users = [
  { id: 1, name: "Admin", password: "admin123", role: "admin" }
];

let jobs = [];
let reviews = [];
let trades = ["Plumbing", "Electrical", "HVAC", "Cleaning", "Mechanic", "Carpenter"];
let payments = []; // ✅ FIX: missing in your backend

// -------------------- USERS --------------------
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/signup", (req, res) => {
  users.push({
    id: Date.now(),
    ...req.body
  });
  res.json({ success: true });
});

app.delete("/api/users/:id", (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.json({ success: true });
});

// -------------------- JOBS --------------------
app.get("/api/jobs", (req, res) => {
  res.json(jobs);
});

app.post("/api/jobs", (req, res) => {
  jobs.push(req.body);
  res.json({ success: true });
});

app.put("/api/jobs/:id", (req, res) => {
  const job = jobs.find(j => j.id == req.params.id);
  if (job) Object.assign(job, req.body);
  res.json({ success: true });
});

app.delete("/api/jobs/:id", (req, res) => {
  const id = Number(req.params.id);

  jobs = jobs.filter(j => Number(j.id) !== id);

  res.json({ success: true });
});

// -------------------- REVIEWS --------------------
app.get("/api/reviews", (req, res) => {
  res.json(reviews);
});

app.post("/api/reviews", (req, res) => {
  reviews.push({
    id: Date.now(),
    ...req.body
  });
  res.json({ success: true });
});

app.delete("/api/reviews/:id", (req, res) => {
  const id = Number(req.params.id);
  reviews = reviews.filter(r => r.id !== id);
  res.json({ success: true });
});

// -------------------- TRADES --------------------
app.get("/api/trades", (req, res) => {
  res.json(trades);
});

app.post("/api/trades", (req, res) => {
  trades.push(req.body.trade);
  res.json({ success: true });
});

app.delete("/api/trades/:index", (req, res) => {
  trades.splice(req.params.index, 1);
  res.json({ success: true });
});

// -------------------- PAYMENTS (FIX) --------------------
app.get("/api/payments", (req, res) => {
  res.json(payments);
});

app.post("/api/payments", (req, res) => {
  payments.push({
    id: Date.now(),
    ...req.body
  });
  res.json({ success: true });
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));