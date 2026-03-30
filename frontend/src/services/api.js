const API_BASE = "http://localhost:5000/api";

// Login
export const loginUser = async (data) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

// Dashboard
export const getDashboardStats = async () => {
  const res = await fetch(`${API_BASE}/dashboard/stats`);
  return res.json();
};

// Signals
export const getSignals = async () => {
  const res = await fetch(`${API_BASE}/signals`);
  return res.json();
};

// Events
export const getEvents = async () => {
  const res = await fetch(`${API_BASE}/events`);
  return res.json();
};

// Cameras
export const getCameras = async () => {
  const res = await fetch(`${API_BASE}/cameras`);
  return res.json();
};