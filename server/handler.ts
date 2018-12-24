import { Response } from "express";

export class Handler {
    private readonly SECOND = 1000;
    private readonly MINUTE = 60 * this.SECOND;
    private id: number;
    private eventName: string;
    private clients: Response[];

    constructor() {
        this.id = 0;
        this.eventName = "myEvent"; // Defining an event type name
        this.clients = []; // Hold all the client Response objects
    }

    public addClient(client: Response) {
        this.clients.push(client);
        client.connection.setTimeout(0); // Remove connection timeout (default was 2 minutes)
        client.on("close", () => {
            // When client closes connection, remove from list
            this.clients = this.clients.filter((value) => value !== client);
            client.end();
        });
    }

    public run() {
        setInterval(() => {
            console.log(`There are ${this.clients.length} clients`);
            if (this.clients.length === 0) {
                return;
            }

            // Arbitrary data as example
            const data = {
                field1: "value1",
                field2: true,
                field3: "this is a json example with random number",
                field4: Math.floor(Math.random() * 10),
            };

            // Message structure
            const message = `event: ${this.eventName}\n` +
                `id: ${++this.id}\n` +
                `data: ${JSON.stringify(data)}\n\n`;

            // Send to all connected clients
            for (const client of this.clients) {
                client.write(message);
            }
        }, 1 * this.MINUTE);
    }
}
