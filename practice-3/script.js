
const NUM_OF_TRAPEZOID = 1000;
const o = 0.05;

const button = document.getElementById('btn');
const res1 = document.getElementById('result-1');
const res2 = document.getElementById('result-2');
const err = document.getElementById('err');
const power = document.getElementById('power');
const o1 = document.getElementById('o1');
const o2 = document.getElementById('o2');
const cost = document.getElementById('cost');

function integrateND(a, b, n, o, ma) {
    const h = (b - a) / n;
    let integral = (normalDistribution(a, ma, o) + normalDistribution(b, ma, o)) / 2;
    for (let i = 1; i < n; i++) {
        const x = a + i * h;
        integral += normalDistribution(x, ma, o);
    }
    integral *= h;
    return integral;
}

function normalDistribution(x, a, o) {
    let part1 = 1 / (o * Math.sqrt(2 * Math.PI));
    let part2 = Math.pow(x-a, 2) / (2 * Math.pow(o, 2));
    return part1 * Math.exp(-part2);
}

function calculateProfit(power, o1, o2, cost) {
    let value1 = 0, value2 = 0;
    power *= 1e6;
    o1 *= 1e6;
    o2 *= 1e6;
    ow1 = integrateND(power - power * o, power + power * o, NUM_OF_TRAPEZOID, o1, power);
    w1 = power * 24 * ow1;
    profit1 = w1 * cost;
    w2 = power * 24 * (1 - ow1);
    penalty1 = w2 * cost;
    value1 = (profit1 - penalty1) / 1e6;
    ow2 = integrateND(power - power * o, power + power * o, NUM_OF_TRAPEZOID, o2, power);
    w3 = power * 24 * ow2;
    profit2 = w3 * cost;
    w4 = power * 24 * (1 - ow2);
    penalty2 = w4 * cost;
    value2 = (profit2 - penalty2) / 1e6;
    return [value1.toFixed(1), value2.toFixed(1)];
}

button.addEventListener("click", function() {
    if (power.value == '' || o1.value == '' || o2.value == '' || cost.value == '') {
        err.innerHTML = 'Перевірте, чи заповнили ви усі поля !';
        res1.innerHTML = '0';
        res2.innerHTML = '0';
    } else if (isNaN(power.value) || isNaN(o1.value) || isNaN(o2.value) || isNaN(cost.value)) {
        res1.innerHTML = '0';
        res2.innerHTML = '0';
        err.innerHTML = 'Перевірте введені значення: усі значення мають бути\
                числами (якщо число дробове, то вводити потрібно через крапку) !';
    } else if (power.value < 0 || o1.value < 0 || o2.value < 0 || cost.value < 0) {
        res1.innerHTML = '0';
        res2.innerHTML = '0';
        err.innerHTML = 'Усі числа повинні бути невід\'ємними !';
    } else {
        err.innerHTML = '';
        values = calculateProfit(power.value, o1.value, o2.value, cost.value);
        res1.innerHTML = `${values[0]}`;
        res2.innerHTML = `${values[1]}`;
    }
})



