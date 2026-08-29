import os

erp_svg_dir = r"d:\App_Guide\assets\sop\erp"
os.makedirs(erp_svg_dir, exist_ok=True)

# Step 1: Boot Screen & Top Switch
step1_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <defs>
    <linearGradient id="screenBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="50%" stop-color="#0369A1"/>
      <stop offset="100%" stop-color="#0C4A6E"/>
    </linearGradient>
    <linearGradient id="bezel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Industrial Tablet Frame -->
  <rect x="40" y="35" width="520" height="330" rx="16" fill="url(#bezel)" stroke="#64748B" stroke-width="4"/>
  
  <!-- Top Red Slide Switch -->
  <rect x="100" y="15" width="80" height="22" rx="4" fill="#1E293B" stroke="#475569" stroke-width="2"/>
  <rect x="104" y="18" width="36" height="16" rx="3" fill="#DC2626" stroke="#EF4444" stroke-width="1.5"/>
  <path d="M90 26 L75 26 M80 20 L75 26 L80 32" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="55" y="18" fill="#F87171" font-family="sans-serif" font-size="11" font-weight="bold">开机按键</text>
  <text x="55" y="30" fill="#FCA5A5" font-family="sans-serif" font-size="9">(Gạt trái để Mở)</text>

  <!-- Main Screen Display -->
  <rect x="65" y="55" width="470" height="290" rx="8" fill="url(#screenBg)" stroke="#0F172A" stroke-width="3"/>

  <!-- Android Industrial Home Screen -->
  <!-- Status Bar -->
  <rect x="65" y="55" width="470" height="24" fill="#0F172A" opacity="0.6"/>
  <text x="80" y="71" fill="#E2E8F0" font-family="sans-serif" font-size="11" font-weight="bold">CHEN KAI INDUSTRIAL OS</text>
  <text x="490" y="71" fill="#E2E8F0" font-family="sans-serif" font-size="11">08:30 | Wi-Fi OK</text>

  <!-- App Icon: 应用程序 (Apps) -->
  <g transform="translate(130, 115)">
    <rect width="90" height="90" rx="18" fill="#22C55E" stroke="#FFFFFF" stroke-width="2" filter="url(#glow)"/>
    <!-- 4 Colored Squares inside -->
    <rect x="18" y="18" width="22" height="22" rx="4" fill="#FEF08A"/>
    <rect x="50" y="18" width="22" height="22" rx="4" fill="#EF4444"/>
    <rect x="18" y="50" width="22" height="22" rx="4" fill="#3B82F6"/>
    <rect x="50" y="50" width="22" height="22" rx="4" fill="#FFFFFF"/>
    <text x="45" y="112" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">应用程序</text>
    <text x="45" y="127" fill="#E2E8F0" font-family="sans-serif" font-size="11" text-anchor="middle">(Ứng Dụng)</text>
  </g>

  <!-- App Icon: 设置 (Settings) -->
  <g transform="translate(255, 115)">
    <rect width="90" height="90" rx="18" fill="#A855F7" stroke="#E9D5FF" stroke-width="1.5"/>
    <circle cx="45" cy="45" r="22" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-dasharray="8 4"/>
    <circle cx="45" cy="45" r="10" fill="#FFFFFF"/>
    <text x="45" y="112" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">设置</text>
  </g>

  <!-- App Icon: 浏览器 (Browser) -->
  <g transform="translate(380, 115)">
    <rect width="90" height="90" rx="18" fill="#3B82F6" stroke="#BFDBFE" stroke-width="1.5"/>
    <text x="45" y="60" fill="#FFFFFF" font-family="serif" font-size="44" font-weight="bold" text-anchor="middle">e</text>
    <text x="45" y="112" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">浏览器</text>
  </g>

  <!-- Step Highlight Overlay -->
  <rect x="118" y="105" width="114" height="135" rx="12" fill="none" stroke="#EF4444" stroke-width="3.5" stroke-dasharray="6 3"/>
  <circle cx="120" cy="105" r="14" fill="#DC2626" stroke="#FFFFFF" stroke-width="2"/>
  <text x="120" y="110" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">1</text>
