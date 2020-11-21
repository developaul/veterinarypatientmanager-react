import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {

    // State de cita
    const [ cita, actualizarCita ] = useState({
        propietario : '',
        sintomas    : '',
        mascota     : '',
        fecha       : '',
        hora        : ''
    });

    // State de error
    const [ error, actualizarError ] = useState(false);

    const { propietario, sintomas, mascota, fecha, hora } = cita;

    // Leyendo datos del campo
    const actualizarState = event => actualizarCita({
        ...cita,
        [event.target.name]: event.target.value
    });
    
    const submitCita = event => {
        event.preventDefault();

        // Validando Cita
        if( !Object.values( cita ).every( property => property !== '' ) ) {
            actualizarError( true );
            return;
        }

        actualizarError( false );

        // Generando un id a la cita
        cita.id = uuidv4();

        // Agregando la cita al listado de citas
        crearCita( cita );

        // Reiniciar Formulario
        actualizarCita({
            propietario : '',
            sintomas    : '',
            mascota     : '',
            fecha       : '',
            hora        : ''
        })
    }


    return (
        <>
            <h2>Crear Cita</h2>

            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null }

            <form
                onSubmit={ submitCita }
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    value={ mascota }
                    onChange={ actualizarState }
                />

                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la Mascota"
                    value={ propietario }
                    onChange={ actualizarState }
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    value={ fecha }
                    onChange={ actualizarState }
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    value={ hora }
                    onChange={ actualizarState }
                />

                <label>Síntomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    value={ sintomas }
                    onChange={ actualizarState }
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </>
    );
}

Formulario.protoTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;