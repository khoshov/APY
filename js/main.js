const calculateButton = document.querySelector('#calculate');

calculateButton.addEventListener('click', function (e) {
    e.preventDefault();
    const principalInput = document.querySelector('#principal');
    const interestInput = document.querySelector('#interest');
    const daysInput = document.querySelector('#days');
    const output = document.querySelector('#output')
    const details = document.querySelector('#details')

    const principal = new Decimal(principalInput.value);
    const interest = new Decimal(interestInput.value);
    const days = new Decimal(daysInput.value);
    const daysInYear = new Decimal(365);

    const result = ((1 + (interest / principal) / daysInYear) ** days - 1) * principal;
    details.innerHTML = `((1 + (${interest} / ${principal}) / ${daysInYear}) ** ${days} - 1) * 100`;
    output.innerHTML = `${result}`;
});
