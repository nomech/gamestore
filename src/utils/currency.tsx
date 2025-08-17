export const formatCurrency = (amount: number, currency: string = 'NOK'): string => {
	const normalizedAmount = parseInt(amount.toString(), 10) / 100;

	const formatter = new Intl.NumberFormat('no-NB', {
		style: 'currency',
		currency: currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return formatter.format(normalizedAmount);
};
