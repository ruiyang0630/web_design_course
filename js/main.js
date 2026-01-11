document.addEventListener('DOMContentLoaded', function() {
    initMenuTabs();
});

function initMenuTabs() {
    const tabs = document.querySelectorAll('.tab-item');
    const contents = document.querySelectorAll('.menu-content');

    // 防呆
    if (tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault(); // 避免頁面跳轉

            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            if (!targetContent) return;

            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            contents.forEach(content => {
                content.style.display = 'none';
                content.classList.remove('active');
            });

            targetContent.style.display = 'block';
            
            setTimeout(() => {
                targetContent.classList.add('active');
            }, 10);
        });
    });
}