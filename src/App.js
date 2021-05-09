import './App.css';
import {useEffect, useState} from "react";
import TemperatureSwitch from "./temperatureSwitch";
// import DataDisplay from "./dataDisplay";

function App() {


    //region GLOBALS ==============


    const [GLOBALOBJECT, setGlobalObject] = useState(null);


    //endregion     =============== globals








    //region BEFORE Get user Localization



    const [coords, changeCoords] = useState(null)


    useEffect(()=>{

         navigator.geolocation.getCurrentPosition((position)=>{changeCoords(position)}, (error)=>{changeCoords(error)})

    },[])

    //endregion

    //region AFTER GETTING LOCALIZATION / FETCH   ------------------------------>

    useEffect(()=>{
        // Waiting from API
        if(coords === null) {
            console.log('waiting');

            // Show waiting card            console.log(coords);

        }

        // After API response
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
                .then(data => setGlobalObject(data));

            // FETCH WEATHER
            //endregion


        }


    },[coords])



    //endregion                                 <------------------------------ after getting localization / fetch




    //region DISPLAY SYSTEM             ----------------------------->



        //region FARENHEITH CELSIUS BUTTON

            const [buttonState, SetButtonState ] = useState(false)
            const [buttonText, setButtonText] = useState('Switch to Farenheith')

            useEffect(()=>{
                if(buttonState){
                    // console.log('true')
                    setButtonText('Switch to Celsius')
                }else {
                    // console.log('false')
                    setButtonText('Switch to Farenheith')
                }
            },[buttonState])

        //endregion  farenheith celsius button


        //region GENERAL DISPLAY

    const [objectsToDisplay,setObjectToDisplay] = useState([])
        useEffect(()=>{

            // while passing info

        if(GLOBALOBJECT === null){


            //show waiting
        }
            // info passed

        else{
            setObjectToDisplay(GLOBALOBJECT);
            console.log(GLOBALOBJECT);
        }


        },[GLOBALOBJECT])




        //endregion


    //endregion                              ---------------------------> display system






  return (
    <div className="App">
      <header className="App-header">
        <h1>Hola</h1>
          <TemperatureSwitch value={buttonText} clickHandle={()=>SetButtonState(!buttonState)}/>
          {/*<DataDisplay data={objectsToDisplay} SetDegrees={buttonState}/>*/}
      </header>
    </div>
  );
}

export default App;
