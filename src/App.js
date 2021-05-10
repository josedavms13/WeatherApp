import './App.css';
import {useEffect, useState} from "react";
import TemperatureSwitch from "./temperatureSwitch";
import DataDisplay from "./dataDisplay";

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


            setObjectToDisplay([(GLOBALOBJECT) , getMessage(GLOBALOBJECT)]);

            console.log(GLOBALOBJECT);
        }


        },[GLOBALOBJECT])




        //endregion general display


    //region MESSAGE


    function getMessage(data) {


        //region TO COMMENT

        const condition = (data.current.condition.text).toUpperCase();

        let messageCondition = data.current.condition.text;
        let message = ''

        console.log(condition)

        switch(true){
            case condition.includes('RAIN'):
                console.log('rainy');

                message = 'You better take your umbrella.'

                break
            case condition.includes('SUN'):
                console.log('sun');

                message = 'It is a beautiful day, but avoid sun burns.'

                break
            case condition.includes('SHOWER'):
                console.log('shower')
                message = "Be careful and don't forget your coat and umbrella."
                break
            case condition.includes('CLOUDY'):
                console.log('claudy')
                message = "Perfect for a coffee!."
                break

            case condition.includes('OVERCAST'):
                console.log('claudy')
                message = "It is not raining.. yet.";
                break

            case condition.includes('MIST'):
                console.log('mist');
                message = "Be careful if you will drive."
                break

            case condition.includes('SNOW'):
                console.log('snow')
                message = "If possible, stay at home and watch some series"
                break

            case condition.includes('SLEET'):
                console.log('sleet');
                message = "Be careful. It's easy to fall"
                break
            case condition.includes('FREEZING'):
                message = "Get a hot drink and stay at home."
                console.log('freezing')
                break
            case condition.includes('THUNDERY'):
                console.log('Thundery');
                message = "Sounds scary"
                break
            case condition.includes('BLIZZARD'):
                message = "Stay aware at news!"
                console.log('Blizzard')
                break
            case condition.includes('FOG'):
                console.log('Fog');
                message = "You may have limited visibility. Be Careful."
                break
            case condition.includes('DRIZZLE'):
                console.log('drizzle');
                message ="Don't forget your umbrella";
                break
            case condition.includes('ICE'):
                message = "it's freezing outside"
                console.log('Ice')
                break

            default :
                message = "It's seems to be the end of the world, none of the weather matches..."
                break

        }

        const setMessage = [messageCondition, message];

        return setMessage;
        //
        // console.log((weatherMessage));
        //
        //
        //endregion tocomment
    }





    //endregion message






    //endregion    display system       ---------------------------> display system






  return (
    <div className="App">
      <header className="App-header">
        <h1>Hola</h1>
          <TemperatureSwitch value={buttonText} clickHandle={()=>SetButtonState(!buttonState)}/>
          <DataDisplay data={objectsToDisplay} SetDegrees={buttonState}/>
      </header>
    </div>
  );
}

export default App;