</svg>'''

with open(os.path.join(erp_svg_dir, "step1_boot.svg"), "w", encoding="utf-8") as f:
    f.write(step1_svg)

# Step 2: ERP Login Icon (QiZhu IoT)
step2_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <defs>
    <linearGradient id="screenBg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#0C4A6E"/>
    </linearGradient>
  </defs>

  <rect x="40" y="35" width="520" height="330" rx="16" fill="#1E293B" stroke="#64748B" stroke-width="4"/>
  <rect x="65" y="55" width="470" height="290" rx="8" fill="url(#screenBg2)" stroke="#0F172A" stroke-width="3"/>

  <!-- App Drawer Container -->
  <rect x="90" y="80" width="420" height="240" rx="12" fill="#0F172A" opacity="0.45"/>
  <text x="300" y="115" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle">选择 ERP 应用程序 / Chọn ứng dụng ERP</text>

  <!-- QiZhu IoT App Tile (企助物联) -->
  <g transform="translate(230, 140)">
    <rect width="140" height="130" rx="20" fill="#FFFFFF" stroke="#0284C7" stroke-width="3"/>
    <!-- Logo Symbol -->
    <circle cx="70" cy="50" r="32" fill="#0284C7"/>
    <text x="70" y="62" fill="#FFFFFF" font-family="sans-serif" font-size="34" font-weight="bold" text-anchor="middle">Q</text>
    <text x="70" y="105" fill="#0F172A" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle">企助物联</text>
    <text x="70" y="120" fill="#0284C7" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">QiZhu MES App</text>
  </g>

  <!-- Red Target Focus Box & Arrow -->
  <rect x="215" y="128" width="170" height="152" rx="16" fill="none" stroke="#EF4444" stroke-width="4"/>
  <circle cx="218" cy="130" r="16" fill="#DC2626" stroke="#FFFFFF" stroke-width="2.5"/>
  <text x="218" y="136" fill="#FFFFFF" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">1</text>
  
  <path d="M300 320 L300 290 M290 300 L300 290 L310 300" stroke="#EF4444" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'''

with open(os.path.join(erp_svg_dir, "step2_erp_login.svg"), "w", encoding="utf-8") as f:
    f.write(step2_svg)

# Step 3: Login Fields (Account & Password)
step3_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <rect x="40" y="35" width="520" height="330" rx="16" fill="#1E293B" stroke="#64748B" stroke-width="4"/>
  <rect x="65" y="55" width="470" height="290" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>

  <!-- ERP Login Dialog Box -->
  <rect x="130" y="75" width="340" height="250" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"/>
  
  <!-- Header -->
  <text x="300" y="110" fill="#1E56A0" font-family="sans-serif" font-size="18" font-weight="800" text-anchor="middle">企助物联 · 用户登录</text>
  <text x="300" y="128" fill="#64748B" font-family="sans-serif" font-size="11" text-anchor="middle">Đăng nhập tài khoản công nhân ca</text>

  <!-- Account Field -->
  <g transform="translate(160, 140)">
    <rect width="280" height="38" rx="6" fill="#F1F5F9" stroke="#94A3B8" stroke-width="1.5"/>
    <text x="12" y="24" fill="#0F172A" font-family="sans-serif" font-size="13" font-weight="bold">账号 (Tài khoản): OP-8821</text>
    <!-- Annotation Badge 1 -->
    <circle cx="-12" cy="19" r="12" fill="#DC2626" stroke="#FFFFFF" stroke-width="2"/>
    <text x="-12" y="24" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">1</text>
  </g>

  <!-- Password Field -->
  <g transform="translate(160, 190)">
    <rect width="280" height="38" rx="6" fill="#F1F5F9" stroke="#94A3B8" stroke-width="1.5"/>
    <text x="12" y="24" fill="#0F172A" font-family="sans-serif" font-size="13" font-weight="bold">密码 (Mật khẩu): ••••••••</text>
    <!-- Annotation Badge 2 -->
    <circle cx="-12" cy="19" r="12" fill="#DC2626" stroke="#FFFFFF" stroke-width="2"/>
    <text x="-12" y="24" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">2</text>
  </g>

  <!-- Blue Login Button -->
  <g transform="translate(160, 245)">
    <rect width="280" height="42" rx="8" fill="#1E56A0" stroke="#1D4ED8" stroke-width="2"/>
    <text x="140" y="26" fill="#FFFFFF" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle">登 录 (Đăng Nhập)</text>
    <!-- Red Box on Login Button -->
    <rect x="-4" y="-4" width="288" height="50" rx="10" fill="none" stroke="#EF4444" stroke-width="3"/>
    <!-- Annotation Badge 3 -->
    <circle cx="-12" cy="21" r="12" fill="#DC2626" stroke="#FFFFFF" stroke-width="2"/>
    <text x="-12" y="26" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">3</text>
  </g>
