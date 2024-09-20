let chartData = {
    labels: [],
    datasets: [{
        label: '# of Values',
        data: [],
        backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
};

function createChart(type, height = 400) {
    const canvasContainer = document.getElementById('canvas-container');
    canvasContainer.innerHTML = `<canvas id="myChart"></canvas>`;
    canvasContainer.style.height = `${height}px`;

    const ctx = document.getElementById('myChart').getContext('2d');
    return new Chart(ctx, {
        type: type,
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: (event, activeElements) => {
                if (activeElements.length > 0) {
                    const { datasetIndex, index } = activeElements[0];
                    removeData(datasetIndex, index);
                }
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'index',
                intersect: false
            }
        }
    });

}

let myChart = createChart('bar'); // Create initial chart with default height = 400

function addData() {
    const labelInput = document.getElementById('labelInput');
    const dataInput = document.getElementById('dataInput');

    if (labelInput.value && dataInput.value) {
        chartData.labels.push(labelInput.value);
        chartData.datasets.forEach((dataset) => {
            dataset.data.push(dataInput.value);
        });
        myChart.update();
        labelInput.value = '';
        dataInput.value = '';
    }

}

function updateChartType() {
    const selectedType = document.getElementById('chartType').value;
    myChart.destroy(); // Destroy the old chart
    myChart = createChart(selectedType);
}

function removeData(datasetIndex, index) {
    if (chartData.labels.length > index) {
        chartData.labels.splice(index, 1);
        chartData.datasets[datasetIndex].data.splice(index, 1);
        myChart.update();
    }
}

// Function to download the chart as an image
document.getElementById('download').addEventListener('click', function () {
    const canvas = document.getElementById('myChart');
    
    // Create a temporary canvas to set the background color
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    // Set the dimensions of the temporary canvas
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Fill the background with white
    tempCtx.fillStyle = 'white';  // Set background color to white
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Draw the existing chart on the temporary canvas
    tempCtx.drawImage(canvas, 0, 0);

    // Create a download link
    const link = document.createElement('a');
    link.href = tempCanvas.toDataURL('image/png');  // Convert the temporary canvas to a Base64 image
    link.download = 'chart.png';  // Default file name
    link.click();  // Trigger the download
});