/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// This adds an svg to build using the dimensions set above
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

let svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// This finds the maximum for Y1
let maxY1 = d3.max(data1, function(d) { return d.score; });

// This is a scale function that map data values to pixel values
let yScale1 = d3.scaleLinear() // linear scale because there is linear data
            .domain([0,maxY1]) // these are the inputs for the function
            .range([height-margin.bottom,margin.top]);  // these are the outputs for the function

// This is a scale function that maps data values to pixel values
let xScale1 = d3.scaleBand() // linear scale because there is linear data
            .domain(d3.range(data1.length)) // these are the inputs for the function
            .range([margin.left, width - margin.right]) // these are the outputs for the function
            .padding(0.1); //this sets the padding for the function

// This adds a y axis to svg1  
svg1.append("g") //g is a placeholder svg
   .attr("transform", `translate(${margin.left}, 0)`) //this moves the axis to the left margin
   .call(d3.axisLeft(yScale1)) // a built in function for the left axis given a scale function from above
   .attr("font-size", '20px'); //sets the font size

// This adds a x axis to svg1
svg1.append("g") //g is a placeholder svg
    .attr("transform", `translate(0,${height - margin.bottom})`) //This moves the axis to the bottom of the svg
    .call(d3.axisBottom(xScale1)  // This is a built in function for the bottom axis given a scale function from above
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); // sets the font size


svg2.append("g") //g is a placeholder svg
   .attr("transform", `translate(${margin.left}, 0)`) //this moves the axis to the left margin
   .call(d3.axisLeft(yScale1)) // a built in function for the left axis given a scale function from above
   .attr("font-size", '20px'); //sets the font size

svg2.append("g") //g is a placeholder svg
    .attr("transform", `translate(0,${height - margin.bottom})`) //This moves the axis to the bottom of the svg
    .call(d3.axisBottom(xScale1)  // This is a built in function for the bottom axis given a scale function from above
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); // sets the font size
/* 

  Tooltip Set-up  

*/

// This is the function declaration for the div
const tooltip1 = d3.select("#hard-coded-bar") //this selects the id for a certain div
                .append("div") //and appends the div
                .attr('id', "tooltip1") //this sets the id as tooltip1
                .style("opacity", 0) // this sets the opacity to zero
                .attr("class", "tooltip"); //and this sets the class to the tooltip class

const tooltip2 = d3.select("#csv-bar") //this selects the id for a certain div
                .append("div") //and appends the div
                .attr('id', "tooltip2") //this sets the id as tooltip1
                .style("opacity", 0) // this sets the opacity to zero
                .attr("class", "tooltip"); //and this sets the class to the tooltip class

// This creates the mouseover event handler 
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") // finds the element to change
          .style("opacity", 1);  //sets the opacity of the element to 1
}

// This creates the mousemove
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.pageX)+"px") //moves the element to the left by a certain x value
          .style("top", (event.pageY + yTooltipOffset) +"px"); //moves the element up by a certain y value
}

// This makes the element disappear
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); //this sets the opacity of the element to 0
}

/* 

  Bars 

*/

// This adds event listeners
svg1.selectAll(".bar") //selects the elements that it wants to use
   .data(data1) //gets the data from the elements
   .enter() 
   .append("rect") //This adds a rectangle for each point
     .attr("class", "bar") //and makes that rectangle a class bar
     .attr("x", (d,i) => xScale1(i)) // This sets the x value
     .attr("y", (d) => yScale1(d.score)) // This sets the y value
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) // This sets the height
     .attr("width", xScale1.bandwidth()) // This sets the width
     .on("mouseover", mouseover1) //Initiates the introduction of the mouseover tooltip
     .on("mousemove", mousemove1) //Initiates the introduction of the mousemove tooltip
     .on("mouseleave", mouseleave1); //Initiates the introduction of the mouseleave tooltip

d3.csv("data/barchart.csv").then((data) => { 

  // d3.csv parses a csv file and passes the data
  // to an anonymous function. Note how we build
  // our visual inside of this anonymous function 

  // let's check our data
  console.log(data);   

  // add our circles with styling 
  svg2.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect") //This adds a rectangle for each point
     .attr("class", "bar") //and makes that rectangle a class bar
     .attr("x", (d,i) => xScale1(i)) // This sets the x value
     .attr("y", (d) => yScale1(d.score)) // This sets the y value
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) // This sets the height
     .attr("width", xScale1.bandwidth()) // This sets the width
     .on("mouseover", mouseover1) //Initiates the introduction of the mouseover tooltip
     .on("mousemove", mousemove1) //Initiates the introduction of the mousemove tooltip
     .on("mouseleave", mouseleave1); //Initiates the introduction of the mouseleave tooltip
});










