import os
import re

# Read data.js and extract all image paths
with open(r"d:\App_Guide\js\data.js", "r", encoding="utf-8") as f:
    content = f.read()

img_paths = re.findall(r'["\'](\./assets/[^"\']+)["\']', content)
print(f"Found {len(img_paths)} asset references in data.js")

missing = []
for p in set(img_paths):
    rel_path = p.replace("./", "").replace("/", os.sep)
    abs_path = os.path.join(r"d:\App_Guide", rel_path)
    if not os.path.exists(abs_path):
        missing.append((p, abs_path))
    else:
        print(f"[OK] {p} ({os.path.getsize(abs_path)} bytes)")

if missing:
    print(f"FAILED: {len(missing)} missing files!")
    for p, ab in missing:
        print(f" - {p} -> {ab}")
else:
    print("ALL ASSET REFERENCES EXIST AND ARE VALID!")
