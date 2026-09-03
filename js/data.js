// WorkGuide SOP Dataset (Bilingual: Vietnamese & Simplified Chinese)
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
      vi: "Công ty TNHH Công Nghiệp Chính Xác Chen Kai",
      zh: "振凯精密工业责任有限公司"
    },
    title: {
      vi: "ERP Máy tính bảng công nghiệp",
      zh: "ERP 工业平板"
    },
    subtitle: {
      vi: "Quy trình mở máy, đăng nhập, báo công MES và quét mã qua trạm",
      zh: "开机、登录、MES报工及扫码过站标准作业流程"
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
        name: { vi: "Công cụ: Máy quét mã", zh: "工具（扫码器）" },
        icon: "barcode-scanner",
        image: "./assets/sop/erp/tool_scanner.png"
      },
      {
        name: { vi: "Khác: Giấy nhãn", zh: "其他（标签纸）" },
        icon: "tag",
        image: "./assets/sop/erp/tool_labels.png"
      }
    ],
    prerequisites: {
      vi: "Kết nối nguồn, mạng, máy quét và đặt giấy in hoàn tất trước khi mở máy.",
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
        instructions: {
          vi: [
            "1. Kết nối nguồn điện, mạng, máy quét, đặt giấy in hoàn tất, ở đỉnh máy tính bảng, bên trái nút màu đỏ <img class=\"inline-thumb\" src=\"./assets/sop/erp/step1_thumb_switch.png\" alt=\"\" /> là nút mở máy, trực tiếp mở máy, vào giao diện chính máy tính bảng.",
            "2. Nhấp vào Ứng dụng để vào giao diện chương trình cài đặt ERP."
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
          vi: "Đăng nhập ERP",
          zh: "ERP 登录"
        },
        image: "./assets/sop/erp/step2_erp_login.png",
        thumbnail: "./assets/sop/erp/step2_thumb_app.png",
        instructions: {
          vi: [
            "Trực tiếp chạm màn hình trên máy tính bảng nhấp vào APP 企助物联 <img class=\"inline-thumb\" src=\"./assets/sop/erp/step2_thumb_app.png\" alt=\"\" />, vào giao diện ERP."
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
          vi: "Đăng nhập ERP",
          zh: "ERP 登录"
        },
        image: "./assets/sop/erp/step3_login_fields.png",
        instructions: {
          vi: [
            "Dùng ngón tay chạm màn hình, nhập tài khoản, mật khẩu của người sử dụng, nhấp vào nút đăng nhập màu xanh ở dưới cùng máy tính bảng, vào giao diện thao tác ERP."
          ],
          zh: [
            "手指触屏，录入使用人的账户、密码，点击平板最下方的“蓝色登录键”，进入 ERP 操作界面。"
          ]
        },
        warning: null
      },
      {
        stepNumber: 4,
        name: {
          vi: "Thao tác báo công ERP",
          zh: "ERP 报工操作"
        },
        image: "./assets/sop/erp/step4_mes_center.png",
        thumbnail: "./assets/sop/erp/step4_thumb_mes.png",
        instructions: {
          vi: [
            "Dùng ngón tay chạm màn hình nhấp vào 企助 MES Trung tâm <img class=\"inline-thumb\" src=\"./assets/sop/erp/step4_thumb_mes.png\" alt=\"\" />."
          ],
          zh: [
            "手指触屏点击“企助 MES 中心” <img class=\"inline-thumb\" src=\"./assets/sop/erp/step4_thumb_mes.png\" alt=\"\" />"
          ]
        },
        warning: null
      },
      {
        stepNumber: 5,
        name: {
          vi: "Thao tác báo công ERP",
          zh: "ERP 报工操作"
        },
        image: "./assets/sop/erp/step5_scan_report.png",
        thumbnail: "./assets/sop/erp/step5_thumb_scan.png",
        instructions: {
          vi: [
            "Dùng ngón tay chạm màn hình nhấp vào Quét mã báo công <img class=\"inline-thumb\" src=\"./assets/sop/erp/step5_thumb_scan.png\" alt=\"\" />."
          ],
          zh: [
            "手指触屏点击“扫码报工” <img class=\"inline-thumb\" src=\"./assets/sop/erp/step5_thumb_scan.png\" alt=\"\" />"
          ]
        },
        warning: null
      },
      {
        stepNumber: 6,
        name: {
          vi: "ERP Tiếp nhận hàng hóa (Vật liệu / Khởi động tiếp nhận)",
          zh: "ERP 货物接收（材料/开工接收）"
        },
        image: "./assets/sop/erp/step6_routing_card.png",
        images: [
          {
            src: "./assets/sop/erp/step6_thumb_receive.png",
            label: { vi: "1. Nhấp vào tab [Tiếp nhận]", zh: "1. 点击“接收”" }
          },
          {
            src: "./assets/sop/erp/step6_scan_station.png",
            label: { vi: "2. Quét mã QR thẻ lưu chuyển sản xuất", zh: "2. 扫生产履历卡二维码" }
          },
          {
            src: "./assets/sop/erp/step6_routing_card.png",
            label: { vi: "3. Màn hình ERP Khởi động tiếp nhận", zh: "3. ERP 开工接收主界面" }
          }
        ],
        instructions: {
          vi: [
            "Vào giao diện quét mã ERP: Sau khi nhận hàng bắt buộc phải làm tiếp nhận trước, nhấp vào Tiếp nhận.",
            "Tại giao diện quét mã ERP, con trỏ sẽ tự động dừng ở ô Công đoạn hiện tại, bắt đầu dùng máy quét quét mã QR thẻ lưu chuyển sản xuất, phương thức thao tác:",
            "1. Quét mã QR Công đoạn;",
            "2. Quét mã QR Số phiếu giao việc;",
            "Tiếp nhận Số lượng thực tế trên thẻ lưu chuyển sản xuất. Lưu ý: Đối chiếu điền Số lượng tiếp nhận, khi số lượng thực tế trên thẻ lưu chuyển sản xuất khớp với số lượng tiếp nhận, trực tiếp nhấp Tiếp nhận hoàn thành."
          ],
          zh: [
            "进入 ERP 扫码界面：在收到货物后必须先做接收，点击“接收”；",
            "在 ERP 扫码界面，光标会自动停在“当前工序”栏位上，开始使用“扫码器”扫生产履历卡二维码，操作方式：",
            "1. 扫“工序”二维码；",
            "2. 扫“派工单号”二维码；",
            "接收生产履历卡“实物数量” 注意事项：核对填写“接收数”，生产履历卡实物数与接收数一致时，直接点“接收”完成。"
          ]
        },
        warning: {
          vi: "Lưu ý quan trọng: Không cho phép sửa thủ công: Số lượng tiếp nhận < Số lượng thực tế.",
          zh: "注意事项：不允许手动修改：接收数 < 实物数！"
        }
      },
      {
        stepNumber: 7,
        name: {
          vi: "Quét mã qua trạm (Nộp hoàn công)",
          zh: "扫码过站（完工提交）"
        },
        image: "./assets/sop/erp/step7_station_form.png",
        images: [
          {
            src: "./assets/sop/erp/step7_thumb_submit.png",
            label: { vi: "1. Nhấp vào tab [Nộp]", zh: "1. 点击“提交”" }
          },
          {
            src: "./assets/sop/erp/step6_scan_station.png",
            label: { vi: "2. Quét mã QR thẻ lưu chuyển sản xuất", zh: "2. 扫生产履历卡二维码" }
          },
          {
            src: "./assets/sop/erp/step7_station_form.png",
            label: { vi: "3. Màn hình ERP Nộp hoàn công (5 bước)", zh: "3. ERP 完工提交表单" }
          },
          {
            src: "./assets/sop/erp/step7_reprint_dialog.png",
            label: { vi: "4. Xử lý sự cố in: Nhấp lại nút In", zh: "4. 打印异常：重新点击“打印”" }
          },
          {
            src: "./assets/sop/erp/step7_thumb_submit_btn.png",
            label: { vi: "5. Mẫu tem báo công", zh: "5. 完工标签样张" }
          }
        ],
        instructions: {
          vi: [
            "Vào giao diện quét mã ERP: Bộ phận sản xuất báo công quét mã hàng hoàn thành, nhấp vào Nộp.",
            "Tại giao diện quét mã ERP, con trỏ tự động dừng ở ô Công đoạn hiện tại, bắt đầu dùng máy quét quét mã QR thẻ lưu chuyển sản xuất, phương thức thao tác:",
            "1. Quét mã QR Công đoạn;",
            "2. Quét mã QR Số phiếu giao việc;",
            "3. Điền số lượng báo công OK;",
            "4. Điền số lượng hàng lỗi NG (nếu có);",
            "5. Nhấp vào Nộp và in <img class=\"inline-thumb\" src=\"./assets/sop/erp/step7_thumb_submit_btn.png\" alt=\"\" />, hoàn thành.",
            "Sự cố in: Tem thẻ lưu chuyển công đoạn chưa được in bình thường, không được thoát giao diện in, có thể trực tiếp tại giao diện hiện tại nhấp lại In <img class=\"inline-thumb\" src=\"./assets/sop/erp/step7_thumb_reprint_btn.png\" alt=\"\" /> là có thể in con tem báo công này."
          ],
          zh: [
            "进入 ERP 扫码界面：制造部门完工品扫码报工，点击“提交”；",
            "在 ERP 扫码界面，光标会自动停在“当前工序”栏位上，开始使用“扫码器”扫生产履历卡二维码，操作方式：",
            "1. 扫“工序”二维码；",
            "2. 扫“派工单号”二维码；",
            "3. 填写报工数“OK”数量；",
            "4. 填写不良数“NG品”数量（如有）；",
            "5. 点击“提交打印” <img class=\"inline-thumb\" src=\"./assets/sop/erp/step7_thumb_submit_btn.png\" alt=\"\" />，完成。",
            "打印异常：工序流转卡标签未正常打印，不要退出打印界面，可直接在当前界面重新点击“打印” <img class=\"inline-thumb\" src=\"./assets/sop/erp/step7_thumb_reprint_btn.png\" alt=\"\" /> 即可打印此张报工标签。"
          ]
        },
        warning: {
          vi: "Sự cố in: Tem thẻ lưu chuyển công đoạn chưa được in bình thường, không được thoát giao diện in, có thể trực tiếp tại giao diện hiện tại nhấp lại nút In là có thể in con tem báo công này.",
          zh: "打印异常：工序流转卡标签未正常打印，不要退出打印界面，可直接在当前界面重新点击“打印”即可打印此张报工标签。"
        }
      },
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
            label: { vi: "1. Vị trí khoang đặt giấy in", zh: "1. 平板下方“打印纸”放置区" }
          },
          {
            src: "./assets/sop/erp/step8_printer_roll_feed.png",
            label: { vi: "2. Đặt mặt chính giấy in vào khay", zh: "2. 将打印纸“正面”放置到位" }
          }
        ],
        instructions: {
          vi: [
            "1. Máy in: Tại khu vực đặt giấy in ở phía dưới máy tính bảng, mở nắp.",
            "2. Giấy in: Đặt mặt chính của giấy in vào khay giấy đúng vị trí sau đó đóng lại là được."
          ],
          zh: [
            "1. 打印机：在平板下方“打印纸”放置区，打开盖子。",
            "2. 打印纸：将打印纸“正面”放置到纸槽 OK 后关闭即可。"
          ]
        },
        warning: null
      },
      {
        stepNumber: 9,
        name: {
          vi: "Các thao tác khác",
          zh: "其他操作"
        },
        image: "./assets/sop/erp/step9_bottom_keys.png",
        instructions: {
          vi: [
            "Giải thích chức năng các phím điều hướng ở phía dưới cùng màn hình máy tính bảng:",
            "1. [返回上一页] : Quay lại trang trước",
            "2. [切换界面] : Chuyển đổi giao diện",
            "3. [重启] : Khởi động lại",
            "4. [关机] : Tắt máy"
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

