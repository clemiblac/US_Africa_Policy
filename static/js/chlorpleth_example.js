function updateMap(){
    var geodata="https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
    var news_list="/news";

    //var population="https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv";

    // function(d) { data.set(d.code, +d.pop); })

    CountryCoordDict = {
        "USA": [37, -95 ],
        "China": [35.8617, 104.1954],
        "Russia": [61.5240, 105.3188],
        "Venezuela": [6.4238, -66.5897],
        "Morocco": [31.7917, -7.0926]
    }

    d3.json(geodata).then(function(d){
        //console.log(d);
        d3.json(news_list).then(function(article){
            //console.log(article)


            ///////////////////////////                Map code             ////////////////////////////////////////////
            var boundaries=d.features;
            //console.log(boundaries);
            
            defaultCountry=boundaries.filter(c=>c.properties.name=="USA")
            //console.log(defaultCountry)
            var poly=defaultCountry
            var countrygeo = {"type":"FeatureCollection","features":poly}
            //console.log(poly)
            //console.log(countrygeo)

            var map = L.map('myMap').setView([37, -95], 3);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            outline = L.geoJSON(countrygeo).addTo(map)
        
            /////////////////////               News Code                 ///////////////////////////////////////////////
            
            //turning each news title into a hyperlink
            hyperlinks=[]
            for(var i = 0; i < article.length; ++i) {
                var each_article=article[i]
                //console.log(each_article);
                var each_title=each_article.title
                //console.log(each_title);
                var each_link=each_article.link;
                //console.log(each_link);
                var story_link=each_title.link(each_link);
                //console.log(story_link);
                hyperlinks.push(story_link)
            }
            var news_id=article.map(s=>s.id)
            var news_date=article.map(s=>s.date)

            //console.log(news_id)

            var values = [
                news_date,
                hyperlinks
              ]
          
            var table_data = [{
                type: 'table',
                columnwidth:[100,300],
                header: {
                
                values: [["<b>Date</b>"],
                            ["<b>Link</b>"]],
                align: "center",
                line: {width: 1, color: 'black'},
                fill: {color: "#61892F"},
                font: {family: "Arial", size: 12, color: "white"}
                },
                cells: {
                values: values,
                align: "center",
                line: {color: "black", width: 1},
                font: {family: "Arial", size: 11, color: ["black"]}
                }
            }];

          
            var layout = {
                autosize: true,
                height: 650,
                margin: {
                    l: 50,
                    r: 50,
                    b: 50,
                    t: 50,
                    pad: 4
                    }
            };
            var config = {responsive: true};
            Plotly.newPlot('news', table_data,layout,config);









            d3.select('#selectCountry').on('change.clemi',function(d){
                var userSelection=d3.select('#selectCountry').node().value;
                console.log(userSelection)

                SelectedCountry=boundaries.filter(c=>c.properties.name==userSelection)
                console.log(SelectedCountry)
                var poly=SelectedCountry
                var countrygeo_new = {"type":"FeatureCollection","features":poly}
                //console.log(poly)
                //console.log(countrygeo)

                if(outline){
                    map.removeLayer(outline)
                };
                outline = L.geoJSON(countrygeo_new).addTo(map);
                var coordinates = CountryCoordDict[userSelection];
                console.log(coordinates);
                
                
                if(SelectedCountry == 'USA' || SelectedCountry == 'Russia'){
                    map.setView(coordinates, 1)
                    
                }
                else if(SelectedCountry == 'Venzuela' || SelectedCountry == 'Morocco'){
                    map.setView(coordinates,14)
                }
                else{
                    map.setView(coordinates,4)
                }
                


            
            

            })



        })
        
    

    });
}

updateMap()


