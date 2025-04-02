// Library Imports
import { config } from "dotenv";
config();
import express from "express";
import env from "./util/validateEnv";
import cors from "cors";
import http from "http";
//Routes
import authRoutes from "./routes/auth";
import modemRoutes from "./routes/modem";
import macFilterRoutes from "./routes/macFilter";
import parentalControlsRoutes from "./routes/parentalControls";
/*import wakeOnLanRoutes from "./routes/wakeOnLan";*/

// Server Configuration
const app = express();

const BACKEND_PORT = env.BACKEND_PORT;
const ORIGIN_URL = env.ORIGIN_URL_BASE;

const corsOptions = {
    origin: ORIGIN_URL,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
/* app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log("Headers:", req.headers);
    next();
}); */

/* 
    TODO: use pm2 to run the server
    npm install -g pm2
    pm2 start server.js --name wol-backend
    pm2 startup
    pm2 save
*/

// Imported routes
app.use("/api/auth", authRoutes);
app.use("/api/modem", modemRoutes);
app.use("/api/mac-filter", macFilterRoutes);
app.use("/api/parental-controls", parentalControlsRoutes);
/*app.use("/api/wake-on-lan", wakeOnLanRoutes); */

// Allow credentials in CORS configuration
app.options("*", cors(corsOptions));

const server = http.createServer(app);

server.listen(BACKEND_PORT, () => {
    console.log(`Listening on port: ${BACKEND_PORT}`);
});