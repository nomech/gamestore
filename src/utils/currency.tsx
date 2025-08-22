export const formatCurrency = (amount: number, currency: string = 'NOK'): string => {
	const normalizedAmount = amount / 100;
	
	const formatter = new Intl.NumberFormat('no-NB', {
		style: 'currency',
		currency: currency,
	});

	return formatter.format(normalizedAmount);
};
