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
		<div>
			<h2>Time Comparison Results</h2>
			<p>API Time: {apiTime}</p>
			<p>Local Time: {localTime}</p>
			<p>Time Discrepancy: {timeDiscrepancy} seconds</p>
		</div>
	);
};

export default TimeComparison;
