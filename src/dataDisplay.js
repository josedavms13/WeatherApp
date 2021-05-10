
const DataDisplay = (data) =>{




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
                <h3>{}</h3>
                <h5>It is </h5>
                <h4>{}</h4>
                <h5>{}</h5>

            </div>




        </div>


    )
}

export default DataDisplay