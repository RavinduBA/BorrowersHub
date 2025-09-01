import { createServer } from "http";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

//  mock API server


const PORT = 5174;
const __dirname = dirname(fileURLToPath(import.meta.url));

//Reads the file help/api/sample-response.json and parses it into a JavaScript object called sample.
const sample = JSON.parse(
    readFileSync(join(__dirname, "help/api/sample-response.json"), "utf-8")
);

// Build a map of endpoint definitions for easy lookup
const endpointMap = {};
sample.endpoints.forEach((ep) => {
    endpointMap[ep.url] = ep;
});

// pipeline contains the borrowers grouped by status
const pipeline = sample.endpoints[0].response;

const borrowerDetails = {};
// Add the sample detail for id=1
borrowerDetails["1"] = sample.endpoints[1].response;
// Add mock details for other borrowers in pipeline
pipeline.new.concat(pipeline.in_review, pipeline.approved).forEach((b) => {
    if (!borrowerDetails[b.id]) {
        borrowerDetails[b.id] = {
            id: b.id,
            name: b.name,
            email: `${b.name.toLowerCase().replace(/ /g, ".")}@example.com`,
            phone: "(355)000-0000",
            loan_amount: b.amount,
            status: b.status,
            employment: "Unknown",
            income: 0,
            existing_loan: 0,
            credit_score: 700,
            source_of_funds: "Declared",
            risk_signal: "None",
            ai_flags: []
        };
    }
});

//Starts an HTTP server that listens for incoming requests.
const server = createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    if (req.method === "OPTIONS") {
        res.statusCode = 204;
        res.end();
        return;
    }
    console.log(`[Mock API] ${req.method} ${req.url}`);

    // GET /api/borrowers/pipeline
    if (req.url === "/api/borrowers/pipeline" && req.method === "GET") {
        res.end(JSON.stringify(pipeline));
        return;
    }

    // GET /api/borrowers/:id
    const borrowerDetailMatch = req.url.match(/^\/api\/borrowers\/(\w+)$/);
    if (borrowerDetailMatch && req.method === "GET") {
        const borrowerId = borrowerDetailMatch[1];
        const detail = borrowerDetails[borrowerId];
        if (detail) {
            res.end(JSON.stringify(detail));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Borrower not found" }));
        }
        
        return;
    }

    // POST endpoints for borrower actions
    const postActionMatch = req.url.match(/^\/api\/borrowers\/(\w+)\/(request-documents|send-valuer|approve|escalate)$/);
    if (postActionMatch && req.method === "POST") {
        const action = postActionMatch[2];
        // Find the matching endpoint in sample
        const ep = sample.endpoints.find(e => e.url.includes(action) && e.method === "POST");
        // Server sends response
        if (ep) {
            res.end(JSON.stringify(ep.response));
        // If the action is not found, return 404.
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Not found" }));
        }
        return;
    }

    // GET /api/broker/:id
    const brokerMatch = req.url.match(/^\/api\/broker\/(\w+)$/);
    if (brokerMatch && req.method === "GET") {
        res.end(JSON.stringify(sample.endpoints[6].response));
        return;
    }

    // GET /api/onboarding/workflow
    if (req.url === "/api/onboarding/workflow" && req.method === "GET") {
        res.end(JSON.stringify(sample.endpoints[7].response));
        return;
    }
    
    //If no routes match, return 404.
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not found" }));
});

// Start the server
server.listen(PORT, () => {
    console.log(`Mock API server running at http://localhost:${PORT}`);
});