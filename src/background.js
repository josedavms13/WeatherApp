import './CSS/bg.css'
import {useState} from "react";


const Background = ()=>{


    const [color, setColor] = useState('');

    useState(()=>{

        setInterval(()=>{
            setColor(getBackgroundColor())
        },5000)

    })


    function getBackgroundColor(){

        let dateTime = new Date();

        const hour = Number((dateTime.toTimeString()).slice(0,8).slice(0, 2))


        switch (true){

            case hour > 19:
                return 'night'


            case hour < 5:
                return 'night'



            case hour > 5 && hour < 7:
                return 'pre-sunrise'


            case hour > 7 && hour < 12:
                return 'morning'


            case hour > 12 && hour < 17:
                return 'afternoon'


            case hour > 17 && hour < 19:
                return 'evening'


            default:
                return 'default'

        }





    }

    return(
        <div className={`bg ${color}`}> </div>
    )
}

export default Background