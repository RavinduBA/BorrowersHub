
import { createServer } from "http";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const PORT = 5174;
const __dirname = dirname(fileURLToPath(import.meta.url));
const sample = JSON.parse(
    readFileSync(join(__dirname, "help/api/sample-response.json"), "utf-8")
);

const server = createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    if (req.url === "/api/borrowers/pipeline" && req.method === "GET") {
        res.end(JSON.stringify(sample.endpoints[0].response));
        return;
    }
    if (req.url?.startsWith("/api/borrowers/") && req.method === "GET") {
        // /api/borrowers/{id}
        res.end(JSON.stringify(sample.endpoints[1].response));
        return;
    }
    if (req.url?.startsWith("/api/broker/") && req.method === "GET") {
        res.end(JSON.stringify(sample.endpoints[6].response));
        return;
    }
    if (req.url === "/api/onboarding/workflow" && req.method === "GET") {
        res.end(JSON.stringify(sample.endpoints[7].response));
        return;
    }
    // POST endpoints (mock success)
    if (req.url?.includes("request-documents") && req.method === "POST") {
        res.end(JSON.stringify(sample.endpoints[2].response));
        return;
    }
    if (req.url?.includes("send-valuer") && req.method === "POST") {
        res.end(JSON.stringify(sample.endpoints[3].response));
        return;
    }
    if (req.url?.includes("approve") && req.method === "POST") {
        res.end(JSON.stringify(sample.endpoints[4].response));
        return;
    }
    if (req.url?.includes("escalate") && req.method === "POST") {
        res.end(JSON.stringify(sample.endpoints[5].response));
        return;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
    console.log(`Mock API server running at http://localhost:${PORT}`);
});
