import React, {Fragment, useState} from 'react';
import Error from './Error'
import PropTypes from 'prop-types'

const Pregunta = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {

    //definir state
    const [cantidad, guardarCantindad] = useState(0);
    const [error, guardarError] = useState(false);

    // función que lee el presupuesto
    const definirPresupuesto = e => {
        guardarCantindad(parseInt(e.target.value, 10));
    }

    // submit para definir presupuesto
    const agregarPresupuesto = e =>{
        e.preventDefault()

    // validación
    if(cantidad < 1 || isNaN(cantidad)){
        guardarError(true);
        return;
    }

    // luego de la validación
    guardarError(false);
    guardarPresupuesto(cantidad)
    guardarRestante(cantidad)
    actualizarPregunta(false)

    }
    return ( 
        <Fragment>
            <h2>Coloca tu presupuesto</h2>

            { error ? <Error mensaje="El presupuesto es incorrecto" />  : null}

            <form
                onSubmit={agregarPresupuesto}
            >

                <input 
                    type="number"
                    className="u-full-width"
                    placeholder="Coloca tu presupuesto"
                    onChange={definirPresupuesto}
                />

                <input 
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir Presupuesto"
                />
            </form>
        </Fragment>
     );
};

Pregunta.propTypes = {
    guardarPresupuesto: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired
}
 
export default Pregunta;