

import {useEffect, useState} from "react";

const DataDisplay = (data) =>{

    console.log(data.data);

    const [grades, setGrades] = useState(`loading...`)
    const [message, setMessage] = useState(['loading...', 'loading...'])
    const [icon, setIcon] = useState(null)

    const [city, setCity] = useState('loading...')
    const [region, setRegion] = useState('loading...')
    const [country, setCountry] = useState('loading...')


    useEffect(()=>{

        if (data.data.length !== 0) {

            // region SET TEMPERATURE
            if (data.SetDegrees) {
                setGrades(`${data.data[0].current.temp_c}ºC`);
            } else {
                setGrades(`${data.data[0].current.temp_f}ºF`);
            }
            // endregion set temperature

            //region SET MESSAGE

            setMessage(data.data[1]);


            //endregion set message

            //region SET ICON

            setIcon(data.data[0].current.condition.icon)

            //endregion set icon

            //region SET PLACE

            console.log(data.data[0].location.name)

            setCity(data.data[0].location.name)
            setRegion(data.data[0].location.region)



            //endregion set place
        }
    }, [data])

    return(

        <div className={'display-container'}>

            <div className={'place-label'}>
                <h4>HERE IN <span>{city}, {region}</span></h4>



            </div>

            <div className={'temperature-label'}>

                <div className="current-temperature-container">

                    <div className="grades-container">

                        <h4>Right now it is at </h4>
                        <h5>{grades}</h5>
                    </div>

                    <h4>it is {message[0]}</h4>
                    <h5>{message[1]}</h5>

                </div>

                <div className="icon-container">
                    <img src={icon} alt={message[0]}/>
                </div>


            </div>




        </div>


    )
}

export default DataDisplay