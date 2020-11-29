
class main{
	constructor(maindata,centers,predata){
		this.data=maindata
		this.mapcolordata={}
		
		console.log(this.mapcolordata)
		this.fix()
		this.colors= [
			"#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177" ,"#0d5ac1" ,
			"#f205e6" ,"#1c0365" ,"#14a9ad" ,"#4ca2f9" ,"#a4e43f" ,"#d298e2" ,"#6119d0",
			"#d2737d" ,"#c0a43c" ,"#f2510e" ,"#651be6" ,"#79806e" ,"#61da5e" ,"#cd2f00" ,
			"#9348af" ,"#01ac53" ,"#c5a4fb" ,"#996635","#b11573" ,"#4bb473" ,"#75d89e" ,
			"#2f3f94" ,"#2f7b99" ,"#da967d" ,"#34891f" ,"#b0d87b" ,"#ca4751" ,"#7e50a8" ,
			"#c4d647" ,"#e0eeb8" ,"#11dec1" ,"#289812" ,"#566ca0" ,"#ffdbe1" ,"#2f1179" ,
			"#935b6d" ,"#916988" ,"#513d98" ,"#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
			"#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977",
			"#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
			"#5be4f0", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c", "#088baf",
			"#f158bf", "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234",
			"#6749e8", "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158",
			"#fb21a3", "#51aed9", "#5bb32d", "#807fb", "#21538e", "#89d534", "#d36647",
			"#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
			"#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
			"#1bb699", "#6b2e5f", "#64820f", "#1c271", "#21538e", "#89d534", "#d36647",
			"#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
			"#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
			"#1bb699", "#6b2e5f", "#64820f", "#1c271", "#9cb64a", "#996c48", "#9ab9b7",
			"#06e052", "#e3a481", "#0eb621", "#fc458e", "#b2db15", "#aa226d", "#792ed8",
			"#73872a", "#520d3a", "#cefcb8", "#a5b3d9", "#7d1d85", "#c4fd57", "#f1ae16",
			"#8fe22a", "#ef6e3c", "#243eeb", "#1dc18", "#dd93fd", "#3f8473", "#e7dbce",
			"#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a", "#15b9ee", "#0f5997",
			"#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7", "#cb2582", "#ce00be",
			"#32d5d6", "#17232", "#608572", "#c79bc2", "#00f87c", "#77772a", "#6995ba",
			"#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e", "#d00043",
			"#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052", "#e08c56",
			"#28fcfd", "#bb09b", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
			"#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
			"#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9",
			"#615af0", "#4be47", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4",
			"#7ad236", "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06",
			"#f53b2a", "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a",
			"#4cf09d", "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#ff065",
			"#71b1f4", "#a2f8a5", "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35",
			"#1c65cb", "#5d1d0c", "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44",
			"#1bede6", "#8798a4", "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#25b67",
			"#88e9b8", "#c2b0e2", "#86e98f", "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff",
			"#f812b3", "#b17fc9", "#8d6c2f", "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6",
			"#dba2e6", "#76fc1b", "#608fa4", "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"
		]
		this.colorscale=d3.scaleOrdinal().domain([2,100]).range(this.colors);
		this.latlngs=[]
		this.predata
		this.cmp=new Computation(maindata,centers,predata)
	}
	fix(){
	let divone=d3.select('.one');
	let one=divone.append('svg').classed('one',true).attr('width',900).attr('height',900);
	this.xscale=d3.scaleLinear().domain([-100,100]).range([0,800]).nice();
  	this.yscale=d3.scaleLinear().domain([-100,100]).range([0,800]).nice();
  	let scatterplot=one.append('g').attr('class','scatterplot').attr('transform','translate(50,50)');
  	let xaxis=d3.axisBottom().scale(this.xscale).ticks(20);
  	let yaxis=d3.axisLeft().scale(this.yscale).ticks(20);
  	scatterplot.append('g').attr('transform','translate(0,800)').call(xaxis);
  	scatterplot.append('g').call(yaxis);
  	this.scale=d3.scaleLinear()
  		.domain([-1,1])
  		.range([-70,70]);
  	this.circles=scatterplot.append('g').attr('id','dots');
  	for (let i=2;i<=100;i++){
  		d3.select('#cluster').append('option').attr('value',i.toString()).html(i);
  	}
  	this.map = L.map('map').setView([39.9042, 116.4074], 10);
	    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18,
	    id: 'mapbox/streets-v11',
	    tileSize: 512,
	    zoomOffset: -1,
	    accessToken: // add token address here
	    }).addTo(this.map);
	    let that=this
	    this.map.on('click', function(e) {
	    	that.cMap(e.latlng.lat, e.latlng.lng)
		 });


        var Q = [[40.02784036172628, 116.50178611278535],
[40.085652349925475, 116.39329612255098],
[40.08039874140986, 116.24772727489473],
[40.05202225054736, 116.19966208934785],
[39.97418906423696, 116.1694496870041],
[39.899427860534345, 116.16807639598848],
[39.831967504781055, 116.2518471479416],
[39.82880367321281, 116.3617104291916],
[39.87097611205365, 116.4935463666916],
[39.95419054874236, 116.43724143505098],
[40.00575375653265, 116.37956321239473],
[40.024685570075626, 116.31501853466034],
[39.9699793365808, 116.2738198041916],
[39.90996254870152, 116.2793129682541],
[39.91733586660022, 116.3617104291916],
[39.967874375523536, 116.34385764598848],
[39.71269591644774, 116.47981345653535],
[39.66091215703148, 116.37407004833223],
[39.6989611532183, 116.2573403120041],
[39.74226919672803, 116.06095969676973],
[39.90996254870152, 116.01426780223848],
[40.129766654747705, 116.07743918895723],
[40.21895804658573, 116.0760658979416],
[40.257745909206854, 116.25596702098848],
[40.31640959147105, 116.10215842723846],
[40.20008024183078, 116.58418357372285],
[40.07724638171063, 116.79155051708223],
[39.897320728525514, 116.76133811473848],
[40.095087305350994, 116.98068380355835],
[39.93416561718383, 117.04934835433961],
[39.60272060950412, 117.02874898910524],
[39.537087506313945, 116.85022115707399],
[39.32177827012156, 116.49766623973848],
[39.35045657030925, 116.33699119091035],
[39.45338894346977, 116.05271995067598],
[40.030995007481806, 116.04585349559785],
[40.28917921376592, 116.4660805463791],
[40.41685741933303, 115.90852439403535],
[39.41933055574406, 116.00316211581233],
[39.4341814883212, 115.56096240878108],
[38.994696721865594, 115.50629228353503],
[39.1578093485124, 115.17120927572252],
[38.91460188981307, 115.06134599447253],
[39.96682187068797, 115.84260642528535],
[40.444612929944775, 116.78323835134509],
[39.037848825595745, 117.04134196043016],
[39.18809007444354, 117.30501383543016],
[39.65284221780906, 116.5751498937607],
[39.80176509832639, 115.9763950109482],
[39.70176509836639, 116.9763900109482]]

	    L.polyline(Q, {className: 'abc',color: 'red'}).addTo(this.map);

	}
	cMap(lat,lng){
		this.latlngs.push([lat,lng]);
		console.log(this.latlngs)
			L.circle([lat, lng], {
				    color: 'red',
				    fillColor: '#f03',
				    fillOpacity: 0.1,
				    radius: 500
			}).addTo(this.map);
	}

	drawcircles(){
		let that=this
		d3.select('#dots').html('');
		function call(draw){
			d3.select('.leaflet-container .leaflet-overlay-pane svg g').html('');
			that.sendtomap(draw);
		}
		function draw(data){
			let centers=[]
			that.circles.selectAll('circle').data(data)
			.join('circle')
			.attr('cx',d=>that.xscale(that.scale(d.x)))
			.attr('cy',d=>that.yscale(that.scale(d.y)))
			.attr('r',d=>{
				if(d.x===d['center_x_'+k] && d.y===d['center_y_'+k]){centers.push(d)}else{return 3}
			})
			.attr('fill',d=>{
				return that.colorscale(+d['k:'+k])
			})
			.attr('stroke','black')
			.attr('class',d=>'_'+((+d['k:'+k])).toString())
			.on('click',function(d,i){
		
	  			let cluster=d3.select(this).attr('class')

	  			d3.select('.scatterplot').selectAll('#center')
	  			.style('opacity',0.3);
		  		d3.select('.scatterplot').selectAll('circle')
		  		.style('opacity',0.25)
		  		.attr('r',3);
		  		d3.select('.scatterplot').selectAll('.'+cluster)
		  		.style('opacity',1)
		  		.attr('r',5);
		  		
	  		let draw=[]
	  		for(var i=0 ; i<data.length;i++){
	  			d=data[i]
	  			if('_'+ +d['k:'+k]===cluster)draw.push(d['User Name']+'_'+(+d['Trajectory Name']).toString())
	  		}
	  		call(draw);
	  		});
			return centers
		}
		function drawcent(data){
			that.circles.selectAll('rect').data(data).join('rect')
			.attr('x',d=>that.xscale(that.scale(d.x)))
			.attr('y',d=>that.yscale(that.scale(d.y)))
			.attr('width',10)
			.attr('height',10)
			.attr('fill',d=>{
				return that.colorscale(+d['k:'+k])
			})
			.attr('class',d=>'_'+((+d['k:'+k])).toString())
			.attr('id','center')
			.on('click',function(d,i){
				let cluster=d3.select(this).attr('class')
				d3.select('.scatterplot').selectAll('#center')
	  			.style('opacity',0.3);
		  		d3.select('.scatterplot').selectAll('circle')
		  		.style('opacity',0.15)
		  		.attr('r',3);
		  		d3.select('.scatterplot').selectAll('.'+cluster)
		  		.style('opacity',1)
		  		.attr('r',5);
		  		let draw=[]
		  		for(var i=0 ; i<data.length;i++){
		  			d=data[i]
		  			if('_'+ +d['k:'+k]===cluster)draw.push(d['User Name']+'_'+(+d['Trajectory Name']).toString())
		  		}
		  	call(draw)
			});
	}
		this.mapcolordata={}
		let k=document.getElementById("cluster").value
		this.data.map(row=>{
			let plt=+row['Trajectory Name']
			this.mapcolordata[row['User Name']+'_'+ plt.toString()] =+row['k:'+k]
		})
		console.log(this.mapcolordata)
		drawcent(draw(that.data))

		
	}
	sendtomap(trjarr){
		let that=this
	
		trjarr.map(traj=>load(traj))
		function load(address){
			d3.json('./data/'+address+'.json').then(d=>{
				L.polyline(d[address], {className:address,color: that.colorscale(+address.split('_')[0])}).addTo(that.map)})
		}
	}
	clearmap(){
		d3.select('.leaflet-container .leaflet-overlay-pane svg g').html('');
	}
	predict(){
		this.sendtomap(this.cmp.predictTraj(this.latlngs))
		this.latlngs=[]
	}
}
///////////////////////////////////////////////////////////////////////////////