</svg>'''

with open(os.path.join(erp_svg_dir, "step3_login_fields.svg"), "w", encoding="utf-8") as f:
    f.write(step3_svg)

# Step 4: Select MES Center (企助 MES 中心)
step4_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <rect x="40" y="35" width="520" height="330" rx="16" fill="#1E293B" stroke="#64748B" stroke-width="4"/>
  <rect x="65" y="55" width="470" height="290" rx="8" fill="#F0F9FF" stroke="#BAE6FD" stroke-width="2"/>

  <!-- Header -->
  <rect x="65" y="55" width="470" height="36" fill="#0284C7"/>
  <text x="85" y="78" fill="#FFFFFF" font-family="sans-serif" font-size="14" font-weight="bold">ERP 制造主菜单 / Menu Sản Xuất Chính</text>

  <!-- Tile 1: 企助 MES 中心 (Pink/Coral Target) -->
  <g transform="translate(100, 115)">
    <rect width="180" height="100" rx="12" fill="#FDA4AF" stroke="#E11D48" stroke-width="2"/>
    <text x="90" y="50" fill="#881337" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle">企助 MES 中心</text>
    <text x="90" y="70" fill="#9F1239" font-family="sans-serif" font-size="12" font-weight="600" text-anchor="middle">(Trung Tâm MES)</text>
    
    <!-- Red Focus Border -->
    <rect x="-6" y="-6" width="192" height="112" rx="16" fill="none" stroke="#EF4444" stroke-width="4"/>
    <circle cx="-6" cy="-6" r="14" fill="#DC2626" stroke="#FFFFFF" stroke-width="2"/>
    <text x="-6" y="-1" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">1</text>
    <path d="M90 120 L90 102 M80 110 L90 102 L100 110" stroke="#EF4444" stroke-width="3" stroke-linecap="round"/>
  </g>

  <!-- Tile 2: 仓库管理中心 -->
  <g transform="translate(320, 115)">
    <rect width="180" height="100" rx="12" fill="#FDE047" stroke="#CA8A04" stroke-width="1.5"/>
    <text x="90" y="55" fill="#713F12" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle">仓库管理中心</text>
    <text x="90" y="75" fill="#854D0E" font-family="sans-serif" font-size="11" text-anchor="middle">(Quản Lý Kho)</text>
  </g>

  <!-- Tile 3: 品质追溯系统 -->
  <g transform="translate(100, 235)">
    <rect width="180" height="85" rx="12" fill="#86EFAC" stroke="#16A34A" stroke-width="1.5"/>
    <text x="90" y="45" fill="#14532D" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">品质追溯系统</text>
    <text x="90" y="63" fill="#166534" font-family="sans-serif" font-size="11" text-anchor="middle">(Truy Xuất Chất Lượng)</text>
  </g>

  <!-- Tile 4: 设备维护中心 -->
  <g transform="translate(320, 235)">
    <rect width="180" height="85" rx="12" fill="#67E8F9" stroke="#0891B2" stroke-width="1.5"/>
    <text x="90" y="45" fill="#164E63" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">设备管理中心</text>
    <text x="90" y="63" fill="#155E75" font-family="sans-serif" font-size="11" text-anchor="middle">(Bảo Trì Thiết Bị)</text>
  </g>
</svg>'''

with open(os.path.join(erp_svg_dir, "step4_mes_center.svg"), "w", encoding="utf-8") as f:
    f.write(step4_svg)

