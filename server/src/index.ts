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
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

server.listen(BACKEND_PORT, '0.0.0.0', () => {
    console.log(`Listening on port: ${BACKEND_PORT}`);
});

// Graceful shutdown
const shutdown = (signal: string) => {
    console.log(`Received ${signal}. Shutting down gracefully...`);

    server.close((err) => {
        if (err) {
            console.error("Error during server close:", err);
            process.exit(1);
        }

        console.log("HTTP server closed.");
        process.exit(0);
    });

    // Force shutdown after timeout (prevents nginx/systemd hangs)
    setTimeout(() => {
        console.error("Forced shutdown (timeout)");
        process.exit(1);
    }, 10000);
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));