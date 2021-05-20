let currTripId = document.querySelector('.currentTripBox').dataset.id

if (!currTripId){
    // console.log("waiting for gear")
}else{
  fetch(`/api/trips/${currTripId}`, {
    method: 'GET',
 })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data.GearItems)
        const labels = data.GearItems.map(item => item.general_name)
        console.log("gear items", labels)
        const productName = data.GearItems.map(item => item.product_name)
        console.log(productName)
        
        const values = data.GearItems.map(item => item.weight_oz)
        
        function sum(a){
            return (a.length && parseFloat(a[0]) + sum(a.slice(1))) || 0;
        }

        let gearTotal = sum(values).toFixed(1)
        console.log("My gear total", gearTotal)
        const poundConv = (gearTotal / 16).toFixed(2)
        
        let packTotal = document.getElementById('packTotal')
        packTotal.innerHTML = `Gear Total = ${poundConv} lbs`
        console.log("weight of items", values)
        

        var ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: productName,
                datasets: [{
                    label: 'gear weight',
                    data: values,
                    backgroundColor: [
                        'rgb(155, 60, 32, 0.5)',
                        'rgb(41, 95, 19, 0.5)',
                        'rgb(19, 24, 95, 0.5)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgb(123, 21, 133, 0.5)',
                        'rgb(68, 6, 11, 0.5)'
                    ],
                    borderColor: [
                        'rgb(155, 60, 32)',
                        'rgb(41, 95, 19)',
                        'rgb(19, 24, 95)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgb(123, 21, 133, 0.5)',
                        'rgb(68, 6, 11, 0.5)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
             plugins:{
                title: {
                    display: true,
                    Text: 'YOUR PACK WEIGHT',
                },
                legend: {
                      position: 'bottom',
                    labels:{
                        boxWidth:14,
                    }
                },
                scales: {
                    x: [{
                        stack: false,
                    }],
                    y: [{
                        stack: false,
                        beginAtZero: true

                    }]
                }
              }
            }
        })



    })
}