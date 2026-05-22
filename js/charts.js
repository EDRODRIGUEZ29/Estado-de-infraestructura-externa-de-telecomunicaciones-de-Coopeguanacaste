class ChartManager {
    constructor() {
        this.charts = {};
        this.chartColors = {
            primary: '#667eea',
            success: '#27ae60',
            warning: '#f39c12',
            danger: '#e74c3c',
            info: '#3498db',
            light: '#ecf0f1'
        };
    }

    initCharts() {
        this.createOcupacionChart();
        this.createPuertosChart();
        this.createNapsChart();
        this.createDistribucionChart();
    }

    createOcupacionChart() {
        const ctx = document.getElementById('chartOcupacion').getContext('2d');
        this.charts.ocupacion = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Ocupación (%)',
                    data: [],
                    backgroundColor: this.chartColors.primary,
                    borderColor: '#667eea',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: { beginAtZero: true, max: 100 }
                }
            }
        });
    }

    createPuertosChart() {
        const ctx = document.getElementById('chartPuertos').getContext('2d');
        this.charts.puertos = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Libres', 'Ocupados'],
                datasets: [{
                    data: [0, 0],
                    backgroundColor: [this.chartColors.success, this.chartColors.danger]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }

    createNapsChart() {
        const ctx = document.getElementById('chartNaps').getContext('2d');
        this.charts.naps = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Activos', 'Inactivos'],
                datasets: [{
                    data: [0, 0],
                    backgroundColor: [this.chartColors.success, this.chartColors.light]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }

    createDistribucionChart() {
        const ctx = document.getElementById('chartDistribucion').getContext('2d');
        this.charts.distribucion = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['0-30%', '30-60%', '60-90%', '90-100%'],
                datasets: [{
                    data: [0, 0, 0, 0],
                    backgroundColor: [
                        this.chartColors.success,
                        this.chartColors.info,
                        this.chartColors.warning,
                        this.chartColors.danger
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }

    updateOcupacionChart(cajas) {
        const sorted = cajas.sort((a, b) => (b.ocupacion || 0) - (a.ocupacion || 0)).slice(0, 10);
        this.charts.ocupacion.data.labels = sorted.map(c => c.name || `Caja ${c.id}`);
        this.charts.ocupacion.data.datasets[0].data = sorted.map(c => c.ocupacion || 0);
        this.charts.ocupacion.update();
    }

    updatePuertosChart(cajas) {
        let libres = 0, ocupados = 0;
        cajas.forEach(c => {
            libres += c.puertosLibres || 0;
            ocupados += (c.puertosTotal || 0) - (c.puertosLibres || 0);
        });
        this.charts.puertos.data.datasets[0].data = [libres, ocupados];
        this.charts.puertos.update();
    }

    updateNapsChart(naps) {
        const activos = naps.filter(n => n.estado === 'activo').length;
        const inactivos = naps.length - activos;
        this.charts.naps.data.datasets[0].data = [activos, inactivos];
        this.charts.naps.update();
    }

    updateDistribucionChart(cajas) {
        const ranges = [0, 0, 0, 0];
        cajas.forEach(c => {
            const ocu = c.ocupacion || 0;
            if (ocu <= 30) ranges[0]++;
            else if (ocu <= 60) ranges[1]++;
            else if (ocu <= 90) ranges[2]++;
            else ranges[3]++;
        });
        this.charts.distribucion.data.datasets[0].data = ranges;
        this.charts.distribucion.update();
    }
}

const chartManager = new ChartManager();