# Step 5: Scale Report Icon (电子秤报工)
step5_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <rect x="40" y="35" width="520" height="330" rx="16" fill="#1E293B" stroke="#64748B" stroke-width="4"/>
  <rect x="65" y="55" width="470" height="290" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>

  <!-- Top Bar -->
  <rect x="65" y="55" width="470" height="34" fill="#1E56A0"/>
  <text x="85" y="77" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">MES 生产报工功能 / Chức Năng Báo Công MES</text>

  <!-- Function Grid -->
  <!-- Target: 电子秤报工 -->
  <g transform="translate(120, 120)">
    <rect width="160" height="150" rx="14" fill="#FFFFFF" stroke="#0284C7" stroke-width="2.5"/>
    <rect x="40" y="25" width="80" height="50" rx="8" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
    <!-- Scale icon -->
    <path d="M60 45 L100 45 M80 35 L80 60 M65 60 L95 60" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/>
    <text x="80" y="105" fill="#0F172A" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle">电子秤报工</text>
    <text x="80" y="125" fill="#0284C7" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Báo công Cân</text>
    
    <!-- Red Box Target -->
    <rect x="-6" y="-6" width="172" height="162" rx="18" fill="none" stroke="#EF4444" stroke-width="4"/>
    <circle cx="-6" cy="-6" r="14" fill="#DC2626" stroke="#FFFFFF" stroke-width="2"/>
    <text x="-6" y="-1" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">1</text>
  </g>

  <!-- Other Function: 计时报工 -->
  <g transform="translate(320, 120)">
    <rect width="160" height="150" rx="14" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <circle cx="80" cy="50" r="25" fill="#F1F5F9" stroke="#64748B" stroke-width="2"/>
    <path d="M80 35 L80 50 L92 50" stroke="#64748B" stroke-width="2.5" stroke-linecap="round"/>
    <text x="80" y="105" fill="#475569" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">工单计件报工</text>
    <text x="80" y="125" fill="#64748B" font-family="sans-serif" font-size="11" text-anchor="middle">Báo công đếm sản phẩm</text>
  </g>
</svg>'''

with open(os.path.join(erp_svg_dir, "step5_scale_report.svg"), "w", encoding="utf-8") as f:
    f.write(step5_svg)

# Step 6: Scan Station Interface (ERP 扫码过站)
step6_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <rect x="40" y="35" width="520" height="330" rx="16" fill="#1E293B" stroke="#64748B" stroke-width="4"/>
  <rect x="65" y="55" width="470" height="290" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>

  <!-- Station Header Bar -->
  <rect x="65" y="55" width="470" height="32" fill="#0F172A"/>
  <text x="80" y="76" fill="#FFFFFF" font-family="sans-serif" font-size="13" font-weight="bold">车间工序扫码过站 / Giao Diện Quét Mã Trạm</text>
  <text x="440" y="76" fill="#38BDF8" font-family="sans-serif" font-size="11">工位: STA-04</text>

  <!-- Focused Scan Input Box -->
  <g transform="translate(90, 110)">
    <text x="0" y="16" fill="#0F172A" font-family="sans-serif" font-size="14" font-weight="bold">工序扫码 (Quét mã công đoạn):</text>
    <rect x="0" y="28" width="420" height="46" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="3"/>
    <text x="16" y="58" fill="#0284C7" font-family="monospace" font-size="18" font-weight="bold">SCAN-OP-04|</text>
    <text x="320" y="56" fill="#94A3B8" font-family="sans-serif" font-size="12">自动等待扫码...</text>
    
    <!-- Red Box on Focus Field -->
    <rect x="-4" y="24" width="428" height="54" rx="10" fill="none" stroke="#EF4444" stroke-width="3.5"/>
    <circle cx="-4" cy="24" r="14" fill="#DC2626" stroke="#FFFFFF" stroke-width="2"/>
    <text x="-4" y="29" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">1</text>
  </g>

  <!-- Readout area below -->
  <g transform="translate(90, 205)">
    <rect width="420" height="110" rx="8" fill="#F1F5F9" stroke="#E2E8F0" stroke-width="1.5"/>
    <text x="16" y="30" fill="#64748B" font-family="sans-serif" font-size="13">派工单号 (Lệnh SX): 待扫描二维码...</text>
    <text x="16" y="60" fill="#64748B" font-family="sans-serif" font-size="13">产品型号 (Mã hàng): 振凯精密-PART-A20</text>
    <text x="16" y="90" fill="#059669" font-family="sans-serif" font-size="13" font-weight="bold">设备连接状态: 扫码枪 [OK] | 打印机 [OK]</text>
  </g>
</svg>'''

