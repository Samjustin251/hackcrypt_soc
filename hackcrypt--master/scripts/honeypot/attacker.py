import requests
import time
import sys

TARGET_URL = "http://localhost:9000"

print("⚔️  STARTING ATTACK FLOOD ⚔️")
print(f"Target: {TARGET_URL}")
print("Press CTRL+C to stop.\n")

count = 0
try:
    while True:
        count += 1
        try:
            start = time.time()
            res = requests.get(TARGET_URL, timeout=1)
            duration = (time.time() - start) * 1000
            
            if res.status_code == 200:
                print(f"[{count}] 🔓 SUCCESS (200 OK) - {duration:.1f}ms - Infiltrating...")
            elif res.status_code == 403:
                print(f"[{count}] 🚫 BLOCKED (403 Forbidden) - The Firewall caught us!")
                print("\n🔥 ATTACK FAILED. SYSTEM IS SECURE. 🔥")
                break
            else:
                print(f"[{count}] Status: {res.status_code}")
                
        except Exception as e:
            print(f"[{count}] ❌ CONNECTION REFUSED - Server might be down or blocked.")
            
        time.sleep(0.1) # Fast flood (10 req/s)
        
except KeyboardInterrupt:
    print("\nAttack stopped.")
