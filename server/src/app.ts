import rTracer from "cls-rtracer";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import morgan from "morgan";
import GlobalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";
import { stream } from "./shared/logger";
const app: Application = express();

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:3001",
    ];

    // Allow any *.localhost:5173 subdomain (like http://shop1.localhost:5173)
    if (
      origin &&
      (allowedOrigins.includes(origin) ||
        /^http:\/\/.*\.localhost:5173$/.test(origin))
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware setup
app.use(cors(corsOptions));

app.use(morgan("combined", { stream }));
app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(rTracer.expressMiddleware());

// Route handler for root endpoint
app.get("/", (_req: Request, res: Response) => {
  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: "Welcome to Server!",
  });
});

// Router setup
app.use("/api/v1", router);

// Error handling middleware
app.use(GlobalErrorHandler);

// Not found handler
app.use((req: Request, res: Response, _next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
