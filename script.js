// Efeito de digitação no título (apenas se o elemento existir)
document.addEventListener('DOMContentLoaded', function() {
    const title = document.getElementById('typing-title');
    if (title) {
        const originalText = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                title.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        typeWriter();
    }
    
    // Controle do tema claro/escuro
    const themeToggle = document.createElement('button');
    themeToggle.classList.add('theme-toggle');
    themeToggle.innerHTML = '🌓';
    themeToggle.title = 'Alternar entre modo claro e escuro';
    
    // Verificar preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
    }
    
    // Alternar tema
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    });
    
    document.body.appendChild(themeToggle);
    
    // Navegação suave
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animações de revelação dos elementos ao rolar
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .contact-item, .section-title, .course-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configurar estado inicial para animação
    const elementsToAnimate = document.querySelectorAll('.card, .contact-item, .section-title, .course-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Animar elementos quando a página carrega
    window.addEventListener('load', animateOnScroll);
    
    // Animar elementos ao rolar
    window.addEventListener('scroll', animateOnScroll);
});