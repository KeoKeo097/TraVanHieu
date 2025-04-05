// Animate các phần tử khi xuất hiện
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate');
    animatedElements.forEach(element => {
      element.style.opacity = '0';
    });
  
    setTimeout(() => {
      animatedElements.forEach(element => {
        element.style.opacity = '1';
      });
    }, 100);
  });
  
  // Hàm animate skill bar
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    skillBars.forEach(bar => {
      const targetWidth = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 300);
    });
  }
  
  // Gọi animate skill bar sau khi DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateSkillBars, 500);
  });
  
  // Lưu width gốc của skill bar (chống mất khi in hoặc pdf)
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
      bar.setAttribute('data-width', bar.style.width);
    });
  });
  
  // Đảm bảo skill bar và animation ổn định khi in hoặc làm pdf
  window.onbeforeprint = function() {
    document.querySelectorAll('.animate').forEach(el => {
      el.style.opacity = '1';
      el.style.animation = 'none';
    });
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
      const targetWidth = bar.getAttribute('data-width') || bar.style.width;
      bar.style.width = targetWidth;
      bar.style.animation = 'none';
    });
  };
  
  // Hàm tải PDF sau khi delay ổn định
  function downloadPDF() {
    const element = document.getElementById('pdf-content');
  
    const images = element.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });
  
    // Bắt đầu đếm ngược 6 giây cho web ổn định hoàn toàn
    Promise.all(imagePromises).then(() => {
      // Hiển thị loading nếu muốn
      const loading = document.createElement('div');
      loading.innerText = 'Đang chuẩn bị tải PDF... Vui lòng chờ 6 giây';
      loading.style.position = 'fixed';
      loading.style.top = '20px';
      loading.style.left = '50%';
      loading.style.transform = 'translateX(-50%)';
      loading.style.background = '#000';
      loading.style.color = '#fff';
      loading.style.padding = '10px 20px';
      loading.style.borderRadius = '8px';
      loading.style.zIndex = '9999';
      document.body.appendChild(loading);
  
      setTimeout(() => {
        const opt = {
          margin: [5, 5, 5, 5],
          filename: 'CV_TraVanHieu_Quot.pdf',
          image: { type: 'jpeg', quality: 1.0 },
          html2canvas: { 
            scale: 3,
            useCORS: true,
            logging: true,
            letterRendering: true,
            allowTaint: true,
          },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: false },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };
  
        html2pdf()
          .set(opt)
          .from(element)
          .save()
          .then(() => {
            document.body.removeChild(loading);
            console.log('PDF đã được tải thành công');
          })
          .catch(err => {
            document.body.removeChild(loading);
            console.error('Lỗi khi tạo PDF:', err);
            alert('Có lỗi khi tạo PDF, thử lại nhé!');
          });
      }, 6000); // delay 6s sau khi load xong ảnh
    });
  }
  