# 🦅 PROJECT "THE TRAP": Closed-Loop Live Defense System

This plan details how to upgrade the Hackathon project from a "Simulation" to a "Real-World Defense Platform".

## 1. The Concept
We will run a real, vulnerable web server (The Victim) on your laptop. You will attack it with a script. The Dashboard will detect the attack, and when you click "BLOCK", the Victim server will **physically sever the connection** to the attacker.

## 2. Architecture
*   **Victim Server (`scripts/honeypot/victim.py`)**: A simple HTTP server running on Port 9000. It queries the Main Backend to see if an IP is blocked.
*   **The Attacker (`scripts/honeypot/attacker.py`)**: A script that floods the Victim Server with requests.
*   **Main Backend (`backend/main.py`)**: 
    *   Existing: Receives logs.
    *   New: Exposes `GET /api/blocked_ips` for the Victim Server to check.

## 3. The Demo Flow
1.  **Start the Trap**: Run `victim.py`.
2.  **Start the Attack**: Run `attacker.py`.
3.  **Witness**:
    *   Attacker terminal shows: `200 OK ... 200 OK ...`
    *   Dashboard shows: `Incoming Traffic from 127.0.0.1`.
    *   Dashboard Audio: "HIGH PRIORITY. TRAFFIC FLOOD DETECTED."
4.  **Action**:
    *   User clicks **"BLOCK IP"** on Dashboard.
5.  **Effect**:
    *   Dashboard shows "BLOCKED".
    *   **Attacker terminal instantly shows**: `403 FORBIDDEN - CONNECTION REFUSED`.

## 4. Implementation Steps
1.  Update `backend/main.py` -> Add `GET /api/blocked_ips`.
2.  Create `scripts/honeypot/` directory.
3.  Create `victim.py` (The Trap).
4.  Create `attacker.py` (The Weapon).
