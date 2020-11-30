class global{
	constructor(){
		this.status=0
	}
}
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
	    accessToken: 'pk.eyJ1IjoiaGFtZWR4YSIsImEiOiJja2hxOHN1MG8wNGFnMnpuZGoxeDQxZzBwIn0.j1Ta1s96jnqKxXqrQjtDqw'// add token address here
	    }).addTo(this.map);
	    let that=this
	    this.map.on('click', function(e) {
	    	that.cMap(e.latlng.lat, e.latlng.lng)
		 });
	  

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
		let status=new global()
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
				if(d.x===d['center_x_'+k] && d.y===d['center_y_'+k]){centers.push(d)}else{return 5}
			})
			.attr('fill',d=>{
				return that.colorscale(+d['k:'+k])
			})
			.attr('stroke','black')
			.attr('class',d=>'_'+((+d['k:'+k])).toString())
			.on('click',function(d,i){
				status.status=1
	  			let cluster=d3.select(this).attr('class')

	  			d3.select('.scatterplot').selectAll('#center')
	  			.style('opacity',0.25);
		  		d3.select('.scatterplot').selectAll('circle')
		  		.style('opacity',0.15)
		  		.attr('r',7);
		  		d3.select('.scatterplot').selectAll('.'+cluster)
		  		.style('opacity',1)
		  		.attr('r',7);
		  		
	  		let draw=[]
	  		for(var i=0 ; i<data.length;i++){
	  			d=data[i]
	  			if('_'+ +d['k:'+k]===cluster)draw.push(d['User Name']+'_'+(+d['Trajectory Name']).toString())
	  		}
	  		call(draw);
	  		})
	  		.on('mouseover',function(d,i){
	  			if(status.status!==1){
	  				console.log(status.status)
	  				d3.select(this).style("stroke-width","4px");
					call([i['User Name']+'_'+i['Trajectory Name']])
	  			}
				
				
			})
			.on("mouseout", function(d,i){	
				d3.select(this).style("stroke-width","1px");
        	});
			return centers
		}
		function drawcent(data){
			that.circles.selectAll('rect').data(data).join('rect')
			.attr('x',d=>that.xscale(that.scale(d.x)))
			.attr('y',d=>that.yscale(that.scale(d.y)))
			.attr('width',10)
			.attr('height',10)
			.attr('stroke','#FF0303')
			.attr('stroke-width',3)
			.attr('fill',d=>{
				return that.colorscale(+d['k:'+k])
			})
			.attr('class',d=>'_'+((+d['k:'+k])).toString())
			.attr('id','center')
			.on('click',function(d,i){
				status.status=1
				let cluster=d3.select(this).attr('class')
				d3.select('.scatterplot').selectAll('#center')
	  			.style('opacity',0.25);
		  		d3.select('.scatterplot').selectAll('circle')
		  		.style('opacity',0.15)
		  		.attr('r',5);
		  		d3.select('.scatterplot').selectAll('.'+cluster)
		  		.style('opacity',1)
		  		.attr('r',7);
		  		let draw=[]
		  		for(var i=0 ; i<data.length;i++){
		  			d=data[i]
		  			if('_'+ +d['k:'+k]===cluster)draw.push(d['User Name']+'_'+(+d['Trajectory Name']).toString())
		  		}
		  	call(draw)
			})
			.on('mouseover',function(d,i){
	  			if(status.status!==1){
	  				console.log(status.status)
	  				d3.select(this).style("stroke-width","4px");
					call([i['User Name']+'_'+i['Trajectory Name']])
	  			}
				
				
			})
			.on("mouseout", function(d,i){	
				d3.select(this).style("stroke-width","1px");
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
