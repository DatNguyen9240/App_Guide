import os

svg_qc_dir = r"d:\App_Guide\assets\sop\qc"
svg_wh_dir = r"d:\App_Guide\assets\sop\warehouse"
svg_cnc_dir = r"d:\App_Guide\assets\sop\cnc"
svg_print_dir = r"d:\App_Guide\assets\sop\printer"

for d in [svg_qc_dir, svg_wh_dir, svg_cnc_dir, svg_print_dir]:
    os.makedirs(d, exist_ok=True)

# QC Visual Assets
with open(os.path.join(svg_qc_dir, "step1_caliper.svg"), "w", encoding="utf-8") as f:
    f.write('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <defs>
    <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="50%" stop-color="#CBD5E1"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="600" height="400" fill="#0F172A"/>
  <!-- Work bench grid -->
  <path d="M0 300 L600 300 M0 340 L600 340 M0 380 L600 380 M100 280 L100 400 M200 280 L200 400 M300 280 L300 400 M400 280 L400 400 M500 280 L500 400" stroke="#1E293B" stroke-width="1.5"/>
  
  <!-- Digital Caliper -->
  <g filter="url(#shadow)">
    <!-- Main Beam -->
    <rect x="80" y="160" width="440" height="28" rx="3" fill="url(#metal)"/>
    <!-- Metric markings -->
    <path d="M120 160 v10 M140 160 v15 M160 160 v10 M180 160 v10 M200 160 v20 M220 160 v10 M240 160 v10 M260 160 v10 M280 160 v10 M300 160 v20 M320 160 v10 M340 160 v10 M360 160 v10 M380 160 v10 M400 160 v20" stroke="#475569" stroke-width="2"/>
    <!-- Fixed Jaw -->
    <path d="M80 160 L80 90 L100 110 L100 160 Z" fill="#64748B"/>
    <path d="M80 188 L80 270 L110 240 L110 188 Z" fill="#64748B"/>
    <!-- Sliding Jaw & Digital Unit -->
    <rect x="230" y="130" width="130" height="90" rx="8" fill="#1E293B" stroke="#38BDF8" stroke-width="2"/>
    <!-- LCD Screen -->
    <rect x="245" y="145" width="100" height="40" rx="4" fill="#0284C7"/>
    <text x="295" y="172" fill="#FFFFFF" font-family="monospace" font-size="20" font-weight="bold" text-anchor="middle">12.54 mm</text>
    <text x="335" y="158" fill="#BAE6FD" font-family="sans-serif" font-size="9">HOLD</text>
    <!-- Buttons -->
    <circle cx="260" cy="205" r="8" fill="#EF4444"/>
    <text x="260" y="208" fill="#FFF" font-size="7" font-weight="bold" text-anchor="middle">ZERO</text>
    <circle cx="295" cy="205" r="8" fill="#F59E0B"/>
    <text x="295" y="208" fill="#FFF" font-size="7" font-weight="bold" text-anchor="middle">mm/in</text>
    <circle cx="330" cy="205" r="8" fill="#10B981"/>
    <text x="330" y="208" fill="#FFF" font-size="7" font-weight="bold" text-anchor="middle">ON/OFF</text>
    <!-- Sliding Jaws -->
    <path d="M230 130 L230 90 L210 110 L210 130 Z" fill="#94A3B8"/>
    <path d="M230 220 L230 270 L200 240 L200 220 Z" fill="#94A3B8"/>
    <!-- Measured Part -->
    <rect x="115" y="210" width="80" height="45" rx="4" fill="#F43F5E" stroke="#FFE4E6" stroke-width="2"/>
    <text x="155" y="238" fill="#FFFFFF" font-size="12" font-weight="bold" text-anchor="middle">SAMPLE A-1</text>
  </g>
  <!-- Measurement arrows -->
  <line x1="115" y1="265" x2="195" y2="265" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow)" stroke-dasharray="4"/>
  <text x="155" y="285" fill="#38BDF8" font-size="13" font-weight="bold" text-anchor="middle">↔ Spec: 12.50 ± 0.05 mm</text>
