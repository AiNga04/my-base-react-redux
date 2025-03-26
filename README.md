# Ứng dụng Quiz - My Base React Redux Project

Ứng dụng Quiz được xây dựng bằng React và Redux, cung cấp một nền tảng để người dùng tham gia các bài kiểm tra trắc nghiệm, quản lý câu hỏi, và theo dõi tiến độ học tập. Ứng dụng hỗ trợ cả người dùng thông thường và quản trị viên với các tính năng phong phú.

---

## Tính năng chính

### 1. **Người dùng**
- **Tham gia Quiz**: Người dùng có thể tham gia các bài kiểm tra trắc nghiệm với giao diện thân thiện, hiển thị câu hỏi và các lựa chọn trả lời.
- **Xem kết quả**: Sau khi hoàn thành bài kiểm tra, người dùng có thể xem kết quả chi tiết, bao gồm câu trả lời đúng/sai.
- **Bảng xếp hạng**: Hiển thị bảng xếp hạng người dùng dựa trên điểm số.
- **Quản lý hồ sơ cá nhân**:
  - Xem và chỉnh sửa thông tin cá nhân.
  - Đổi mật khẩu.
- **Theo dõi tiến độ**: Xem lịch sử các bài kiểm tra đã tham gia và tiến độ học tập.

### 2. **Quản trị viên**
- **Quản lý người dùng**:
  - Xem danh sách người dùng.
  - Thêm, sửa, xóa thông tin người dùng.
- **Quản lý bài kiểm tra (Quiz)**:
  - Tạo mới bài kiểm tra.
  - Cập nhật thông tin bài kiểm tra.
  - Xóa bài kiểm tra.
  - Xem chi tiết bài kiểm tra.
- **Quản lý câu hỏi**:
  - Thêm, sửa, xóa câu hỏi.
  - Gắn câu hỏi vào các bài kiểm tra.

### 3. **Tính năng khác**
- **Đăng nhập/Đăng ký**:
  - Hỗ trợ đăng nhập và đăng ký tài khoản.
  - Quên mật khẩu và đặt lại mật khẩu.
- **Giao diện thân thiện**:
  - Hỗ trợ giao diện responsive, tối ưu cho cả máy tính và thiết bị di động.
- **Thông báo**:
  - Hiển thị thông báo (toast) khi có lỗi hoặc hành động thành công.
- **Đa ngôn ngữ**:
  - Hỗ trợ đa ngôn ngữ với i18next.

 ---
  
## Công Nghệ Sử Dụng

- **React**: Xây dựng giao diện người dùng dựa trên các thành phần (component).  
- **Redux**: Quản lý trạng thái ứng dụng một cách tập trung và dễ dự đoán.  
- **React Router**: Định tuyến cho ứng dụng, hỗ trợ điều hướng giữa các trang.  
- **SCSS**: Tùy chỉnh giao diện với CSS mở rộng, hỗ trợ biến, lồng nhau và hơn thế nữa.  
- **Axios**: Thư viện gửi yêu cầu HTTP đơn giản và hiệu quả.  
- **React-Bootstrap**: Thư viện giao diện cung cấp các thành phần UI có sẵn.  
- **React Toastify**: Hiển thị thông báo (notifications) đẹp mắt và dễ sử dụng.

---

## Hướng dẫn sử dụng

### 1. Cài đặt
Đảm bảo bạn đã cài đặt **Node.js v14.17.0** hoặc cao hơn.

```bash
git clone https://github.com/AiNga04/my-base-react-redux
cd my-base-react-redux
npm install
```

## 2. Chạy Ứng Dụng
Khởi chạy ứng dụng ở chế độ phát triển bằng lệnh sau:

```bash
npm start
```

Mở trình duyệt và truy cập:  
[http://localhost:3000](http://localhost:3000)

Trang web sẽ tự động tải lại khi bạn thực hiện thay đổi trong mã nguồn.

## 3. Build Ứng Dụng
Để build ứng dụng cho môi trường sản xuất, chạy lệnh:

```bash
npm run build
```

Lệnh này sẽ tạo ra một thư mục `build` chứa ứng dụng đã được tối ưu hóa và nén, sẵn sàng để triển khai.
