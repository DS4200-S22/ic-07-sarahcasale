/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

d3.select("svg")  //select the first svg tag in the DOM
  .append("circle") // append a circle to the svg
    .attr("cx", 50) // set cx
    .attr("cy", 50) // set cy
    .attr("r", 30)  // set r 
    .attr("class", "firstCircle");

const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 

/*
// First, let's add a new svg to build within. 
let svg = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

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
});
*/
// To start, we will use hard coded data.
const data1 = [100, 200, 300];

// First, let's add a new svg to build within. 
let svg = d3.select("#csv-scatter")
            .append("svg")
              .attr("class", "holder");  

// We will add a circle for each datum in data1 to the svg 
// we added above.
svg.selectAll(".scatter") // select all circle tags in svg
                        //  Note: this is weird! There are
                        //  no circles in our svg. This is
                        //  an empty selection. 
    .data(data1)  // empty select from above gets passed here
                  // we also pass in out data
                  // data() joins the two
    .enter()  // joined empty selection and data get passed here
              // enter() creates a placeholder DOM element 
              // for all data that is not yet associated with 
              // a the DOM element  
    .append("circle");  // placeholders bound to data passed here
                        // appends a circle to svg for each 
                        // placeholder 






