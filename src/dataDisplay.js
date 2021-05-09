import {useEffect, useState} from "react";


const DataDisplay = (data) =>{


    console.log(data)


    //region SET TEMPERATURE


    const [temperature, setTemperature] = useState(`${data.data.current.temp_c}º C`)

    useEffect(()=>{

        if(data.SetDegrees){
            setTemperature(`${data.data.current.temp_f}º F`);

            console.log(temperature)
        }
        else{
            setTemperature(`${data.data.current.temp_c}º C`);
            console.log(temperature)
        }

    },[data])


    //endregion set temperature


    //region WEATHER MESSAGE

    const[weatherMessage, setMessage]= useState('');

    function setConditionMessage(data){

        const condition = data.data.current.condition.text;

        if(condition.includes('rain')){
            const message = `${condition}, take an umbrella`;

            setMessage(message);
        }
    }
    //endregion weather message

    return(

        <div className={'display-container'}>

            <div className={'place-label'}>
                <h4>YOU ARE IN</h4>
                <h5>
                    {`${data.data.location.name}, ${data.data.location.region}, ${(data.data.location.country).toUpperCase()}`}
                </h5>
            </div>

            <div className={'temperature-label'}>

                <h4>Right now it is at</h4>
                <h3>{temperature}</h3>
                <h5>It is </h5>
                {/*<h4>{weatherMessage}</h4>*/}

            </div>




        </div>


    )
}

export default DataDisplay