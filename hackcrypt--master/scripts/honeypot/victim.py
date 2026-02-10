import requests
import time
from datetime import datetime
from flask import Flask, request, jsonify

# --- CONFIG ---
SOC_PLATFORM_URL = "http://localhost:8000"
HONEYPOT_PORT = 9000

app = Flask("Honeypot")

# In-Memory Cache of Blocked IPs (Syncs every 1 sec)
blocked_ips = set()
last_sync = 0

def sync_blocked_ips():
    global last_sync, blocked_ips
    now = time.time()
    if now - last_sync > 1: # Sync every 1s
        try:
            res = requests.get(f"{SOC_PLATFORM_URL}/api/blocked_ips", timeout=0.5)
            if res.status_code == 200:
                blocked_ips = set(res.json().get("blocked_ips", []))
                last_sync = now
        except:
            pass # SOC might be down, keep old list

@app.route("/", methods=["GET", "POST"])
def handle_request():
    sync_blocked_ips()
    
    sender_ip = request.remote_addr
    # For local demo, docker/localhost might hide real IP. 
    # If attacking from same machine, sender_ip might be 127.0.0.1
    
    # 1. CHECK BLOCKLIST
    if sender_ip in blocked_ips:
        print(f"🚫 BLOCKED REQUEST from {sender_ip}")
        return jsonify({"error": "ACCESS_DENIED_BY_FIREWALL", "reason": "Your IP is banned."}), 403

    # 2. LOG TO SOC PLATFORM
    print(f"⚠️  Suspicious Traffic from {sender_ip}")
    try:
        log_payload = {
            "source_ip": sender_ip,
            "event_type": "HONEYPOT_TRIGGER",
            "severity": "critical",
            "message": f"Unauthorized access attempt to Trap Server from {sender_ip}",
            "timestamp": datetime.now().isoformat(),
            "geo": {"country": "Unknown Local", "source": "Honeypot"}
        }
        requests.post(f"{SOC_PLATFORM_URL}/api/ingest", json=log_payload, timeout=0.1)
    except:
        pass

    return " Login Page (Vulnerable) - Enter Credentials", 200

if __name__ == "__main__":
    print(f"🪤 HONEYPOT ACTIVE on Port {HONEYPOT_PORT}")
    print("Waiting for attacks...")
    app.run(port=HONEYPOT_PORT, host="0.0.0.0")
