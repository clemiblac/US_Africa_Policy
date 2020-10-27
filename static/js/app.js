function updateMap(){
    var geodata="https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

    // CountryCoordDict = {
    //     "USA": [37, -95 ],
    //     "China": [35.8617, 104.1954],
    //     "Russia": [61.5240, 105.3188],
    //     "Venezuela": [6.4238, -66.5897],
    //     "Morocco": [31.7917, -7.0926]
    // }

    d3.json(geodata).then(function(d){

        // ///////////////////////////                Map code             ////////////////////////////////////////////
        //  console.log(d);
        
        // var boundaries=d.features;
        // console.log(boundaries);
      
        // defaultCountry=boundaries.filter(c=>c.properties.name=="Angola")
        // console.log(defaultCountry)
        // var poly=defaultCountry
        // var countrygeo = {"type":"FeatureCollection","features":poly}
        // console.log(poly)
        // console.log(countrygeo)

        var map = L.map('myMap').setView([51.505, -0.09], 13);

       
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: API_KEY
        }).addTo(map);


        //outline = L.geoJSON(countrygeo).addTo(map)
    })



       
    //    d3.select('#selectCountry').on('change.clemi',function(d){
    //     var userSelection=d3.select('#selectCountry').node().value;
    //     console.log(userSelection)

    //     SelectedCountry=boundaries.filter(c=>c.properties.name==userSelection)
    //     console.log(SelectedCountry)
    //     var poly=SelectedCountry
    //     var countrygeo_new = {"type":"FeatureCollection","features":poly}
    //     //console.log(poly)
    //     //console.log(countrygeo)

    //     if(outline){
    //         map.removeLayer(outline)
    //     };
    //     outline = L.geoJSON(countrygeo_new).addTo(map);
    //     var coordinates = CountryCoordDict[userSelection];
    //     console.log(coordinates);
        
        
    //     if(SelectedCountry == 'USA' || SelectedCountry == 'Russia'){
    //         map.setView(coordinates, 1)
            
    //     }
    //     else if(SelectedCountry == 'Venzuela' || SelectedCountry == 'Morocco'){
    //         map.setView(coordinates,14)
    //     }
    //     else{
    //         map.setView(coordinates,4)
    //     }

    // })



}

updateMap()