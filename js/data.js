// WorkGuide SOP Dataset - 100% Faithful to 工业平板扫码报工操作流程SOP-20260421.docx
// Company: CÔNG TY TNHH CÔNG NGHIỆP CHÍNH XÁC CHEN KAI / 振凱精密工業责任有限公司
// Standard Operating Procedure (SOP) / 标准作业指导书
// Tablet Version: 1.5.48 | Date: 2026-4-20 | Author: 郑献青 | Approved: 2026-05-01
// Optimized Workflow: 17 Actionable Steps, Zero Redundancy, Single Authentic Image per Step (NO 1/2 hidden tabs)

export const guidesData = [
  {
    id: "sop-erp-tablet",
    category: "catERP",
    plantId: "plantChenKai",
    sopNumber: "SOP-20260421",
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
    
    // ========================================================================
    // 作业准备 (Operation Preparation)
    // ========================================================================
    tools: [
      {
        name: { 
          vi: "Thiết bị: Máy tính bảng công nghiệp", 
          zh: "设备（平板）" 
        },
        desc: {
          vi: "Máy tính bảng cảm ứng công nghiệp tích hợp máy in nhiệt",
          zh: "集成微型热敏打印机的工业级触屏平板终端"
        },
        icon: "tablet",
        image: "./assets/sop/erp/eq_tablet.png" // image1.png
      },
      {
        name: { 
          vi: "Công cụ: Máy quét mã vạch", 
          zh: "工 具（扫码器）" 
        },
        desc: {
          vi: "Súng quét mã QR/mã vạch có dây kết nối qua cổng USB",
          zh: "USB接口高灵敏度工业二维码/条形码扫描枪"
        },
        icon: "barcode-scanner",
        image: "./assets/sop/erp/tool_scanner.png" // image2.png
      },
      {
        name: { 
          vi: "Khác: Giấy nhãn in nhiệt", 
          zh: "其 他（标签纸）" 
        },
        desc: {
          vi: "Giấy decal cảm nhiệt POSTEK 3 lớp chống nước (55mm x 180mm)",
          zh: "POSTEK 三防热敏不干胶纸 (55mm×180mm)"
        },
        icon: "tag",
        image: "./assets/sop/erp/tool_labels.png" // image3.png
      }
    ],

    prerequisites: {
      vi: "Kết nối nguồn điện, mạng, máy quét mã, đặt giấy in hoàn tất trước khi mở máy.",
      zh: "连接电源、网路、扫码器、放置打印纸完成后方可开机。"
    },

    // ========================================================================
    // 作业标准流程 (17 Actionable Steps: Zero Redundancy, 1 Real Image Per Step)
    // ========================================================================
    steps: [
      // ----------------------------------------------------------------------
      // Bước 1 (Docx 步骤 1.1: Nút mở máy màu đỏ)
      // ----------------------------------------------------------------------
      {
        stepNumber: 1,
        docxStepRef: "1.1",
        docxStepTitle: "步骤 1: 开机界面",
        name: {
          vi: "Mở máy tính bảng - Bật công tắc nguồn màu đỏ ở đỉnh máy",
          zh: "开机界面 - 开启顶部左侧红色开机按键"
        },
        image: "./assets/sop/erp/step1_thumb_switch.png", // image4.png
        instructions: {
          vi: [
            "1. Kết nối hoàn tất dây nguồn điện, dây mạng, cắm máy quét mã vạch và kiểm tra cuộn giấy in đã nạp sẵn.",
            "2. Ở đỉnh máy tính bảng bên góc trái, tìm nút công tắc màu đỏ là “nút mở máy” (开机按键).",
            "3. Bấm bật nút đỏ để khởi động máy tính bảng công nghiệp."
          ],
          zh: [
            "1. 连接电源、网路、扫码器、放置打印纸完成。",
            "2. 在平板顶部，左边“红色键”为“开机按键”。",
            "3. 直接开机启动平板设备进入系统。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 2 (Docx 步骤 1.2: Màn hình chính vào 应用程序)
      // ----------------------------------------------------------------------
      {
        stepNumber: 2,
        docxStepRef: "1.2",
        docxStepTitle: "步骤 1: 开机界面",
        name: {
          vi: "Màn hình chính - Nhấp vào ô “应用程序” (Ứng dụng)",
          zh: "平板主界面 - 点击“应用程序”"
        },
        image: "./assets/sop/erp/step1_boot.png", // image5.png
        instructions: {
          vi: [
            "1. Sau khi mở máy, hệ thống tự động tải vào màn hình chính của máy tính bảng.",
            "2. Dùng ngón tay chạm vào ô biểu tượng màu xanh lá “应用程序” (Ứng dụng) để mở giao diện các chương trình cài đặt ERP."
          ],
          zh: [
            "1. 开机后系统直接进入平板主界面。",
            "2. 点击绿色图标“应用程序”，进入 ERP 安装程序界面。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 3 (Docx 步骤 2: Khởi động APP 企助物联)
      // ----------------------------------------------------------------------
      {
        stepNumber: 3,
        docxStepRef: "2",
        docxStepTitle: "步骤 2: ERP登录",
        name: {
          vi: "Khởi động APP “企助物联” vào hệ thống ERP",
          zh: "ERP登录 - 触屏点击“企助物联”APP进入"
        },
        image: "./assets/sop/erp/step2_erp_login.png", // image7.png
        instructions: {
          vi: [
            "1. Trên màn hình máy tính bảng, tìm biểu tượng ứng dụng “企助物联” (biểu tượng chữ Q màu xanh dương có lồng trang sách đỏ).",
            "2. Dùng ngón tay chạm trực tiếp vào APP “企助物联” trên màn hình.",
            "3. Ứng dụng sẽ tự động tải và hiển thị giao diện đăng nhập hệ thống ERP."
          ],
          zh: [
            "1. 在平板界面上找到“企助物联”应用图标（蓝色圆环Q造型搭配红色书页图案）。",
            "2. 直接在平板上手指触屏点击“企助物联” APP 图标。",
            "3. 系统将加载启动并进入 ERP 登录界面。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 4 (Docx 步骤 3: Đăng nhập tài khoản & mật khẩu)
      // ----------------------------------------------------------------------
      {
        stepNumber: 4,
        docxStepRef: "3",
        docxStepTitle: "步骤 3: ERP登录",
        name: {
          vi: "Đăng nhập ERP - Nhập tài khoản, mật khẩu & Bấm nút xanh",
          zh: "ERP登录 - 录入账户密码并点击“蓝色登录键”"
        },
        image: "./assets/sop/erp/step3_login_fields.png", // image8.png
        instructions: {
          vi: [
            "1. Dùng ngón tay chạm vào ô tài khoản, nhập tài khoản người sử dụng của bạn (ví dụ: Vck220705).",
            "2. Chạm vào ô mật khẩu, nhập đúng mật khẩu đăng nhập.",
            "3. Tích chọn ô “Nhớ mật khẩu” (记住密码).",
            "4. Nhấp vào phím màu xanh lam ở mép dưới cùng màn hình (“蓝色登录键”) để vào giao diện thao tác ERP."
          ],
          zh: [
            "1. 手指触屏，录入使用人的账户（如 Vck220705）。",
            "2. 录入使用人的登录密码。",
            "3. 勾选“记住密码”复选框。",
            "4. 点击平板最下方的“蓝色登录键”，进入 ERP 操作界面。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 5 (Docx 步骤 4: Vào 企助MES中心)
      // ----------------------------------------------------------------------
      {
        stepNumber: 5,
        docxStepRef: "4",
        docxStepTitle: "步骤 4: ERP报工操作",
        name: {
          vi: "Vào hệ thống MES - Chạm vào ô màu hồng “企助MES中心”",
          zh: "ERP报工操作 - 手指触屏点击“企助MES中心”"
        },
        image: "./assets/sop/erp/step4_mes_center.png", // image10.png
        instructions: {
          vi: [
            "1. Trên giao diện chức năng chính của ERP, tìm nút chức năng “企助MES中心” (ô hình chữ nhật màu hồng nhạt).",
            "2. Dùng ngón tay chạm vào ô “企助MES中心” để mở trung tâm điều hành quản lý sản xuất và báo công."
          ],
          zh: [
            "1. 在 ERP 主操作界面上，找到粉色矩形按键“企助MES中心”。",
            "2. 手指触屏点击“企助MES中心”，进入 MES 制造执行核心功能。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 6 (Docx 步骤 5: Vào 扫码报工)
      // ----------------------------------------------------------------------
      {
        stepNumber: 6,
        docxStepRef: "5",
        docxStepTitle: "步骤 5: ERP报工操作",
        name: {
          vi: "Mở giao diện Quét mã báo công - Chạm vào ô “扫码报工”",
          zh: "ERP报工操作 - 手指触屏点击“扫码报工”"
        },
        image: "./assets/sop/erp/step5_scan_report.png", // image12.png
        instructions: {
          vi: [
            "1. Trên giao diện menu trung tâm MES, tìm nút có biểu tượng máy quét mã vạch màu xanh mang tên “扫码报工”.",
            "2. Dùng ngón tay chạm vào ô “扫码报工” để vào màn hình làm việc quét mã tiếp nhận và báo công qua trạm."
          ],
          zh: [
            "1. 在 MES 中心功能菜单中，找到带条形码扫描器图标的“扫码报工”按键。",
            "2. 手指触屏点击“扫码报工”，进入扫码接收与报工核心工作界面。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 7 (Docx 步骤 6.1: Chọn Tab 接收)
      // ----------------------------------------------------------------------
      {
        stepNumber: 7,
        docxStepRef: "6.1",
        docxStepTitle: "步骤 6: ERP货物接收",
        name: {
          vi: "Tiếp nhận hàng hóa - Chạm chọn Tab màu đỏ “接收” (Tiếp nhận)",
          zh: "ERP货物接收 - 点击红色标签“接收”"
        },
        image: "./assets/sop/erp/step6_thumb_receive.png", // image13.png
        instructions: {
          vi: [
            "1. Sau khi nhận được nguyên vật liệu hoặc linh kiện bán thành phẩm chuyển đến công đoạn, bắt buộc phải thực hiện thủ tục tiếp nhận trước khi gia công.",
            "2. Tại thanh chuyển đổi chế độ phía trên giao diện quét mã ERP, chạm vào Tab màu đỏ có chữ “接收” (Tiếp nhận)."
          ],
          zh: [
            "1. 进入 ERP 扫码界面后，在收到货物后必须先做接收。",
            "2. 点击顶部红色选项卡“接收”，准备扫码接入物料。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 8 (Docx 步骤 6.2: Quét mã QR Thẻ lưu chuyển tiếp nhận)
      // ----------------------------------------------------------------------
      {
        stepNumber: 8,
        docxStepRef: "6.2",
        docxStepTitle: "步骤 6: ERP货物接收",
        name: {
          vi: "Tiếp nhận hàng - Quét mã QR Thẻ lưu chuyển sản xuất (工序 & 派工单号)",
          zh: "ERP货物接收 - 扫生产履历卡“工序”及“派工单号”二维码"
        },
        image: "./assets/sop/erp/routing_card_qr_guide.png", // image14.png
        instructions: {
          vi: [
            "1. Khi vào giao diện tiếp nhận, con trỏ hệ thống sẽ tự động dừng tại ô “当前工序” (Công đoạn hiện tại).",
            "2. Cầm súng quét mã vạch USB, hướng tia quét vào Thẻ lưu chuyển sản xuất (生产履历卡):",
            "   - Thao tác 1: Quét mã QR “工序” (Công đoạn gia công).",
            "   - Thao tác 2: Quét mã QR “派工单号” (Số phiếu giao việc).",
            "3. Hệ thống sẽ tự động đọc dữ liệu và hiển thị chi tiết lô hàng tiếp nhận."
          ],
          zh: [
            "1. 在 ERP 扫码界面，光标会自动停在“当前工序”栏位上。",
            "2. 开始使用“扫码器”扫生产履历卡二维码，操作方式：",
            "   - 扫“工序”二维码；",
            "   - 扫“派工单号”二维码；",
            "3. 系统将自动解析工序及工单详情。"
          ]
        },
        warning: {
          vi: "Lưu ý: Quét đúng tuần tự Thao tác 1 (工序) trước, sau đó mới quét Thao tác 2 (派工单号).",
          zh: "注意：必须按顺序先扫操作 1（工序），再扫操作 2（派工单号）。"
        }
      },

      // ----------------------------------------------------------------------
      // Bước 9 (Docx 步骤 6.3: Màn hình 開工接收 & Bấm 接收)
      // ----------------------------------------------------------------------
      {
        stepNumber: 9,
        docxStepRef: "6.3",
        docxStepTitle: "步骤 6: ERP货物接收",
        name: {
          vi: "Màn hình 開工接收 - Đối chiếu số lượng & Nhấp nút “接收”",
          zh: "ERP货物接收 - 核对实物数与接收数一致后点击“接收”"
        },
        image: "./assets/sop/erp/step6_receive_form.png", // image15.png
        instructions: {
          vi: [
            "1. Màn hình hiển thị phiếu “開工接收” gồm thông tin linh kiện, tên quy trình và số lượng.",
            "2. Kiểm đếm thực tế số lượng hàng nhận vào trạm và đối chiếu với ô “接收数” (Số lượng tiếp nhận).",
            "3. Khi số lượng thực tế trên Thẻ lưu chuyển và số lượng tiếp nhận trùng khớp hoàn toàn, nhấn trực tiếp nút “接收” để hoàn tất tiếp nhận."
          ],
          zh: [
            "1. 界面弹出“開工接收”表单，核对料号与工序。",
            "2. 接收生产履历卡“实物数量”注意事项：核对填写“接收数”。",
            "3. 生产履历卡实物数与接收数一致时，直接点“接收”完成。"
          ]
        },
        warning: {
          vi: "NGHIÊM CẤM: Tuyệt đối không được sửa đổi thủ công 'Số tiếp nhận < Số lượng hàng thực tế' (不允许手动修改：接收数 < 实物数).",
          zh: "严格禁止：不允许手动修改：接收数 < 实物数。"
        }
      },

      // ----------------------------------------------------------------------
      // Bước 10 (Docx 步骤 7.1: Chọn Tab 提交)
      // ----------------------------------------------------------------------
      {
        stepNumber: 10,
        docxStepRef: "7.1",
        docxStepTitle: "步骤 7: 扫码过站",
        name: {
          vi: "Nộp hoàn công - Chạm chọn Tab màu xanh lá “提交” (Nộp báo công)",
          zh: "扫码过站 - 点击绿色标签“提交”"
        },
        image: "./assets/sop/erp/step7_thumb_submit.png", // image16.png
        instructions: {
          vi: [
            "1. Bộ phận sản xuất sau khi gia công hoàn thành sản phẩm cần thực hiện quét mã báo công để xuất trạm.",
            "2. Tại thanh điều hướng phía trên giao diện ERP, chạm vào Tab màu xanh lá có chữ “提交” (Nộp báo công)."
          ],
          zh: [
            "1. 制造部门完工品扫码报工，进入 ERP 扫码界面。",
            "2. 点击顶部绿色选项卡“提交”，准备过站报工。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 11 (Docx 步骤 7.2: Quét mã QR Thẻ lưu chuyển hoàn công)
      // ----------------------------------------------------------------------
      {
        stepNumber: 11,
        docxStepRef: "7.2",
        docxStepTitle: "步骤 7: 扫码过站",
        name: {
          vi: "Nộp hoàn công - Quét mã QR Thẻ lưu chuyển sản xuất để xuất trạm",
          zh: "扫码过站 - 扫生产履历卡“工序”及“派工单号”二维码"
        },
        image: "./assets/sop/erp/routing_card_qr_guide.png", // image14.png
        instructions: {
          vi: [
            "1. Con trỏ sẽ tự động dừng tại ô “当前工序” (Công đoạn hiện tại).",
            "2. Dùng súng quét mã vạch quét lại Thẻ lưu chuyển sản xuất của lô hàng vừa làm xong:",
            "   - Thao tác 1: Quét mã QR “工序”.",
            "   - Thao tác 2: Quét mã QR “派工单号”.",
            "3. (Ghi chú: Đây là thao tác quét cùng Thẻ lưu chuyển sản xuất đi kèm thùng hàng theo quy định tại Bước 7 của SOP Chen Kai để báo công xuất trạm)."
          ],
          zh: [
            "1. 在 ERP 扫码界面，光标会自动停在“当前工序”栏位上。",
            "2. 开始使用“扫码器”扫生产履历卡二维码，操作方式：",
            "   - 扫“工序”二维码；",
            "   - 扫“派工单号”二维码；",
            "3. （注：按 SOP 规范，此处使用随周转箱流转的同一张生产履历卡完成完工确认）。"
          ]
        },
        warning: {
          vi: "Quét tuần tự Thao tác 1 (工序) trước, sau đó quét Thao tác 2 (派工单号).",
          zh: "按顺序先扫操作 1（工序），再扫操作 2（派工单号）。"
        }
      },

      // ----------------------------------------------------------------------
      // Bước 12 (Docx 步骤 7.3: Màn hình 完工提交 điền OK/NG & Bấm 提交并打印)
      // ----------------------------------------------------------------------
      {
        stepNumber: 12,
        docxStepRef: "7.3",
        docxStepTitle: "步骤 7: 扫码过站",
        name: {
          vi: "Màn hình 完工提交 - Điền số lượng OK, NG & Bấm “提交并打印”",
          zh: "扫码过站 - 填写OK数、不良NG数并点击“提交并打印”"
        },
        image: "./assets/sop/erp/step7_station_form.png", // image19.png
        instructions: {
          vi: [
            "1. Màn hình hiển thị giao diện biểu mẫu “完工提交” (Nộp hoàn công).",
            "2. Nhập số lượng sản phẩm hoàn thành đạt yêu cầu vào ô báo công “OK”.",
            "3. Nhập số lượng phế phẩm lỗi vào ô “NG品” (nếu có phát sinh lỗi).",
            "4. Kiểm tra kỹ số lượng, sau đó bấm nút “提交并打印” (Nộp và In tem) để hoàn tất."
          ],
          zh: [
            "1. 进入“完工提交”数据录入界面。",
            "2. 填写报工数“OK”数量；",
            "3. 填写不良数“NG品”数量（如有）；",
            "4. 确认无误后，点击“提交打印”，完成过站。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 13 (Docx 步骤 7.4: Nhận tem in Thẻ lưu chuyển công đoạn)
      // ----------------------------------------------------------------------
      {
        stepNumber: 13,
        docxStepRef: "7.4",
        docxStepTitle: "步骤 7: 扫码过站",
        name: {
          vi: "Nhận tem in Thẻ lưu chuyển công đoạn (工艺流转卡) & Dán lên thùng hàng",
          zh: "扫码过站 - 取得打印出的工艺流转卡标签并贴箱"
        },
        image: "./assets/sop/erp/step7_printed_tag.png", // image17.png
        instructions: {
          vi: [
            "1. Sau khi bấm “提交并打印”, máy in nhiệt tích hợp của máy tính bảng sẽ tự động in ra tem nhãn Thẻ lưu chuyển công đoạn mới.",
            "2. Lấy tem nhãn, kiểm tra thông tin số lượng, tên sản phẩm và mã vạch in rõ ràng, không bị mờ hay đứt nét.",
            "3. Dán tem lên thùng hàng luân chuyển thực tế để chuyển giao cho công đoạn kế tiếp."
          ],
          zh: [
            "1. 点击“提交打印”后，平板内置打印机自动打印出新工序流转卡标签纸。",
            "2. 确认标签上的工单号、料号、数量与二维码清晰完整。",
            "3. 将标签贴于实物周转箱，流转至下一道工序。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 14 (Docx 步骤 7.5: Xử lý sự cố in tem - Bấm nút 打印 in lại)
      // ----------------------------------------------------------------------
      {
        stepNumber: 14,
        docxStepRef: "7.5",
        docxStepTitle: "步骤 7: 扫码过站",
        name: {
          vi: "Xử lý sự cố in tem - Tuyệt đối không bấm ✕, bấm trực tiếp nút “打印” để in lại",
          zh: "扫码过站 - 打印异常处理：不要退出，直接重新点击“打印”"
        },
        image: "./assets/sop/erp/step7_reprint_dialog.png", // image20.png
        instructions: {
          vi: [
            "1. Sự cố in: Nếu nhãn Thẻ lưu chuyển công đoạn chưa in ra bình thường (hết giấy, kẹt giấy hoặc lỗi kết nối), hộp thoại cảnh báo in sẽ xuất hiện.",
            "2. Tuyệt đối KHÔNG bấm dấu ✕ ở góc trên để tránh bị thoát khỏi giao diện in.",
            "3. Kiểm tra máy in/nạp giấy xong, nhấp trực tiếp vào nút màu xanh lam “打印” (In) trên màn hình này để máy in thực hiện in lại tem báo công.",
            "4. Sau khi tem in ra bình thường, dán vào thùng hàng hoàn tất qua trạm."
          ],
          zh: [
            "1. 打印异常：工序流转卡标签未正常打印，系统将弹出重印提示窗口。",
            "2. 重要禁忌：不要退出打印界面（切勿点击右上角 ✕ 退出）。",
            "3. 可直接在当前界面重新点击蓝色“打印”按键，即可重新打印此张报工标签。",
            "4. 标签打印出纸后，贴于实物周转箱即可完成过站。"
          ]
        },
        warning: {
          vi: "TUYỆT ĐỐI KHÔNG BẤM DẤU ✕: Nếu thoát khỏi giao diện in, bạn sẽ không thể in lại tem báo công này được nữa!",
          zh: "切勿点击 ✕ 退出：退出打印界面后将无法在当前界面补打此张标签！"
        }
      },

      // ----------------------------------------------------------------------
      // Bước 15 (Docx 步骤 8.1: Mở nắp khay giấy in)
      // ----------------------------------------------------------------------
      {
        stepNumber: 15,
        docxStepRef: "8.1",
        docxStepTitle: "步骤 8: 打印纸",
        name: {
          vi: "Giấy in nhiệt - Mở nắp khoang chứa giấy in ở mép dưới máy tính bảng",
          zh: "打印纸（放置或更换）- 打开平板下方打印纸盖子"
        },
        image: "./assets/sop/erp/step8_printer_door_closed.png", // image21.png
        instructions: {
          vi: [
            "1. Máy in tích hợp: Tìm khu vực đặt giấy in có dòng chữ đỏ “打印纸放置区” ở mép dưới mặt trước máy tính bảng.",
            "2. Nhấn chốt mở nắp khay in màu đen để nắp tự động bật mở ra."
          ],
          zh: [
            "1. 打印机：在平板下方“打印纸”放置区（打印纸放置区）。",
            "2. 扳开仓门锁扣，打开打印机仓盖。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 16 (Docx 步骤 8.2: Đặt cuộn giấy đúng mặt chính và đóng nắp)
      // ----------------------------------------------------------------------
      {
        stepNumber: 16,
        docxStepRef: "8.2",
        docxStepTitle: "步骤 8: 打印纸",
        name: {
          vi: "Giấy in nhiệt - Đặt cuộn giấy đúng mặt chính (“正面”) và đóng nắp lại",
          zh: "打印纸（放置或更换）- 将正面放置到纸槽并关闭"
        },
        image: "./assets/sop/erp/step8_printer_roll_feed.png", // image22.png
        instructions: {
          vi: [
            "1. Lấy cuộn giấy in nhiệt POSTEK (kích thước chuẩn 55mm x 180mm).",
            "2. Đặt cuộn giấy in đúng “mặt chính” (正面 - mặt cảm nhiệt hướng ra ngoài tiếp xúc với đầu in) vào trong rãnh chứa giấy.",
            "3. Kéo đầu giấy nhô thò ra ngoài khe cắt giấy một đoạn ngắn.",
            "4. Sau khi kiểm tra vị trí ngay ngắn OK thì nhấn đóng nắp khay in lại cho khớp chốt."
          ],
          zh: [
            "1. 准备规格为 55mm×180mm 的三防热敏打印纸卷。",
            "2. 将打印纸“正面”（热敏面朝外）放置到纸槽内。",
            "3. 拉出少量纸头露在出纸口外。",
            "4. 确认放置 OK 后关闭机盖闭合卡扣即可。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 17 (Docx 步骤 9: Các phím điều hướng đáy màn hình)
      // ----------------------------------------------------------------------
      {
        stepNumber: 17,
        docxStepRef: "9",
        docxStepTitle: "步骤 9: 其他操作",
        name: {
          vi: "Các thao tác khác - Giải thích chức năng các phím ở đáy màn hình",
          zh: "其他操作 - 屏幕最下方按键功能说明"
        },
        image: "./assets/sop/erp/step9_bottom_keys.png", // image23.png
        instructions: {
          vi: [
            "Giải thích chức năng các phím điều hướng hệ thống ở thanh đáy màn hình máy tính bảng:",
            "1. [返回上一页] (Phím mũi tên trái ◀): Quay lại giao diện trang trước.",
            "2. [切换界面] (Phím hình vuông ■): Chuyển đổi giữa các cửa sổ ứng dụng đa nhiệm.",
            "3. [重启] (Phím nguồn ⏻): Khởi động lại thiết bị máy tính bảng.",
            "4. [关机] (Phím nguồn ⏻): Tắt nguồn thiết bị máy tính bảng.",
            "(Ghi chú: Ngoài ra trên thanh còn có biểu tượng giảm âm lượng 🔉, phím tròn Home ● và tăng âm lượng 🔊)."
          ],
          zh: [
            "在屏幕最下方的按键功能说明：",
            "1. [返回上一页] （◀ 箭头）：返回上级界面",
            "2. [切换界面] （■ 方块）：多任务窗口切换",
            "3. [重启] （⏻ 电源键）：重新启动平板",
            "4. [关机] （⏻ 电源键）：关闭平板设备",
            "（注：中间还包含音量减 🔉、主页圆点 ● 与音量加 🔊 按键）。"
          ]
        },
        warning: null
      }
    ]
  }
];
