import {useEffect, useState} from "react";

const DataDisplay = (data) =>{

    console.log(data.data);

    const [grades, setGrades] = useState(`loading...`)
    const [message, setMessage] = useState(['loading...', 'loading...'])
    const [icon, setIcon] = useState(null)

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
        }
    }, [data])

    return(

        <div className={'display-container'}>

            <div className={'place-label'}>
                <h4>YOU ARE IN</h4>
                <h5>
                    {}
                </h5>
            </div>

            <div className={'temperature-label'}>

                <h4>Right now it is at</h4>
                <h3>{grades}</h3>
                <h5>It is </h5>
                <h4>{message[0]}</h4>
                <h5>{message[1]}</h5>
                <img src={icon} alt={message[0]}/>

            </div>




        </div>


    )
}

export default DataDisplay