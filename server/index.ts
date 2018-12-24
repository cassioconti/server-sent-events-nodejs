import express from "express";
import { Handler } from "./handler";

const app = express();
const handler = new Handler();

app.get("/v1/updates", (request, response) => {
    response.writeHead(200, {
        "cache-control": "no-cache",
        "connection": "keep-alive",
        "content-type": "text/event-stream",
    });

    handler.addClient(response);
});

app.use(express.static("dist/client"));

const port = process.env.port || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
    handler.run();
});
