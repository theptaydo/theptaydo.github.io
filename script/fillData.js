// Function to fetch and update the data dynamically based on ID
async function updateEmployeeInfo() {
  // Lấy ID từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (!id) {
    console.error("ID không được cung cấp!");
    return;
  }

  try {
    // Fetch data từ file JSON
    const response = await fetch('./db/user.json'); // Cập nhật đường dẫn file JSON
    const data = await response.json();

    // Tìm thông tin nhân viên theo ID
    const employee = data.find(emp => emp.id === id);

    if (employee) {
      // Cập nhật các phần tử HTML
      document.getElementById('avatar').src = employee.image || './assets/img/avatar/default-avatar.png';
      document.getElementById('fullname').textContent = employee.name;
      document.getElementById('position').textContent = employee.position;
      document.getElementById('phone').textContent = employee.phone;
      document.getElementById('phone').parentElement.href = `tel:${employee.phone}`;
      document.getElementById('email').textContent = employee.email;
      document.getElementById('email').parentElement.href = `mailto:${employee.email}`;

      document.title = `Thông tin ${employee.name}`;

      // Cập nhật mạng xã hội (nếu có)
      const socialLinks = employee.social_links;
      socialLinks.forEach(link => {
        if (link.url) {
          if (link.name === 'wechat') {
            const socialElement = document.getElementById(link.name);
            socialElement.style.display = 'block';
            socialElement.querySelector(".text").textContent = link.text || link.name;
            socialElement.querySelector(".qr").src = link.image;
          } else {
            const socialElement = document.getElementById(link.name);
            socialElement.style.display = 'block';
            socialElement.querySelector(".url").href = link.url;
            socialElement.querySelector(".text").textContent = link.text || link.name;
          }
        }
      });
    } else {
      console.error("Không tìm thấy nhân viên với ID:", id);
    }
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
  }
}

// Gọi hàm khi trang được tải
document.addEventListener('DOMContentLoaded', updateEmployeeInfo);