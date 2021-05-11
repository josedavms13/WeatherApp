import './App.css';
import './CSS/ErrorCard.css'
import './CSS/DataDisplay.css'


import {useEffect, useState} from "react";
import TemperatureSwitch from "./temperatureSwitch";
import DataDisplay from "./dataDisplay";
import Clock from "./clock";
import ErrorHandling from "./errorHandling";
import Background from "./background";


function App() {


    //region GLOBALS ==============


    const [GLOBALOBJECT, setGlobalObject] = useState(null);


    //endregion     =============== globals







    //region GETTING user Localization



    const [coords, changeCoords] = useState(null)


    useEffect(()=>{

         navigator.geolocation.getCurrentPosition((position)=>{changeCoords(position)}, (error)=>{changeCoords(error)})

    },[])

    //endregion getting user localization

    //region AFTER GETTING LOCALIZATION / FETCH   ------------------------------>

    useEffect(()=>{
        // Waiting from API
        if(coords === null) {

        }

        // After API response
        else {

            // GOT LOCALIZATION RIGHT
            if (coords.code === undefined) {
                const latitude = coords.coords.latitude;
                const longitude = coords.coords.longitude;
                const apiKey = '8307e411e1e445f496120926210905';


                const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=yes`;
                //region FETCH WEATHER --------------------------------------


                    fetch(url, {
                        method: 'GET',
                    })
                        .then((response) => (response.json()))
                        .then(data => setGlobalObject(data));

                //endregion FETCH WEATHER
            }

            // COULDN'T GET LOCALIZATION
            else{

                setError(coords);


            }
        }

    },[coords])

    const [ gotError , setError] = useState(null);


    //endregion                                 <------------------------------ after getting localization / fetch




    //region DISPLAY SYSTEM             ----------------------------->

        //region HEADER MESSAGES
            const [headerMessage, setHeaderMessage] = useState('hello')

        //endregion head messages

        //region FARENHEITH CELSIUS BUTTON

            const [buttonState, SetButtonState ] = useState(false)
            const [buttonText, setButtonText] = useState('Switch to Farenheith')

            useEffect(()=>{
                if(buttonState){

                    setButtonText('Switch to Celsius')
                }else {
                    setButtonText('Switch to Farenheith')
                }
            },[buttonState])

        //endregion  farenheith celsius button


        //region GENERAL DISPLAY


            //  Set info to display
            const [objectsToDisplay,setObjectToDisplay] = useState([])

                useEffect(()=>{



                    if(GLOBALOBJECT === null){


                    // waiting
                }


                else{


                    setObjectToDisplay([(GLOBALOBJECT) , getMessage(GLOBALOBJECT)]);


                    //region HEADER MESSAGES

                    let time = GLOBALOBJECT.current.last_updated;
                    time = time.split(' ');
                    time = Number(time[1].split(':')[0])

                    switch (true){

                        case (time>19):

                            setHeaderMessage('Good Night, have a nice sleep!')
                            break

                        case (time > 5 ):
                            setHeaderMessage('Good Morning!, have a nice day')
                            break

                        case (time > 12 ):
                            setHeaderMessage('Good Afternoon!')
                            break

                        case (time > 18):
                            setHeaderMessage('Good Evening!')
                            break

                        default:
                            break
                    }


                    //endregion head messages

                }


                },[GLOBALOBJECT])


        //endregion general display


        //region MESSAGE


            function getMessage(data) {


        //region MESSAGE PICKER

        const condition = (data.current.condition.text).toUpperCase();

        let messageCondition = data.current.condition.text;
        let message = ''


        // switch ----
        switch(true){
            case condition.includes('RAIN'):

                message = 'You better take your umbrella.'

                break
            case condition.includes('SUN'):

                message = 'It is a beautiful day, but avoid sun burns.'

                break
            case condition.includes('SHOWER'):
                message = "Be careful and don't forget your coat and umbrella."
                break
            case condition.includes('CLOUDY'):
                message = "Perfect for a coffee!."
                break

            case condition.includes('OVERCAST'):
                message = "At least it's not raining.. yet.";
                break

            case condition.includes('MIST'):
                message = "Be careful if you will drive."
                break

            case condition.includes('SNOW'):
                message = "If possible, stay at home and watch some series"
                break

            case condition.includes('SLEET'):
                message = "Be careful. It's easy to fall"
                break
            case condition.includes('FREEZING'):
                message = "Get a hot drink and stay at home."
                break
            case condition.includes('THUNDERY'):
                message = "Sounds scary"
                break
            case condition.includes('BLIZZARD'):
                message = "Stay aware at news!"
                break
            case condition.includes('FOG'):
                message = "You may have limited visibility. Be Careful."
                break
            case condition.includes('DRIZZLE'):
                message ="Don't forget your umbrella";
                break
            case condition.includes('ICE'):
                message = "it's freezing outside"
                break

            default :
                message = "It's seems to be the end of the world, none of the weather matches..."
                break

        }

        const setMessage = [messageCondition, message];

        return setMessage;

        //endregion message picker
    }


        //endregion message


    //endregion    display system       ---------------------------> display system


    return (
        <div className="App">
            <Background />
            <header className="App-header">
                <div className={'header-tittle'}>
                    <h1>{headerMessage}</h1>

                </div>

                <div className="clock-data-container">
                    <Clock/>
                    <DataDisplay data={objectsToDisplay} SetDegrees={buttonState}/>
                </div>
                <TemperatureSwitch value={buttonText} clickHandle={()=>SetButtonState(!buttonState)}/>
                <ErrorHandling info={gotError}/>

            </header>
        </div>
    );
}

export default App;
