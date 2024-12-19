import express, { Application } from "express";
import { config } from "dotenv";
import registerRouter from "./router";
import registerMiddlewares from "./middlewares";
import path from "path";

// Chargement des variables d'environnement
config();

const app: Application = express();

// Enregistrement des middlewares et des routes
registerMiddlewares(app);
registerRouter(app);

// Définition des constantes
const PORT: string | number = process.env.PORT || 5000;
const ENV: string = process.env.NODE_ENV || "development";

// Servir les fichiers statiques depuis le dossier "build"
app.use(express.static(path.join(__dirname, "build")));

// Redirection des chemins non trouvés vers "index.html" (pour une SPA)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"), (err) => {
    if (err) {
      res.status(500).send(err.message); // Gestion des erreurs lors de l'envoi du fichier
    }
  });
});

// Démarrage du serveur
app.listen(PORT, () =>
  console.log(`📡 Backend server: Running in ${ENV} mode on port ${PORT}`)
);
