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
import wakeOnLanRoutes from "./routes/wakeOnLan";

// Server Configuration
const app = express();

const BACKEND_PORT = env.BACKEND_PORT;
const allowedOrigins = env.ORIGIN_URL_BASE.split(",");
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Imported routes
app.use("/api/auth", authRoutes);
app.use("/api/modem", modemRoutes);
app.use("/api/mac-filter", macFilterRoutes);
app.use("/api/parental-controls", parentalControlsRoutes);
app.use("/api/wake-on-lan", wakeOnLanRoutes);

// Allow credentials in CORS configuration
app.options("*", cors(corsOptions));

const server = http.createServer(app);

server.listen(BACKEND_PORT, '0.0.0.0', () => {
    console.log(`Listening on port: ${BACKEND_PORT}`);
});