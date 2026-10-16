# 📺 Deutsches TV-Programm API & EPG Data (JSON, CLI & MCP Server)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Daily EPG Updates](https://img.shields.io/badge/EPG%20Data-Daily%20Updated-green.svg)](https://fernsehprogramm.tech)
[![FastMCP](https://img.shields.io/badge/AI%20Protocol-MCP%20Ready-purple.svg)](https://modelcontextprotocol.io)
[![Official Site](https://img.shields.io/badge/Live%20Web-fernsehprogramm.tech-blue.svg)](https://fernsehprogramm.tech)

Kostenlose, tagesaktuelle Schnittstelle und strukturierte JSON-Daten für das deutsche **Fernsehprogramm (EPG)**.  
Bietet Live-Sendedaten für **19 Hauptsender** (ARD, ZDF, RTL, ProSieben, SAT.1, VOX, KiKA u. v. m.), Primetime-Highlights um 20:15 Uhr, ein leichtgewichtiges CLI-Tool für die Konsole und ein **Model Context Protocol (MCP)** für KI-Assistenten (Claude Desktop, Cursor, ChatGPT).

👉 **Offizieller Online-Guide & Web-App:** [**fernsehprogramm.tech**](https://fernsehprogramm.tech)

---

## ✨ Highlights & Features

- **Tagesaktuelle JSON-Feeds:** Sofort nutzbare Daten für Entwickler, Home Assistant, ioBroker, Kodi und Mediacenter.
- **Keine API-Keys oder Limits:** Direkter Zugriff auf tagesaktuelle Highlights ohne Registrierung.
- **Primetime 20:15 Uhr Übersicht:** Alle Spielfilme, Shows und Serien des Hauptabendprogramms.
- **Model Context Protocol (MCP):** Frag Claude oder Cursor direkt nach dem TV-Programm (*„Was läuft heute um 20:15 auf ProSieben?“*).
- **CLI-Tool (Zero-Dependency):** Schnellansicht im Terminal, was gerade im Live-TV läuft.
- **100% legal & werbefrei:** Verlinkt direkt auf offizielle Mediatheken (ARD Mediathek, ZDFmediathek, Joyn).

---

## 📡 Kostenlose Live-Endpoints (JSON, RSS, Atom)

Die Programmdaten werden automatisiert synchronisiert und stehen in standardisierten Formaten zur Verfügung:

| Format | Endpoint URL | Beschreibung |
| :--- | :--- | :--- |
| **JSON Feed (v1.1)** | `https://fernsehprogramm.tech/feed.json` | Reines JSON (JSONFeed v1.1) für Apps, Skripte & Smarthome |
| **RSS 2.0 Feed** | `https://fernsehprogramm.tech/feed.xml` | XML RSS-Feed für Feedly, Inoreader, Discord & Telegram Bots |
| **Atom 1.0 Feed** | `https://fernsehprogramm.tech/feed.atom` | XML Atom-Feed für Syndication |

### Beispielabfrage mit `curl` oder `fetch`:
```bash
curl -s https://fernsehprogramm.tech/feed.json | jq '.items[0]'
```

---

## ⚡ Schnellstart: Terminal TV-Guide (CLI)

Mit der integrierten CLI siehst du sofort im Terminal, was gerade im deutschen Fernsehen läuft:

```bash
# 1. Repository klonen
git clone https://github.com/Oleh-kazydub/german-tv-guide-api.git
cd german-tv-guide-api

# 2. Was läuft jetzt im TV?
node cli.mjs jetzt

# 3. Hauptabendprogramm um 20:15 Uhr ansehen:
node cli.mjs 20-15

# 4. Nach bestimmten Sendern filtern (z.B. ARD, ZDF, ProSieben, RTL):
node cli.mjs sender ard

# 5. Nach Titeln oder Genres suchen (z.B. Tatort, Krimi, Show):
node cli.mjs search tatort
```

---

## 🤖 Model Context Protocol (MCP Server für Claude & Cursor)

Nutze das deutsche Fernsehprogramm direkt in deinen KI-Workflows!

### Konfiguration für `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "fernsehprogramm": {
      "command": "python",
      "args": ["-m", "mcp_server"]
    }
  }
}
```

### Typische Fragen an den KI-Assistenten:
* *„Was läuft heute um 20:15 Uhr im deutschen Fernsehen?“*
* *„Gibt es heute Abend einen guten Krimi oder Spielfilm auf ARD oder ZDF?“*
* *„Zeige mir das Abendprogramm von ProSieben und RTL.“*

---

## 📺 Unterstützte TV-Sender (Übersicht & Mediatheken)

Klicke auf den jeweiligen Sender, um das vollständige 24-Stunden-Programm, Frequenzen und Mediatheken auf [fernsehprogramm.tech](https://fernsehprogramm.tech) aufzurufen:

- [Das Erste (ARD)](https://fernsehprogramm.tech/sender/ard) • [ZDF](https://fernsehprogramm.tech/sender/zdf) • [RTL](https://fernsehprogramm.tech/sender/rtl) • [ProSieben](https://fernsehprogramm.tech/sender/prosieben)
- [SAT.1](https://fernsehprogramm.tech/sender/sat1) • [VOX](https://fernsehprogramm.tech/sender/vox) • [Kabel Eins](https://fernsehprogramm.tech/sender/kabel-eins) • [RTL ZWEI](https://fernsehprogramm.tech/sender/rtl2)
- [SUPER RTL](https://fernsehprogramm.tech/sender/super-rtl) • [KiKA](https://fernsehprogramm.tech/sender/kika) • [3sat](https://fernsehprogramm.tech/sender/3sat) • [ARTE](https://fernsehprogramm.tech/sender/arte)
- [ZDFneo](https://fernsehprogramm.tech/sender/zdfneo) • [NITRO](https://fernsehprogramm.tech/sender/nitro) • [ProSieben MAXX](https://fernsehprogramm.tech/sender/prosieben-maxx) • [DMAX](https://fernsehprogramm.tech/sender/dmax)
- [TELE 5](https://fernsehprogramm.tech/sender/tele5) • [WELT](https://fernsehprogramm.tech/sender/welt) • [Phoenix](https://fernsehprogramm.tech/sender/phoenix)

---

## 🕒 Wichtige Sendezeiten & Sparten

- 🔴 [**Was läuft jetzt im Live-TV**](https://fernsehprogramm.tech/jetzt) – Alle 19 Sender in Echtzeit mit Fortschrittsbalken
- 🌟 [**Heute 20:15 Uhr**](https://fernsehprogramm.tech/heute-20-15) – Die besten Filme und Shows im Hauptabendprogramm
- 🌙 [**Late-Night TV**](https://fernsehprogramm.tech/late-night) – Sendungen nach 22:00 Uhr
- ⏱️ [**TV-Programm 20:00 Uhr**](https://fernsehprogramm.tech/uhrzeit/20-00) – Nachrichten & Primetime-Einstieg

---

## 📄 Lizenz & Danksagung

Dieses Projekt ist unter der [MIT License](LICENSE) lizenziert.  
Alle Programmdaten stammen aus öffentlich zugänglichen EPG-Schnittstellen und werden redaktionell aufbereitet von [**fernsehprogramm.tech**](https://fernsehprogramm.tech).
