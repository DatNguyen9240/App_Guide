import os
import shutil
from PIL import Image

raw_dir = r"d:\App_Guide\assets\sop\erp\docx_raw"
target_dir = r"d:\App_Guide\assets\sop\erp"
os.makedirs(target_dir, exist_ok=True)

# Map raw image to clear target names
mapping = {
    "image1.png": "eq_tablet.png",
    "image2.png": "tool_scanner.png",
    "image3.png": "tool_labels.png",
    "image4.png": "step1_thumb_switch.png",
    "image5.png": "step1_boot.png",
    "image6.png": "step2_thumb_app.png",
    "image7.png": "step2_erp_login.png",
    "image8.png": "step3_login_fields.png",
    "image9.png": "step4_thumb_mes.png",
    "image10.png": "step4_mes_center.png",
    "image11.png": "step5_thumb_scan.png",
    "image12.png": "step5_scan_report.png",
    "image13.png": "step6_thumb_receive.png",
    "image14.png": "step6_scan_station.png",
    "image15.png": "step6_routing_card.png",
    "image16.png": "step7_thumb_submit.png",
    "image17.png": "step7_thumb_submit_btn.png",
    "image18.png": "step7_thumb_reprint_btn.png",
    "image19.png": "step7_station_form.png",
    "image20.png": "step7_reprint_dialog.png",
    "image21.png": "step8_printer_door_closed.png",
    "image22.png": "step8_printer_roll_feed.png",
    "image23.png": "step9_bottom_keys.png"
}

for src_name, dst_name in mapping.items():
    src_p = os.path.join(raw_dir, src_name)
    dst_p = os.path.join(target_dir, dst_name)
    if os.path.exists(src_p):
        shutil.copy2(src_p, dst_p)
        print(f"Copied {src_name} -> {dst_name}")

# Also create a combined Step 8 image showing both Closed & Open printer bay side by side
img21_path = os.path.join(raw_dir, "image21.png")
img22_path = os.path.join(raw_dir, "image22.png")
if os.path.exists(img21_path) and os.path.exists(img22_path):
    im1 = Image.open(img21_path).convert("RGB")
    im2 = Image.open(img22_path).convert("RGB")
    
    # Target height 400
    target_h = 400
    w1 = int(im1.width * (target_h / im1.height))
    w2 = int(im2.width * (target_h / im2.height))
    im1_resized = im1.resize((w1, target_h), Image.Resampling.LANCZOS)
    im2_resized = im2.resize((w2, target_h), Image.Resampling.LANCZOS)
    
    combined = Image.new("RGB", (w1 + w2 + 20, target_h), color=(15, 23, 42))
    combined.paste(im1_resized, (0, 0))
    combined.paste(im2_resized, (w1 + 20, 0))
    
    step8_out = os.path.join(target_dir, "step8_printer_paper.png")
    combined.save(step8_out, quality=95)
    print(f"Created combined {step8_out}")

# Also for Step 6: we can make a clean main photo for Step 6 using image14.png
step6_out = os.path.join(target_dir, "step6_scan_screen.png")
if os.path.exists(os.path.join(raw_dir, "image14.png")):
    shutil.copy2(os.path.join(raw_dir, "image14.png"), step6_out)
    print("Created step6_scan_screen.png")

print("All authentic photos prepared successfully!")
