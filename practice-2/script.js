
const oilFuelCoeff = Math.pow(10, -6) * 0.57 * 39.48;
const coalCoeff = Math.pow(10, -6) * 150 * 20.47;

const button = document.getElementById('button');
const inputCoal = document.getElementById('coal');
const inputOilFuel = document.getElementById('oil-fuel');
const coalResult = document.getElementById('coal-result');
const oilFuelResult = document.getElementById('oil-fuel-result');
const error = document.getElementById('err');

button.addEventListener('click', function(e) {
    coalValue = inputCoal.value;
    oilFuelValue = inputOilFuel.value;

    if (isNaN(coalValue) || coalValue == '') {
        coalResult.innerHTML = `0`;
        oilFuelResult.innerHTML = `0`;
        error.innerHTML = `Помилка: введене значення для вугілля не є числовим ! Якщо число дробове, то вводити через крапку !`;
    } else if (isNaN(oilFuelValue) || oilFuelValue == '') {
        coalResult.innerHTML = `0`;
        oilFuelResult.innerHTML = `0`;
        error.innerHTML = `Помилка: введене значення для мазуту не є числовим ! Якщо число дробове, то вводити через крапку !`;
    } else {
        error.innerHTML = ``;
        coalResult.innerHTML = `${(coalCoeff * coalValue).toFixed(2)}`;
        oilFuelResult.innerHTML = `${(oilFuelCoeff * oilFuelValue).toFixed(2)}`;
    }

})


