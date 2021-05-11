import './CSS/Clock.css'

import {useEffect, useState} from "react";


const Clock =()=>{



    const [currentDate, setDate] = useState('10/10/1010');
    const [currentTime, setTime] = useState('12:12');

    useEffect(()=>{


        setInterval(()=>{

            let dateTime = new Date();

            setDate(dateTime.toDateString())
            setTime((dateTime.toTimeString()).slice(0,8))




        },1000)


    },[])




    return (
        <div className={'clock-container'}>
            <h1>{currentTime}</h1>
            <h2>{currentDate}</h2>
        </div>
    )
}

export default Clock
