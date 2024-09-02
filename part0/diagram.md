```mermaid

sequenceDiagram
participant browser
participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: [{ "content": "Hola", "date": "2023-1-1" }, ... ]
    deactivate server
```
