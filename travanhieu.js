// Animate elements when they come into view
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
  
  // Download as PDF function - sử dụng thư viện html2pdf
  function downloadPDF() {
    alert('Đang chuẩn bị tải xuống CV dưới dạng PDF...');
    
    const element = document.getElementById('pdf-content');
    const images = element.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });
    
    Promise.all(imagePromises).then(() => {
      const opt = {
        margin: [5, 5, 5, 5],
        filename: 'CV_TraVanHieu_Quot.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { 
          scale: 3,
          useCORS: true,
          logging: true,
          letterRendering: true,
          allowTaint: true
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: false
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };
  
      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          console.log('PDF đã được tạo thành công!');
        })
        .catch(err => {
          console.error('Lỗi khi tạo PDF:', err);
          alert('Có lỗi xảy ra khi tạo PDF. Vui lòng thử lại.');
        });
    });
  }
  
  // Animate skill bars when they come into view
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
  
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateSkillBars, 500);
  });
  
  // Cải thiện chất lượng in
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
  
  // Lưu trữ giá trị width ban đầu của skill bars
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
      bar.setAttribute('data-width', bar.style.width);
    });
  });
  