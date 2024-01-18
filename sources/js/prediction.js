document.addEventListener('DOMContentLoaded', function() {
    updateTemperaturePrediction();
    setInterval(updateTemperaturePrediction, 60000); // Update every minute
});

function updateTemperaturePrediction() {
    const currentTimeElement = document.getElementById('time');
    const currentTemperatureElement = document.getElementById('temperature');
    const temperatureChartElement = document.getElementById('temperature-chart');

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const currentTimeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
    currentTimeElement.textContent = currentTimeString;

    const baseTemperature = 10; // Initial temperature at 5 pm
    const temperatureData = calculateTemperatureData(baseTemperature);

    const currentTemperature = temperatureData[currentHour];
    currentTemperatureElement.textContent = `${currentTemperature} °C`;

    renderTemperatureChart(temperatureChartElement, temperatureData);
}

function calculateTemperatureData(baseTemperature) {
    const temperatureData = Array.from({ length: 24 }, (_, hour) => {
        if (hour >= 17 && hour < 21) {
            return baseTemperature - 2; // Evening, temperature drops by 2 degrees
        } else if (hour >= 21 && hour < 24) {
            return baseTemperature - 4; // Night, temperature drops by 4 degrees
        } else if (hour >= 0 && hour < 6) {
            return baseTemperature - 6; // Early morning, temperature drops by 6 degrees
        } else {
            return baseTemperature;
        }
    });

    return temperatureData;
}

function renderTemperatureChart(chartElement, temperatureData) {
    const ctx = chartElement.getContext('2d');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`),
            datasets: [
                {
                    label: 'Saxion',
                    data: temperatureData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Enschede',
                    data: generateSensorData(10, 2),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)', // Red color
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Gronau',
                    data: generateSensorData(15, 1),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Blue color
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Deventer',
                    data: generateSensorData(18, 3),
                    backgroundColor: 'rgba(255, 206, 86, 0.2)', // Yellow color
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            onClick: (event, elements) => {
                // Check if the clicked element is a legend item
                if (elements[0] && elements[0].datasetIndex !== undefined) {
                    // Toggle the visibility of the clicked dataset
                    const datasetIndex = elements[0].datasetIndex;
                    const dataset = chart.data.datasets[datasetIndex];
                    dataset.hidden = !dataset.hidden;
                    chart.update();
                }
            }
        }
    });
}

function generateSensorData(baseValue, fluctuation) {
    return Array.from({ length: 24 }, (_, hour) => {
        return baseValue + Math.sin(hour * Math.PI / 12) * fluctuation;
    });
}
