// OMNIA Low-Code Development Platform
// Bar Chart Web Component

// Developer Notes: Below you'll find two aspects of the component that you can easily control. On Line 36 you control the colors of the bars and on line 55 you can edit the type of chart.

function getCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = '500';
    canvas.height = '300';

    return canvas;
}

class BarChartElement extends HTMLElement {

    constructor() {
        super();

        // Using the Chart.js library to draw the charts (https://www.chartjs.org/)
        this.script = document.createElement('script');
        this.script.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js');
        this.script.onload = () => this.render();

        this.wrapper = document.createElement('div');
        this.wrapper.style.width = '100%';
        this.wrapper.style.height = '300px';
    }

    connectedCallback() {
        this.appendChild(this.script);
        this.appendChild(this.wrapper);
    }

    getColor(index) {
        return ['rgb(54, 162, 235)', 'rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)'][index % 5]; //here's where you control the colors of the bars
    }

    render() {
        if (typeof Chart === 'function' && Array.isArray(this.chartData)) {

            // This WebComponent works with the following data structure
            /*
            [
            	{ serievalue: 'Serie 1', datavalue: 3},
            	{ serievalue: 'Serie 2', datavalue: 4},
            	...
            ]
            */

            const labels = this.chartData.map(entry => entry.serievalue);
            const data = this.chartData.map(entry => entry.datavalue);

            const config = {
                type: 'bar', //here's where you change the type of Bar Chart you want. Options: bar | horizontalBar
                data: {
                    labels: labels,
                    responsive: false,
                    datasets: [{
                        label: '',
                        data: data,
                        backgroundColor: data.map((entry, index) => this.getColor(index))
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { display: false },
                    scales: {
                        yAxes: [{
                            ticks: { beginAtZero: true }
                        }]
                    }
                }
            };

            this.wrapper.innerHTML = '';
            const canvas = getCanvas();
            this.wrapper.appendChild(canvas);
            new Chart(canvas, config);
        }
    }

    set value(newValue) {
        this.chartData = newValue;
        this.render();
    }
}

customElements.define('omnia-bar-chart', BarChartElement);