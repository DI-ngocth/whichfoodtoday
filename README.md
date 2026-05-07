# 🍽 Which Food Today? – Hôm nay ăn gì?

Một app desktop nhỏ gọn giúp bạn **quyết định hôm nay ăn gì trong vài giây**.  
Không cần suy nghĩ, app chọn giúp bạn 😄

---

## ✨ Tính năng

- 🎰 Random món ăn chỉ với 1 nút bấm
- 🏷 Lọc theo tiêu chí:
  - Rẻ
  - Gần
  - Ăn một mình / ăn nhóm
- 💾 Lưu danh sách món **offline**
- 🖥 Chạy như app desktop thật (Windows / macOS)
- 🚫 Không cần internet

---

## 📦 Tải & cài đặt (khuyên dùng)

### 👉 Cách dễ nhất (không cần code)

1. Vào mục **Releases** của repo GitHub
2. Tải file phù hợp với hệ điều hành:

| Hệ điều hành | File |
|-------------|------|
| Windows | `.exe` |
| macOS | `.dmg` |

3. Mở file và cài đặt như app bình thường

> ⚠️ macOS: nếu bị chặn, hãy **Right click → Open** lần đầu.

---

## 🛠 Chạy app từ source (cho dev)

### 1️⃣ Yêu cầu
- Node.js **>= 18**
- npm

### 2️⃣ Clone repo
```bash
git clone https://github.com/DI-ngocth/whichfoodtoday.git
cd whichfoodtoday
npm install
npm run build

🏗 Build app desktop
Build cho hệ điều hành hiện tại
Shellnpm run buildShow more lines
Kết quả nằm trong thư mục:
dist/

OSOutputWindows.exemacOS.dmg

ℹ️ Lưu ý:

macOS chỉ build được macOS
Windows chỉ build được Windows
→ Repo đã có CI/CD để build cả hai tự động.



📂 Cấu trúc project
whichfoodtoday/
├─ main.js        # Electron main process
├─ index.html     # UI
├─ renderer.js    # Logic UI
├─ styles.css
├─ assets/
│  └─ icon.png
├─ package.json
└─ README.md


🤝 Đóng góp

Fork repo
Tạo branch mới
Commit rõ ràng
Gửi Pull Request

Mọi góp ý đều được hoan nghênh 🙌
