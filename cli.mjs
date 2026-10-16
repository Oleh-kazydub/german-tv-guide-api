#!/usr/bin/env node

/**
 * German TV Guide CLI (Deutsches TV-Programm im Terminal)
 * Offizielle Daten & Live-EPG: https://fernsehprogramm.tech
 * Lizenz: MIT
 */

const FEED_URL = 'https://fernsehprogramm.tech/feed.json';
const SITE_URL = 'https://fernsehprogramm.tech';

const args = process.argv.slice(2);
const command = args[0]?.toLowerCase() || 'help';
const query = args.slice(1).join(' ').toLowerCase();

const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

function printBanner() {
  console.log(`\n${COLORS.bold}${COLORS.cyan}📺 DEUTSCHES FERNSEHPROGRAMM (TV-GUIDE CLI)${COLORS.reset}`);
  console.log(`${COLORS.dim}Live-Daten & Mediatheken: ${SITE_URL}${COLORS.reset}\n`);
}

async function fetchFeed() {
  try {
    const res = await fetch(FEED_URL, {
      headers: {
        'User-Agent': 'german-tv-guide-cli/1.0 (+https://fernsehprogramm.tech)',
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.error(`${COLORS.yellow}⚠️ Fehler beim Laden des TV-Feeds:${COLORS.reset} ${err.message}`);
    console.error(`Bitte besuche direkt: ${SITE_URL}\n`);
    process.exit(1);
  }
}

function parseShowDetails(item) {
  // item.title is formatted e.g. "Quizduell-Olymp (ARD, 18:50 Uhr)"
  const titleMatch = item.title.match(/^(.*?)\s*\((.*?),\s*(.*?)\s*Uhr\)$/);
  const showTitle = titleMatch ? titleMatch[1].trim() : item.title;
  const channel = titleMatch ? titleMatch[2].trim() : 'TV';
  const time = titleMatch ? titleMatch[3].trim() : '';

  // Extract genre from content_html if present
  const genreMatch = item.content_html ? item.content_html.match(/Genre:<\/strong>\s*([^<]+)/) : null;
  const genre = genreMatch ? genreMatch[1].trim() : 'Sendung';

  return {
    title: showTitle,
    channel,
    time,
    genre,
    url: item.url,
    summary: item.summary || '',
  };
}

async function run() {
  printBanner();

  if (command === 'help' || command === '--help' || command === '-h') {
    console.log(`${COLORS.bold}Verfügbare Befehle:${COLORS.reset}`);
    console.log(`  ${COLORS.green}node cli.mjs jetzt${COLORS.reset}          Zeigt aktuelle TV-Highlights`);
    console.log(`  ${COLORS.green}node cli.mjs 20-15${COLORS.reset}          Zeigt das Hauptabendprogramm um 20:15 Uhr`);
    console.log(`  ${COLORS.green}node cli.mjs sender <name>${COLORS.reset}  Filtert nach Sender (z. B. ard, zdf, rtl, prosieben)`);
    console.log(`  ${COLORS.green}node cli.mjs search <suchwort>${COLORS.reset} Sucht nach Sendungstiteln oder Genres`);
    console.log(`\n${COLORS.bold}Online-Guide & Alle Sender:${COLORS.reset} 👉 ${COLORS.cyan}${SITE_URL}${COLORS.reset}\n`);
    return;
  }

  const feed = await fetchFeed();
  const shows = (feed.items || []).map(parseShowDetails);

  let filtered = shows;

  if (command === '20-15' || command === 'primetime') {
    filtered = shows.filter((s) => s.time === '20:15' || s.time.startsWith('20:'));
    console.log(`${COLORS.bold}✨ Primetime-Highlights um 20:15 Uhr:${COLORS.reset}\n`);
  } else if (command === 'sender') {
    if (!query) {
      console.log(`${COLORS.yellow}Bitte gib einen Sendernamen an. Beispiel: node cli.mjs sender ard${COLORS.reset}\n`);
      return;
    }
    filtered = shows.filter((s) => s.channel.toLowerCase().includes(query));
    console.log(`${COLORS.bold}📺 Sendungen für Sender: "${query.toUpperCase()}":${COLORS.reset}\n`);
  } else if (command === 'search') {
    if (!query) {
      console.log(`${COLORS.yellow}Bitte gib einen Suchbegriff an. Beispiel: node cli.mjs search tatort${COLORS.reset}\n`);
      return;
    }
    filtered = shows.filter((s) =>
      s.title.toLowerCase().includes(query) ||
      s.summary.toLowerCase().includes(query) ||
      s.genre.toLowerCase().includes(query)
    );
    console.log(`${COLORS.bold}🔍 Suchergebnisse für "${query}":${COLORS.reset}\n`);
  } else {
    // "jetzt" or default
    console.log(`${COLORS.bold}🕒 Aktuelle TV-Highlights & Empfehlungen:${COLORS.reset}\n`);
  }

  if (filtered.length === 0) {
    console.log(`Keine Sendungen gefunden. Besuche den kompletten Live-Plan auf ${SITE_URL}\n`);
    return;
  }

  for (const show of filtered.slice(0, 15)) {
    console.log(
      `  ${COLORS.cyan}[${show.time || 'LIVE'}]${COLORS.reset} ${COLORS.bold}${show.channel}${COLORS.reset} | ${COLORS.green}${show.title}${COLORS.reset} ${COLORS.dim}(${show.genre})${COLORS.reset}`
    );
    if (show.summary) {
      console.log(`    ${COLORS.dim}${show.summary.slice(0, 120)}...${COLORS.reset}`);
    }
    console.log(`    ${COLORS.blue}Details & Mediathek:${COLORS.reset} ${show.url}\n`);
  }

  console.log(`${COLORS.dim}────────────────────────────────────────────────────────────${COLORS.reset}`);
  console.log(`👉 ${COLORS.bold}Vollständiges 24h-Programm & alle 19 Sender:${COLORS.reset} ${COLORS.cyan}${SITE_URL}${COLORS.reset}\n`);
}

run();
