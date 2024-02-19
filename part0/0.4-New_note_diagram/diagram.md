# Here is a sequence diagram of the new note function

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: Reloads the page
    deactivate server

    Note left of server: The server returns a "302 Found" http code
    

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "Hey", "date": "2024-02-19T14:27:03.441Z" }, ... ]
    deactivate server

    Note left of server: The server returns a "200 OK" status code along with the data
```

![POST](https://i.imgur.com/bAHGYaI.png)
![POST](https://i.imgur.com/IK9CyW6.png)
![POST](https://i.imgur.com/x8zj3OB.png)