function updateMap(){
    var geodata="https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

    CountryCoordDict = {
        "Algeria":[28.0000272,2.9999825],"Angola":[-11.8775768,17.5691241],"Benin":[9.5293472,2.2584408],
        "Botswana":[-23.1681782,24.5928742],"Burkina Faso":[12.0753083,-1.6880314],"Burundi":[-3.3634357,29.8870575],
        "Cameroon":[4.6125522,13.1535811],"Central African Republic":[7.0323598,19.9981227],"Chad":[15.6134137,19.0156172],
        "Democratic Republic of the Congo":[-2.5,23.5],"Republic of the Congo":[-0.7264327,15.6419155],
        "Ivory Coast":[7.9897371,-5.5679458],Djibouti:[11.8145966,42.8453061],"Egypt":[26.2540493,29.2675469],
        "Equatorial Guinea":[1.6195,10.3178],"Eritrea":[15.9500319,37.9999668],"Swaziland":[-26.5624806,31.3991317],
        "Ethiopia":[10.2116702,38.6521203],"Gabon":[-0.8999695,11.6899699],"Gambia":[13.470062,-15.4900464],
        "Ghana":[8.0300284,-1.0800271],"Guinea":[10.7226226,-10.7083587],"Guinea-Bissau":[12.100035,-14.9000214],
        "Kenya":[1.4419683,38.4313975],"Lesotho":[-29.6039267,28.3350193],"Liberia":[5.7499721,-9.3658524],
        "Libya":[26.8234472,18.1236723], "Madagascar":[-18.9249604,46.4416422],"Malawi":[-13.2687204,33.9301963],
        "Mali":[16.3700359,-2.2900239], "Mauritania":[20.2540382,-9.2399263],"Mauritius":[-20.2759451,57.5703566],
        "Morocco": [31.7917, -7.0926], "Mozambique":[-19.302233,34.9144977],"Namibia":[-23.2335499,17.3231107],
        "Niger":[17.7356214,9.3238432],"Nigeria":[9.6000359,7.9999721],"Rwanda":[-1.9646631,30.0644358],  
        "Senegal":[14.4750607,-14.4529612],"Sierra Leone":[8.6400349,-11.8400269],"Somalia":[8.3676771,49.083416],
        "South Africa":[-28.8166236,24.991639],"South Sudan":[7.8699431,29.6667897],"Sudan":[14.5844444,29.4917691],
        "Tanzania":[-6.5247123,35.7878438],"Togo":[8.7800265,1.0199765],"Tunisia":[33.8439408,9.400138],
        "Uganda":[1.5333554,32.2166578],"Zambia":[-14.5186239,27.5599164],"Zimbabwe":[-18.4554963,29.7468414]
    }

    d3.json(geodata).then(function(d){

        // ///////////////////////////                Map code             ////////////////////////////////////////////

        var map = L.map('myMap').setView([6.5085, 18.7832], 3);

       
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: API_KEY
        }).addTo(map);


        //console.log(d);
        
        var boundaries=d.features;
        //console.log(boundaries);
      
        defaultCountry=boundaries.filter(c=>c.properties.name=="Algeria")
        //console.log(defaultCountry)
        var poly=defaultCountry
        var countrygeo = {"type":"FeatureCollection","features":poly}
        //console.log(poly)
        //console.log(countrygeo)

        outline = L.geoJSON(countrygeo).addTo(map)
    //})



        
        d3.select('#SelectCountry').on('change',function(d){
            //console.log("Hello")
            //console.log(boundaries)
    
            var userSelection=d3.select('#SelectCountry').node().value;
            //console.log("user selection")
            //console.log(userSelection)

            console.log("selected")
            SelectedCountry=boundaries.filter(c=>c.properties.name==userSelection)
            console.log(SelectedCountry)
            var poly=SelectedCountry
            var countrygeo_new = {"type":"FeatureCollection","features":poly}
            console.log(poly)
            // console.log(countrygeo)

            if(outline){
                map.removeLayer(outline)
            };

            outline = L.geoJSON(countrygeo_new).addTo(map);
            var coordinates = CountryCoordDict[userSelection];
            console.log(coordinates);
        
            
        //     if(SelectedCountry == 'USA' || SelectedCountry == 'Russia'){
        //         map.setView(coordinates, 1)
                
        //     }
        //     else if(SelectedCountry == 'Venzuela' || SelectedCountry == 'Morocco'){
        //         map.setView(coordinates,14)
        //     }
        //     else{
        //         map.setView(coordinates,4)
        //     }

        })
    })


}

updateMap()