with open(os.path.join(erp_svg_dir, "step6_scan_screen.svg"), "w", encoding="utf-8") as f:
    f.write(step6_svg)

# Step 7: Barcode Scanning, Quantities & Print Routing Card
step7_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <rect x="40" y="35" width="520" height="330" rx="16" fill="#1E293B" stroke="#64748B" stroke-width="4"/>
  <rect x="65" y="55" width="470" height="290" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>

  <!-- Top Form Fields -->
  <g transform="translate(85, 70)">
    <!-- QR 1: 工序 -->
    <rect x="0" y="0" width="180" height="34" rx="6" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5"/>
    <text x="10" y="22" fill="#1E3A8A" font-family="sans-serif" font-size="12" font-weight="bold">① 扫工序: OP-04 [OK]</text>
    
    <!-- QR 2: 派工单号 -->
    <rect x="200" y="0" width="230" height="34" rx="6" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5"/>
    <text x="210" y="22" fill="#1E3A8A" font-family="sans-serif" font-size="12" font-weight="bold">② 扫单号: WO-2025-088 [OK]</text>
  </g>

  <!-- Quantity Inputs (OK & NG) -->
  <g transform="translate(85, 120)">
    <!-- OK Quantity -->
    <rect x="0" y="0" width="200" height="60" rx="8" fill="#ECFDF5" stroke="#10B981" stroke-width="2"/>
    <text x="15" y="24" fill="#065F46" font-family="sans-serif" font-size="12" font-weight="bold">③ 填写 OK 数量 (Số lượng OK):</text>
    <text x="15" y="48" fill="#047857" font-family="sans-serif" font-size="20" font-weight="800">1,250 PCS</text>
    <circle cx="-4" cy="0" r="11" fill="#DC2626" stroke="#FFFFFF" stroke-width="1.5"/>
    <text x="-4" y="4" fill="#FFFFFF" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">3</text>

    <!-- NG Quantity -->
    <rect x="230" y="0" width="200" height="60" rx="8" fill="#FEF2F2" stroke="#EF4444" stroke-width="1.5"/>
    <text x="245" y="24" fill="#991B1B" font-family="sans-serif" font-size="12" font-weight="bold">④ NG 数量 (Số lượng lỗi):</text>
    <text x="245" y="48" fill="#DC2626" font-family="sans-serif" font-size="20" font-weight="800">0 PCS</text>
    <circle cx="226" cy="0" r="11" fill="#DC2626" stroke="#FFFFFF" stroke-width="1.5"/>
    <text x="226" y="4" fill="#FFFFFF" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">4</text>
  </g>

  <!-- Action Buttons -->
  <g transform="translate(85, 200)">
    <!-- Submit & Print Button -->
    <rect x="0" y="0" width="240" height="50" rx="10" fill="#059669" stroke="#047857" stroke-width="2"/>
    <text x="120" y="32" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="800" text-anchor="middle">提交打印 (Gửi &amp; In)</text>
    <rect x="-4" y="-4" width="248" height="58" rx="12" fill="none" stroke="#EF4444" stroke-width="3"/>
    <circle cx="-4" cy="-4" r="12" fill="#DC2626" stroke="#FFFFFF" stroke-width="1.5"/>
    <text x="-4" y="0" fill="#FFFFFF" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">5</text>

    <!-- Reprint Button -->
    <rect x="270" y="0" width="160" height="50" rx="10" fill="#0284C7" stroke="#0369A1" stroke-width="2"/>
    <text x="350" y="32" fill="#FFFFFF" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">补打 (In Lại Tem)</text>
    <circle cx="266" cy="-4" r="12" fill="#DC2626" stroke="#FFFFFF" stroke-width="1.5"/>
    <text x="266" y="0" fill="#FFFFFF" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">6</text>
  </g>

  <!-- Routing Card Spec Preview -->
  <g transform="translate(85, 268)">
    <rect width="430" height="60" rx="6" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
    <text x="12" y="24" fill="#0F172A" font-family="sans-serif" font-size="12" font-weight="bold">📄 打印标签: 振凯工序流转卡 (Thẻ Lưu Chuyển Công Đoạn)</text>
    <text x="12" y="44" fill="#059669" font-family="sans-serif" font-size="11" font-weight="bold">✓ 状态: 报工成功，条码标签正在出纸...</text>
  </g>
