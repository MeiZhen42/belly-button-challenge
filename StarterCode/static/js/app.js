function buildMetadata(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      let metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      let filter = metadata.filter(obj => obj.id == sample)[0];
      
      // Use d3 to select the panel with id of `#sample-metadata`
      let panel = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      panel.html("")
  
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      for(obj in filter){panel.append("h4").text(`${obj}: ${filter[obj]}`)} // unpacking the key and value
      // BONUS: Build the Gauge Chart
      
    });
  }
  
  function buildCharts(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
  
      // Build a Bubble Chart
      let samples = data.samples.filter(obj => obj.id == sample)[0]; //indexing the list with [0]
      let otu_ids =  samples.otu_ids;
      let sample_values = samples.sample_values;
      let otu_labels = samples.otu_labels;

      let bubbleData = [{
        x: otu_ids, 
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {size: sample_values,
        color: otu_ids,
        colorscale: "Earth"}
    }]
      let bubbleLayout = {
        title: "Bacterial Species Representation from Human Navel Samples",
        xaxis: {title: "OTU ID"}
      }
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    })
  }
  function init() {
    // Grab a reference to the dropdown select element
    let select = d3.select("#selDataset") // # is CSS referencing for id

    // Use the list of sample names to populate the select options
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
    .then((data) => {
    for (let i =0; i < data.names.length; i++){
        select
        .append("option")
        .text(data.names[i])
        .property("value", data.names[i]) // property is what goes inside html tag
    }   
    buildCharts(data.names[0]);
    buildMetadata(data.names[0]);
    });
  }
  
  function optionChanged(newSample) {
    // Rebuild the charts and metadat each time a new option is available
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init(); // calls all the other functions that run the app