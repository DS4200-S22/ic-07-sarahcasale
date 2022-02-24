/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 



const tooltip1 = d3.select("#csv-scatter") //this selects the id for a certain div
                .append("div") //and appends the div
                .attr('id', "tooltip1") //this sets the id as tooltip1
                .style("opacity", 0) // this sets the opacity to zero
                .attr("class", "tooltip"); //and this sets the class to the tooltip class

// This creates the mouseover event handler 
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") // finds the element to change
          .style("opacity", 1);  //sets the opacity of the element to 1
}






