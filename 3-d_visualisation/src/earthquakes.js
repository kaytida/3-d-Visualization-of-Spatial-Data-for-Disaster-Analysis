document.addEventListener('DOMContentLoaded', geteq);
document.addEventListener('DOMContentLoaded', gettop10);

function geteq() {
   fetch('../data/quakes.geojson')
   .then(res => res.json())
   .then(feat =>
         {
            light = [];
            average = [];
            heavy = [];
            for (var i = 0; i < feat.features.length; i++) {
               if(feat.features[i].properties.mag < 4.0) {
               light.push(feat.features[i].properties.mag);
               }
               else if(feat.features[i].properties.mag < 6.5) {
               average.push(feat.features[i].properties.mag);
               }
               else {
               heavy.push(feat.features[i].properties.mag);
               }
            }
            drawpie(light, average, heavy, 'mag');
         }
   );
}

// get top 10 highest earthquakes along with place
function gettop10() {
   fetch('../data/quakes.geojson')
   .then(res => res.json())
   .then(feat =>
         {
            var top10 = [];
            for (var i = 0; i < feat.features.length; i++) {
               top10.push(feat.features[i].properties.mag);
            }
            top10.sort(function(a, b){return b-a});
            top10 = top10.slice(0, 10);
            console.log(top10);
            var top10places = [];
            for (var i = 0; i < feat.features.length; i++) {
               if(top10.includes(feat.features[i].properties.mag)) {
                  top10places.push(feat.features[i].properties.place);
               }
            }
            drawbar(top10, top10places, 'top10');
         }
   );
}

// function to draw pie chart
function drawpie(light, average, heavy, cont) {
   var ctx = document.getElementById('mag').getContext('2d');
   new Chart(ctx, {
      type: 'pie',
      data: {
         labels: ['Light', 'Average', 'Heavy'],
         datasets: [{
            label: '# of Earthquakes',
            data: [light.length, average.length, heavy.length],
            backgroundColor: [
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
               'rgba(255, 99, 132, 1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
         }]
      },
      options: {
         responsive: true,
         title: {
            display: true,
            text: 'Range of Earthquakes Magnitudes',
            fontSize: 20,
            position: 'top',
            align: 'center',
            fontColor: 'white'
         },
         legend: {
            display: true,
            position: 'right',
            labels: {
               fontColor: 'white'
            }
         },
         plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                  let datasets = ctx.chart.data.datasets;
                  if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                  let sum = datasets[0].data.reduce((a, b) => a + b, 0);
                  let percentage = Math.round((value / sum) * 100) + '%';
                  return percentage;
                  } else {
                  return percentage;
                  }
                },
                color: '#fff',
            }
         }
     }
   });
}

// function to draw bar graph for top 10 highest earthquakes
function drawbar(top10, top10places, cont) {
   var ctx = document.getElementById('top10').getContext('2d');
   new Chart(ctx, {
      type: 'horizontalBar',
      data: {
         labels: top10places,
         datasets: [{
            label: 'Magnitude',
            data: top10,
            backgroundColor: [
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(153, 102, 255, 0.2)',
               'rgba(255, 159, 64, 0.2)',
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
               'rgba(255, 99, 132, 1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
               'rgba(153, 102, 255, 1)',
               'rgba(255, 159, 64, 1)',
               'rgba(255, 99, 132, 1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1,
         }]
      },
      options: {
         indexAxis: 'y',
         responsive: true,
         title: {
            display: true,
            text: 'Top 10 Earthquakes (Magnitude)',
            fontSize: 20,
            position: 'top',
            fontColor: 'white'
         },
         legend: {
            display: false,
            position: 'right',
            labels: {
               fontColor: 'white'
            }
         },
         scales: {
            yAxes: [{
               gridLines: {
                  display: true,
                  color: '#403f3f'
               },
               ticks: {
                  beginAtZero: true,
                  fontColor: 'white',
                  mirror: true,
                  fontSize: 15,
                  align: 'right',
                  padding: -20
               },
               scaleLabel: {
                  display: true,
                  labelString: 'Region',
                  fontColor: 'white',
                  fontSize: 15
               }
            }],
            xAxes: [{
               gridLines: {
                  display: true,
                  color: '#403f3f'
               },
               ticks: {
                  fontColor: 'white',
                  min: 0,
                  max: 8,
                  weight: 5,
               },
               scaleLabel: {
                  display: true,
                  labelString: 'Magnitude (Richter Scale)',
                  fontColor: 'white',
                  fontSize: 15
               }
            }],
            x: {
               grid: {
                 offset: true
               }
           },
           
         }
      }
   }, 250);
}