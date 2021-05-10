import './CSS/ErrorCard.css'
import {useEffect, useState} from "react";


const ErrorHandling = (info)=>{


    const [ errorState, setErrorState] = useState('display-none');

    const [errorDetail, setErrorDetail]= useState('');

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(()=>{

        console.log(info);



        if(info.info !== null){

            setErrorState('show-error')

            setErrorDetail(info.info.message);


            switch (info.info.code){

                case 1:
                    setErrorMessage('Please allow localisation in your browser')
                    break

                case 2:
                    setErrorMessage('Your device cannot found your localization.')
                    break

                case 3:
                    setErrorMessage('Time allowed to get your localization is out without getting response.')
                    break

                default :
                    break
            }

        }





    },[info])

    return(
        <div className={errorState}>

            <div className={'pannel'}>
                <div className={'error'}><h2>Error!  :(</h2></div>

                <div className="details">
                    <h5>{errorDetail}</h5>
                    <h4>{`${errorMessage} and reload the page!`}</h4>
                </div>



            </div>


        </div>
    )
}

export default ErrorHandling