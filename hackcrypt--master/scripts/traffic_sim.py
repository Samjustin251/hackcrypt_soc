import requests
import time
import random
from datetime import datetime

API_URL = "http://localhost:8000/api/ingest"

# --- MOCK DATA SOURCES ---

class MockGeoIP:
    def __init__(self):
        self.ip_map = {
            "54": "USA", "203": "USA", "192": "Germany", "10": "Germany", "172": "China", "185": "China", "198": "Russia"
        }
    
    def resolve(self, ip):
        first_octet = ip.split(".")[0]
        return self.ip_map.get(first_octet, "Unknown")

geoip = MockGeoIP()

class MockAWSCloudTrail:
    def generate(self):
        # AWS usually US/EU
        ip = f"{random.choice(['54', '203'])}.{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(0,255)}"
        return {
            "source": "AWS CloudTrail",
            "event_type": "ConsoleLogin",
            "message": "Console login failed for user 'admin'",
            "severity": "medium",
            "ip": ip
        }

class MockWazuh:
    def generate(self):
        events = [
            ("SSH_LOGIN_FAILED", "Invalid user ubuntu from", "high"),
            ("SUDO_AUTH_FAILED", "pam_unix(sudo:auth): authentication failure;", "high"),
            ("SUDO_SUCCESS", "COMMAND=/usr/bin/apt-get update", "low"),
            ("SSH_KEY_WATCHER", "New authorized_key added for user deploy", "medium")
        ]
        evt = random.choice(events)
        # Internal network (Germany)
        ip = f"192.168.1.{random.randint(10, 50)}"
        return {
            "source": "Wazuh Agent",
            "event_type": evt[0],
            "message": f"{evt[1]}",
            "severity": evt[2],
            "ip": ip
        }

class MockVirusTotal:
    def generate(self):
        malware = ["EICAR-Test-Signature", "Trojan.Win32.Emotet", "Ransom.WannaCry", "Spyware.Zeus"]
        # External threats (China/Russia)
        ip = f"{random.choice(['172', '185', '198'])}.{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(0,255)}"
        return {
            "source": "VirusTotal API",
            "event_type": "MALWARE_DETECTED",
            "message": f"File hash match: {random.choice(malware)}",
            "severity": "critical",
            "ip": ip
        }

# --- GENERATOR LOGIC ---

aws = MockAWSCloudTrail()
wazuh = MockWazuh()
vt = MockVirusTotal()

def generate_log():
    # Weighted random choice to simulate realistic traffic mix
    # 50% Wazuh (Syslog/SSH/Sudo), 30% AWS, 20% VirusTotal
    source = random.choices([wazuh, aws, vt], weights=[5, 3, 2], k=1)[0]
    data = source.generate()
    country = geoip.resolve(data["ip"])

    # Enrich with timestamp and geo
    payload = {
        "source_ip": data["ip"],
        "event_type": data["event_type"],
        "severity": data["severity"],
        "message": f"[{data['source']}] {data['message']}",
        "timestamp": datetime.now().isoformat(),
        "geo": {
            "country": country,
            "source": "MaxMind GeoLite (Simulated)"
        }
    }
    return payload

def main():
    print(f"Starting Multi-Source SOC Simulator... Targeting {API_URL}")
    print("Press CTRL+C to stop.")
    
    while True:
        try:
            log = generate_log()
            requests.post(API_URL, json=log)
            print(f"[+] Sent: {log['event_type']} from {log['source_ip']}")
            
            # Rate: 10-30 logs per second for "Real Time" feel
            time.sleep(random.uniform(0.05, 0.2))
            
        except Exception as e:
            print(f"Error: {e}")
            time.sleep(1)

if __name__ == "__main__":
    main()
