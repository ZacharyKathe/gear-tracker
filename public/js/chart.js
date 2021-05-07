let currTripId = document.querySelector('.currentTripBox').dataset.id
//let gearItem = document.querySelectorAll('.gearitem').dataset.id
if (!currTripId){
    console.log("waiting for gear")
}else{
  fetch(`http://localhost:3001/api/trips/${currTripId}`, {
    method: 'GET',
 })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data.GearItems)
        const labels = data.GearItems.map(item => item.general_name)
        console.log("gear items", labels)

        const values = data.GearItems.map(item => item.weight_oz)
        console.log("weight of items", values)
        var ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'gear weight',
                    data: values,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
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
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true

                    }
                }
            }
        })



    })
}