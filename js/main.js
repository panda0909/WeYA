// 載入圖片的函數
async function loadImages() {
    const gallery = document.getElementById('gallery');
    const imageDirectory = 'downloaded_images/';
    
    try {
        const imageNames = [
            '20250124_034806_545023265643692035.jpg',
            '20250124_034803_545023259469938849.jpg'
        ];
        
        imageNames.forEach((imageName, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            galleryItem.innerHTML = `
                <img src="${imageDirectory}${imageName}" alt="照片 ${index + 1}">
                <div class="caption">${imageName}</div>
            `;
            
            // 添加點擊事件
            galleryItem.addEventListener('click', () => {
                openModal(imageDirectory + imageName);
            });
            
            gallery.appendChild(galleryItem);
        });
    } catch (error) {
        console.error('Error loading images:', error);
        gallery.innerHTML = '<p>載入圖片時發生錯誤</p>';
    }
}

// 打開模態框
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = "block";
    modalImg.src = imageSrc;
}

// 關閉模態框
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = "none";
}

// 頁面載入完成後執行
document.addEventListener('DOMContentLoaded', () => {
    loadImages();
    
    // 添加關閉按鈕事件
    document.querySelector('.close').addEventListener('click', closeModal);
    
    // 點擊模態框背景關閉
    document.getElementById('imageModal').addEventListener('click', (e) => {
        if (e.target.id === 'imageModal') {
            closeModal();
        }
    });
    
    // 添加 ESC 鍵關閉功能
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});