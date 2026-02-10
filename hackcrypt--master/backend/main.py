from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import json
import asyncio
import subprocess
from datetime import datetime

app = FastAPI(title="SecOps SOC Platform")

# CORS - Allow all for Hackathon simplicity
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MODELS ---
class LogEntry(BaseModel):
    source_ip: str
    event_type: str
    severity: str  # low, medium, high, critical
    message: str
    timestamp: str = None
    geo: Dict = None

# --- WEBSOCKET MANAGER ---
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: Dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception as e:
                print(f"Error broadcasting: {e}")
                # Ideally remove broken connection here

manager = ConnectionManager()

# --- IN-MEMORY STORAGE (Hackathon Speed) ---
# In a real app, use SQLite/Postgres. Here, just keep last 100 logs for "recent" view.
recent_logs = []

# --- ROUTES ---

@app.get("/")
async def root():
    return {"status": "System Operational", "time": datetime.now().isoformat()}

@app.post("/api/ingest")
async def ingest_log(log: LogEntry):
    # 1. Enforce Timestamp
    if not log.timestamp:
        log.timestamp = datetime.now().isoformat()
        
    # Check if Blocked
    if log.source_ip in blocked_ips:
        return {"status": "dropped", "reason": "blocked_ip"}
    
    log_dict = log.dict()
    
    # 2. Store in Memory
    recent_logs.append(log_dict)
    if len(recent_logs) > 100:
        recent_logs.pop(0) # Keep list small
    
    # 3. Broadcast to Real-time Dashboard
    await manager.broadcast(log_dict)
    
    return {"status": "ingested", "log_id": len(recent_logs)}

import requests

# REPLACE THIS WITH YOUR OWN DISCORD WEBHOOK URL
DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/REPLACE_ME_WITH_YOUR_URL"

def send_discord_alert(message):
    if "REPLACE_ME" in DISCORD_WEBHOOK_URL:
        print("[!] Discord Webhook not configured.")
        return
    try:
        payload = {
            "content": f"@everyone 🚨 **SECURITY ALERT** 🚨\n{message}",
            "username": "SecOps Sentinel"
        }
        requests.post(DISCORD_WEBHOOK_URL, json=payload)
    except Exception as e:
        print(f"Failed to send Discord alert: {e}")

@app.post("/api/simulate/attack")
async def simulate_attack():
    # Trigger Real-World Alert
    send_discord_alert("MASSIVE INTRUSION DETECTED. IP: 10.0.99.x. Immediate action required.")

    # Generate 20 critical logs instantly
    for i in range(20):
        log = {
            "source_ip": f"10.0.99.{i + 10}",
            "event_type": "BRUTE_FORCE_FAILURE",
            "severity": "critical",
            "message": "Multiple failed login attempts detected",
            "timestamp": datetime.now().isoformat()
        }
        recent_logs.append(log)
        await manager.broadcast(log)
    
    # Broadcast a special "SYSTEM_ALERT" event to trigger UI Red Mode
    alert_event = {
        "source_ip": "SYSTEM",
        "event_type": "SYSTEM_ALERT",
        "severity": "critical",
        "message": "MASSIVE INTRUSION DETECTED - INITIATING LOCKDOWN PROTOCOLS",
        "timestamp": datetime.now().isoformat()
    }
    await manager.broadcast(alert_event)
    
    return {"status": "attack_started", "count": 21}

blocked_ips = set()

class BlockRequest(BaseModel):
    ip: str

@app.post("/api/block_ip")
async def block_ip(req: BlockRequest):
    blocked_ips.add(req.ip)
    
    # Broadcast BLOCK event
    block_event = {
        "source_ip": "FIREWALL",
        "event_type": "FIREWALL_BLOCK_RULE_ADDED",
        "severity": "low",  # Green/Good
        "message": f"Rule added: Drop all traffic from {req.ip}",
        "timestamp": datetime.now().isoformat()
    }
    await manager.broadcast(block_event)
    
    # Send Resolved Signal if it was the attack source
    # (Hackathon logic: if we block 10.0.99.x, we assume incident resolved)
    if "10.0.99" in req.ip:
        resolve_event = {
            "source_ip": "SYSTEM",
            "event_type": "INCIDENT_RESOLVED",
            "severity": "low",
            "message": "Threat neutralized. System returning to normal state.",
            "timestamp": datetime.now().isoformat()
        }
        await manager.broadcast(resolve_event)

    return {"status": "blocked", "ip": req.ip}

@app.get("/api/blocked_ips")
async def get_blocked_ips():
    return {"blocked_ips": list(blocked_ips)}

# --- SIMULATION CONTROL ---
sim_process = None

@app.post("/api/sim/start")
def start_sim():
    global sim_process
    if sim_process is None:
        # Adjust path as needed for Windows
        sim_process = subprocess.Popen(["python", "scripts/traffic_sim.py"], shell=True)
        return {"status": "started"}
    return {"status": "already_running"}

@app.post("/api/sim/stop")
def stop_sim():
    global sim_process
    if sim_process:
        subprocess.run(f"taskkill /F /T /PID {sim_process.pid}", shell=True)
        sim_process = None
        return {"status": "stopped"}
    return {"status": "not_running"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        # Send recent history immediately so screen isn't empty
        for log in recent_logs:
            await websocket.send_json(log)
            
        while True:
            # Keep connection alive
            data = await websocket.receive_text()
            # We don't really expect data from client, but we need to listen
    except WebSocketDisconnect:
        manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    # Run with reloader for hackathon hot-fixes
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
