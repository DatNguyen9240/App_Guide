// WorkGuide SOP Dataset - 100% Faithful to 工业平板扫码报工操作流程SOP-20260421.docx
// Bilingual: Vietnamese & Simplified Chinese

export const guidesData = [
  {
    id: "sop-erp-tablet",
    category: "catERP",
    plantId: "plantChenKai",
    sopNumber: "v1.5.48",
    sopStandardTitle: {
      vi: "Bản Hướng Dẫn Thao Tác Tiêu Chuẩn (SOP)",
      zh: "标准作业指导书"
    },
    author: "郑献青",
    issueDate: "2026-4-20",
    approvalDate: "2026-05-01",
    tabletVersion: "1.5.48",
    revision: "1.5.48 (2026-05-01)",
    company: {
      vi: "CÔNG TY TNHH CÔNG NGHIỆP CHÍNH XÁC CHEN KAI",
      zh: "振凱精密工業责任有限公司"
    },
    title: {
      vi: "ERP Máy Tính Bảng Công Nghiệp",
      zh: "ERP 工业平板"
    },
    subtitle: {
      vi: "Bản hướng dẫn thao tác tiêu chuẩn mở máy, đăng nhập, báo công MES, quét mã tiếp nhận & qua trạm",
      zh: "开机、登录、MES报工、货物接收、扫码过站及打印纸操作标准作业指导书"
    },
    coverImage: "./assets/sop/erp/eq_tablet.png",
    durationMinutes: 10,
    difficulty: "diffMedium",
    tools: [
      {
        name: { vi: "Thiết bị: Máy tính bảng", zh: "设备（平板）" },
        icon: "tablet",
        image: "./assets/sop/erp/eq_tablet.png"
      },
      {
        name: { vi: "Công cụ: Máy quét mã vạch", zh: "工 具（扫码器）" },
        icon: "barcode-scanner",
        image: "./assets/sop/erp/tool_scanner.png"
      },
      {
        name: { vi: "Khác: Giấy nhãn in", zh: "其 他（标签纸）" },
        icon: "tag",
        image: "./assets/sop/erp/tool_labels.png"
      }
    ],
    prerequisites: {
      vi: "Kết nối nguồn điện, mạng, máy quét mã, đặt giấy in hoàn tất trước khi mở máy.",
      zh: "连接电源、网路、扫码器、放置打印纸完成后方可开机。"
    },
    steps: [
      // ======================================================================
      // 步骤 1: 开机界面
      // ======================================================================
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
            label: { vi: "Nút mở máy màu đỏ ở đỉnh bên trái máy tính bảng", zh: "平板顶部左边“红色键”为“开机按键”" }
          },
          {
            src: "./assets/sop/erp/step1_boot.png",
            label: { vi: "Màn hình chính máy tính bảng - Nhấp vào “应用程序”", zh: "平板主界面 - 点击“应用程序”" }
          }
        ],
        instructions: {
          vi: [
            "1. Kết nối nguồn điện, mạng, máy quét, đặt giấy in hoàn tất, ở đỉnh máy tính bảng, bên trái nút màu đỏ <img class=\"inline-thumb\" src=\"./assets/sop/erp/step1_thumb_switch.png\" alt=\"\" /> là “nút mở máy”, trực tiếp mở máy, vào giao diện chính máy tính bảng.",
            "2. Nhấp vào “Ứng dụng” (应用程序), vào giao diện chương trình cài đặt ERP."
          ],
          zh: [
            "1. 连接电源、网路、扫码器、放置打印纸完成后，在平板顶部，左边“红色键” <img class=\"inline-thumb\" src=\"./assets/sop/erp/step1_thumb_switch.png\" alt=\"\" /> 为“开机按键”，直接开机，进入平板主界面。",
            "2. 点击“应用程序”，进入 ERP 安装程序界面。"
          ]
        },
        warning: null
      },

      // ======================================================================
      // 步骤 2: ERP登录
      // ======================================================================
      {
        stepNumber: 2,
        name: {
          vi: "Đăng nhập ERP (Chọn Ứng dụng)",
          zh: "ERP 登录"
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
            label: { vi: "Chạm vào APP “企助物联” trên màn hình", zh: "直接在平板上触屏点击“企助物联” APP" }
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

      // ======================================================================
      // 步骤 3: ERP登录
      // ======================================================================
      {
        stepNumber: 3,
        name: {
          vi: "Đăng nhập ERP (Nhập Tài khoản & Mật khẩu)",
          zh: "ERP 登录"
        },
        image: "./assets/sop/erp/step3_login_fields.png",
        images: [
          {
            src: "./assets/sop/erp/step3_login_fields.png",
            label: { vi: "Giao diện đăng nhập ERP: Nhập tài khoản, mật khẩu và bấm nút đăng nhập màu xanh", zh: "手指触屏录入账户、密码，点击最下方“蓝色登录键”" }
          }
        ],
        instructions: {
          vi: [
            "Dùng ngón tay chạm màn hình, nhập tài khoản (账户), mật khẩu (密码) của người sử dụng.",
            "Tích chọn “Nhớ mật khẩu” (记住密码).",
            "Nhấp vào nút đăng nhập màu xanh lam (蓝色登录键) ở mép dưới cùng máy tính bảng, vào giao diện thao tác ERP."
          ],
          zh: [
            "手指触屏，录入使用人的账户、密码。",
            "勾选“记住密码”。",
            "点击平板最下方的“蓝色登录键”，进入 ERP 操作界面。"
          ]
        },
        warning: null
      },

      // ======================================================================
      // 步骤 4: ERP报工操作
      // ======================================================================
      {
        stepNumber: 4,
        name: {
          vi: "Thao tác báo công ERP (Vào 企助 MES Trung tâm)",
          zh: "ERP 报工操作"
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
            label: { vi: "Menu hệ thống ERP: Chạm vào [企助 MES 中心]", zh: "手指触屏点击“企助 MES 中心”" }
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

      // ======================================================================
      // 步骤 5: ERP报工操作
      // ======================================================================
      {
        stepNumber: 5,
        name: {
          vi: "Thao tác báo công ERP (Vào Quét mã báo công)",
          zh: "ERP 报工操作"
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
            label: { vi: "Menu chức năng MES: Chạm vào [扫码报工]", zh: "手指触屏点击“扫码报工”" }
          }
        ],
        instructions: {
          vi: [
            "Dùng ngón tay chạm màn hình nhấp vào “扫码报工” (Quét mã báo công) <img class=\"inline-thumb\" src=\"./assets/sop/erp/step5_thumb_scan.png\" alt=\"\" />."
          ],
          zh: [
            "手指触屏点击“扫码报工” <img class=\"inline-thumb\" src=\"./assets/sop/erp/step5_thumb_scan.png\" alt=\"\" />。"
          ]
        },
        warning: null
      },

      // ======================================================================
      // 步骤 6: ERP货物接收（材料/开工接收）
      // ======================================================================
      {
        stepNumber: 6,
        name: {
          vi: "ERP Tiếp nhận hàng hóa (Nguyên vật liệu / Khởi động tiếp nhận)",
          zh: "ERP 货物接收（材料/开工接收）"
        },
        image: "./assets/sop/erp/step6_receive_form.png",
        thumbnail: "./assets/sop/erp/step6_thumb_receive.png",
        images: [
          {
            src: "./assets/sop/erp/step6_thumb_receive.png",
            label: { vi: "1. Nhấp vào tab [Tiếp nhận] (接收)", zh: "1. 点击“接收”标签" }
          },
          {
            src: "./assets/sop/erp/routing_card_qr_guide.png",
            label: { vi: "2. Thẻ lưu chuyển sản xuất: Thao tác 1 quét mã [工序], Thao tác 2 quét mã [派工单号]", zh: "2. 生产履历卡：扫“工序”二维码与“派工单号”二维码" }
          },
          {
            src: "./assets/sop/erp/step6_receive_form.png",
            label: { vi: "3. Màn hình 开工接收: 1.Quét công đoạn 2.Quét phiếu 3.Điền số lượng 4.Bấm tiếp nhận", zh: "3. 开工接收界面：1.扫工序 2.扫派工单 3.填接收数 4.点击接收" }
          }
        ],
        instructions: {
          vi: [
            "1. Vào giao diện quét mã ERP: Trong quy trình nhận hàng, sau khi nhận hàng BẮT BUỘC PHẢI LÀM TIẾP NHẬN TRƯỚC, nhấp vào thẻ tab “Tiếp nhận” (接收) <img class=\"inline-thumb\" src=\"./assets/sop/erp/step6_thumb_receive.png\" alt=\"\" />.",
            "2. Tại giao diện quét mã ERP, con trỏ sẽ tự động dừng ở ô “Công đoạn hiện tại” (当前工序). Bắt đầu dùng “máy quét” quét mã QR trên Thẻ lưu chuyển sản xuất (生产履历卡), phương thức thao tác:",
            "   • Thao tác 1: Quét mã QR “Công đoạn” (扫“工序”二维码) ở góc dưới bên phải thẻ;",
            "   • Thao tác 2: Quét mã QR “Số phiếu giao việc” (扫“派工单号”二维码) ở góc trên bên trái thẻ;",
            "3. Tiếp nhận “Số lượng thực tế” (实物数量) trên Thẻ lưu chuyển sản xuất. Lưu ý: Đối chiếu và kiểm tra số điền vào ô “Số lượng tiếp nhận” (接收数). Khi số lượng thực tế trên Thẻ lưu chuyển sản xuất khớp với số lượng tiếp nhận, trực tiếp nhấn nút “Tiếp nhận” (接收) để hoàn thành.",
            "4. QUY TẮC CẤM: Không cho phép sửa thủ công: Số lượng tiếp nhận < Số lượng thực tế."
          ],
          zh: [
            "1. 进入 ERP 扫码界面：在收到货物后必须先做接收，点击“接收” <img class=\"inline-thumb\" src=\"./assets/sop/erp/step6_thumb_receive.png\" alt=\"\" />。",
            "2. 在 ERP 扫码界面，光标会自动停在“当前工序”栏位上，开始使用“扫码器”扫生产履历卡二维码，操作方式：",
            "   • 扫“工序”二维码；",
            "   • 扫“派工单号”二维码；",
            "3. 接收生产履历卡“实物数量”注意事项：核对填写“接收数”，生产履历卡实物数与接收数一致时，直接点“接收”完成。",
            "4. 不允许手动修改：接收数 < 实物数。"
          ]
        },
        warning: {
          vi: "LƯU Ý NGHIÊM NGẶT: Không cho phép sửa thủ công: Số lượng tiếp nhận < Số lượng thực tế!",
          zh: "注意事项：不允许手动修改：接收数 < 实物数！"
        }
      },

      // ======================================================================
      // 步骤 7: 扫码过站（完工提交）
      // ======================================================================
      {
        stepNumber: 7,
        name: {
          vi: "Quét mã qua trạm (Nộp hoàn công)",
          zh: "扫码过站（完工提交）"
        },
        image: "./assets/sop/erp/step7_station_form.png",
        thumbnail: "./assets/sop/erp/step7_thumb_submit.png",
        images: [
          {
            src: "./assets/sop/erp/step7_thumb_submit.png",
            label: { vi: "1. Nhấp vào tab [Nộp] (提交)", zh: "1. 点击“提交”标签" }
          },
          {
            src: "./assets/sop/erp/routing_card_qr_guide.png",
            label: { vi: "2. Quét mã QR Thẻ lưu chuyển sản xuất", zh: "2. 扫生产履历卡二维码" }
          },
          {
            src: "./assets/sop/erp/step7_station_form.png",
            label: { vi: "3. Màn hình 完工提交: 1.Quét công đoạn 2.Quét phiếu 3.Điền OK 4.Điền NG 5.Bấm [提交并打印]", zh: "3. 完工提交界面：1.扫工序 2.扫派工单 3.填OK数 4.填NG数 5.点击“提交并打印”" }
          },
          {
            src: "./assets/sop/erp/step7_printed_tag.png",
            label: { vi: "4. Mẫu tem thẻ lưu chuyển công đoạn in ra thực tế", zh: "4. 完工打印出的工艺流转卡标签样张" }
          },
          {
            src: "./assets/sop/erp/step7_reprint_dialog.png",
            label: { vi: "5. Hộp thoại in lại tem khi gặp sự cố in (Không thoát ra, bấm nút 打印)", zh: "5. 打印异常对话框：不要退出界面，直接点击“打印”" }
          }
        ],
        instructions: {
          vi: [
            "1. Vào giao diện quét mã ERP: Bộ phận sản xuất khi hoàn thành sản phẩm cần quét mã báo công, nhấp vào thẻ tab “Nộp” (提交) <img class=\"inline-thumb\" src=\"./assets/sop/erp/step7_thumb_submit.png\" alt=\"\" />.",
            "2. Tại giao diện quét mã ERP, con trỏ sẽ tự động dừng ở ô “Công đoạn hiện tại” (当前工序). Bắt đầu dùng “máy quét” quét mã QR Thẻ lưu chuyển sản xuất (生产履历卡), phương thức thao tác:",
            "   • Thao tác 1: Quét mã QR “Công đoạn” (工序);",
            "   • Thao tác 2: Quét mã QR “Số phiếu giao việc” (派工单号);",
            "   • Thao tác 3: Điền số lượng báo công vào ô “OK” (报工数);",
            "   • Thao tác 4: Điền số lượng hàng lỗi vào ô “NG phẩm” (不良数, nếu có);",
            "   • Thao tác 5: Nhấp vào nút “Nộp và in” (提交打印 / 提交并打印), hoàn thành.",
            "3. XỬ LÝ SỰ CỐ IN: Khi tem Thẻ lưu chuyển công đoạn chưa được in ra bình thường (hết giấy, kẹt giấy hoặc máy in chưa nhận lệnh): TUYỆT ĐỐI KHÔNG ĐƯỢC THOÁT KHỎI GIAO DIỆN IN, có thể trực tiếp tại giao diện hiện tại nhấn lại nút “In” (打印) <img class=\"inline-thumb\" src=\"./assets/sop/erp/step7_thumb_reprint_btn.png\" alt=\"\" /> là có thể in lại con tem báo công này."
          ],
          zh: [
            "1. 进入 ERP 扫码界面：制造部门完工品扫码报工，点击“提交” <img class=\"inline-thumb\" src=\"./assets/sop/erp/step7_thumb_submit.png\" alt=\"\" />。",
            "2. 在 ERP 扫码界面，光标会自动停在“当前工序”栏位上，开始使用“扫码器”扫生产履历卡二维码，操作方式：",
            "   • 扫“工序”二维码；",
            "   • 扫“派工单号”二维码；",
            "   • 填写报工数“OK”数量；",
            "   • 填写不良数“NG品”数量（如有）；",
            "   • 点击“提交打印”（或“提交并打印”），完成。",
            "3. 打印异常：工序流转卡标签未正常打印，不要退出打印界面，可直接在当前界面重新点击“打印” <img class=\"inline-thumb\" src=\"./assets/sop/erp/step7_thumb_reprint_btn.png\" alt=\"\" /> 即可打印此张报工标签。"
          ]
        },
        warning: {
          vi: "LƯU Ý SỰ CỐ IN: Tem thẻ lưu chuyển công đoạn chưa được in bình thường, KHÔNG ĐƯỢC THOÁT KHỎI GIAO DIỆN IN, có thể trực tiếp tại giao diện hiện tại nhấp lại nút “In” là có thể in con tem báo công này.",
          zh: "打印异常：工序流转卡标签未正常打印，不要退出打印界面，可直接在当前界面重新点击“打印”即可打印此张报工标签。"
        }
      },

      // ======================================================================
      // 步骤 8: 打印纸（放置或更换)
      // ======================================================================
      {
        stepNumber: 8,
        name: {
          vi: "Giấy in (Đặt vào hoặc thay thế)",
          zh: "打印纸（放置或更换）"
        },
        image: "./assets/sop/erp/step8_printer_paper.png",
        images: [
          {
            src: "./assets/sop/erp/step8_printer_door_closed.png",
            label: { vi: "1. Vị trí khoang đặt “giấy in” ở phía dưới máy tính bảng, mở nắp", zh: "1. 打印机：在平板下方“打印纸”放置区，打开盖子" }
          },
          {
            src: "./assets/sop/erp/step8_printer_roll_feed.png",
            label: { vi: "2. Đặt cuộn giấy in đúng mặt chính vào rãnh OK rồi đóng nắp", zh: "2. 打印纸：将打印纸“正面”放置到纸槽 OK 后关闭即可" }
          }
        ],
        instructions: {
          vi: [
            "1. Máy in: Tại khu vực đặt “giấy in” ở phía dưới máy tính bảng, mở nắp.",
            "2. Giấy in: Đặt cuộn giấy in đúng “mặt chính” (正面) vào rãnh giấy, kéo đầu giấy ra ngoài một đoạn nhỏ, sau khi kiểm tra OK thì đóng nắp lại là được."
          ],
          zh: [
            "1. 打印机：在平板下方“打印纸”放置区，打开盖子。",
            "2. 打印纸：将打印纸“正面”放置到纸槽 OK 后关闭即可。"
          ]
        },
        warning: null
      },

      // ======================================================================
      // 步骤 9: 其他操作
      // ======================================================================
      {
        stepNumber: 9,
        name: {
          vi: "Các thao tác khác (Giải thích chức năng phím ở đáy màn hình)",
          zh: "其他操作"
        },
        image: "./assets/sop/erp/step9_bottom_keys.png",
        images: [
          {
            src: "./assets/sop/erp/step9_bottom_keys.png",
            label: { vi: "Giải thích chức năng các phím điều hướng ở phía dưới cùng màn hình", zh: "在屏幕最下方的按键功能说明" }
          }
        ],
        instructions: {
          vi: [
            "Ở màn hình máy tính bảng, giải thích chức năng các phím điều hướng ở phía dưới cùng:",
            "1. [返回上一页] (Phím mũi tên trái ◀): Quay lại giao diện trước.",
            "2. [切换界面] (Phím hình vuông ■): Chuyển đổi cửa sổ giao diện đa nhiệm.",
            "3. [重启] (Phím nguồn ⏻): Khởi động lại thiết bị máy tính bảng.",
            "4. [关机] (Phím nguồn ⏻): Tắt máy tính bảng."
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
  }
];
