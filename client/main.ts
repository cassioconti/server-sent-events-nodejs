const eventSource = new EventSource("v1/updates");

eventSource.addEventListener("message", log("message")); // Any message without a explicit type
eventSource.addEventListener("myEvent", log("myEvent")); // Messages of type "myEvent"
eventSource.addEventListener("open", log("open"));
eventSource.addEventListener("error", log("error"));

function log(type: string): EventListener {
    return (event: Event) => {
        // Populate the HTML list with event details
        const list: any = document.getElementById("myList");
        const entry: HTMLLIElement = document.createElement("li");
        entry.appendChild(document.createTextNode(`event: ${type}\n`));
        entry.appendChild(document.createTextNode(`details: ${JSON.stringify(event)}\n`));
        if (event instanceof MessageEvent) {
            // event.data contains the actual message sent from the server
            entry.appendChild(document.createTextNode(`json: ${event.data}`));
        }

        list.appendChild(entry);
    };
}
