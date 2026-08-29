import os
from PIL import Image

src_dir = r"C:\Users\Admin\.gemini\antigravity-ide\brain\c4dbc468-a744-49af-a6f7-f8b696a10ab8\.user_uploaded"
dest_dir = r"d:\App_Guide\assets\sop\erp"
os.makedirs(dest_dir, exist_ok=True)

img1_path = os.path.join(src_dir, "media_1787965494023.png")
img2_path = os.path.join(src_dir, "media_1787965495225.png")

print(f"Reading {img1_path} and {img2_path}...")
im1 = Image.open(img1_path)
im2 = Image.open(img2_path)

print(f"Image 1 size: {im1.size}")
print(f"Image 2 size: {im2.size}")

# Save full pages as reference
im1.save(os.path.join(dest_dir, "sop_page1_full.png"))
im2.save(os.path.join(dest_dir, "sop_page2_full.png"))

w1, h1 = im1.size
w2, h2 = im2.size

# Extract equipment images from Page 1
im1.crop((int(0.20*w1), int(0.18*h1), int(0.50*w1), int(0.35*h1))).save(os.path.join(dest_dir, "eq_tablet.png"))
im1.crop((int(0.51*w1), int(0.18*h1), int(0.79*w1), int(0.35*h1))).save(os.path.join(dest_dir, "tool_scanner.png"))
im1.crop((int(0.80*w1), int(0.18*h1), int(0.98*w1), int(0.35*h1))).save(os.path.join(dest_dir, "tool_labels.png"))

# Page 1 Steps (1 to 5)
im1.crop((int(0.70*w1), int(0.44*h1), int(0.98*w1), int(0.57*h1))).save(os.path.join(dest_dir, "step1_boot.png"))
im1.crop((int(0.70*w1), int(0.57*h1), int(0.98*w1), int(0.66*h1))).save(os.path.join(dest_dir, "step2_erp_login.png"))
im1.crop((int(0.70*w1), int(0.66*h1), int(0.98*w1), int(0.78*h1))).save(os.path.join(dest_dir, "step3_login_fields.png"))
im1.crop((int(0.70*w1), int(0.78*h1), int(0.98*w1), int(0.88*h1))).save(os.path.join(dest_dir, "step4_mes_center.png"))
im1.crop((int(0.70*w1), int(0.88*h1), int(0.98*w1), int(0.98*h1))).save(os.path.join(dest_dir, "step5_scale_report.png"))

# Page 2 Steps (6 to 9)
im2.crop((int(0.70*w2), int(0.08*h2), int(0.98*w2), int(0.20*h2))).save(os.path.join(dest_dir, "step6_scan_screen.png"))
im2.crop((int(0.70*w2), int(0.28*h2), int(0.98*w2), int(0.50*h2))).save(os.path.join(dest_dir, "step7_station_form.png"))
im2.crop((int(0.70*w2), int(0.50*h2), int(0.98*w2), int(0.63*h2))).save(os.path.join(dest_dir, "step7_routing_card.png"))
im2.crop((int(0.70*w2), int(0.63*h2), int(0.98*w2), int(0.78*h2))).save(os.path.join(dest_dir, "step7_reprint_tag.png"))
im2.crop((int(0.70*w2), int(0.78*h2), int(0.98*w2), int(0.89*h2))).save(os.path.join(dest_dir, "step8_printer_paper.png"))
im2.crop((int(0.70*w2), int(0.89*h2), int(0.98*w2), int(0.98*h2))).save(os.path.join(dest_dir, "step9_bottom_keys.png"))

print("Successfully extracted all step images!")
