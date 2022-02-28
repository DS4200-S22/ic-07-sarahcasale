/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 
const scatterwidth = 900; 
const scatterheight = 450; 
const scattermargin = {left:50, right:50, bottom:50, top:50}; 

const mouseover = function (event, d) {
  let point = d3.select(this); 
  point.classed("myFirstPlot", false);
  point.classed("highlighted", true);
}

const mouseout = function (event, d) {
  let point = d3.select(this); 
  point.classed("myFirstPlot", true);
  point.classed("highlighted", false);

}

d3.select("svg")  //select the first svg tag in the DOM
  .append("circle") // append a circle to the svg
    .attr("cx", 50) // set cx
    .attr("cy", 50) // set cy
    .attr("r", 30)  // set r 
    .attr("class", "firstCircle");

let svg = d3
  .select("#csv-scatter")
  .append("svg")
    .attr("width", scatterwidth- scattermargin.left - scattermargin.right)
    .attr("height", scatterheight - scattermargin.top - scattermargin.bottom)
    .attr("viewBox", [0, 0, scatterwidth, scatterheight])

d3.csv("data/scatter.csv").then((data) => { 

  // d3.csv parses a csv file and passes the data
  // to an anonymous function. Note how we build
  // our visual inside of this anonymous function 

  // let's check our data
  console.log(data);   

  // add our circles with styling 
  svg.selectAll(".scatter") 
      .data(data) // this is passed into the anonymous function
      .enter()  
      .append("circle")
        .attr("class", "scatter") //and makes that rectangle a class bar
        .attr("cx", (d) => { return d.x; }) // use x for cx
        .attr("cy", (d) => { return d.y; }) // use y for cy
        .attr("r", 30)  // set r 
        .on("mouseover", mouseover) // mouseover listener
        .on("mouseout", mouseout);

// First, let's add a new svg to build within. 
// find max X
let scattermaxX = d3.max(data, (d) => { return d.x; }); 
console.log("Scatter Max X: " + scattermaxX); 

// find max Y 
let scattermaxY = d3.max(data, (d) => { return d.y; }); 
console.log("Scatter Max Y: " + scattermaxY); 

// Now that we have our maxes we define scale functions that
// map our data values (domain for the scale function) to our
// pixel values (range for the scale function)

let scatterxScale = d3.scaleLinear() // linear scale because we have 
                              // linear data 
                .domain([0, scattermaxX])  // inputs for the function
                .range([scattermargin.left, scatterwidth - scattermargin.right]); 
                // ^ outputs for the function 

let scatteryScale = d3.scaleLinear()
            .domain([0, scattermaxY])
            .range([scatterheight - scattermargin.bottom, scattermargin.top]); 

// Add x axis to svg6  
svg.append("g") // g is a "placeholder" svg
      .attr("transform", `translate(0,${scatterheight - scattermargin.bottom})`) 
      // ^ moves axis to bottom of svg 
      .call(d3.axisBottom(scatterxScale)) // built in function for bottom
                                  // axis given a scale function 
        .attr("font-size", '20px'); // set font size

// Add y axis to svg6 
svg.append("g") // g is a "placeholder" svg
     .attr("transform", `translate(${scattermargin.left}, 0)`) 
     // ^ move axis inside of left margin
     .call(d3.axisLeft(scatteryScale)) // built in function for left
                                // axis given a scale function 
      .attr("font-size", '20px'); // set font size

});



