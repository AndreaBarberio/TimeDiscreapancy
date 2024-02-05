import TimeComparison from '@/app/components/TimerComparisor';
import { getApiTime } from '@/app/utils/api';
import { useEffect, useRef, useState } from 'react';

const Home: React.FC = () => {
	const [apiTime, setApiTime] = useState<string>('');
	const [localTime, setLocalTime] = useState<string>('');
	const lastApiTimestampRef = useRef<number>(0);
	const [timeDiscrepancy, setTimeDiscrepancy] = useState<string>(
		'0 days 0 hours 0 minutes 0 seconds'
	);

	const fetchData = async () => {
		try {
			// Ottieni la data dall'API
			const apiData = await getApiTime();
			const apiTimestamp = new Date(
				apiData.date + ' ' + apiData.time
			).getTime();

			if (lastApiTimestampRef.current === 0) {
				// Se è la prima volta che vengono ricevuti i dati dall'API, imposta il timestamp iniziale
				lastApiTimestampRef.current = apiTimestamp;
			}

			// Ottieni il tempo reale
			const localTimestamp = new Date().getTime();

			// Calcola la discrepanza utilizzando l'ultimo timestamp dell'API

			// calcoli per non visualizzare la discrepanza in secondi (aumentare la leggibilità)
			const discrepancyInMilliseconds = Math.abs(
				localTimestamp - lastApiTimestampRef.current
			);
			const days = Math.floor(
				discrepancyInMilliseconds / (1000 * 60 * 60 * 24)
			);
			const hours = Math.floor(
				(discrepancyInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor(
				(discrepancyInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
			);
			const seconds = Math.floor(
				(discrepancyInMilliseconds % (1000 * 60)) / 1000
			);

			const discrepancyString = `${days} days ${hours} hours ${minutes} minutes ${seconds}`;

			setApiTime(apiData.time);
			setLocalTime(new Date().toLocaleTimeString());
			setTimeDiscrepancy(discrepancyString);
			lastApiTimestampRef.current = apiTimestamp;
		} catch (error) {
			console.error(error);
		}

		// Richiedi il prossimo aggiornamento alla prossima animazione del frame
		requestAnimationFrame(fetchData);
	};

	// Avvia il primo fetch al montaggio del componente
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="text-center p-8 bg-white rounded shadow-md">
				<h1 className="text-3xl font-bold mb-4">Time Comparison App</h1>
				<TimeComparison
					apiTime={apiTime}
					localTime={localTime}
					//@ts-ignore
					timeDiscrepancy={timeDiscrepancy}
				/>
			</div>
		</div>
	);
};

export default Home;
