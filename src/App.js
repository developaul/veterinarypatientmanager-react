import React, { useEffect, useState } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

	// Obteniendo Citas del localStorage
	const citasIniciales = JSON.parse( localStorage.getItem( 'citas' ) ) || [];
	
	// State de Citas
	const [ citas, guardarCitas ] = useState( citasIniciales );
	
	// State de citas, escucha a los cambios del arreglo de citas
	useEffect( () => {
		const citasIniciales = JSON.parse( localStorage.getItem( 'citas' ) ) || [];

		localStorage.setItem( 'citas', JSON.stringify(  ( citasIniciales ) ? citas : [] ) );
	}, [ citas ] );

	// Agrega una nueva cita al state de citas
	const crearCita = cita => guardarCitas([
		...citas,
		cita
	]);	

	// Elimina una cita por su id
	const eliminarCita = id => {
		const nuevasCitas = citas.filter( cita => cita.id !== id );
		guardarCitas( nuevasCitas );
	}

	// Mensaje condicional
	const titulo = ( citas.length === 0 ) ? 'No hay citas' : 'Administra tus citas';

	return (
		<>
			<h1>Administrador de Pacientes</h1>

			<div className="container">
				<div className="row">
					<div className="one-half column">
						<Formulario
							crearCita={ crearCita }
						/>
					</div>
					<div className="one-half column">
						<h2>{ titulo }</h2>

						{
							citas.map( cita => (
								<Cita
									key={ cita.id }
									cita={ cita }
									eliminarCita={ eliminarCita }
								/>
							))
						}
					</div>
				</div>
			</div>
		</>
	);
}

export default App;