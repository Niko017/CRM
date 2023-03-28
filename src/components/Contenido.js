import React from 'react';

function Contenido(props){
    console.log(props);
    return(
        props.content !== "" ?
        <React.Fragment>
            {props.content}
        </React.Fragment>
        : <div>

        </div>
    )
}
export default Contenido;