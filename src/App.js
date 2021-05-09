import './App.css';
import {useEffect, useState} from "react";

function App() {


    const [coords, changeCoords] = useState(null)

    // const[]

    // BEFORE Get user Localization
    useEffect(()=>{

         navigator.geolocation.getCurrentPosition((position)=>{changeCoords(position)}, (error)=>{changeCoords(error)})

    },[])



    // AFTER GETTING LOCALIZATION

    useEffect(()=>{
        if(coords === null) {
            console.log('waiting');

            // Show waiting card            console.log(coords);

        }
        else {
            console.log(coords);

            const latitude = coords.coords.latitude;
            const longitude = coords.coords.longitude;
            const apiKey = '8307e411e1e445f496120926210905';

            console.log(latitude);
            console.log(longitude);

            const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=yes`;



            //region FETCH WEATHER --------------------------------------


            fetch(url, {
                method : 'GET',
            })
                .then((response) => (response.json()))
                .then(data => console.log(data));

            // FETCH WEATHER
            //endregion


        }
    },[coords])









  return (
    <div className="App">
      <header className="App-header">
        <h1>Hola</h1>
      </header>
    </div>
  );
}

export default App;
