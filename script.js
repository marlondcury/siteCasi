// Remova o código anterior das abas (tab-button) e adicione este:

document.addEventListener('DOMContentLoaded', function() {
    
    // ... (o código do menu mobile e do formulário de contato continua aqui) ...

    // NOVA FUNCIONALIDADE: Sistema de Acordeão para a Grade Curricular
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Alterna a classe 'active' no botão clicado
            button.classList.toggle('active');

            // Seleciona o painel seguinte ao botão
            const panel = button.nextElementSibling;

            // Alterna a altura do painel para o efeito de abrir/fechar
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

});