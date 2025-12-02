export interface Iinvestment {
  initialInvestment: number;
  annualInvestment: number;
  expectedReturn: number;
  duration: number;
}

export function Investment({
  initialInvestment,
  annualInvestment,
  expectedReturn,
  duration,
}: Iinvestment) {
  const annualData = [];
  let investmentValue = initialInvestment;
  let totalInterest = 0;

  for (let i = 0; i < duration; i++) {
    const interestEarnedInYear = investmentValue * (expectedReturn / 100);

    totalInterest += interestEarnedInYear; // <-- acumulamos interés total
    investmentValue += interestEarnedInYear + annualInvestment;

    annualData.push({
      year: i + 1,
      interest: interestEarnedInYear,
      valueEndOfYear: investmentValue,
      totalInterest: totalInterest,
      annualInvestment: annualInvestment,
    });
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>

      <tbody>
        {annualData.map((element) => (
          <tr key={element.year}>
            <td>{element.year}</td>
            <td>
              {element.valueEndOfYear.toLocaleString("es-ES", {
                maximumFractionDigits: 2,
              })}
            </td>
            <td>
              {element.interest.toLocaleString("es-ES", {
                maximumFractionDigits: 2,
              })}
            </td>
            <td>
              {element.totalInterest.toLocaleString("es-ES", {
                maximumFractionDigits: 2,
              })}
            </td>
            <td>
              {element.annualInvestment.toLocaleString("es-ES", {
                maximumFractionDigits: 2,
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
