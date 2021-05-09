

const TemperatureSwitch =({value, clickHandle})=>{



    return(

        <button onClick={()=>clickHandle(value)}>{value}</button>


    )
}

export default TemperatureSwitch