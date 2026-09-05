// WorkGuide SOP Dataset - 100% Faithful to 工业平板扫码报工操作流程SOP-20260421.docx
// Company: CÔNG TY TNHH CÔNG NGHIỆP CHÍNH XÁC CHEN KAI / 振凱精密工業责任有限公司
// Standard Operating Procedure (SOP) / 标准作业指导书
// Tablet Version: 1.5.48 | Date: 2026-4-20 | Author: 郑献青 | Approved: 2026-05-01
// Completely Separated Images: Each step has exactly ONE authentic image (NO 1/2 hidden tabs)

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
    // 作业标准流程 (21 Dedicated Steps: 1 Image Per Step, ZERO 1/2 gallery tabs)
    // ========================================================================
    steps: [
      // ----------------------------------------------------------------------
      // Bước 1 (Docx 步骤 1 - Ảnh 1/2: Nút mở máy màu đỏ)
      // ----------------------------------------------------------------------
      {
        stepNumber: 1,
        docxStepRef: "1.1",
        docxStepTitle: "步骤 1: 开机界面",
        name: {
          vi: "Mở máy tính bảng - Bật nút nguồn màu đỏ ở đỉnh máy",
          zh: "开机界面 - 开启顶部左侧红色开机按键"
        },
        image: "./assets/sop/erp/step1_thumb_switch.png", // image4.png
        instructions: {
          vi: [
            "1. Kết nối nguồn điện, mạng, máy quét mã, đặt giấy in hoàn tất.",
            "2. Ở đỉnh máy tính bảng bên trái, tìm nút công tắc màu đỏ là “nút mở máy”.",
            "3. Bấm bật nút đỏ để khởi động máy tính bảng công nghiệp."
          ],
          zh: [
            "1. 连接电源、网路、扫码器、放置打印纸完成。",
            "2. 在平板顶部，左边“红色键”为“开机按键”。",
            "3. 直接开机启动平板设备。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 2 (Docx 步骤 1 - Ảnh 2/2: Màn hình chính vào 应用程序)
      // ----------------------------------------------------------------------
      {
        stepNumber: 2,
        docxStepRef: "1.2",
        docxStepTitle: "步骤 1: 开机界面",
        name: {
          vi: "Màn hình chính - Nhấp vào “应用程序” (Ứng dụng)",
          zh: "平板主界面 - 点击“应用程序”"
        },
        image: "./assets/sop/erp/step1_boot.png", // image5.png
        instructions: {
          vi: [
            "1. Sau khi mở máy, hệ thống vào giao diện chính máy tính bảng.",
            "2. Dùng ngón tay chạm vào ô biểu tượng màu xanh lá “应用程序” (Ứng dụng) để vào giao diện chương trình cài đặt ERP."
          ],
          zh: [
            "1. 开机后直接进入平板主界面。",
            "2. 点击绿色图标“应用程序”，进入 ERP 安装程序界面。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 3 (Docx 步骤 2 - Ảnh 1/2: Biểu tượng APP 企助物联)
      // ----------------------------------------------------------------------
      {
        stepNumber: 3,
        docxStepRef: "2.1",
        docxStepTitle: "步骤 2: ERP登录",
        name: {
          vi: "Nhận diện biểu tượng APP “企助物联”",
          zh: "ERP登录 - 识别“企助物联”APP图标"
        },
        image: "./assets/sop/erp/step2_thumb_app.png", // image6.png
        instructions: {
          vi: [
            "1. Nhận diện đúng biểu tượng ứng dụng ERP trên màn hình: Chữ Q màu xanh dương đậm có lồng hình trang sách màu đỏ gạch.",
            "2. Tên ứng dụng hiển thị bên dưới là “企助物联”."
          ],
          zh: [
            "1. 确认待点击的 ERP 应用程序图标：蓝色圆环 Q 造型搭配书页图案。",
            "2. 图标下方文字为“企助物联”。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 4 (Docx 步骤 2 - Ảnh 2/2: Chạm vào APP 企助物联)
      // ----------------------------------------------------------------------
      {
        stepNumber: 4,
        docxStepRef: "2.2",
        docxStepTitle: "步骤 2: ERP登录",
        name: {
          vi: "Khởi động APP “企助物联” vào hệ thống ERP",
          zh: "ERP登录 - 触屏点击“企助物联”APP进入"
        },
        image: "./assets/sop/erp/step2_erp_login.png", // image7.png
        instructions: {
          vi: [
            "1. Trên màn hình máy tính bảng, chạm trực tiếp vào biểu tượng APP “企助物联”.",
            "2. Ứng dụng sẽ tự động tải và hiển thị màn hình đăng nhập ERP."
          ],
          zh: [
            "1. 直接在平板上触屏点击“企助物联” APP。",
            "2. 系统将加载并进入 ERP 登录界面。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 5 (Docx 步骤 3: Nhập tài khoản, mật khẩu, bấm đăng nhập)
      // ----------------------------------------------------------------------
      {
        stepNumber: 5,
        docxStepRef: "3",
        docxStepTitle: "步骤 3: ERP登录",
        name: {
          vi: "Đăng nhập ERP - Nhập tài khoản, mật khẩu & Bấm nút xanh",
          zh: "ERP登录 - 录入账户密码并点击“蓝色登录键”"
        },
        image: "./assets/sop/erp/step3_login_fields.png", // image8.png
        instructions: {
          vi: [
            "1. Dùng ngón tay chạm vào ô tài khoản, nhập tài khoản sử dụng của bạn (ví dụ: Vck220705).",
            "2. Chạm vào ô mật khẩu, nhập đúng mật khẩu người sử dụng.",
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
      // Bước 6 (Docx 步骤 4 - Ảnh 1/2: Nút 企助MES中心)
      // ----------------------------------------------------------------------
      {
        stepNumber: 6,
        docxStepRef: "4.1",
        docxStepTitle: "步骤 4: ERP报工操作",
        name: {
          vi: "Nhận diện nút chức năng “企助MES中心”",
          zh: "ERP报工操作 - 识别“企助MES中心”按钮"
        },
        image: "./assets/sop/erp/step4_thumb_mes.png", // image9.png
        instructions: {
          vi: [
            "1. Nhận diện nút chức năng “企助MES中心” (ô hình chữ nhật màu hồng nhạt trên màn hình).",
            "2. Đây là cổng chính vào hệ thống quản lý sản xuất và báo công MES."
          ],
          zh: [
            "1. 识别粉色矩形按键“企助MES中心”。",
            "2. 该按钮为主系统进入 MES 制造执行核心功能的入口。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 7 (Docx 步骤 4 - Ảnh 2/2: Chạm vào 企助MES中心)
      // ----------------------------------------------------------------------
      {
        stepNumber: 7,
        docxStepRef: "4.2",
        docxStepTitle: "步骤 4: ERP报工操作",
        name: {
          vi: "Vào “企助MES中心” trên menu hệ thống ERP",
          zh: "ERP报工操作 - 触屏点击“企助MES中心”"
        },
        image: "./assets/sop/erp/step4_mes_center.png", // image10.png
        instructions: {
          vi: [
            "1. Dùng ngón tay chạm vào ô màu hồng [企助MES中心] ở góc trên bên trái màn hình.",
            "2. Màn hình sẽ chuyển tiếp sang menu chức năng của bộ phận sản xuất MES."
          ],
          zh: [
            "1. 手指触屏点击左上方粉色按键“企助MES中心”。",
            "2. 系统进入 MES 制造中心功能菜单界面。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 8 (Docx 步骤 5 - Ảnh 1/2: Nút 扫码报工)
      // ----------------------------------------------------------------------
      {
        stepNumber: 8,
        docxStepRef: "5.1",
        docxStepTitle: "步骤 5: ERP报工操作",
        name: {
          vi: "Nhận diện nút chức năng “扫码报工” (Quét mã báo công)",
          zh: "ERP报工操作 - 识别“扫码报工”按键"
        },
        image: "./assets/sop/erp/step5_thumb_scan.png", // image11.png
        instructions: {
          vi: [
            "1. Nhận diện nút hình chiếc súng quét mã vạch màu xanh dương có viền nét đứt.",
            "2. Tên nút bên dưới là “扫码报工” (Quét mã báo công)."
          ],
          zh: [
            "1. 确认带有扫描枪图形的蓝色圆形虚线边框图标。",
            "2. 下方文字标识为“扫码报工”。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 9 (Docx 步骤 5 - Ảnh 2/2: Chạm vào 扫码报工)
      // ----------------------------------------------------------------------
      {
        stepNumber: 9,
        docxStepRef: "5.2",
        docxStepTitle: "步骤 5: ERP报工操作",
        name: {
          vi: "Vào “扫码报工” trên giao diện menu MES",
          zh: "ERP报工操作 - 触屏点击“扫码报工”进入"
        },
        image: "./assets/sop/erp/step5_scan_report.png", // image12.png
        instructions: {
          vi: [
            "1. Tại giao diện các chức năng MES, dùng ngón tay chạm vào biểu tượng [扫码报工] ở hàng dưới.",
            "2. Hệ thống sẽ mở giao diện quét mã công đoạn và chuyển trạm tiếp nhận/nộp hoàn công."
          ],
          zh: [
            "1. 手指触屏点击下排“扫码报工”图标。",
            "2. 进入 ERP 扫码过站与报工接收主界面。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 10 (Docx 步骤 6 - Dòng 17: Tab 接收)
      // ----------------------------------------------------------------------
      {
        stepNumber: 10,
        docxStepRef: "6.1",
        docxStepTitle: "步骤 6: ERP货物接收",
        name: {
          vi: "Tiếp nhận hàng hóa - Chọn Tab màu đỏ “Tiếp nhận” (接收)",
          zh: "ERP货物接收 - 点击顶部红色“接收”标签"
        },
        image: "./assets/sop/erp/step6_thumb_receive.png", // image13.png
        instructions: {
          vi: [
            "1. Vào giao diện quét mã ERP: Trong quy trình nhận hàng, sau khi nhận hàng BẮT BUỘC PHẢI LÀM TIẾP NHẬN TRƯỚC (在收到货物后必须先做接收).",
            "2. Nhấp vào thẻ tab màu đỏ “Tiếp nhận” (接收) ở góc trên bên trái thanh công cụ."
          ],
          zh: [
            "1. 进入 ERP 扫码界面：在收到货物后必须先做接收。",
            "2. 点击顶部栏左侧红色“接收”标签。"
          ]
        },
        warning: {
          vi: "QUY TẮC BẮT BUỘC: Khi nhận hàng vào công đoạn, phải bấm làm tiếp nhận trước tiên, không được bỏ qua bước này.",
          zh: "强制规范：收到货物后必须先做接收，确认系统入账后再开始生产。"
        }
      },

      // ----------------------------------------------------------------------
      // Bước 11 (Docx 步骤 6 - Dòng 18: Quét mã Thẻ lưu chuyển sản xuất)
      // ----------------------------------------------------------------------
      {
        stepNumber: 11,
        docxStepRef: "6.2",
        docxStepTitle: "步骤 6: ERP货物接收",
        name: {
          vi: "Tiếp nhận hàng - Quét mã QR Thẻ lưu chuyển sản xuất (生产履历卡)",
          zh: "ERP货物接收 - 扫生产履历卡二维码"
        },
        image: "./assets/sop/erp/routing_card_qr_guide.png", // image14.png
        instructions: {
          vi: [
            "1. Tại giao diện quét mã ERP, con trỏ sẽ tự động dừng ở ô “Công đoạn hiện tại” (当前工序).",
            "2. Dùng súng quét mã vạch USB hướng vào Thẻ lưu chuyển sản xuất (生产履历卡):",
            "   • Thao tác 1: Quét mã QR “Công đoạn” (扫“工序”二维码) ở cột góc dưới bên phải thẻ;",
            "   • Thao tác 2: Quét mã QR “Số phiếu giao việc” (扫“派工单号” / “单号”二维码) ở góc trên bên trái thẻ."
          ],
          zh: [
            "1. 在 ERP 扫码界面，光标会自动停在“当前工序”栏位上。",
            "2. 开始使用“扫码器”扫生产履历卡二维码，操作方式：",
            "   • 操作 1：扫“工序”二维码（位于履历卡右下方工序栏）；",
            "   • 操作 2：扫“派工单号”二维码（位于履历卡左上方单号处）。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 12 (Docx 步骤 6 - Dòng 18-19: Màn hình 开工接收 & Quy tắc cấm)
      // ----------------------------------------------------------------------
      {
        stepNumber: 12,
        docxStepRef: "6.3",
        docxStepTitle: "步骤 6: ERP货物接收",
        name: {
          vi: "Màn hình 開工接收 - Đối chiếu số lượng & Nhấp Tiếp nhận",
          zh: "ERP货物接收 - 开工接收界面核对与点击“接收”"
        },
        image: "./assets/sop/erp/step6_receive_form.png", // image15.png
        instructions: {
          vi: [
            "1. Sau khi quét xong 2 mã QR, hệ thống tự động mở cửa sổ “開工接收” và tự động điền các thông tin: Công đoạn, Công đơn, Phiếu giao việc, Mã sản phẩm, Quy cách, Bản vẽ...",
            "2. Đối chiếu số lượng thực tế: Kiểm tra số lượng điền vào ô “Số lượng tiếp nhận” (接收数).",
            "3. Khi số lượng thực tế trên Thẻ lưu chuyển sản xuất khớp với số lượng tiếp nhận, trực tiếp nhấn nút “Tiếp nhận” (接收) ở đáy cửa sổ để hoàn thành.",
            "4. CẢNH BÁO CẤM: Không cho phép sửa thủ công: Số lượng tiếp nhận < Số lượng thực tế."
          ],
          zh: [
            "1. 扫码成功后系统自动弹出“开工接收”窗口并带入工序、工单、派工单号、产品编码等明细。",
            "2. 接收生产履历卡“实物数量”注意事项：核对填写“接收数”。",
            "3. 生产履历卡实物数与接收数一致时，直接点击窗口下方的“接收”完成。",
            "4. 违规禁令：不允许手动修改：接收数 < 实物数。"
          ]
        },
        warning: {
          vi: "LƯU Ý NGHIÊM NGẶT: Không cho phép sửa thủ công: Số lượng tiếp nhận < Số lượng thực tế (不允许手动修改：接收数 < 实物数)!",
          zh: "注意事项：不允许手动修改：接收数 < 实物数！"
        }
      },

      // ----------------------------------------------------------------------
      // Bước 13 (Docx 步骤 7 - Dòng 20: Tab 提交)
      // ----------------------------------------------------------------------
      {
        stepNumber: 13,
        docxStepRef: "7.1",
        docxStepTitle: "步骤 7: 扫码过站",
        name: {
          vi: "Nộp hoàn công - Chọn Tab màu xanh lá “Nộp” (提交)",
          zh: "扫码过站（完工提交）- 点击“提交”"
        },
        image: "./assets/sop/erp/step7_thumb_submit.png", // image16.png
        instructions: {
          vi: [
            "1. Vào giao diện quét mã ERP: Khi bộ phận sản xuất hoàn thành sản phẩm cần quét mã báo công chuyển trạm.",
            "2. Nhấp vào thẻ tab màu xanh lá “Nộp” (提交) ở thanh công cụ phía trên."
          ],
          zh: [
            "1. 进入 ERP 扫码界面：制造部门完工品扫码报工。",
            "2. 点击顶部栏中间绿色“提交”标签。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 14 (Docx 步骤 7 - Dòng 21: Quét mã Thẻ lưu chuyển khi nộp)
      // ----------------------------------------------------------------------
      {
        stepNumber: 14,
        docxStepRef: "7.2",
        docxStepTitle: "步骤 7: 扫码过站",
        name: {
          vi: "Nộp hoàn công - Quét mã QR Thẻ lưu chuyển sản xuất",
          zh: "扫码过站 - 扫生产履历卡二维码"
        },
        image: "./assets/sop/erp/routing_card_qr_guide.png", // image14.png
        instructions: {
          vi: [
            "1. Tại giao diện quét mã, con trỏ tự động dừng ở ô “Công đoạn hiện tại” (当前工序).",
            "2. Dùng súng quét mã vạch quét Thẻ lưu chuyển sản xuất (生产履历卡):",
            "   • Quét mã QR “Công đoạn” (工序) tương ứng với công đoạn vừa gia công xong;",
            "   • Quét mã QR “Số phiếu giao việc” (派工单号) ở góc trên bên trái thẻ."
          ],
          zh: [
            "1. 在 ERP 扫码界面，光标会自动停在“当前工序”栏位上。",
            "2. 开始使用“扫码器”扫生产履历卡二维码：",
            "   • 扫“工序”二维码；",
            "   • 扫“派工单号”二维码。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 15 (Docx 步骤 7 - Dòng 21-22: Màn hình 完工提交)
      // ----------------------------------------------------------------------
      {
        stepNumber: 15,
        docxStepRef: "7.3",
        docxStepTitle: "步骤 7: 扫码过站",
        name: {
          vi: "Màn hình 完工提交 - Điền số lượng OK, NG & Bấm “提交并打印”",
          zh: "扫码过站 - 完工提交填写OK/NG并点击“提交并打印”"
        },
        image: "./assets/sop/erp/step7_station_form.png", // image19.png
        instructions: {
          vi: [
            "1. Cửa sổ “完工提交” mở ra với đầy đủ thông tin công đoạn và đơn hàng tự động điền.",
            "2. Nhập số lượng báo công thành phẩm đạt chuẩn vào ô “OK” (报工数).",
            "3. Nhập số lượng hàng lỗi/phế phẩm vào ô “NG phẩm” (不良数, nếu có).",
            "4. Nhấp vào nút “Nộp và in” (提交并打印) ở đáy cửa sổ để hoàn tất báo công và kích hoạt in tem."
          ],
          zh: [
            "1. 窗口弹出完工提交界面，核对自动带入的工序、工单与派工单号。",
            "2. 填写报工数“OK”数量。",
            "3. 填写不良数“NG品”数量（如有）。",
            "4. 点击左下角“提交并打印”按钮，完成报工并触发打印。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 16 (Docx 步骤 7 - Dòng 21: Mẫu tem in 工艺流转卡)
      // ----------------------------------------------------------------------
      {
        stepNumber: 16,
        docxStepRef: "7.4",
        docxStepTitle: "步骤 7: 扫码过站",
        name: {
          vi: "Nhận tem in Thẻ lưu chuyển công đoạn (工艺流转卡)",
          zh: "扫码过站 - 获取工艺流转卡标签纸样张"
        },
        image: "./assets/sop/erp/step7_printed_tag.png", // image17.png
        instructions: {
          vi: [
            "1. Sau khi bấm “提交并打印”, máy in nhiệt sẽ tự động in ra tem “工艺流转卡”.",
            "2. Kiểm tra các thông tin trên tem: Mã vật liệu, Tên chi tiết, Bản vẽ, Công đoạn hiện tại, Số lượng, Trọng lượng, Người thao tác, Ngày sản xuất, Mã lệnh và 2 mã QR.",
            "3. Dán tem in lên thùng/khay chứa bán thành phẩm chuyển giao cho công đoạn tiếp theo."
          ],
          zh: [
            "1. 点击“提交并打印”后，打印机自动吐出“工艺流转卡”标签纸。",
            "2. 核对标签内容：物料编码、品名、图号、工序、数量、重量、作业员及底部工单/下工序二维码。",
            "3. 将标签随实物一起流转至下一道加工工序。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 17 (Docx 步骤 7 - Dòng 21, 23: Sự cố in - Hộp thoại 打印异常)
      // ----------------------------------------------------------------------
      {
        stepNumber: 17,
        docxStepRef: "7.5",
        docxStepTitle: "步骤 7: 扫码过站",
        name: {
          vi: "Sự cố in tem - Không bấm dấu ✕ thoát khỏi giao diện in",
          zh: "打印异常处理 - 切勿点击 ✕ 退出打印界面"
        },
        image: "./assets/sop/erp/step7_reprint_dialog.png", // image20.png
        instructions: {
          vi: [
            "1. Khi tem Thẻ lưu chuyển công đoạn chưa được in ra bình thường (do kẹt giấy, hết giấy, kết nối máy in bị gián đoạn).",
            "2. QUY TẮC SỐNG CÒN: TUYỆT ĐỐI KHÔNG ĐƯỢC BẤM DẤU ✕ Ở GÓC TRÊN BÊN PHẢI ĐỂ THOÁT KHỎI GIAO DIỆN IN!",
            "3. Giữ nguyên giao diện xem trước tem in để chuẩn bị in lại."
          ],
          zh: [
            "1. 打印异常：工序流转卡标签未正常打印（缺纸、卡纸或通信延时）。",
            "2. 关键要求：不要退出打印界面（绝对不要点击右上角的黑色 ✕ 关闭按钮）！",
            "3. 保持当前打印预览对话框界面不变。"
          ]
        },
        warning: {
          vi: "LƯU Ý SỰ CỐ IN: Khi tem chưa in ra, TUYỆT ĐỐI KHÔNG ĐƯỢC THOÁT GIAO DIỆN IN! Nếu thoát ra, lệnh in sẽ bị mất.",
          zh: "打印异常：工序流转卡标签未正常打印，不要退出打印界面！"
        }
      },

      // ----------------------------------------------------------------------
      // Bước 18 (Docx 步骤 7 - Dòng 21, 23: Nút 打印 để in lại tem)
      // ----------------------------------------------------------------------
      {
        stepNumber: 18,
        docxStepRef: "7.6",
        docxStepTitle: "步骤 7: 扫码过站",
        name: {
          vi: "In lại tem - Nhấp trực tiếp nút màu xanh lam “In” (打印)",
          zh: "打印异常处理 - 直接重新点击“打印”按键"
        },
        image: "./assets/sop/erp/step7_thumb_reprint_btn.png", // image18.png
        instructions: {
          vi: [
            "1. Trực tiếp tại màn hình in tem hiện tại, tìm nút màu xanh lam có chữ “打印” (In).",
            "2. Nhấp vào nút “打印” này để máy in thực hiện lại lệnh in tem Thẻ lưu chuyển công đoạn này.",
            "3. Sau khi tem in ra bình thường, dán vào thùng hàng hoàn tất quy trình qua trạm."
          ],
          zh: [
            "1. 直接在当前异常提示界面上，找到蓝色“打印”按键。",
            "2. 重新点击“打印”按键即可重新打印此张报工标签纸。",
            "3. 标签打印出纸后，贴于实物周转箱即可完成过站。"
          ]
        },
        warning: null
      },

      // ----------------------------------------------------------------------
      // Bước 19 (Docx 步骤 8 - Dòng 24: Mở nắp khay in)
      // ----------------------------------------------------------------------
      {
        stepNumber: 19,
        docxStepRef: "8.1",
        docxStepTitle: "步骤 8: 打印纸",
        name: {
          vi: "Giấy in nhiệt - Mở nắp khoang chứa giấy in ở mép dưới máy",
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
      // Bước 20 (Docx 步骤 8 - Dòng 24: Đặt cuộn giấy đúng mặt chính)
      // ----------------------------------------------------------------------
      {
        stepNumber: 20,
        docxStepRef: "8.2",
        docxStepTitle: "步骤 8: 打印纸",
        name: {
          vi: "Giấy in nhiệt - Đặt cuộn giấy đúng mặt chính và đóng nắp lại",
          zh: "打印纸（放置或更换）- 将正面放置到纸槽并关闭"
        },
        image: "./assets/sop/erp/step8_printer_roll_feed.png", // image22.png
        instructions: {
          vi: [
            "1. Lấy cuộn giấy in nhiệt POSTEK (55mm x 180mm).",
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
      // Bước 21 (Docx 步骤 9 - Dòng 25: Phím điều hướng ở đáy màn hình)
      // ----------------------------------------------------------------------
      {
        stepNumber: 21,
        docxStepRef: "9",
        docxStepTitle: "步骤 9: 其他操作",
        name: {
          vi: "Các thao tác khác - Giải thích chức năng phím ở đáy màn hình",
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