</svg>''')

with open(os.path.join(svg_qc_dir, "step2_visual_scratch.svg"), "w", encoding="utf-8") as f:
    f.write('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <rect width="600" height="400" fill="#0F172A"/>
  <!-- Inspection Lamp Lighting -->
  <path d="M300 20 L100 380 L500 380 Z" fill="url(#lampLight)" opacity="0.15"/>
  <defs>
    <linearGradient id="lampLight" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
  </defs>
  <!-- Metal casing inspection piece -->
  <rect x="150" y="100" width="300" height="200" rx="16" fill="#1E293B" stroke="#475569" stroke-width="3"/>
  <circle cx="200" cy="150" r="16" fill="#0F172A" stroke="#64748B" stroke-width="2"/>
  <circle cx="400" cy="150" r="16" fill="#0F172A" stroke="#64748B" stroke-width="2"/>
  <!-- Scratch Defect -->
  <path d="M260 170 Q 300 190 340 175" stroke="#EF4444" stroke-width="3" fill="none"/>
  <!-- Dent defect -->
  <ellipse cx="280" cy="230" rx="14" ry="8" fill="#DC2626" opacity="0.6"/>
  
  <text x="300" y="60" fill="#E2E8F0" font-size="18" font-weight="bold" text-anchor="middle">Kiểm tra lỗi bề mặt / 表面缺陷检验</text>
</svg>''')