</svg>'''

with open(os.path.join(erp_svg_dir, "step7_station_form.svg"), "w", encoding="utf-8") as f:
    f.write(step7_svg)

# Step 8: Printer Paper Replacement
step8_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <rect x="40" y="35" width="520" height="330" rx="16" fill="#1E293B" stroke="#64748B" stroke-width="4"/>
  
  <!-- Left Side: Printer Bay Closed Door -->
  <g transform="translate(70, 70)">
    <rect width="190" height="230" rx="10" fill="#334155" stroke="#475569" stroke-width="2"/>
    <rect x="30" y="30" width="130" height="20" rx="4" fill="#0F172A"/>
    <text x="95" y="44" fill="#E2E8F0" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">出纸口 (Paper Slot)</text>
    <rect x="30" y="70" width="130" height="120" rx="8" fill="#1E293B" stroke="#64748B" stroke-width="1.5"/>
    <text x="95" y="135" fill="#94A3B8" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">打印纸放置区</text>
    <text x="95" y="155" fill="#64748B" font-family="sans-serif" font-size="11" text-anchor="middle">(Hộp Chứa Giấy)</text>
    
    <!-- Red Annotation -->
    <rect x="-4" y="-4" width="198" height="238" rx="14" fill="none" stroke="#EF4444" stroke-width="3"/>
    <circle cx="-4" cy="-4" r="14" fill="#DC2626" stroke="#FFFFFF" stroke-width="2"/>
    <text x="-4" y="1" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">1</text>
  </g>

  <!-- Right Side: Open Bay & Correct Roll Direction -->
  <g transform="translate(290, 70)">
    <rect width="240" height="230" rx="10" fill="#0F172A" stroke="#475569" stroke-width="2"/>
    <!-- Paper Roll Top View -->
    <circle cx="120" cy="110" r="50" fill="#38BDF8" stroke="#0284C7" stroke-width="4"/>
    <circle cx="120" cy="110" r="18" fill="#0F172A" stroke="#FFFFFF" stroke-width="2"/>
    
    <!-- Direction Arrow -->
    <path d="M120 60 Q 180 60 180 110 L180 180" stroke="#EF4444" stroke-width="4" fill="none" stroke-linecap="round"/>
    <polygon points="175,180 180,195 185,180" fill="#EF4444"/>
    
    <text x="120" y="200" fill="#38BDF8" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">正面朝上 / Mặt in hướng lên</text>
    <text x="120" y="220" fill="#A7F3D0" font-family="sans-serif" font-size="12" text-anchor="middle">顺出纸槽卡紧后合盖</text>

    <!-- Red Annotation -->
    <circle cx="-4" cy="-4" r="14" fill="#DC2626" stroke="#FFFFFF" stroke-width="2"/>
    <text x="-4" y="1" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">2</text>
  </g>
</svg>'''

with open(os.path.join(erp_svg_dir, "step8_printer_paper.svg"), "w", encoding="utf-8") as f:
    f.write(step8_svg)

