let svgone = d3.select('body')
      .append('div')
      .classed('divone',true)
      .append('svg')
      .attr('width',800)
      .attr('height',800);

let svgtwo = d3.select('body')
      .append('div')
      .classed('divtwo',true)
      .append('svg')
      .attr('width',800)
      .attr('height',800);

//* The following function gets an object of x and y coordinate (see A below) and draws the trajectory*//

function draw(points){

  let lineDrawer = d3.line()
        .x(d => d.x)
        .y(d => d.y);

     svgone.append("path")
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width", 3)
      .attr("d", lineDrawer(points));
};

let A = [
          {x: 100, y: 300},
          {x: 200, y: 400},
          {x: 500, y: 200},
          {x: 700, y: 300},
        ];
draw(A);


    
var Q = [[0,-1],[2,0.5],[4,1],[5,-1],[8,0]]
var gamma=[[0,0],[2,2],[5,-1],[7,0]]
let ob=new FeatureMap();
console.log(ob.main(Q,gamma,1))

var gamma1=[[0,0],[2,2],[5,-1],[7,0],[0,0]]
console.log(ob.main(Q,gamma1,1))