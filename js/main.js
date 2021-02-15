const calculateButton = document.querySelector('#calculate');

calculateButton.addEventListener('click', function (e) {
    e.preventDefault();
    const amountInput = document.querySelector('#principal');
    const interestInput = document.querySelector('#interest');
    const daysInput = document.querySelector('#days');
    const output = document.querySelector('#output')
    const details = document.querySelector('#details')

    const amount = amountInput.value;
    const APY = interestInput.value;
    const days = daysInput.value;

    let interestRate = (((APY / 100) + 1) ** (1 / 365) - 1) * 365 * 100;
    interestRate = new Decimal(interestRate).toDecimalPlaces(2)

    let result = ((1 + (interestRate / 100) / 365) ** days - 1) * amount;
    result = new Decimal(result).toDecimalPlaces(2);

    details.innerHTML = `((1 + (${interestRate} / 100 / ${365}) ** ${days} - 1) * ${amount}`;
    output.innerHTML = `${result}`;
});
