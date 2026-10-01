// ==================================================
// chart.js — Integração com biblioteca externa Chart.js
// ==================================================

export function inicializarGrafico() {
    const canvas = document.getElementById('grafico-doacoes');

    if (!canvas || typeof Chart === 'undefined') return;
    if (canvas.dataset.iniciado === 'true') return;
    canvas.dataset.iniciado = 'true';

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Doações recebidas (kg)',
                data: [120, 190, 300, 250, 420, 380],
                backgroundColor: '#4CAF50',
                borderColor: '#1B5E20',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Doações arrecadadas em 2026'
                }
            },
            scales: { y: { beginAtZero: true } }
        }
    });
}