# Warehouse Assets
with open(os.path.join(svg_wh_dir, "step1_pallet_barcode.svg"), "w", encoding="utf-8") as f:
    f.write('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <rect width="600" height="400" fill="#0B132B"/>
  <!-- Wooden Pallet -->
  <rect x="120" y="280" width="360" height="30" rx="3" fill="#B45309"/>
  <rect x="150" y="310" width="40" height="20" fill="#78350F"/>
  <rect x="280" y="310" width="40" height="20" fill="#78350F"/>
  <rect x="410" y="310" width="40" height="20" fill="#78350F"/>
  
  <!-- Boxes on Pallet -->
  <rect x="140" y="150" width="150" height="130" rx="4" fill="#D97706" stroke="#B45309" stroke-width="2"/>
  <rect x="300" y="150" width="160" height="130" rx="4" fill="#F59E0B" stroke="#D97706" stroke-width="2"/>
  
  <!-- Pallet Barcode Label -->
  <rect x="330" y="180" width="100" height="70" rx="4" fill="#FFFFFF" stroke="#0F172A" stroke-width="2"/>
  <text x="380" y="200" fill="#0F172A" font-size="10" font-weight="bold" text-anchor="middle">LOT-202506-A</text>
  <!-- Barcode stripes -->
  <path d="M345 210 v25 M350 210 v25 M353 210 v25 M360 210 v25 M365 210 v25 M370 210 v25 M378 210 v25 M385 210 v25 M392 210 v25 M400 210 v25 M408 210 v25 M415 210 v25" stroke="#0F172A" stroke-width="2"/>
  
  <!-- Handheld Scanner Laser -->
  <path d="M220 80 L350 220 L410 220 Z" fill="#EF4444" opacity="0.25"/>
  <line x1="330" y1="220" x2="430" y2="220" stroke="#EF4444" stroke-width="3"/>
  <text x="300" y="60" fill="#38BDF8" font-size="18" font-weight="bold" text-anchor="middle">Quét mã vạch kiện hàng / 扫描托盘条码</text>
</svg>''')

# CNC Setup Assets
with open(os.path.join(svg_cnc_dir, "step1_cnc_panel.svg"), "w", encoding="utf-8") as f:
    f.write('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <rect width="600" height="400" fill="#1E293B"/>
  <!-- CNC Control Panel Housing -->
  <rect x="80" y="50" width="440" height="300" rx="12" fill="#334155" stroke="#64748B" stroke-width="3"/>
  <!-- CRT Screen -->
  <rect x="110" y="80" width="220" height="150" rx="6" fill="#047857" stroke="#10B981" stroke-width="2"/>
  <text x="130" y="110" fill="#A7F3D0" font-family="monospace" font-size="13">G00 X0.00 Y0.00 Z50.0</text>
  <text x="130" y="135" fill="#A7F3D0" font-family="monospace" font-size="13">FEED RATE: 100%</text>
  <text x="130" y="160" fill="#A7F3D0" font-family="monospace" font-size="13">SPINDLE: 3500 RPM</text>
  <text x="130" y="195" fill="#FEF08A" font-family="monospace" font-size="14" font-weight="bold">> READY TO CYCLE START</text>
  
  <!-- Emergency Stop Button -->
  <circle cx="430" cy="120" r="32" fill="#DC2626" stroke="#991B1B" stroke-width="4"/>
  <circle cx="430" cy="120" r="22" fill="#EF4444"/>
  <text x="430" y="170" fill="#FCA5A5" font-size="10" font-weight="bold" text-anchor="middle">E-STOP</text>
  
  <!-- Cycle Start / Hold Buttons -->
  <rect x="360" y="200" width="60" height="45" rx="6" fill="#10B981" stroke="#059669" stroke-width="2"/>
  <text x="390" y="228" fill="#FFFFFF" font-size="11" font-weight="bold" text-anchor="middle">CYCLE</text>
  <text x="390" y="239" fill="#D1FAE5" font-size="9" text-anchor="middle">START</text>
  
  <rect x="440" y="200" width="60" height="45" rx="6" fill="#F59E0B" stroke="#D97706" stroke-width="2"/>
  <text x="470" y="228" fill="#FFFFFF" font-size="11" font-weight="bold" text-anchor="middle">FEED</text>
  <text x="470" y="239" fill="#FEF3C7" font-size="9" text-anchor="middle">HOLD</text>
  
  <!-- Rotary Mode Switch -->
  <circle cx="220" cy="290" r="30" fill="#1E293B" stroke="#475569" stroke-width="2"/>
  <line x1="220" y1="290" x2="235" y2="270" stroke="#38BDF8" stroke-width="4" stroke-linecap="round"/>
  <text x="220" y="338" fill="#94A3B8" font-size="11" text-anchor="middle">AUTO / JOG / EDIT</text>
</svg>''')

# Printer assets
with open(os.path.join(svg_print_dir, "step1_open_latch.svg"), "w", encoding="utf-8") as f:
    f.write('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <rect width="600" height="400" fill="#0F172A"/>
  <!-- Industrial Barcode Printer Body -->
  <rect x="150" y="120" width="300" height="220" rx="12" fill="#334155" stroke="#64748B" stroke-width="3"/>
  <!-- Printer Cover open angle -->
  <path d="M150 120 L280 40 L450 120 Z" fill="#475569" stroke="#94A3B8" stroke-width="2"/>
  <!-- Paper roll core inside -->
  <circle cx="280" cy="190" r="45" fill="#38BDF8" stroke="#0284C7" stroke-width="4"/>
  <circle cx="280" cy="190" r="16" fill="#0F172A"/>
  <!-- Green release latch -->
  <rect x="360" y="160" width="40" height="24" rx="4" fill="#10B981" stroke="#059669" stroke-width="2"/>
  <text x="380" y="176" fill="#FFFFFF" font-size="10" font-weight="bold" text-anchor="middle">OPEN</text>
  <text x="300" y="70" fill="#F8FAFC" font-size="18" font-weight="bold" text-anchor="middle">Mở nắp khoang nhãn / 打开打印机仓门</text>
</svg>''')

print("Generated all auxiliary visual assets successfully!")
