// index.js
const express = require("express");
const app = express();

// habilitar CORS para freeCodeCamp
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

// Ruta base
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// ---------- API ----------
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  // Si no hay parámetro => devolver fecha actual
  if (!dateParam) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // Si es número => timestamp
  if (!isNaN(dateParam)) {
    const dateInt = parseInt(dateParam);
    const dateObj = new Date(dateInt);

    if (dateObj.toString() === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    }

    return res.json({
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString()
    });
  }

  // Si es string => intentar parsear como fecha normal
  const dateObj = new Date(dateParam);

  if (dateObj.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
});

// ---------- Inicializar servidor ----------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor ejecutándose en puerto ${port}`);
});
