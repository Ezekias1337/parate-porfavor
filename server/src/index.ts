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
/*import parentalControlsRoutes from "./routes/parentalControls";
import wlanMacFilterRoutes from "./routes/wlanMacFilter"; */

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
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log("Headers:", req.headers);
    next();
});


// Imported routes
app.use("/api/auth", authRoutes);
app.use("/api/modem", modemRoutes);
/*app.use("/api/parental-controls", parentalControlsRoutes);
app.use("/api/wlan-mac-filter", wlanMacFilterRoutes); */

// Allow credentials in CORS configuration
app.options("*", cors(corsOptions));

const server = http.createServer(app);

server.listen(BACKEND_PORT, () => {
    console.log(`Listening on port: ${BACKEND_PORT}`);
});