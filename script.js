document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoFrame');
    const closeBtn = document.querySelectorAll('.close');
    const videoTitles = document.querySelectorAll('.video-title');
    const imgModal = document.getElementById('imgModal');
    const imgTitles = document.querySelectorAll('.img-title');

    imgTitles.forEach(title => {
        title.addEventListener('click', function() {
            const imgUrl = this.dataset.img;
            imgModal.style.display = 'block';
            imgModal.src = imgUrl;
        });
    });
    // 點擊影片標題時打開彈出視窗
    videoTitles.forEach(title => {
        title.addEventListener('click', function() {
            const videoUrl = this.dataset.video;
            videoPlayer.src = videoUrl;
            modal.style.display = 'block';
            videoPlayer.pause();
        });
    });

    // 監聽視頻播放狀態
    videoPlayer.addEventListener('play', function() {
        // 當播放時隱藏控制列
        videoPlayer.style.cursor = 'none'; // 隱藏滑鼠游標
        setTimeout(() => {
            if (!videoPlayer.paused) {
                videoPlayer.setAttribute('controls', '');
                videoPlayer.removeAttribute('controls');
            }
        }, 100);
    });

    videoPlayer.addEventListener('pause', function() {
        // 當暫停時顯示控制列
        //videoPlayer.style.cursor = 'default'; // 顯示滑鼠游標
        //videoPlayer.setAttribute('controls', 'controls');
        // Show controls immediately when paused
        videoPlayer.setAttribute('controls', 'controls');
        videoPlayer.style.cursor = 'default';
        
        // Start timer to hide controls after 1 second of no mouse movement
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            videoPlayer.removeAttribute('controls');
            videoPlayer.style.cursor = 'none';
        }, 1000); // 1 second
    });

    // 監聽視頻時間更新
    videoPlayer.addEventListener('timeupdate', function() {
        const timeLeft = videoPlayer.duration - videoPlayer.currentTime;
        let stop_second = this.dataset.stop; //停止秒數
        if(stop_second == undefined){
            stop_second = 0;
        }
        console.log(timeLeft);
        if (timeLeft <= 0.5) {
            videoPlayer.pause();
            //全螢幕模式下，隱藏控制列
            videoPlayer.removeAttribute('controls');
        }
    });

    // 點擊影片區域時切換播放/暫停狀態
    videoPlayer.addEventListener('click', function() {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    });

    // 滑鼠移動時顯示控制列
    let timeout;
    videoPlayer.addEventListener('mousemove', function() {
        if (videoPlayer.paused) {
            // If video is paused, reset the hide controls timer
            clearTimeout(timeout);
            videoPlayer.setAttribute('controls', 'controls');
            videoPlayer.style.cursor = 'default';
            timeout = setTimeout(() => {
                videoPlayer.removeAttribute('controls');
                videoPlayer.style.cursor = 'none';
            }, 1000); // 1 second
        } else {
            // Existing code for playing state
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (!videoPlayer.paused) {
                    videoPlayer.removeAttribute('controls');
                    videoPlayer.style.cursor = 'none';
                }
            }, 500); // 0.5 seconds
        }
    });

    closeBtn.forEach(btn => {
        // 點擊關閉按鈕關閉彈出視窗
        btn.addEventListener('click', function() {
            closeVideo();
            closeImg();
            console.log('close');
        });
    });

    // 點擊彈出視窗外部區域關閉視窗
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeVideo();
        }
    });

    // 關閉視頻的函數
    function closeVideo() {
        modal.style.display = 'none';
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        videoPlayer.src = '';
        videoPlayer.setAttribute('controls', 'controls');
        videoPlayer.style.cursor = 'default';
    }
    function closeImg() {
        imgModal.style.display = 'none';
    }
    function containerHide() {
        var x = document.getElementById("container");
        if (x.classList.contains('hidden')) {
            x.classList.remove('hidden');
        } else {
            x.classList.add('hidden');
        }
    }
    
    //新增鍵盤事件有QWERTYUIOP
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        switch(key) {
            case 'q':
                containerHide();
                break;
            case 'w':
               
                break;
        }      
    });
});



