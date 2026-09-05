// WorkGuide SOP Dataset - 100% Authentic Data Extracted from:
// 工业平板扫码报工操作流程SOP-20260421.docx (Bilingual: Vietnamese & Simplified Chinese)

export const guidesData = [
  // ==========================================================================
  // 1. MASTER SOP: Bản Hướng Dẫn Thao Tác Tiêu Chuẩn Máy Tính Bảng Công Nghiệp ERP
  // ==========================================================================
  {
    id: "sop-erp-tablet-master",
    category: "catMaster",
    plantId: "plantChenKai",
    sopNumber: "SOP-ERP-20260421",
    sopStandardTitle: {
      vi: "Bản Hướng Dẫn Thao Tác Tiêu Chuẩn (SOP)",
      zh: "标准作业指导书"
    },
    author: "郑献青",
    issueDate: "2026-4-20",
    approvalDate: "2026-05-01",
    tabletVersion: "1.5.48",
    revision: "v1.5.48 (2026-05-01)",
    company: {
      vi: "CÔNG TY TNHH CÔNG NGHIỆP CHÍNH XÁC CHEN KAI",
      zh: "振凱精密工業责任有限公司"
    },
    title: {
      vi: "ERP Máy Tính Bảng Công Nghiệp",
      zh: "ERP 工业平板"
    },
    subtitle: {
      vi: "Quy trình chuẩn: Mở máy, đăng nhập, điều hướng MES, tiếp nhận hàng hóa, quét mã qua trạm, xử lý sự cố in và thay giấy in",
      zh: "开机、登录、MES中心导航、货物接收、扫码过站、打印异常处理及打印纸更换标准作业流程"
    },
    coverImage: "./assets/sop/erp/eq_tablet.png",
    durationMinutes: 12,
    difficulty: "diffMedium",
    tools: [
      {
        name: { vi: "Thiết bị: Máy tính bảng công nghiệp", zh: "设备（平板）" },
        icon: "tablet",
        image: "./assets/sop/erp/eq_tablet.png"
      },
      {
        name: { vi: "Công cụ: Máy quét mã vạch 2D", zh: "工 具（扫码器）" },
        icon: "barcode-scanner",
        image: "./assets/sop/erp/tool_scanner.png"
      },
      {
        name: { vi: "Khác: Cuộn giấy nhãn in nhiệt", zh: "其 他（标签纸）" },
        icon: "tag",
        image: "./assets/sop/erp/tool_labels.png"
      }
    ],
    prerequisites: {
      vi: "Kết nối nguồn điện, mạng, máy quét và đặt giấy in hoàn tất trước khi mở máy.",
      zh: "连接电源、网路、扫码器、放置打印纸完成后方可开机。"
    },
    steps: [
      {
        stepNumber: 1,
        name: {
          vi: "Giao diện mở máy",
          zh: "开机界面"
        },
        image: "./assets/sop/erp/step1_boot.png",
        thumbnail: "./assets/sop/erp/step1_thumb_switch.png",
        images: [
          {
            src: "./assets/sop/erp/step1_thumb_switch.png",
            label: { vi: "Nút gạt nguồn đỏ trên đỉnh máy", zh: "平板顶部左边“红色开机按键”" }
          },
          {
            src: "./assets/sop/erp/step1_boot.png",
            label: { vi: "Màn hình chính máy tính bảng - Nhấp [Ứng dụng]", zh: "平板主界面 - 点击“应用程序”" }
          }
        ],
        instructions: {
          vi: [
            "1. Kết nối nguồn điện, mạng, máy quét, đặt giấy in hoàn tất, ở đỉnh máy tính bảng, bên trái nút màu đỏ <img class=\"inline-thumb\" src=\"./assets/sop/erp/step1_thumb_switch.png\" alt=\"\" /> là nút mở máy, trực tiếp mở máy, vào giao diện chính máy tính bảng.",
            "2. Nhấp vào “Ứng dụng” (应用程序) để vào giao diện chương trình cài đặt ERP."
          ],
          zh: [
            "1. 连接电源、网路、扫码器、放置打印纸完成后，在平板顶部，左边“红色键” <img class=\"inline-thumb\" src=\"./assets/sop/erp/step1_thumb_switch.png\" alt=\"\" /> 为“开机按键”，直接开机，进入平板主界面。",
            "2. 点击“应用程序”，进入 ERP 安装程序界面。"
          ]
        },
        warning: null
      },
      {
        stepNumber: 2,
        name: {
          vi: "Đăng nhập ERP (Chọn Ứng dụng)",
          zh: "ERP 登录（选择 APP）"
        },
        image: "./assets/sop/erp/step2_erp_login.png",
        thumbnail: "./assets/sop/erp/step2_thumb_app.png",
        images: [
          {
            src: "./assets/sop/erp/step2_thumb_app.png",
            label: { vi: "Biểu tượng APP “企助物联”", zh: "“企助物联” APP 图标" }
          },
          {
            src: "./assets/sop/erp/step2_erp_login.png",
            label: { vi: "Chạm vào APP “企助物联” trên màn hình", zh: "在平板上触屏点击“企助物联” APP" }
          }
        ],
        instructions: {
          vi: [
            "Trực tiếp chạm màn hình trên máy tính bảng nhấp vào APP “企助物联” <img class=\"inline-thumb\" src=\"./assets/sop/erp/step2_thumb_app.png\" alt=\"\" />, vào giao diện ERP."
          ],
          zh: [
            "直接在平板上触屏点击“企助物联” APP <img class=\"inline-thumb\" src=\"./assets/sop/erp/step2_thumb_app.png\" alt=\"\" />，进入 ERP 界面。"
          ]
        },
        warning: null
      },
      {
        stepNumber: 3,
        name: {
          vi: "Đăng nhập ERP (Nhập Tài khoản & Mật khẩu)",
          zh: "ERP 登录（录入账号密码）"
        },
        image: "./assets/sop/erp/step3_login_fields.png",
        images: [
          {
            src: "./assets/sop/erp/step3_login_fields.png",
            label: { vi: "Giao diện đăng nhập ERP", zh: "ERP 登录操作界面" }
          }
        ],
        instructions: {
          vi: [
            "Dùng ngón tay chạm màn hình, nhập tài khoản (账号), mật khẩu (密码) của người sử dụng.",
            "Tích chọn “Nhớ mật khẩu” (记住密码) nếu cần.",
            "Nhấp vào nút đăng nhập màu xanh lam (蓝色登录键) ở mép dưới cùng máy tính bảng để vào giao diện thao tác ERP."
          ],
          zh: [
            "手指触屏，录入使用人的账户（账号）、密码。",
            "勾选“记住密码”。",
            "点击平板最下方的“蓝色登录键”，进入 ERP 操作界面。"
          ]
        },
        warning: null
      },
      {
        stepNumber: 4,
        name: {
          vi: "Thao tác báo công ERP (Vào MES Trung tâm)",
          zh: "ERP 报工操作（进入 MES 中心）"
        },
        image: "./assets/sop/erp/step4_mes_center.png",
        thumbnail: "./assets/sop/erp/step4_thumb_mes.png",
        images: [
          {
            src: "./assets/sop/erp/step4_thumb_mes.png",
            label: { vi: "Nút “企助 MES 中心”", zh: "“企助 MES 中心” 按钮" }
          },
          {
            src: "./assets/sop/erp/step4_mes_center.png",
            label: { vi: "Menu hệ thống ERP chính", zh: "ERP 系统主功能界面" }
          }
        ],
        instructions: {
          vi: [
            "Dùng ngón tay chạm màn hình nhấp vào nút “企助 MES 中心” <img class=\"inline-thumb\" src=\"./assets/sop/erp/step4_thumb_mes.png\" alt=\"\" />."
          ],
          zh: [
            "手指触屏点击“企助 MES 中心” <img class=\"inline-thumb\" src=\"./assets/sop/erp/step4_thumb_mes.png\" alt=\"\" />。"
          ]
        },
        warning: null
      },
      {
        stepNumber: 5,
        name: {
          vi: "Thao tác báo công ERP (Vào Quét mã báo công)",
          zh: "ERP 报工操作（进入扫码报工）"
        },
        image: "./assets/sop/erp/step5_scan_report.png",
        thumbnail: "./assets/sop/erp/step5_thumb_scan.png",
        images: [
          {
            src: "./assets/sop/erp/step5_thumb_scan.png",
            label: { vi: "Nút “扫码报工”", zh: "“扫码报工” 按钮" }
          },
          {
            src: "./assets/sop/erp/step5_scan_report.png",
            label: { vi: "Menu chức năng MES", zh: "MES 功能菜单界面" }
          }
        ],
        instructions: {
          vi: [
            "Dùng ngón tay chạm màn hình nhấp vào “扫码报工” (Quét mã báo công) <img class=\"inline-thumb\" src=\"./assets/sop/erp/step5_thumb_scan.png\" alt=\"\" /> để vào giao diện tác vụ quét mã."
          ],
          zh: [
            "手指触屏点击“扫码报工” <img class=\"inline-thumb\" src=\"./assets/sop/erp/step5_thumb_scan.png\" alt=\"\" />，进入扫码作业界面。"
          ]
        },
        warning: null
      },
      {
        stepNumber: 6,
        name: {
          vi: "ERP Tiếp nhận hàng hóa (Nguyên vật liệu / Khởi động công đoạn)",
          zh: "ERP 货物接收（材料/开工接收）"
        },
        image: "./assets/sop/erp/step6_receive_form.png",
        images: [
          {
            src: "./assets/sop/erp/step6_thumb_receive.png",
            label: { vi: "1. Nhấp vào tab [Tiếp nhận]", zh: "1. 点击“接收”" }
          },
          {
            src: "./assets/sop/erp/routing_card_qr_guide.png",
            label: { vi: "2. Thẻ lưu chuyển sản xuất: Quét mã QR [工序] và [派工单号]", zh: "2. 生产履历卡：扫“工序”码与“单号”码" }
          },
          {
            src: "./assets/sop/erp/step6_receive_form.png",
            label: { vi: "3. Màn hình [开工接收] với 4 bước hướng dẫn", zh: "3. ERP 开工接收界面（4 步操作）" }
          },
          {
            src: "./assets/sop/erp/tool_scanner.png",
            label: { vi: "4. Máy quét mã vạch 2D", zh: "4. 条码扫码器" }
          }
        ],
        instructions: {
          vi: [
            "1. Vào giao diện quét mã ERP: Trong quy trình nhận hàng, sau khi nhận hàng BẮT BUỘC PHẢI LÀM TIẾP NHẬN TRƯỚC, nhấp vào thẻ tab “Tiếp nhận” (接收).",
            "2. Tại giao diện quét mã ERP, con trỏ sẽ tự động dừng ở ô “Công đoạn hiện tại” (当前工序). Bắt đầu dùng “máy quét” quét mã QR trên Thẻ lưu chuyển sản xuất (生产履历卡):",
            "   • Thao tác 1: Quét mã QR “Công đoạn” (工序二维码) ở góc dưới bên phải thẻ lưu chuyển;",
            "   • Thao tác 2: Quét mã QR “Số phiếu giao việc” (派工单号二维码) ở góc trên bên trái thẻ lưu chuyển;",
            "3. Tiếp nhận “Số lượng thực tế” (实物数量) trên Thẻ lưu chuyển sản xuất. Lưu ý: Đối chiếu và kiểm tra số điền vào ô “Số lượng tiếp nhận” (接收数). Khi số lượng thực tế trên thẻ lưu chuyển sản xuất khớp với số lượng tiếp nhận, trực tiếp nhấp nút “Tiếp nhận” (接收) để hoàn thành."
          ],
          zh: [
            "1. 进入 ERP 扫码界面：在收到货物后必须先做接收，点击“接收”。",
            "2. 在 ERP 扫码界面，光标会自动停在“当前工序”栏位上，开始使用“扫码器”扫生产履历卡二维码，操作方式：",
            "   • 操作 1：扫“工序”二维码（生产履历卡右下方）；",
            "   • 操作 2：扫“派工单号”二维码（生产履历卡左上方）；",
            "3. 接收生产履历卡“实物数量”注意事项：核对填写“接收数”，生产履历卡实物数与接收数一致时，直接点“接收”完成。"
          ]
        },
        warning: {
          vi: "LƯU Ý QUAN TRỌNG: Tuyệt đối không cho phép sửa thủ công: Số lượng tiếp nhận < Số lượng thực tế!",
          zh: "注意事项：不允许手动修改：接收数 < 实物数！"
        }
      },
      {
        stepNumber: 7,
        name: {
          vi: "Quét mã qua trạm (Nộp hoàn công sản xuất)",
          zh: "扫码过站（完工提交）"
        },
        image: "./assets/sop/erp/step7_station_form.png",
        images: [
          {
            src: "./assets/sop/erp/step7_thumb_submit.png",
            label: { vi: "1. Nhấp vào tab [Nộp]", zh: "1. 点击“提交”" }
          },
          {
            src: "./assets/sop/erp/routing_card_qr_guide.png",
            label: { vi: "2. Quét mã QR thẻ lưu chuyển sản xuất", zh: "2. 扫生产履历卡二维码" }
          },
          {
            src: "./assets/sop/erp/step7_station_form.png",
            label: { vi: "3. Màn hình [完工提交] với 5 bước chi tiết", zh: "3. ERP 完工提交界面（5 步操作）" }
          },
          {
            src: "./assets/sop/erp/step7_printed_tag.png",
            label: { vi: "4. Mẫu tem thẻ lưu chuyển công đoạn in ra thực tế", zh: "4. 完工打印出的工艺流转卡标签样张" }
          }
        ],
        instructions: {
          vi: [
            "1. Vào giao diện quét mã ERP: Bộ phận sản xuất khi hoàn thành sản phẩm cần quét mã báo công, nhấp vào thẻ tab “Nộp” (提交).",
            "2. Tại giao diện quét mã ERP, con trỏ tự động dừng ở ô “Công đoạn hiện tại” (当前工序). Bắt đầu dùng “máy quét” quét mã QR Thẻ lưu chuyển sản xuất (生产履历卡):",
            "   • Thao tác 1: Quét mã QR “Công đoạn” (工序);",
            "   • Thao tác 2: Quét mã QR “Số phiếu giao việc” (派工单号);",
            "3. Điền số lượng báo công đạt chuẩn vào ô “OK” (报工数);",
            "4. Điền số lượng hàng lỗi/phế phẩm vào ô “NG品” (不良数, nếu có);",
            "5. Nhấp vào nút “Nộp và in” (提交打印 / 提交并打印) để hoàn thành và in tem nhãn."
          ],
          zh: [
            "1. 进入 ERP 扫码界面：制造部门完工品扫码报工，点击“提交”。",
            "2. 在 ERP 扫码界面，光标会自动停在“当前工序”栏位上，开始使用“扫码器”扫生产履历卡二维码，操作方式：",
            "   • 扫“工序”二维码；",
            "   • 扫“派工单号”二维码；",
            "3. 填写报工数“OK”数量；",
            "4. 填写不良数“NG品”数量（如有）；",
            "5. 点击“提交打印”（或“提交并打印”），完成。"
          ]
        },
        warning: null
      },
      {
        stepNumber: 8,
        name: {
          vi: "Xử lý sự cố in (In lại tem báo công)",
          zh: "打印异常处理（重新打印标签纸）"
        },
        image: "./assets/sop/erp/step7_reprint_dialog.png",
        thumbnail: "./assets/sop/erp/step7_thumb_reprint_btn.png",
        images: [
          {
            src: "./assets/sop/erp/step7_reprint_dialog.png",
            label: { vi: "1. Hộp thoại in lại tem nhãn [重新打印标签纸]", zh: "1. 重新打印标签纸对话框" }
          },
          {
            src: "./assets/sop/erp/step7_thumb_reprint_btn.png",
            label: { vi: "2. Nút bấm [In] màu xanh ngọc", zh: "2. 蓝色“打印”按键" }
          },
          {
            src: "./assets/sop/erp/step7_printed_tag.png",
            label: { vi: "3. Tem nhãn sau khi in lại thành công", zh: "3. 重新打印出的工艺流转卡" }
          }
        ],
        instructions: {
          vi: [
            "Sự cố in: Khi tem thẻ lưu chuyển công đoạn chưa được in bình thường sau khi bấm nộp (hết giấy, kẹt giấy hoặc máy in chưa nhận lệnh):",
            "• NGUYÊN TẮC QUAN TRỌNG: TUYỆT ĐỐI KHÔNG ĐƯỢC THOÁT KHỎI GIAO DIỆN IN!",
            "• CÁCH XỬ LÝ: Ngay tại giao diện in hiện tại, nhấn trực tiếp vào nút “In” (打印) <img class=\"inline-thumb\" src=\"./assets/sop/erp/step7_thumb_reprint_btn.png\" alt=\"\" /> để máy in lại đúng con tem báo công này."
          ],
          zh: [
            "打印异常：工序流转卡标签未正常打印：",
            "• 重要原则：不要退出打印界面！",
            "• 处理方式：可直接在当前界面重新点击“打印” <img class=\"inline-thumb\" src=\"./assets/sop/erp/step7_thumb_reprint_btn.png\" alt=\"\" /> 即可打印此张报工标签。"
          ]
        },
        warning: {
          vi: "Quy tắc an toàn: Tuyệt đối không thoát giao diện in khi tem chưa in ra được. Nhấp lại nút “In” ngay tại màn hình hiện tại!",
          zh: "注意事项：工序流转卡标签未正常打印，不要退出打印界面，直接在当前界面重新点击“打印”！"
        }
      },
      {
        stepNumber: 9,
        name: {
          vi: "Giấy in (Đặt vào hoặc thay thế)",
          zh: "打印纸（放置或更换）"
        },
        image: "./assets/sop/erp/step8_printer_paper.png",
        images: [
          {
            src: "./assets/sop/erp/step8_printer_door_closed.png",
            label: { vi: "1. Vị trí khoang đặt giấy in ở dưới máy tính bảng", zh: "1. 平板下方“打印纸”放置区" }
          },
          {
            src: "./assets/sop/erp/step8_printer_roll_feed.png",
            label: { vi: "2. Đặt mặt chính giấy in vào khay giấy", zh: "2. 将打印纸“正面”放置到纸槽 OK" }
          },
          {
            src: "./assets/sop/erp/tool_labels.png",
            label: { vi: "3. Cuộn giấy nhãn in nhiệt chuẩn", zh: "3. 热敏标签纸实物" }
          }
        ],
        instructions: {
          vi: [
            "1. Máy in: Tại khu vực đặt “giấy in” ở phía dưới máy tính bảng, mở nắp khoang chứa giấy.",
            "2. Giấy in: Đặt cuộn giấy in đúng “mặt chính” (正面) vào rãnh giấy, kéo đầu giấy ra một đoạn ngắn rồi đóng nắp lại chắc chắn (OK) là được."
          ],
          zh: [
            "1. 打印机：在平板下方“打印纸”放置区，打开盖子。",
            "2. 打印纸：将打印纸“正面”放置到纸槽 OK 后关闭即可。"
          ]
        },
        warning: null
      },
      {
        stepNumber: 10,
        name: {
          vi: "Các thao tác khác (Giải thích chức năng phím)",
          zh: "其他操作（按键功能说明）"
        },
        image: "./assets/sop/erp/step9_bottom_keys.png",
        images: [
          {
            src: "./assets/sop/erp/step9_bottom_keys.png",
            label: { vi: "Thanh phím điều hướng hệ thống dưới đáy màn hình", zh: "屏幕最下方按键功能说明" }
          }
        ],
        instructions: {
          vi: [
            "Giải thích chức năng các phím điều hướng ở phía dưới cùng màn hình máy tính bảng:",
            "1. [返回上一页] (Phím mũi tên trái ◀): Quay lại trang trước hoặc thoát tác vụ hiện tại.",
            "2. [切换界面] (Phím hình vuông ■): Chuyển đổi giao diện đa nhiệm các cửa sổ đang mở.",
            "3. [重启] (Phím nguồn ⏻): Khởi động lại máy tính bảng khi hệ thống bị treo.",
            "4. [关机] (Phím nguồn ⏻): Tắt máy tính bảng khi kết thúc ca làm việc."
          ],
          zh: [
            "在屏幕最下方的按键功能说明：",
            "1. [返回上一页] ：返回上级界面",
            "2. [切换界面] ：多任务窗口切换",
            "3. [重启] ：重新启动平板",
            "4. [关机] ：关闭平板设备"
          ]
        },
        warning: null
      }
    ]
  },

  // ==========================================================================
  // 2. DEDICATED WORKFLOW SOP 1: ERP Tiếp Nhận Hàng Hóa / Khởi Động Công Đoạn
  // ==========================================================================
  {
    id: "sop-erp-receiving",
    category: "catReceive",
    plantId: "plantChenKai",
    sopNumber: "SOP-RCV-001",
    sopStandardTitle: {
      vi: "Quy Trình Chuẩn: ERP Tiếp Nhận Hàng Hóa (Vật Liệu / Khởi Động)",
      zh: "标准作业流程：ERP 货物接收（材料/开工接收）"
    },
    author: "郑献青",
    issueDate: "2026-4-20",
    approvalDate: "2026-05-01",
    tabletVersion: "1.5.48",
    revision: "v1.5.48",
    company: {
      vi: "CÔNG TY TNHH CÔNG NGHIỆP CHÍNH XÁC CHEN KAI",
      zh: "振凱精密工業责任有限公司"
    },
    title: {
      vi: "ERP Tiếp Nhận Hàng Hóa (Vật Liệu / Khởi Động Tiếp Nhận)",
      zh: "ERP 货物接收（材料/开工接收）"
    },
    subtitle: {
      vi: "Quy trình quét mã QR thẻ lưu chuyển, đối chiếu số lượng và xác nhận tiếp nhận",
      zh: "扫生产履历卡二维码、核对实物数量与接收数确认流程"
    },
    coverImage: "./assets/sop/erp/step6_receive_form.png",
    durationMinutes: 4,
    difficulty: "diffMedium",
    tools: [
      {
        name: { vi: "Thiết bị: Máy tính bảng công nghiệp", zh: "设备（平板）" },
        icon: "tablet",
        image: "./assets/sop/erp/eq_tablet.png"
      },
      {
        name: { vi: "Công cụ: Máy quét mã vạch 2D", zh: "工 具（扫码器）" },
        icon: "barcode-scanner",
        image: "./assets/sop/erp/tool_scanner.png"
      },
      {
        name: { vi: "Thẻ lưu chuyển sản xuất", zh: "生产履历卡" },
        icon: "file-text",
        image: "./assets/sop/erp/routing_card_qr_guide.png"
      }
    ],
    prerequisites: {
      vi: "Hàng hóa thực tế và Thẻ lưu chuyển sản xuất (生产履历卡) đã đến trạm làm việc.",
      zh: "实物货物与生产履历卡已送达作业工位。"
    },
    steps: [
      {
        stepNumber: 1,
        name: {
          vi: "Chọn Tab [Tiếp Nhận] Trên Màn Hình ERP",
          zh: "点击 ERP 扫码界面“接收”标签"
        },
        image: "./assets/sop/erp/step6_receive_form.png",
        thumbnail: "./assets/sop/erp/step6_thumb_receive.png",
        images: [
          {
            src: "./assets/sop/erp/step6_thumb_receive.png",
            label: { vi: "Nút tab [Tiếp nhận]", zh: "“接收”标签按钮" }
          },
          {
            src: "./assets/sop/erp/step6_receive_form.png",
            label: { vi: "Màn hình tiếp nhận hàng hóa", zh: "开工接收界面" }
          }
        ],
        instructions: {
          vi: [
            "Vào giao diện quét mã ERP: Trong quy trình nhận hàng, sau khi nhận hàng BẮT BUỘC PHẢI LÀM TIẾP NHẬN TRƯỚC.",
            "Chạm ngón tay vào tab [Tiếp nhận] (接收) <img class=\"inline-thumb\" src=\"./assets/sop/erp/step6_thumb_receive.png\" alt=\"\" /> ở góc trên màn hình."
          ],
          zh: [
            "进入 ERP 扫码界面：在收到货物后必须先做接收。",
            "手指触屏点击界面上方的“接收”标签 <img class=\"inline-thumb\" src=\"./assets/sop/erp/step6_thumb_receive.png\" alt=\"\" />。"
          ]
        },
        warning: null
      },
      {
        stepNumber: 2,
        name: {
          vi: "Quét Mã QR Công Đoạn & Số Phiếu Giao Việc",
          zh: "扫“工序”与“派工单号”二维码"
        },
        image: "./assets/sop/erp/routing_card_qr_guide.png",
        images: [
          {
            src: "./assets/sop/erp/routing_card_qr_guide.png",
            label: { vi: "Thẻ lưu chuyển sản xuất: Thao tác 1 quét Công đoạn, Thao tác 2 quét Số phiếu", zh: "生产履历卡：操作 1 扫工序码，操作 2 扫单号码" }
          },
          {
            src: "./assets/sop/erp/tool_scanner.png",
            label: { vi: "Máy quét mã vạch 2D", zh: "条码扫码器" }
          }
        ],
        instructions: {
          vi: [
            "Tại giao diện quét mã ERP, con trỏ sẽ tự động dừng ở ô “Công đoạn hiện tại” (当前工序).",
            "Cầm máy quét mã vạch và thực hiện theo đúng trình tự:",
            "• Thao tác 1: Quét mã QR “Công đoạn” (工序二维码) ở góc dưới bên phải Thẻ lưu chuyển sản xuất;",
            "• Thao tác 2: Quét mã QR “Số phiếu giao việc” (派工单号二维码) ở góc trên bên trái Thẻ lưu chuyển sản xuất."
          ],
          zh: [
            "在 ERP 扫码界面，光标会自动停在“当前工序”栏位上。",
            "拿起扫码器，严格按顺序执行：",
            "• 操作 1：扫“工序”二维码（生产履历卡右下角）；",
            "• 操作 2：扫“派工单号”二维码（生产履历卡左上角）。"
          ]
        },
        warning: null
      },
      {
        stepNumber: 3,
        name: {
          vi: "Đối Chiếu Số Lượng Tiếp Nhận & Xác Nhận",
          zh: "核对接收数并点击接收完成"
        },
        image: "./assets/sop/erp/step6_receive_form.png",
        images: [
          {
            src: "./assets/sop/erp/step6_receive_form.png",
            label: { vi: "Điền số lượng tiếp nhận và nhấp [接收]", zh: "填写接收数并点击“接收”" }
          }
        ],
        instructions: {
          vi: [
            "Tiếp nhận Số lượng thực tế trên Thẻ lưu chuyển sản xuất.",
            "Đối chiếu và kiểm tra ô “Số lượng tiếp nhận” (接收数).",
            "Khi số lượng thực tế trên Thẻ lưu chuyển sản xuất khớp với số lượng tiếp nhận, trực tiếp nhấp nút [Tiếp nhận] (接收) để hoàn thành."
          ],
          zh: [
            "接收生产履历卡“实物数量”。",
            "核对填写“接收数”。",
            "生产履历卡实物数与接收数一致时，直接点击“接收”按钮完成。"
          ]
        },
        warning: {
          vi: "LƯU Ý NGHIÊM NGẶT: Tuyệt đối không cho phép sửa thủ công: Số lượng tiếp nhận < Số lượng thực tế!",
          zh: "注意事项：不允许手动修改：接收数 < 实物数！"
        }
      }
    ]
  },

  // ==========================================================================
  // 3. DEDICATED WORKFLOW SOP 2: Quét Mã Qua Trạm & Báo Công Hoàn Công
  // ==========================================================================
  {
    id: "sop-erp-submit-station",
    category: "catSubmit",
    plantId: "plantChenKai",
    sopNumber: "SOP-SUB-002",
    sopStandardTitle: {
      vi: "Quy Trình Chuẩn: Quét Mã Qua Trạm (Nộp Hoàn Công Sản Xuất)",
      zh: "标准作业流程：扫码过站（完工提交）"
    },
    author: "郑献青",
    issueDate: "2026-4-20",
    approvalDate: "2026-05-01",
    tabletVersion: "1.5.48",
    revision: "v1.5.48",
    company: {
      vi: "CÔNG TY TNHH CÔNG NGHIỆP CHÍNH XÁC CHEN KAI",
      zh: "振凱精密工業责任有限公司"
    },
    title: {
      vi: "Quét Mã Qua Trạm (Nộp Hoàn Công Sản Xuất)",
      zh: "扫码过站（完工提交）"
    },
    subtitle: {
      vi: "Quy trình quét mã thẻ lưu chuyển, nhập số lượng OK/NG và nộp in tem lưu chuyển",
      zh: "制造部门完工品扫码、录入OK/NG数量及提交打印流程"
    },
    coverImage: "./assets/sop/erp/step7_station_form.png",
    durationMinutes: 4,
    difficulty: "diffMedium",
    tools: [
      {
        name: { vi: "Thiết bị: Máy tính bảng công nghiệp", zh: "设备（平板）" },
        icon: "tablet",
        image: "./assets/sop/erp/eq_tablet.png"
      },
      {
        name: { vi: "Công cụ: Máy quét mã vạch 2D", zh: "工 具（扫码器）" },
        icon: "barcode-scanner",
        image: "./assets/sop/erp/tool_scanner.png"
      },
      {
        name: { vi: "Tem nhãn in thẻ lưu chuyển", zh: "工艺流转卡标签" },
        icon: "tag",
        image: "./assets/sop/erp/step7_printed_tag.png"
      }
    ],
    prerequisites: {
      vi: "Sản phẩm tại công đoạn đã gia công xong và kiểm tra số lượng OK / NG.",
      zh: "本工序加工完毕，已清点合格品（OK）与不良品（NG）实物数量。"
    },
    steps: [
      {
        stepNumber: 1,
        name: {
          vi: "Chọn Tab [Nộp] Trên Màn Hình Quét Mã",
          zh: "进入 ERP 扫码界面点击“提交”"
        },
        image: "./assets/sop/erp/step7_station_form.png",
        thumbnail: "./assets/sop/erp/step7_thumb_submit.png",
        images: [
          {
            src: "./assets/sop/erp/step7_thumb_submit.png",
            label: { vi: "Nút tab [Nộp]", zh: "“提交”标签按钮" }
          },
          {
            src: "./assets/sop/erp/step7_station_form.png",
            label: { vi: "Giao diện nộp hoàn công", zh: "完工提交界面" }
          }
        ],
        instructions: {
          vi: [
            "Vào giao diện quét mã ERP: Bộ phận sản xuất khi hoàn thành sản phẩm cần quét mã báo công, nhấp vào thẻ tab “Nộp” (提交) <img class=\"inline-thumb\" src=\"./assets/sop/erp/step7_thumb_submit.png\" alt=\"\" />."
          ],
          zh: [
            "进入 ERP 扫码界面：制造部门完工品扫码报工，点击“提交” <img class=\"inline-thumb\" src=\"./assets/sop/erp/step7_thumb_submit.png\" alt=\"\" />。"
          ]
        },
        warning: null
      },
      {
        stepNumber: 2,
        name: {
          vi: "Quét Mã QR Thẻ Lưu Chuyển & Nhập Số Lượng OK/NG",
          zh: "扫码并录入报工数 OK 与不良数 NG"
        },
        image: "./assets/sop/erp/step7_station_form.png",
        images: [
          {
            src: "./assets/sop/erp/routing_card_qr_guide.png",
            label: { vi: "Quét mã QR Công đoạn và Phiếu giao việc", zh: "扫工序二维码与派工单号二维码" }
          },
          {
            src: "./assets/sop/erp/step7_station_form.png",
            label: { vi: "Màn hình 完工提交 với 5 bước chi tiết", zh: "完工提交表单（5 步标注）" }
          }
        ],
        instructions: {
          vi: [
            "Con trỏ tự động dừng ở ô “Công đoạn hiện tại” (当前工序).",
            "1. Dùng máy quét quét mã QR “Công đoạn” (工序);",
            "2. Quét mã QR “Số phiếu giao việc” (派工单号);",
            "3. Điền số lượng sản phẩm đạt chuẩn vào ô “OK” (报工数);",
            "4. Điền số lượng sản phẩm lỗi vào ô “NG phẩm” (不良数, nếu có)."
          ],
          zh: [
            "光标会自动停在“当前工序”栏位上。",
            "1. 扫“工序”二维码；",
            "2. 扫“派工单号”二维码；",
            "3. 填写报工数“OK”数量；",
            "4. 填写不良数“NG品”数量（如有）。"
          ]
        },
        warning: null
      },
      {
        stepNumber: 3,
        name: {
          vi: "Nhấp [Nộp Và In] & Kiểm Tra Tem Nhãn",
          zh: "点击“提交并打印”并核对标签"
        },
        image: "./assets/sop/erp/step7_printed_tag.png",
        images: [
          {
            src: "./assets/sop/erp/step7_station_form.png",
            label: { vi: "Nút [提交并打印] ở dưới form", zh: "“提交并打印”按钮" }
          },
          {
            src: "./assets/sop/erp/step7_printed_tag.png",
            label: { vi: "Tem thẻ lưu chuyển công đoạn in ra thực tế", zh: "工艺流转卡实际打印样张" }
          }
        ],
        instructions: {
          vi: [
            "Nhấp vào nút [提交打印] (hoặc [提交并打印]) ở dưới cùng form để hoàn thành nộp báo công.",
            "Máy in tích hợp sẽ tự động in ra tem “Thẻ lưu chuyển công đoạn” (工艺流转卡标签).",
            "Dán tem lên khay/thùng hàng theo quy định trước khi chuyển sang công đoạn kế tiếp."
          ],
          zh: [
            "点击表单底部的“提交打印”（或“提交并打印”）按钮完成报工。",
            "机载打印机将自动打印出“工艺流转卡标签”。",
            "核对标签内容并随货流转至下一工序。"
          ]
        },
        warning: null
      }
    ]
  },

  // ==========================================================================
  // 4. DEDICATED WORKFLOW SOP 3: Xử Lý Sự Cố In Tem Báo Công
  // ==========================================================================
  {
    id: "sop-erp-print-exception",
    category: "catHardware",
    plantId: "plantChenKai",
    sopNumber: "SOP-ERR-003",
    sopStandardTitle: {
      vi: "Quy Trình Chuẩn: Xử Lý Sự Cố In (In Lại Tem Báo Công)",
      zh: "标准作业流程：打印异常处理（重新打印标签纸）"
    },
    author: "郑献青",
    issueDate: "2026-4-20",
    approvalDate: "2026-05-01",
    tabletVersion: "1.5.48",
    revision: "v1.5.48",
    company: {
      vi: "CÔNG TY TNHH CÔNG NGHIỆP CHÍNH XÁC CHEN KAI",
      zh: "振凱精密工業责任有限公司"
    },
    title: {
      vi: "Xử Lý Sự Cố In (In Lại Tem Nhãn Báo Công)",
      zh: "打印异常处理（重新打印标签纸）"
    },
    subtitle: {
      vi: "Quy tắc không thoát giao diện và cách nhấn in lại tem lưu chuyển khi gặp sự cố",
      zh: "标签未正常打印时严禁退出界面，原地点击“打印”补打流程"
    },
    coverImage: "./assets/sop/erp/step7_reprint_dialog.png",
    durationMinutes: 2,
    difficulty: "diffEasy",
    tools: [
      {
        name: { vi: "Thiết bị: Máy tính bảng công nghiệp", zh: "设备（平板）" },
        icon: "tablet",
        image: "./assets/sop/erp/eq_tablet.png"
      },
      {
        name: { vi: "Nút In lại trên màn hình", zh: "界面“打印”按钮" },
        icon: "printer",
        image: "./assets/sop/erp/step7_thumb_reprint_btn.png"
      }
    ],
    prerequisites: {
      vi: "Đã bấm nộp báo công nhưng máy in chưa ra tem nhãn hoặc tem bị kẹt/hỏng.",
      zh: "已提交报工但标签未正常打印出纸，或打印缺纸卡纸。"
    },
    steps: [
      {
        stepNumber: 1,
        name: {
          vi: "Quy Tắc Sống Còn: Tuyệt Đối Không Thoát Giao Diện In",
          zh: "重要原则：切勿退出打印界面"
        },
        image: "./assets/sop/erp/step7_reprint_dialog.png",
        images: [
          {
            src: "./assets/sop/erp/step7_reprint_dialog.png",
            label: { vi: "Giữ nguyên màn hình hộp thoại in", zh: "保持当前打印预览对话框" }
          }
        ],
        instructions: {
          vi: [
            "Khi tem Thẻ lưu chuyển công đoạn chưa được in ra bình thường sau khi bấm nộp:",
            "• NGUYÊN TẮC BẮT BUỘC: KHÔNG ĐƯỢC THOÁT KHỎI GIAO DIỆN IN!",
            "• Nếu thoát khỏi giao diện này, hệ thống sẽ coi như đã hoàn thành lệnh và bạn sẽ không thể in lại con tem này một cách trực tiếp."
          ],
          zh: [
            "工序流转卡标签未正常打印时：",
            "• 重要原则：不要退出打印界面！",
            "• 若擅自退出当前界面，系统已记录该批次报工，将无法直接再次补打此张标签。"
          ]
        },
        warning: {
          vi: "Tuyệt đối không nhấp nút X hoặc nút Back để thoát khỏi giao diện in khi chưa in xong tem!",
          zh: "切勿点击右上角关闭或返回键退出打印界面！"
        }
      },
      {
        stepNumber: 2,
        name: {
          vi: "Nhấp Trực Tiếp Nút [In] Để In Lại Tem Nhãn",
          zh: "在当前界面重新点击“打印”完成出纸"
        },
        image: "./assets/sop/erp/step7_reprint_dialog.png",
        thumbnail: "./assets/sop/erp/step7_thumb_reprint_btn.png",
        images: [
          {
            src: "./assets/sop/erp/step7_thumb_reprint_btn.png",
            label: { vi: "Nút [In] màu xanh ngọc", zh: "蓝色“打印”按键" }
          },
          {
            src: "./assets/sop/erp/step7_reprint_dialog.png",
            label: { vi: "Vị trí nút in lại trên hộp thoại", zh: "重新打印标签纸对话框中的“打印”键" }
          },
          {
            src: "./assets/sop/erp/step7_printed_tag.png",
            label: { vi: "Tem nhãn in lại thành công", zh: "补打成功的工艺流转卡" }
          }
        ],
        instructions: {
          vi: [
            "1. Kiểm tra lại cuộn giấy in ở khoang phía dưới máy tính bảng (nếu hết giấy thì lắp cuộn mới).",
            "2. Ngay trên giao diện in hiện tại, nhấn trực tiếp vào nút màu xanh ngọc [In] (打印) <img class=\"inline-thumb\" src=\"./assets/sop/erp/step7_thumb_reprint_btn.png\" alt=\"\" />.",
            "3. Máy in sẽ in lại chính xác con tem báo công của phiếu giao việc này."
          ],
          zh: [
            "1. 确认平板下方打印纸槽正常（若缺纸先更换新纸卷）。",
            "2. 直接在当前界面重新点击“打印” <img class=\"inline-thumb\" src=\"./assets/sop/erp/step7_thumb_reprint_btn.png\" alt=\"\" /> 按钮。",
            "3. 打印机将重新打印此张报工标签，出纸后核对无误方可离开。"
          ]
        },
        warning: null
      }
    ]
  },

  // ==========================================================================
  // 5. DEDICATED WORKFLOW SOP 4: Thay & Đặt Giấy In Máy Tính Bảng
  // ==========================================================================
  {
    id: "sop-erp-printer-paper",
    category: "catHardware",
    plantId: "plantChenKai",
    sopNumber: "SOP-PRT-004",
    sopStandardTitle: {
      vi: "Quy Trình Chuẩn: Đặt & Thay Giấy In Máy Tính Bảng",
      zh: "标准作业流程：打印纸放置或更换"
    },
    author: "郑献青",
    issueDate: "2026-4-20",
    approvalDate: "2026-05-01",
    tabletVersion: "1.5.48",
    revision: "v1.5.48",
    company: {
      vi: "CÔNG TY TNHH CÔNG NGHIỆP CHÍNH XÁC CHEN KAI",
      zh: "振凱精密工業责任有限公司"
    },
    title: {
      vi: "Đặt & Thay Cuộn Giấy In Máy Tính Bảng",
      zh: "打印纸放置或更换"
    },
    subtitle: {
      vi: "Mở nắp khoang giấy phía dưới máy tính bảng, đặt đúng mặt chính và đóng nắp",
      zh: "在平板下方打印纸放置区开盖、正面装纸入槽与合盖流程"
    },
    coverImage: "./assets/sop/erp/step8_printer_paper.png",
    durationMinutes: 3,
    difficulty: "diffEasy",
    tools: [
      {
        name: { vi: "Cuộn giấy nhãn in nhiệt", zh: "热敏标签纸" },
        icon: "tag",
        image: "./assets/sop/erp/tool_labels.png"
      },
      {
        name: { vi: "Khoang máy in tích hợp", zh: "平板打印机" },
        icon: "printer",
        image: "./assets/sop/erp/step8_printer_door_closed.png"
      }
    ],
    prerequisites: {
      vi: "Chuẩn bị sẵn cuộn giấy nhãn in nhiệt Postek đúng quy cách kích thước.",
      zh: "准备好符合规格的热敏标签纸卷。"
    },
    steps: [
      {
        stepNumber: 1,
        name: {
          vi: "Mở Nắp Khoang Giấy In Phía Dưới Máy Tính Bảng",
          zh: "在平板下方打开打印机盖子"
        },
        image: "./assets/sop/erp/step8_printer_door_closed.png",
        images: [
          {
            src: "./assets/sop/erp/step8_printer_door_closed.png",
            label: { vi: "Khu vực khoang giấy in [打印纸放置区]", zh: "平板下方“打印纸放置区”" }
          }
        ],
        instructions: {
          vi: [
            "Tại khu vực đặt “giấy in” ở phía dưới máy tính bảng, nhấn chốt mở nắp khoang chứa giấy in."
          ],
          zh: [
            "打印机：在平板下方“打印纸”放置区，打开盖子。"
          ]
        },
        warning: null
      },
      {
        stepNumber: 2,
        name: {
          vi: "Đặt Cuộn Giấy Đúng Mặt Chính Vào Rãnh & Đóng Nắp",
          zh: "将打印纸“正面”放置到位并合盖"
        },
        image: "./assets/sop/erp/step8_printer_roll_feed.png",
        images: [
          {
            src: "./assets/sop/erp/step8_printer_roll_feed.png",
            label: { vi: "Đặt mặt chính cuộn giấy vào rãnh", zh: "将打印纸“正面”放置到纸槽" }
          },
          {
            src: "./assets/sop/erp/tool_labels.png",
            label: { vi: "Cuộn giấy nhãn in nhiệt", zh: "标签纸卷" }
          }
        ],
        instructions: {
          vi: [
            "Đặt cuộn giấy in đúng “mặt chính” (正面) vào rãnh giấy.",
            "Kéo đầu giấy nhãn nhô ra ngoài khe thoát giấy một đoạn nhỏ.",
            "Đóng nắp khoang giấy lại chắc chắn (OK) cho đến khi nghe tiếng tách khóa."
          ],
          zh: [
            "打印纸：将打印纸“正面”放置到纸槽 OK 后关闭即可。"
          ]
        },
        warning: null
      }
    ]
  },

  // ==========================================================================
  // 6. DEDICATED WORKFLOW SOP 5: Khởi Động Máy, Đăng Nhập ERP & Điều Hướng MES
  // ==========================================================================
  {
    id: "sop-erp-boot-login",
    category: "catMaster",
    plantId: "plantChenKai",
    sopNumber: "SOP-SYS-005",
    sopStandardTitle: {
      vi: "Quy Trình Chuẩn: Mở Máy, Đăng Nhập ERP & Vào Trung Tâm MES",
      zh: "标准作业流程：开机、登录与MES中心导航"
    },
    author: "郑献青",
    issueDate: "2026-4-20",
    approvalDate: "2026-05-01",
    tabletVersion: "1.5.48",
    revision: "v1.5.48",
    company: {
      vi: "CÔNG TY TNHH CÔNG NGHIỆP CHÍNH XÁC CHEN KAI",
      zh: "振凱精密工業责任有限公司"
    },
    title: {
      vi: "Khởi Động Máy, Đăng Nhập ERP & Điều Hướng MES",
      zh: "开机、登录与 MES 中心导航"
    },
    subtitle: {
      vi: "Các bước chuẩn bị, bật công tắc đỏ, chọn app 企助物联, nhập mật khẩu và vào 扫码报工",
      zh: "红键开机、启动企助物联APP、录入账号密码及进入扫码报工界面"
    },
    coverImage: "./assets/sop/erp/step1_boot.png",
    durationMinutes: 5,
    difficulty: "diffEasy",
    tools: [
      {
        name: { vi: "Thiết bị: Máy tính bảng công nghiệp", zh: "设备（平板）" },
        icon: "tablet",
        image: "./assets/sop/erp/eq_tablet.png"
      }
    ],
    prerequisites: {
      vi: "Nguồn điện, cáp mạng, máy quét mã và giấy in đã kết nối hoàn tất.",
      zh: "电源、网路、扫码器已连接，打印纸已装好。"
    },
    steps: [
      {
        stepNumber: 1,
        name: {
          vi: "Bật Nút Nguồn Đỏ & Vào Ứng Dụng",
          zh: "红键开机并进入应用程序"
        },
        image: "./assets/sop/erp/step1_boot.png",
        thumbnail: "./assets/sop/erp/step1_thumb_switch.png",
        images: [
          {
            src: "./assets/sop/erp/step1_thumb_switch.png",
            label: { vi: "Nút gạt nguồn đỏ trên đỉnh máy", zh: "平板顶部红色按键" }
          },
          {
            src: "./assets/sop/erp/step1_boot.png",
            label: { vi: "Chạm vào [应用程序]", zh: "点击“应用程序”" }
          }
        ],
        instructions: {
          vi: [
            "Ở đỉnh máy tính bảng, bên trái nút màu đỏ <img class=\"inline-thumb\" src=\"./assets/sop/erp/step1_thumb_switch.png\" alt=\"\" /> là nút mở máy, trực tiếp mở máy, vào giao diện chính máy tính bảng.",
            "Chạm vào “Ứng dụng” (应用程序) để vào danh mục ứng dụng."
          ],
          zh: [
            "在平板顶部，左边“红色键” <img class=\"inline-thumb\" src=\"./assets/sop/erp/step1_thumb_switch.png\" alt=\"\" /> 为“开机按键”，直接开机，进入平板主界面。",
            "点击“应用程序”，进入 ERP 安装程序界面。"
          ]
        },
        warning: null
      },
      {
        stepNumber: 2,
        name: {
          vi: "Mở APP “企助物联” & Đăng Nhập",
          zh: "点击“企助物联”并录入账号密码登录"
        },
        image: "./assets/sop/erp/step3_login_fields.png",
        thumbnail: "./assets/sop/erp/step2_thumb_app.png",
        images: [
          {
            src: "./assets/sop/erp/step2_erp_login.png",
            label: { vi: "Chạm APP 企助物联", zh: "点击企助物联 APP" }
          },
          {
            src: "./assets/sop/erp/step3_login_fields.png",
            label: { vi: "Nhập tài khoản, mật khẩu và bấm Đăng nhập", zh: "录入账号密码并点蓝色登录键" }
          }
        ],
        instructions: {
          vi: [
            "1. Chạm vào APP “企助物联” trên màn hình cảm ứng để khởi động hệ thống ERP.",
            "2. Nhập tài khoản, mật khẩu người sử dụng, nhấp nút màu xanh lam ở dưới cùng để đăng nhập."
          ],
          zh: [
            "1. 在平板上触屏点击“企助物联” APP 进入 ERP 界面。",
            "2. 手指触屏，录入使用人的账户、密码，点击最下方的“蓝色登录键”进入操作界面。"
          ]
        },
        warning: null
      },
      {
        stepNumber: 3,
        name: {
          vi: "Điều Hướng Vào “企助MES中心” -> “扫码报工”",
          zh: "进入“企助MES中心”并点击“扫码报工”"
        },
        image: "./assets/sop/erp/step5_scan_report.png",
        images: [
          {
            src: "./assets/sop/erp/step4_mes_center.png",
            label: { vi: "Nhấp “企助MES中心”", zh: "点击“企助MES中心”" }
          },
          {
            src: "./assets/sop/erp/step5_scan_report.png",
            label: { vi: "Nhấp “扫码报工”", zh: "点击“扫码报工”" }
          }
        ],
        instructions: {
          vi: [
            "1. Tại giao diện chính ERP, nhấp vào ô màu hồng “企助MES中心”.",
            "2. Trong menu chức năng MES, nhấp vào ô màu xanh dương “扫码报工” để bắt đầu quét mã."
          ],
          zh: [
            "1. 触屏点击“企助 MES 中心”。",
            "2. 触屏点击“扫码报工”，进入作业扫码报工主界面。"
          ]
        },
        warning: null
      }
    ]
  }
];
