document.addEventListener('DOMContentLoaded', function() {
    initMenuTabs();
    initOrderSteps();
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

function initOrderSteps() {
    const form = document.getElementById('reservationForm');

    if (!form) return;

    const steps = Array.from(form.getElementsByClassName('form-step'));
    const nextBtns = form.querySelectorAll('.btn-next');
    const prevBtns = form.querySelectorAll('.btn-prev');

    function changeStep(btn, direction) {
        const currentStep = btn.closest('.form-step');
        const currentIndex = steps.indexOf(currentStep);
        
        currentStep.style.display = 'none';
        currentStep.classList.remove('active');
        
        const targetIndex = currentIndex + direction;
        if (steps[targetIndex]) {
            steps[targetIndex].style.display = 'block';
            
            setTimeout(() => {
                steps[targetIndex].classList.add('active');
            }, 10);
        }
        
        // 自動滾動到form的頂部
        window.scrollTo({
            top: form.offsetTop - 100,
            behavior: 'smooth'
        });
    }

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => changeStep(btn, 1));
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => changeStep(btn, -1));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('感謝您的預約！我們將儘速與您聯繫。');
    });
}
