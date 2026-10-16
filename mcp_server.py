"""
Model Context Protocol (MCP) Server for German TV Guide (Fernsehprogramm)
Data provider: https://fernsehprogramm.tech
License: MIT
"""

import json
import urllib.request
import sys
from typing import Any, Dict, List

FEED_URL = "https://fernsehprogramm.tech/feed.json"
SITE_URL = "https://fernsehprogramm.tech"


def fetch_tv_feed() -> List[Dict[str, Any]]:
    """Fetch live TV highlights and primetime schedules from fernsehprogramm.tech."""
    try:
        req = urllib.request.Request(
            FEED_URL,
            headers={"User-Agent": "fernsehprogramm-mcp/1.0 (+https://fernsehprogramm.tech)"},
        )
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode("utf-8"))
            return data.get("items", [])
    except Exception as e:
        return []


def get_primetime() -> List[Dict[str, str]]:
    """Return all primetime highlights starting at 20:15 Uhr."""
    items = fetch_tv_feed()
    results = []
    for item in items:
        title = item.get("title", "")
        if "20:15" in title or "20:" in title:
            results.append({
                "title": title,
                "summary": item.get("summary", ""),
                "details_url": item.get("url", ""),
            })
    return results


def search_tv(query: str) -> List[Dict[str, str]]:
    """Search TV schedule by keyword (title, actor, genre)."""
    items = fetch_tv_feed()
    query_lower = query.lower()
    results = []
    for item in items:
        title = item.get("title", "")
        summary = item.get("summary", "")
        if query_lower in title.lower() or query_lower in summary.lower():
            results.append({
                "title": title,
                "summary": summary,
                "details_url": item.get("url", ""),
            })
    return results


if __name__ == "__main__":
    # Simple CLI test or fallback when executed directly
    print("📺 German TV Guide MCP Server Module")
    print(f"Data source: {SITE_URL}")
    print("\nFetching Primetime Highlights (20:15 Uhr)...")
    shows = get_primetime()
    for s in shows[:5]:
        print(f"• {s['title']}\n  URL: {s['details_url']}\n")
