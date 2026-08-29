// WorkGuide SOP Dataset (Bilingual: Vietnamese & Simplified Chinese)
export const guidesData = [
  {
    id: "sop-erp-tablet",
    category: "catERP",
    plantId: "plantChenKai",
    sopNumber: "SOP-ERP-048",
    revision: "v1.5.48 (2025-06-12)",
    company: {
      vi: "Công ty TNHH Công Nghiệp Chính Xác Chen Kai",
      zh: "振凯精密工业责任有限公司"
    },
    title: {
      vi: "Thao tác Máy tính bảng Công nghiệp ERP",
      zh: "ERP 工业平板操作"
    },
    subtitle: {
      vi: "Quy trình mở máy, đăng nhập, báo công MES và quét mã过站",
      zh: "开机、登录、MES报工及扫码过站标准作业流程"
    },
    coverImage: "./assets/sop/erp/eq_tablet.png",
    durationMinutes: 10,
    difficulty: "diffMedium",
    tools: [
      {
        name: { vi: "Máy tính bảng công nghiệp", zh: "工业平板" },
        icon: "tablet",
        image: "./assets/sop/erp/eq_tablet.png"
      },
      {
        name: { vi: "Súng quét mã vạch 2D", zh: "扫码器" },
        icon: "barcode-scanner",
        image: "./assets/sop/erp/tool_scanner.png"
      },
      {
        name: { vi: "Cuộn nhãn in nhiệt", zh: "标签纸" },
        icon: "tag",
        image: "./assets/sop/erp/tool_labels.png"
      }
    ],
    prerequisites: {
      vi: "Đảm bảo kết nối nguồn điện, dây mạng LAN, cắm súng quét mã vạch USB và nạp sẵn giấy in nhiệt.",
      zh: "连接电源、网络、扫码枪、设置打印机放置打印纸完成后方可开机作业。"
    },
    steps: [
      {
        stepNumber: 1,
        name: {
          vi: "Khởi động & Mở ứng dụng",
          zh: "开机界面"
        },
        image: "./assets/sop/erp/step1_boot.png",
        instructions: {
          vi: [
            "Kiểm tra kết nối nguồn, mạng, súng quét và máy in hoàn tất.",
            "Ở đỉnh trên máy tính bảng, gạt nút màu đỏ bên trái sang để mở nguồn thiết bị.",
            "Tại màn hình chính Android, chạm vào biểu tượng [Ứng dụng] (应用程序) để vào danh mục ứng dụng."
          ],
          zh: [
            "连接电源、网络、扫码枪、设置打印机完成后。",
            "在平板顶部，左边“红色键”为“开机按键”，直接开机，进入平板主界面。",
            "点击“应用程序”，进入 ERP 安装程序界面。"
          ]
        },
        warning: {
          vi: "Đảm bảo các dây cáp không bị kẹt hay lỏng trước khi gạt nút mở nguồn.",
          zh: "开机前确保各线缆未受夹挤且连接牢固。"
        }
      },
      {
        stepNumber: 2,
        name: {
          vi: "Đăng nhập ứng dụng ERP",
          zh: "ERP 登录"
        },
        image: "./assets/sop/erp/step2_erp_login.png",
        instructions: {
          vi: [
            "Trên màn hình danh sách ứng dụng, tìm biểu tượng APP [企助物联] (QiZhu IoT).",
            "Chạm trực tiếp vào biểu tượng để khởi chạy hệ thống ERP sản xuất."
          ],
          zh: [
            "直接在平板主界面触屏点击“企助物联” APP 图标。",
            "进入 ERP 登录与系统主界面。"
          ]
        },
        warning: {
          vi: "Nếu ứng dụng không phản hồi, kiểm tra biểu tượng mạng trên thanh trạng thái.",
          zh: "若应用无响应，请先确认状态栏网络连接是否正常。"
        }
      },
      {
        stepNumber: 3,
        name: {
          vi: "Nhập tài khoản & Mật khẩu",
          zh: "ERP 登录验证"
        },
        image: "./assets/sop/erp/step3_login_fields.png",
        instructions: {
          vi: [
            "Chạm vào ô [账号] (Tài khoản) và nhập mã số nhân viên của bạn.",
            "Chạm vào ô [密码] (Mật khẩu) và nhập mật khẩu ca làm việc.",
            "Nhấn nút màu xanh [登录] (Đăng nhập) ở phía dưới cùng để vào giao diện tác nghiệp."
          ],
          zh: [
            "手指触屏，录入使用人的账户、密码。",
            "点击平板最下方的“蓝色登录键”，进入 ERP 操作界面。"
          ]
        },
        warning: {
          vi: "Tuyệt đối không dùng chung tài khoản với người khác để đảm bảo dữ liệu truy xuất chính xác.",
          zh: "严禁借用他人账号报工，确保工单追溯责任准确。"
        }
      },
      {
        stepNumber: 4,
        name: {
          vi: "Chọn Trung tâm MES",
          zh: "ERP 报工操作 - 企助 MES 中心"
        },
        image: "./assets/sop/erp/step4_mes_center.png",
        instructions: {
          vi: [
            "Tại menu chức năng chính của ERP, định vị ô chức năng MES.",
            "Chạm vào ô màu hồng [企助 MES 中心] (Trung tâm MES 企助)."
          ],
          zh: [
            "手指触屏点击“企助 MES 中心”功能磁贴。",
            "进入制造执行系统工序选择界面。"
          ]
        },
        warning: {
          vi: "Chỉ chọn đúng phân hệ MES được phân công theo ca làm việc.",
          zh: "请按当班计划进入对应的 MES 模块。"
        }
      },
      {
        stepNumber: 5,
        name: {
          vi: "Chọn Quét mã Báo công",
          zh: "ERP 报工操作 - 扫码报工"
        },
        image: "./assets/sop/erp/step5_scan_report.png",
        instructions: {
          vi: [
            "Trong giao diện MES, tìm biểu tượng [扫码报工] (Quét mã Báo công).",
            "Chạm trực tiếp vào biểu tượng để mở màn hình quét mã trạm và tiếp nhận sản xuất."
          ],
          zh: [
            "手指触屏点击“扫码报工”功能图标。",
            "进入 ERP 扫码过站与接收主界面。"
          ]
        },
        warning: {
          vi: "Đảm bảo súng quét mã vạch đã sáng đèn laser sẵn sàng tiếp nhận tín hiệu.",
          zh: "确认扫码枪红外指示灯已亮起并处于待机就绪状态。"
        }
      },
      {
        stepNumber: 6,
        name: {
          vi: "ERP Tiếp nhận Hàng hóa (Vật liệu / Khởi động công đoạn)",
          zh: "ERP货物接收（材料/开工接收）"
        },
        image: "./assets/sop/erp/step6_scan_station.png",
        instructions: {
          vi: [
            "Vào màn hình quét mã ERP: Sau khi nhận hàng, bắt buộc phải nhấn nút [接收] (Tiếp nhận).",
            "Quan sát con trỏ nhập liệu: con trỏ sẽ tự động nhấp nháy tại ô [当前工序] (Công đoạn hiện tại).",
            "Dùng súng quét mã bắn lần lượt: ① Quét mã QR 'Công đoạn' -> ② Quét mã QR 'Lệnh sản xuất' trên thẻ lưu chuyển.",
            "Kiểm tra số lượng thực tế: Đối chiếu và điền 'Số lượng tiếp nhận'. Khi số lượng thực tế khớp với số tiếp nhận, nhấn [接收] để hoàn tất.",
            "LƯU Ý QUAN TRỌNG: Tuyệt đối không tự ý sửa đổi số lượng tiếp nhận nhỏ hơn số lượng thực tế!"
          ],
          zh: [
            "进入 ERP 扫码界面：在收到货物后必须先做接收，点击“接收”；",
            "光标会自动停在“当前工序”栏位上，开始使用“扫码器”扫生产履历卡二维码：",
            "1. 扫“工序”二维码；",
            "2. 扫“派工单号”二维码；",
            "3. 接收生产履历卡“实物数量”。",
            "注意事项：核对填写“接收数”，实物数与接收数一致时直接点“接收”完成。严禁手动修改使接收数 < 实物数。"
          ]
        },
        warning: {
          vi: "⚠ CHÚ Ý: Không được phép chỉnh sửa thủ công khiến Số lượng tiếp nhận < Số lượng thực tế trên thẻ!",
          zh: "⚠ 注意事项：不允许手动修改使“接收数 < 实物数”！"
        }
      },
      {
        stepNumber: 7,
        name: {
          vi: "Quét mã Qua trạm (Nộp hoàn công & In tem)",
          zh: "扫码过站（完工提交）"
        },
        image: "./assets/sop/erp/step7_station_form.png",
        instructions: {
          vi: [
            "Vào màn hình quét mã ERP: Bộ phận sản xuất quét mã báo công hoàn thành, nhấn nút [提交] (Nộp).",
            "Con trỏ tự động nhấp nháy tại ô [当前工序] (Công đoạn hiện tại). Dùng súng quét mã bắn: ① Mã QR 'Công đoạn' -> ② Mã QR 'Lệnh sản xuất' trên thẻ lưu chuyển.",
            "Điền số lượng sản phẩm Đạt vào ô [OK].",
            "Điền số lượng sản phẩm Lỗi vào ô [NG品] (nếu có).",
            "Nhấn nút [提交打印] (Gửi & In) để hoàn tất báo công.",
            "XỬ LÝ SỰ CỐ IN: Nếu tem chưa in ra, KHÔNG thoát màn hình, bấm trực tiếp nút [打印] (In lại) để in bổ sung tem báo công."
          ],
          zh: [
            "进入 ERP 扫码界面：制造部门完工品扫码报工，点击“提交”；",
            "光标会自动停在“当前工序”栏位上，使用“扫码器”扫生产履历卡二维码：",
            "1. 扫“工序”二维码；",
            "2. 扫“派工单号”二维码；",
            "3. 填写报工数“OK”数量；",
            "4. 填写不良数“NG品”数量（如有）；",
            "5. 点击“提交打印”，完成。",
            "打印异常处理：工序流转卡标签未正常打印，不要退出打印界面，可直接在当前界面重新点击“打印”即可打印此张报工标签。"
          ]
        },
        warning: {
          vi: "⚠ QUAN TRỌNG: Kiểm tra kỹ số lượng OK và NG trên phiếu thực tế trước khi bấm Gửi & In!",
          zh: "⚠ 重要提示：提交前务必仔细核对实物数量与系统数量一致！"
        }
      },
      {
        stepNumber: 8,
        name: {
          vi: "Thay & Lắp giấy cuộn in tem",
          zh: "打印纸（放置或更换）"
        },
        image: "./assets/sop/erp/step8_printer_paper.png",
        instructions: {
          vi: [
            "Tại khoang chứa máy in bên dưới tablet, nhấn mở nắp hộp giấy.",
            "Đặt cuộn nhãn mới vào khay sao cho mặt in ngửa lên trên đúng chiều.",
            "Kéo mép giấy nhãn nhô ra khe thoát giấy rồi đóng chặt nắp nẹp."
          ],
          zh: [
            "打印机：在平板下方“打印纸”放置区，打开盖子。",
            "打印纸：将打印纸“正面”放置到位，顺出纸口槽 OK 后关闭即可。"
          ]
        },
        warning: {
          vi: "Không kéo mạnh giấy khi đầu in đang kẹp nhiệt để tránh xước đầu kim in.",
          zh: "打印头压紧时严禁硬扯纸张，以防划伤热敏打印头。"
        }
      },
      {
        stepNumber: 9,
        name: {
          vi: "Hướng dẫn các phím chức năng đáy",
          zh: "其他快捷操作说明"
        },
        image: "./assets/sop/erp/step9_bottom_keys.png",
        instructions: {
          vi: [
            "Thanh phím vật lý/cảm ứng dưới đáy máy tính bảng gồm 4 chức năng:",
            "① Phím [返回上一页] : Quay lại trang trước.",
            "② Phím [切换界面] : Chuyển đổi nhanh giữa các ứng dụng đang chạy.",
            "③ Phím [重启] : Khởi động lại hệ thống máy tính bảng khi bị đơ.",
            "④ Phím [关机] : Tắt nguồn hoàn toàn máy tính bảng cuối ca làm việc."
          ],
          zh: [
            "平板屏幕最下方的按键功能说明：",
            "① [返回上一页] ：返回上级界面；",
            "② [切换界面] ：多任务窗口切换；",
            "③ [重启] ：系统卡顿时代重启平板；",
            "④ [关机] ：下班后安全关闭设备电源。"
          ]
        },
        warning: {
          vi: "Khi giao ca, chỉ tắt màn hình hoặc đăng xuất, chỉ tắt nguồn khi có lệnh bảo trì định kỳ.",
          zh: "交接班时仅需登出账号，定期维护时方可执行关机操作。"
        }
      }
    ]
  },
  {
    id: "sop-qc-caliper",
    category: "catQC",
    plantId: "plantChenKai",
    sopNumber: "SOP-QC-2025-012",
    revision: "v2.1.0",
    company: {
      vi: "Bộ Phận Đảm Bảo Chất Lượng (QA/QC)",
      zh: "品质保证部 (QA/QC)"
    },
    title: {
      vi: "Kiểm tra Kích thước & Ngoại quan Bằng Thước kẹp Điện tử",
      zh: "数显卡尺尺寸与外观检验规范"
    },
    subtitle: {
      vi: "Quy chuẩn lấy mẫu kiểm tra dung sai ±0.05mm và phát hiện lỗi trầy xước",
      zh: "抽样检验、±0.05mm 公差测量及外观划痕判据"
    },
    coverImage: "./assets/sop/qc/step1_caliper.svg",
    durationMinutes: 6,
    difficulty: "diffEasy",
    tools: [
      { name: { vi: "Thước kẹp điện tử Mitutoyo", zh: "数显游标卡尺" }, icon: "ruler", image: "./assets/sop/qc/step1_caliper.svg" },
      { name: { vi: "Đèn kiểm tra khuyết tật LED", zh: "高亮检验光源" }, icon: "lamp", image: "./assets/sop/qc/step2_visual_scratch.svg" }
    ],
    prerequisites: {
      vi: "Hiệu chuẩn điểm 0 của thước kẹp và đeo găng tay chống tĩnh điện ESD.",
      zh: "卡尺清零校准，佩戴防静电防刮花手套。"
    },
    steps: [
      {
        stepNumber: 1,
        name: { vi: "Kiểm tra điểm 0 của thước kẹp", zh: "卡尺归零校准" },
        image: "./assets/sop/qc/step1_caliper.svg",
        instructions: {
          vi: [
            "Lau sạch mỏ đo của thước kẹp bằng khăn không bụi.",
            "Đóng kín hai mỏ đo nhẹ nhàng.",
            "Nhấn nút [ZERO] màu đỏ để màn hình LCD hiển thị chính xác '0.00 mm'."
          ],
          zh: [
            "使用无尘布擦拭卡尺内外测量爪。",
            "轻推测量爪贴合闭合。",
            "按下红色 [ZERO] 按钮，确认 LCD 屏幕显示 '0.00 mm'。"
          ]
        },
        warning: {
          vi: "Nếu màn hình hiển thị chớp nháy hoặc sai số, thay pin hoặc đổi thước mới.",
          zh: "若显示跳动或无法归零，请更换备用量具。"
        },
        annotations: [
          { type: "badge", number: 1, x: 44, y: 52, label: { vi: "Nút ZERO", zh: "归零键" } },
          { type: "box", x: 40, y: 35, width: 20, height: 15, label: { vi: "Màn hình LCD", zh: "数显屏幕" } }
        ]
      },
      {
        stepNumber: 2,
        name: { vi: "Đo kích thước mẫu A-1", zh: "测量工件关键尺寸" },
        image: "./assets/sop/qc/step1_caliper.svg",
        instructions: {
          vi: [
            "Kẹp chi tiết cần đo vào giữa hai mỏ đo ngoài.",
            "Giữ lực đo vừa phải, không ép quá chặt.",
            "Đọc chỉ số: Kích thước đạt tiêu chuẩn là 12.50 ± 0.05 mm (từ 12.45 đến 12.55 mm)."
          ],
          zh: [
            "将待测工件放置于外量爪中心基准位。",
            "匀速微调旋钮，适度接触。",
            "读取数值：标准公差要求为 12.50 ± 0.05 mm (合格区间 12.45 ~ 12.55 mm)。"
          ]
        },
        warning: {
          vi: "Ghi nhận NG ngay lập tức nếu kích thước vượt ngoài phạm vi dung sai.",
          zh: "超出公差范围立即判定 NG 并隔离批次。"
        },
        annotations: [
          { type: "box", x: 20, y: 50, width: 18, height: 20, label: { vi: "Vị trí kẹp mẫu", zh: "工件夹持位" } }
        ]
      },
      {
        stepNumber: 3,
        name: { vi: "Soi khuyết tật ngoại quan bề mặt", zh: "表面外观缺陷检验" },
        image: "./assets/sop/qc/step2_visual_scratch.svg",
        instructions: {
          vi: [
            "Đặt sản phẩm dưới đèn LED độ rọi 1000 Lux ở góc nghiêng 45 độ.",
            "Xoay chi tiết 360 độ để kiểm tra vết xước, móp méo hoặc ba via.",
            "Đối chiếu bảng mẫu giới hạn lỗi (Limit Sample)."
          ],
          zh: [
            "将工件置于 1000 Lux 检验光源下，呈 45 度角观察。",
            "旋转 360 度目视检查有无划伤、凹痕、毛刺或色差。",
            "严格比对限度样品 (Limit Sample)。"
          ]
        },
        warning: {
          vi: "Vết xước dài trên 2mm trên bề mặt A là lỗi NG nghiêm trọng.",
          zh: "A 面划痕长度大于 2mm 属于严重缺陷，直接判退。"
        },
        annotations: [
          { type: "box", x: 42, y: 40, width: 20, height: 18, label: { vi: "Vết xước NG", zh: "划伤缺陷处" } }
        ]
      }
    ]
  },
  {
    id: "sop-wh-staging",
    category: "catWarehouse",
    plantId: "plantChenKai",
    sopNumber: "SOP-WH-2025-008",
    revision: "v1.2.0",
    company: {
      vi: "Phòng Quản Lý Kho & Hậu Cần",
      zh: "仓库与物流管理部"
    },
    title: {
      vi: "Nhập kho Nguyên vật liệu & Quét mã Pallet",
      zh: "仓库物料入库与托盘条码核对"
    },
    subtitle: {
      vi: "Quy trình kiểm đếm số lượng, đối chiếu mã PO và dán tem định vị",
      zh: "来料清点、PO核对、PDA扫码及货位上架作业"
    },
    coverImage: "./assets/sop/warehouse/step1_pallet_barcode.svg",
    durationMinutes: 8,
    difficulty: "diffEasy",
    tools: [
      { name: { vi: "Máy kiểm kho PDA cầm tay", zh: "手持 PDA" }, icon: "barcode-scanner", image: "./assets/sop/erp/tool_scanner.png" },
      { name: { vi: "Xe nâng tay thủy lực", zh: "手动液压叉车" }, icon: "truck", image: "./assets/sop/warehouse/step1_pallet_barcode.svg" }
    ],
    prerequisites: {
      vi: "Đảm bảo khu vực bốc dỡ khô ráo và mang giày bảo hộ mũi thép.",
      zh: "作业区保持干燥无障碍物，穿戴防砸劳保鞋。"
    },
    steps: [
      {
        stepNumber: 1,
        name: { vi: "Quét mã vạch kiện hàng Pallet", zh: "扫描托盘条码" },
        image: "./assets/sop/warehouse/step1_pallet_barcode.svg",
        instructions: {
          vi: [
            "Bật máy quét PDA, mở chức năng [Nhập kho nguyên liệu].",
            "Bắn tia laser quét mã vạch LOT dán trên góc ngoài của pallet.",
            "Kiểm tra âm thanh 'Bíp' báo hiệu quét thành công."
          ],
          zh: [
            "开启手持 PDA，进入【原材料入库】功能模块。",
            "将红外激光对准托盘外侧 LOT 批次条码进行扫描。",
            "确认 PDA 蜂鸣提示音响起且数据回显。"
          ]
        },
        warning: {
          vi: "Không quét các tem rách hoặc mã mờ không thể nhận diện.",
          zh: "条码破损或字迹模糊时严禁强行手工盲录。"
        },
        annotations: [
          { type: "box", x: 55, y: 45, width: 22, height: 25, label: { vi: "Mã vạch LOT", zh: "托盘条码标签" } },
          { type: "badge", number: 1, x: 62, y: 55 }
        ]
      },
      {
        stepNumber: 2,
        name: { vi: "Đối chiếu số lượng & Vị trí kệ", zh: "核对数量与上架货位" },
        image: "./assets/sop/warehouse/step1_pallet_barcode.svg",
        instructions: {
          vi: [
            "Đối chiếu số lượng thùng thực tế trên pallet với số lượng hiển thị trên PDA.",
            "Di chuyển pallet vào đúng vị trí kệ (Ví dụ: Kệ A-03-02) theo chỉ định của hệ thống.",
            "Quét mã barcode vị trí kệ để xác nhận hoàn tất xếp dỡ."
          ],
          zh: [
            "核对托盘实物箱数与 PDA 屏幕上的应入数量。",
            "使用叉车将托盘移至系统指派的目标货位 (如: A-03-02)。",
            "扫描货位架条码完成绑定确认。"
          ]
        },
        warning: {
          vi: "Tuyệt đối không xếp chồng quá 3 tầng pallet để tránh đổ ngã.",
          zh: "托盘堆叠严禁超过 3 层，严防倾倒。"
        },
        annotations: [
          { type: "box", x: 25, y: 38, width: 30, height: 35, label: { vi: "Kiện hàng", zh: "物料箱组" } }
        ]
      }
    ]
  },
  {
    id: "sop-cnc-setup",
    category: "catMaintenance",
    plantId: "plantChenKai",
    sopNumber: "SOP-CNC-2025-033",
    revision: "v3.0.1",
    company: {
      vi: "Xưởng Gia Công Cơ Khí Chính Xác CNC",
      zh: "精密数控加工车间 (CNC)"
    },
    title: {
      vi: "Thiết lập Bàn điều khiển Máy phay CNC & Kiểm tra An toàn",
      zh: "CNC 数控机床面板设定与安全点检"
    },
    subtitle: {
      vi: "Quy trình thiết lập gốc tọa độ G54, kiểm tra nút dừng khẩn E-Stop và bơm dầu tưới nguội",
      zh: "G54 工件原点对刀、E-Stop 紧急制动测试及冷却循环确认"
    },
    coverImage: "./assets/sop/cnc/step1_cnc_panel.svg",
    durationMinutes: 12,
    difficulty: "diffHigh",
    tools: [
      { name: { vi: "Đầu dò phôi quang điện", zh: "光电对刀仪" }, icon: "tool", image: "./assets/sop/cnc/step1_cnc_panel.svg" },
      { name: { vi: "Kính bảo hộ lao động", zh: "防护护目镜" }, icon: "shield", image: "./assets/sop/cnc/step1_cnc_panel.svg" }
    ],
    prerequisites: {
      vi: "Bắt buộc đeo kính bảo hộ, đóng kín cửa lồng máy trước khi ấn Cycle Start.",
      zh: "严禁佩戴手套操作主轴，作业全程佩戴护目镜。"
    },
    steps: [
      {
        stepNumber: 1,
        name: { vi: "Kiểm tra Nút dừng khẩn cấp E-STOP", zh: "急停按钮安全确认" },
        image: "./assets/sop/cnc/step1_cnc_panel.svg",
        instructions: {
          vi: [
            "Kiểm tra nút bấm khẩn cấp màu đỏ lớn (E-STOP) trên bảng điều khiển.",
            "Nhấn thử để xác nhận ngắt nguồn động cơ tức thì.",
            "Xoay theo chiều kim đồng hồ để mở khóa nút dừng khẩn cấp."
          ],
          zh: [
            "检查控制面板右侧红色大蘑菇头【E-STOP】急停按钮。",
            "按下测试主轴及伺服制动响应。",
            "顺时针旋转释放急停复位。"
          ]
        },
        warning: {
          vi: "Nếu nút dừng khẩn cấp bị kẹt, ngưng vận hành máy và báo ngay bảo trì.",
          zh: "急停开关失效时严禁开机作业，须立即报修。"
        },
        annotations: [
          { type: "box", x: 65, y: 22, width: 18, height: 25, label: { vi: "Nút E-STOP", zh: "急停按钮" } },
          { type: "badge", number: 1, x: 72, y: 35 }
        ]
      },
      {
        stepNumber: 2,
        name: { vi: "Xác nhận Tọa độ & Khởi động Chạy tự động", zh: "程序校验与自动循环启动" },
        image: "./assets/sop/cnc/step1_cnc_panel.svg",
        instructions: {
          vi: [
            "Xoay núm chọn chế độ sang [AUTO] (Tự động).",
            "Kiểm tra dòng lệnh G-code hiển thị trên màn hình: G00 X0.00 Y0.00 Z50.0.",
            "Đóng chặt cửa bảo vệ lồng máy.",
            "Nhấn nút màu xanh [CYCLE START] để bắt đầu chu trình gia công."
          ],
          zh: [
            "旋转工作模式选择旋钮至【AUTO】自动加工档位。",
            "在屏幕上核对加工程序坐标：G00 X0.00 Y0.00 Z50.0。",
            "完全关闭机床防护门。",
            "按下绿色【CYCLE START】按钮启动切削循环。"
          ]
        },
        warning: {
          vi: "Tay luôn đặt gần nút [FEED HOLD] trong 10 giây đầu tiên để dừng nếu có bất thường.",
          zh: "首件加工前10秒手部保持在【FEED HOLD】进给保持键旁待命。"
        },
        annotations: [
          { type: "box", x: 57, y: 48, width: 14, height: 16, label: { vi: "Nút CYCLE START", zh: "启动键" } },
          { type: "badge", number: 1, x: 65, y: 55 }
        ]
      }
    ]
  },
  {
    id: "sop-printer-paper",
    category: "catMaintenance",
    plantId: "plantChenKai",
    sopNumber: "SOP-PRT-2025-004",
    revision: "v1.1.0",
    company: {
      vi: "Tổ Hỗ Trợ Thiết Bị Sản Xuất",
      zh: "现场设备支援组"
    },
    title: {
      vi: "Thay & Lắp Cuộn Nhãn Máy In Nhiệt Công Nghiệp",
      zh: "工业条码打印机更换标签纸"
    },
    subtitle: {
      vi: "Hướng dẫn mở khóa chốt nắp, luồn giấy đúng mặt in và hiệu chuẩn mắt đọc",
      zh: "绿色锁扣开启、正向顺纸槽装载与光电传感器校准"
    },
    coverImage: "./assets/sop/printer/step1_open_latch.svg",
    durationMinutes: 4,
    difficulty: "diffEasy",
    tools: [
      { name: { vi: "Cuộn nhãn in nhiệt 80x50mm", zh: "热敏标签卷" }, icon: "tag", image: "./assets/sop/erp/tool_labels.png" }
    ],
    prerequisites: {
      vi: "Tắt đèn báo lỗi máy in và đảm bảo tay sạch bụi dầu mỡ.",
      zh: "双手洁净无油污，避开高温打印头区域。"
    },
    steps: [
      {
        stepNumber: 1,
        name: { vi: "Mở chốt khóa khoang giấy", zh: "开启机盖锁扣" },
        image: "./assets/sop/printer/step1_open_latch.svg",
        instructions: {
          vi: [
            "Nhấn nút lẫy màu xanh lá cây [OPEN] ở cạnh bên máy in.",
            "Nhấc nắp trên mở góc 90 độ cho đến khi nghe tiếng 'cạch' cố định khớp."
          ],
          zh: [
            "按下打印机侧边的绿色【OPEN】释放按扣。",
            "向上掀开上盖至 90 度卡位支撑固定。"
          ]
        },
        warning: {
          vi: "Không dùng lực mạnh bẻ nắp vượt quá góc 90 độ.",
          zh: "严禁蛮力过度向上推掀机盖。"
        },
        annotations: [
          { type: "box", x: 58, y: 38, width: 14, height: 12, label: { vi: "Chốt xanh OPEN", zh: "绿色开关" } },
          { type: "badge", number: 1, x: 65, y: 44 }
        ]
      },
      {
        stepNumber: 2,
        name: { vi: "Luồn cuộn nhãn mới và khóa chốt", zh: "装纸与合盖" },
        image: "./assets/sop/printer/step1_open_latch.svg",
        instructions: {
          vi: [
            "Lồng cuộn nhãn vào trục đỡ, hướng mặt giấy bóng lên trên.",
            "Kéo mép giấy qua thanh dẫn hướng màu xanh.",
            "Đóng nắp máy in ấn mạnh hai bên cho đến khi cả hai lẫy khóa vào vị trí."
          ],
          zh: [
            "将新标签卷套入主卷轴，确认光滑打印面朝上。",
            "将纸头前端拉过两侧绿色限位卡扣。",
            "双手按压机盖两侧紧密闭合。"
          ]
        },
        warning: {
          vi: "Bấm nút FEED một lần để máy tự động nhảy đúng vị trí răng cưa xé tem.",
          zh: "合盖后按一次 FEED 键测试走纸并自动对准缺口。"
        },
        annotations: [
          { type: "box", x: 42, y: 44, width: 16, height: 18, label: { vi: "Trục cuộn giấy", zh: "标签卷芯" } }
        ]
      }
    ]
  }
];
