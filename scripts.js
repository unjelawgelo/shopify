// Chart.js for Total Sales Bar Graph
const ctx = document.getElementById('salesChart').getContext('2d');

let salesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: Array.from({ length: 30 }, (_, i) => ` ${i + 1}`), // Create labels for 30 days
        datasets: [{
            label: 'Total Sales',
            data: Array(30).fill(0).map(() => Math.floor(Math.random() * 35000)), // Random sales data for demonstration
            backgroundColor: '#429fa6',
            borderColor: '#429fa6',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 35000,
                ticks: {
                    font: {
                        style: 'normal' // Ensure y-axis labels are not italic
                    }
                }
            },
            x: {
                ticks: {
                    font: {
                        style: 'normal' // Ensure x-axis labels are not italic
                    }
                }
            }
        }
    }
});



function updateDashboard(salesData, totalSales, totalOrders, finalSales, returns, allChannelsSales, prevSales, nextSales) {
    salesChart.data.datasets[0].data = salesData; // Update the sales data for the chart
    salesChart.update(); // Refresh the chart

    document.getElementById('totalSales').innerText = totalSales; // Update total sales value
    document.getElementById('totalOrders').innerText = totalOrders; // Update total orders value

    // Update foreshadowing sales values
    document.getElementById('prevSalesValue').innerText = prevSales;
    document.getElementById('nextSalesValue').innerText = nextSales;

    // Add animation for the sales value
    const totalSalesElement = document.getElementById('totalSales');
    totalSalesElement.classList.add('fade-in');
    setTimeout(() => totalSalesElement.classList.remove('fade-in'), 300);
}

// CSS Animation for fade in
const style = document.createElement('style');
style.innerHTML = `
    .fade-in {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Update event listeners for the navbar selections
document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', function () {
        // Remove 'active' class from all buttons
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        // Add 'active' class to the clicked button
        this.classList.add('active');

        const selectedRange = this.getAttribute('data-range');

        const formatCurrency = (value) => {
            if (value >= 1e6) { // If value is in millions
                return `$${(value / 1e6).toFixed(1)}M`;
            } else if (value >= 1e3) { // If value is in thousands
                return `$${(value / 1e3).toFixed(1)}k`;
            } else { // If value is less than a thousand
                return `$${value}`;
            }
        };

        if (selectedRange === 'today') {
            updateDashboard(
                [10000, 12000, 15000, 8000, 9000, 7000, 11000, 6000, 4000, 5000, 3000, 9000, 5000, 6000, 8000, 12000, 10000, 11000, 8000, 9000, 7000, 4000, 5000, 3000, 6000, 8000, 7000, 10000, 5000, 4000],
                formatCurrency(10652), '456 orders', formatCurrency(10900), formatCurrency(-300), formatCurrency(10652), formatCurrency(10000), formatCurrency(11000) // Foreshadowing values
            );
        } else if (selectedRange === 'this-week') {
            updateDashboard(
                [15000, 18000, 25000, 22000, 23000, 21000, 19000],
                formatCurrency(150000), '3,000 orders', formatCurrency(150500), formatCurrency(-500), formatCurrency(150000), formatCurrency(140000), formatCurrency(160000) // Foreshadowing values
            );
        } else if (selectedRange === 'this-month') {
            updateDashboard(
                Array.from({ length: 30 }, () => Math.floor(Math.random() * 35000)),
                formatCurrency(320000), '9,000 orders', formatCurrency(321000), formatCurrency(-700), formatCurrency(320000), formatCurrency(310000), formatCurrency(330000) // Foreshadowing values
            );
        } else if (selectedRange === 'last-month') {
            updateDashboard(
                [30000, 28000, 27000, 22000, 25000, 26000, 24000, 23000, 22000, 20000, 21000, 18000, 19000, 20000, 25000, 26000, 27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000, 30000, 29000, 28000, 27000, 26000, 25000],
                formatCurrency(290000), '8,000 orders', formatCurrency(290000), formatCurrency(-10000), formatCurrency(290000), formatCurrency(280000), formatCurrency(300000) // Foreshadowing values
            );
        } else if (selectedRange === 'last-year') {
            updateDashboard(
                [22000, 24000, 25000, 20000, 30000, 27000, 31000, 25000, 23000, 22000, 24000, 20000, 25000, 27000, 30000, 33000, 32000, 31000, 29000, 26000, 25000, 24000, 22000, 21000, 20000, 23000, 24000, 25000, 26000, 27000],
                formatCurrency(3500000), '85,000 orders', formatCurrency(3500000), formatCurrency(-10000), formatCurrency(3500000), formatCurrency(3400000), formatCurrency(3600000) // Foreshadowing values
            );
        }
    });
});

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const channel = this.getAttribute('data-channel');
        const logo = document.getElementById('channelLogo');

        if (channel === 'amazon') {
            logo.src = 'path/to/amazon.png'; // Add the path to your Amazon logo
            logo.style.display = 'block'; // Show the logo
        } else if (channel === 'online-store') {
            logo.src = 'path/to/shopify.png'; // Add the path to your Shopify logo
            logo.style.display = 'block'; // Show the logo
        } else {
            logo.style.display = 'none'; // Hide logo for All Channels
        }
    });
});