# Step 9: Bottom Keys Explanation
step9_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <rect x="40" y="35" width="520" height="330" rx="16" fill="#1E293B" stroke="#64748B" stroke-width="4"/>
  
  <!-- Screen Upper Area (Dimmed) -->
  <rect x="65" y="55" width="470" height="200" rx="8" fill="#0F172A" stroke="#334155" stroke-width="2"/>
  <text x="300" y="150" fill="#64748B" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle">ERP 工业平板底栏操作说明</text>
  <text x="300" y="175" fill="#475569" font-family="sans-serif" font-size="13" text-anchor="middle">Hướng dẫn 4 phím chức năng đáy màn hình</text>

  <!-- Bottom Touch Bar -->
  <rect x="65" y="265" width="470" height="80" rx="8" fill="#0284C7" stroke="#38BDF8" stroke-width="2"/>

  <!-- Key 1: 返回上一页 -->
  <g transform="translate(90, 275)">
    <circle cx="30" cy="20" r="16" fill="#0F172A" stroke="#FFFFFF" stroke-width="1.5"/>
    <polyline points="33 13 24 20 33 27" stroke="#FFFFFF" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <text x="30" y="54" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">返回上一页</text>
    <text x="30" y="66" fill="#E0F2FE" font-family="sans-serif" font-size="9" text-anchor="middle">(Quay Lại)</text>
    <circle cx="30" cy="-6" r="10" fill="#DC2626" stroke="#FFFFFF" stroke-width="1.5"/>
    <text x="30" y="-3" fill="#FFFFFF" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle">1</text>
  </g>

  <!-- Key 2: 切换界面 -->
  <g transform="translate(205, 275)">
    <circle cx="30" cy="20" r="16" fill="#0F172A" stroke="#FFFFFF" stroke-width="1.5"/>
    <rect x="22" y="12" width="16" height="16" rx="2" fill="none" stroke="#FFFFFF" stroke-width="2"/>
    <text x="30" y="54" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">切换界面</text>
    <text x="30" y="66" fill="#E0F2FE" font-family="sans-serif" font-size="9" text-anchor="middle">(Chuyển Cửa Sổ)</text>
    <circle cx="30" cy="-6" r="10" fill="#DC2626" stroke="#FFFFFF" stroke-width="1.5"/>
    <text x="30" y="-3" fill="#FFFFFF" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle">2</text>
  </g>

  <!-- Key 3: 重启 -->
  <g transform="translate(320, 275)">
    <circle cx="30" cy="20" r="16" fill="#0F172A" stroke="#FFFFFF" stroke-width="1.5"/>
    <path d="M22 20 A 8 8 0 1 1 38 20" stroke="#FFFFFF" stroke-width="2" fill="none"/>
    <polyline points="20 16 22 20 26 20" stroke="#FFFFFF" stroke-width="2" fill="none"/>
    <text x="30" y="54" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">重 启</text>
    <text x="30" y="66" fill="#E0F2FE" font-family="sans-serif" font-size="9" text-anchor="middle">(Khởi Động Lại)</text>
    <circle cx="30" cy="-6" r="10" fill="#DC2626" stroke="#FFFFFF" stroke-width="1.5"/>
    <text x="30" y="-3" fill="#FFFFFF" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle">3</text>
  </g>

  <!-- Key 4: 关机 -->
  <g transform="translate(435, 275)">
    <circle cx="30" cy="20" r="16" fill="#EF4444" stroke="#FFFFFF" stroke-width="1.5"/>
    <line x1="30" y1="12" x2="30" y2="20" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M23 15 A 9 9 0 1 0 37 15" stroke="#FFFFFF" stroke-width="2" fill="none"/>
    <text x="30" y="54" fill="#FFFFFF" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">关 机</text>
    <text x="30" y="66" fill="#E0F2FE" font-family="sans-serif" font-size="9" text-anchor="middle">(Tắt Nguồn)</text>
    <circle cx="30" cy="-6" r="10" fill="#DC2626" stroke="#FFFFFF" stroke-width="1.5"/>
    <text x="30" y="-3" fill="#FFFFFF" font-family="sans-serif" font-size="9" font-weight="bold" text-anchor="middle">4</text>
  </g>
</svg>'''

with open(os.path.join(erp_svg_dir, "step9_bottom_keys.svg"), "w", encoding="utf-8") as f:
    f.write(step9_svg)

print("Generated all high-resolution ERP SVGs successfully!")
