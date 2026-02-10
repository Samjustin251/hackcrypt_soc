# Intelligent Security Operations Monitoring & Incident Response Platform
## 18-Hour Hackathon Strict Implementation Plan

**CRITICAL STRATEGY: DEMO-FIRST, ZERO BUGS**
This plan is compressed for an 18-hour sprint. Every step focuses on **stability** and **visual impact**.

---

### **PHASE 1: THE BACKEND CORE (Hours 0-3)**
**Goal:** A stable API that receives data and broadcasts it properly.

1.  **FastAPI Setup:**
    *   Simple `main.py` (No complex folder structures yet).
    *   **CRITICAL:** Simple **In-Memory** verification first, then SQLite.
2.  **Ingestion & WebSockets:**
    *   `POST /api/ingest` (Receives logs).
    *   `WebSocket` (Pushes logs to UI).
    *   **TEST:** Verify connection stability with a python script running for 10 minutes.
3.  **Log Generator:**
    *   Create `traffic_sim.py`.
    *   Ensure it generates "Cyberpunk" looking data (SSH, BruteForce, Malware).

### **PHASE 2: REAL-TIME UI ALIVE (Hours 3-6)**
**Goal:** The Screen must be moving.

1.  **Link React to WebSocket:**
    *   Replace static table data with `useWebSocket` hook.
    *   **ZERO BUG RULE:** If WebSocket fails, fallback to static mock data transparently.
2.  **Live Feed Component:**
    *   Scrolling "Terminal Style" log view.
3.  **Counters:**
    *   Hook up "Total Events" to the real-time stream.

### **PHASE 3: THE "WOW" DEMO FLOW (Hours 6-10)**
**Goal:** Scripts that force a specific "story" for the judges.

1.  **The "Attack" Button:**
    *   Backend endpoint `POST /api/simulate/attack`.
    *   Triggers a massive influx of "Failed Login" logs AND a High Severity Alert.
2.  **Alert Popups:**
    *   Beautiful, glowing Red Toast notification when the attack starts.
3.  **Chart Integration:**
    *   Connect **One** chart (e.g., SSH Attempts) to live data.
    *   *Leave others mocked if stability is risky.*

### **PHASE 4: INCIDENT RESPONSE (Hours 10-14)**
**Goal:** Interaction.

1.  **Alert Details Page:**
    *   Clicking an alert shows "AI Analysis" (Mocked/Template text for speed).
    *   Shows a "Malicious IP" map location.
2.  **Block IP Action:**
    *   Button: "BLOCK IP [192.168.1.5]".
    *   Effect: Show "Applying Firewall Rules..." spinner -> Success Message.
    *   Effect: Live log stream changes (Stop showing logs from that IP).

### **PHASE 5: POLISH & FREEZE (Hours 14-16)**
**Goal:** Make it bulletproof.

1.  **Error Boundaries:**
    *   Wrap every component in an Error Boundary so the app *never* crashes white-screen.
2.  **Consistency:**
    *   Check all fonts are "Orbitron/Rajdhani".
    *   Check all borders are glowing.
3.  **Login Screen:**
    *   Add a simple "Enter Access Code" screen (adds "SecOps" vibe).

### **PHASE 6: REHEARSAL (Hours 16-18)**
**Goal:** Script the presentation.

1.  **Dry Run:** Perform the exact sequence:
    *   Show "Normal State".
    *   Trigger "Simulate Attack" (Hidden terminal or separate window).
    *   Show Alert.
    *   Investigate.
    *   Block IP.
    *   Show "Resolved State".

---

### **HOURLY TIMELINE BREAKDOWN**

| Hour | Activity | Checkpoint |
| :--- | :--- | :--- |
| **0-2** | **Backend Setup** (FastAPI + WebSocket + SQLite) | Can I send a JSON log and see it in the console? |
| **2-3** | **Log Generator** (Python Script) | Do I have a script that runs infinitely without error? |
| **3-5** | **Frontend Connection** (React WebSocket) | Do logs appear on the UI automatically? |
| **5-6** | **Live Charts** (Connect 1-2 charts) | Do the lines move? |
| **6-9** | **The "Attack" Scenario** (Trigger Logic) | Can I press a button and cause "Panic Mode" on screen? |
| **9-12** | **Incident Response UI** (Details & Block) | Can I click "Block" and see a feedback loop? |
| **12-14** | **Map & Visuals** (GeoIP + Polish) | Does the map look cool? (Mock data is fine for map). |
| **14-16** | **Testing & Bug Fixes** | **STOP CODING NEW FEATURES.** Fix glitches only. |
| **16-18** | **Video/Rehearsal** | Record a backup video just in case. |

**GUARANTEED MINIMUM VERSION (10 Hours in)**
If we lose time, we cut Phase 4. We will ship:
*   Live Ingestion (Real)
*   Live Dashboard (Real)
*   Attack Simulation (Scripted)
*   Visual Alerting (Real)