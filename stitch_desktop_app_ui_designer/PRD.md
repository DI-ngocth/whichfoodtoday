🍽 App Desktop: Hôm nay ăn gì?
1. Mục tiêu app

Giải quyết câu hỏi “ăn gì” trong < 5 giây
Chạy offline, không cần backend
Có yếu tố quay random → vui
Làm xong trong 1–3 ngày (prototype hoàn chỉnh)


2. Tech Stack (Electron – đơn giản, đúng bài)
Core

Electron
Node.js
HTML / CSS / JavaScript thuần

👉 Không cần React/Vue lúc đầu (để tránh overkill)
Optional (nếu muốn xịn hơn chút)

SQLite / JSON file local
Chart.js (nếu có thống kê)
Electron Store (lưu cấu hình)


3. Kiến trúc app (rất cơ bản)
electron-app/
├─ main.js           # Electron main process
├─ preload.js        # expose API (optional)
├─ index.html        # UI
├─ renderer.js       # logic UI
├─ styles.css
├─ data/
│  └─ foods.json     # danh sách món/quán
└─ package.json


4. Tính năng (scope vừa phải – KHÔNG lan man)
✅ Tính năng bắt buộc (MVP)

a. Danh sách món ăn

Thêm / sửa / xoá
Có thể là:

Món (Phở, Bún bò…)
Quán




b. Nút “Quay”

Random 1 món
Animation nhỏ cho vui 🎰


c. Lọc nhanh

Rẻ
Gần
Ăn một mình / ăn nhóm


d. Lưu local

Không mạng vẫn dùng được




⭐ Tính năng vui (nên thêm)

🔄 “Không ăn món này trong X ngày”
🤔 “Đang buồn / đang lười → ưu tiên món dễ ăn”
🎉 Nút “Quyết luôn đi” (random nhưng dứt khoát)


5. Luồng sử dụng (UX cực đơn giản)

    a. Mở app
    b. Nhập câu hỏi: “Hôm nay ăn gì?”
    c. Click Quay
    d. App chọn 1 món + câu nói hài hước:

        “Đừng suy nghĩ nữa, ăn Bún chả đi.”



    👉 Toàn bộ thao tác < 10s

6. Data model (JSON – đủ dùng)
    [
        {
            "name": "Bún đậu",
            "price": "cheap",
            "tags": ["ăn nhanh", "một mình"],
            "lastEaten": "2026-05-01"
        },
        {
            "name": "Lẩu",
            "price": "expensive",
            "tags": ["ăn nhóm"]
        }
    ]

7. Logic random (pseudo)
    function pickFood(list) {
        const today = new Date();

        const filtered = list.filter(item => {
            if (!item.lastEaten) return true;
            const diffDays = (today - new Date(item.lastEaten)) / 86400000;
    return diffDays > 3;
  });

  return filtered[Math.floor(Math.random() * filtered.length)];
}
8. Giao diện (đủ đẹp – không cầu kỳ)

Cửa sổ nhỏ
1 card món ăn
Nút to: 🍜 Quay
Font vui vui
Nền sáng


App “vui” → UI sạch > UI phức tạp


9. Thời gian làm thực tế
    Việc |Thời gian
    Setup Electron|30 phút
    UI cơ bản|1–2 giờ
    Logic random|30 phút
    CRUD món ăn|1–2 giờ
    Polish + build|1 giờ
👉 1 buổi tối là xong bản dùng được

10. Hướng phát triển sau (nếu thích)

    Sync list qua file / cloud
    Share result (copy text)
    Mode “ăn cùng team”
    Build bản mobile (logic dùng lại được)
