
document.addEventListener('DOMContentLoaded', perCountry);
document.addEventListener('DOMContentLoaded', volcanoTypes);

// get volcanoes country wise
function perCountry() {
	fetch('../data/volcanoes.json')
		.then(res => res.json())
		.then(data => {

			var countries = {};

			for (var i = 0; i < data.length; i++) {
				//countries.push(data[i].country);
				
				if (countries[data[i].country]) 
				{
					countries[data[i].country]++;
				}
				else 
				{
					countries[data[i].country] = 1;
				} 

				//countries.push(data[i].country);
				//vals.push(data[i].elevation);
			}

			//console.log(countries);

			var barColors = "white";

			var ctx = document.getElementById('perCountry').getContext('2d');

			var barColors = "red";

			new Chart(ctx, {
				type: "bar",
				data: {
					labels: Object.keys(countries), 
					datasets: [{
						backgroundColor: barColors,
						data: Object.values(countries) 
					}]
				},
				options: {
					legend: { display: false },
					title: {
						display: true,
						text: "Number of Volcanoes per Country",
						fontSize: 25,
						fontColor: 'white'
					}
				}
			});

		}

		);

}



// get volcanoes country wise
function volcanoTypes() {
	fetch('../data/volcanoes.json')
		.then(res => res.json())
		.then(data => {
			
			var types = {};

			for (var i = 0; i < data.length; i++) {
				//countries.push(data[i].country);
				
				if (types[data[i].type]) 
				{
					types[data[i].type]++;
				}
				else 
				{
					types[data[i].type] = 1;
				} 

				//countries.push(data[i].country);
				//vals.push(data[i].elevation);
			}
			
			console.log(types);

			var ctx = document.getElementById('types').getContext('2d');

			var barColors = [
				"#880808",
				"#AA4A44",
				"#EE4B2B",
				"#A52A2A",
				"#800020",
				"#6E260E",
				"#CC5500",
				"#E97451",
				"#D22B2B",
				"#C41E3A",
				"#D70040",
				"#DE3163",
				"#D2042D",
				"#954535",
				"#811331"
			];

			new Chart(ctx, {
				type: "pie",
				data: {
					labels: Object.keys(types), 
					datasets: [{
						backgroundColor: barColors,
						data: Object.values(types) 
					}]
				},
				options: {
					legend: { display: false },
					title: {
						display: true,
						text: "Types of Volcanoes Worldwide",
						fontSize: 25,
						fontColor: 'white'
					}
				}
			});

		}

		);

}





const catColor = d3.scaleOrdinal(d3.schemeCategory10.map(col => polished.transparentize(0.2, col)));

const getAlt = d => d.elevation * 5e-5;

const getTooltip = d => `
      <div style="text-align: center">
        <div><b>${d.name}</b>, ${d.country}</div>
        <div>(${d.type})</div>
        <div>Elevation: <em>${d.elevation}</em>m</div>
      </div>
    `;

const myGlobe = Globe()
	.globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
	.backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
	.width(1000)
	.pointLat('lat')
	.pointLng('lon')
	.pointAltitude(getAlt)
	.pointRadius(0.12)
	.pointColor(d => catColor(d.type))
	.pointLabel(getTooltip)
	.labelLat('lat')
	.labelLng('lon')
	.labelAltitude(d => getAlt(d) + 1e-6)
	.labelDotRadius(0.12)
	.labelDotOrientation(() => 'bottom')
	.labelColor(d => catColor(d.type))
	.labelText('name')
	.labelSize(0.15)
	.labelResolution(1)
	.labelLabel(getTooltip)
	(document.getElementById('globeViz'));

fetch('../data/volcanoes.json').then(res => res.json()).then(volcanoes => {
	myGlobe.pointsData(volcanoes)
		.labelsData(volcanoes);
});