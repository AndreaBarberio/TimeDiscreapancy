import React from 'react';

interface TimeComparisonProps {
	apiTime: string;
	localTime: string;
	timeDiscrepancy: number;
}

const TimeComparison: React.FC<TimeComparisonProps> = ({
	apiTime,
	localTime,
	timeDiscrepancy,
}) => {
	return (
		<div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto mt-8">
			<h2 className="text-2xl font-semibold mb-4">Time Comparison Results</h2>
			<p className="mb-2">
				<span className="font-semibold">API Time:</span> {apiTime}
			</p>
			<p className="mb-2">
				<span className="font-semibold">Local Time:</span> {localTime}
			</p>
			<p>
				<span className="font-semibold">Time Discrepancy:</span>{' '}
				{timeDiscrepancy} seconds
			</p>
		</div>
	);
};

export default TimeComparison;
