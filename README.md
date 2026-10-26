# Einkaufsliste

Full-Stack-App zum Hinzufügen, Abhaken und Löschen von Artikeln einer Einkaufsliste.

| Teil | Technik |
|---|---|
| Frontend | Next.js (React, TypeScript), UI-Bibliothek: [MUI](https://mui.com/) |
| Backend | Node.js, Express (TypeScript), Zod |
| Datenbank | MongoDB über Mongoose |

Alle drei Teile laufen als Docker-Container und werden über `docker-compose.yaml` gestartet.

## Voraussetzungen

- Docker mit Docker Compose

## Starten

1. Umgebungsvariablen anlegen:
   ```bash
   cp .env.example .env
   ```
2. Container bauen und starten:
   ```bash
   docker compose up --build
   ```
3. App im Browser öffnen: <http://localhost:3000>

Die Ports lassen sich in der `.env` ändern (`FRONTEND_HOST_PORT`, `BACKEND_HOST_PORT`). Die API läuft standardmäßig unter <http://localhost:15501>.

Frontend und Backend laufen im Dev-Modus. Änderungen am Code werden ohne Neustart übernommen.

## Zurücksetzen

Container stoppen und **alle Daten löschen** (das Datenbank-Volume wird entfernt):

```bash
docker compose down -v
```

Nach Änderungen an einer `package.json` die Container neu bauen und dabei die `node_modules`-Volumes erneuern:

```bash
docker compose up --build -V
```

## API

| Methode | Pfad | Body | Beschreibung |
|---|---|---|---|
| `GET` | `/items` | – | Alle Artikel, neueste zuerst |
| `POST` | `/items` | `{ name: string }` | Artikel anlegen |
| `PUT` | `/items/:id` | `{ bought: boolean }` | Kaufstatus ändern |
| `DELETE` | `/items/:id` | – | Artikel löschen |
