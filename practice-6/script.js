
let data = [
    { name: "Шліфувальний верстат (1-4)", etaN: 0.92, cosPhi: 0.9, Un: 0.38, n: 4, Pn: '???', Kv: 0.15, tgPhiBase: 1.33, }, 
    { name: "Свердлильний верстат (5-6)", etaN: 0.92, cosPhi: 0.9, Un: 0.38, n: 2, Pn: 14, Kv: 0.12, tgPhiBase: 1.0 },
    { name: "Фугувальний верстат (9-12)", etaN: 0.92, cosPhi: 0.9, Un: 0.38, n: 4, Pn: 42, Kv: 0.15, tgPhiBase: 1.33 },
    { name: "Циркулярна пила (13)",       etaN: 0.92, cosPhi: 0.9, Un: 0.38, n: 1, Pn: 36, Kv: 0.3, tgPhiBase: '???',},
    { name: "Прес (16)",                  etaN: 0.92, cosPhi: 0.9, Un: 0.38, n: 1, Pn: 20, Kv: 0.5, tgPhiBase: 0.75 },
    { name: "Полірувальний верстат (24)", etaN: 0.92, cosPhi: 0.9, Un: 0.38, n: 1, Pn: 40, Kv: '???', tgPhiBase: 1.0 },
    { name: "Фрезерний верстат (26-27)",  etaN: 0.92, cosPhi: 0.9, Un: 0.38, n: 2, Pn: 32, Kv: 0.2, tgPhiBase: 1.0 },
    { name: "Вентилятор (36)",            etaN: 0.92, cosPhi: 0.9, Un: 0.38, n: 1, Pn: 20, Kv: 0.65, tgPhiBase: 0.75 },
];

function calculateAndDisplayResults() {
    let sum1 = 0, sum2 = 0, sum3 = 0, sum4 = 0, sum5 = 0;
    for (let i = 0; i < data.length; i++) {
        sum1 += data[i].n * data[i].Pn * 0.2;
        sum2 += data[i].n * data[i].Pn;
        sum3 += data[i].n * data[i].Pn * data[i].Pn;
    }
    res1.innerHTML = `${(sum1 / sum2).toFixed(1)}`;
    res2.innerHTML = `${(sum2 * sum2 / sum3).toFixed(1)}`;
    res3.innerHTML = `${1.25}`;
    res4.innerHTML = `${(1.25 * sum1).toFixed(2)};`
    for (let i = 0; i < data.length; i++) {
        sum4 +=  data[i].tgPhiBase * data[i].Pn * (sum1 / sum2).toFixed(1);
    }
    res5.innerHTML = `${2.0 * sum4}`;
    res6.innerHTML = `${Math.sqrt(Math.pow(((1.25 * sum1).toFixed(2)), 2) + Math.pow((2.0 * sum4), 2)).toFixed(2)}`;
    res7.innerHTML = `${(2.0 * sum4 / data[0].Un).toFixed(1)}`;
}

const tableBody = document.getElementById("table-body");
data.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.etaN}</td>
        <td>${item.cosPhi}</td>
        <td>${item.Un}</td>
        <td>${item.n}</td>
        <td>${highlight(item.Pn)}</td>
        <td>${highlight(item.Kv)}</td>
        <td>${highlight(item.tgPhiBase)}</td>
    `;
    tableBody.appendChild(row);
});
function highlight(value) {
    return value === "???" ? `<span style="color: red; font-weight: bold;">${value}</span>` : value;
}

const pn = document.getElementById("pn");
const kv = document.getElementById("kv");
const tg = document.getElementById("tg");
const btn = document.getElementById("btn");
const err = document.getElementById("err");
const res1 = document.getElementById("res1");
const res2 = document.getElementById("res2");
const res3 = document.getElementById("res3");
const res4 = document.getElementById("res4");
const res5 = document.getElementById("res5");
const res6 = document.getElementById("res6");
const res7 = document.getElementById("res7");

function reset() {
    res1.innerHTML = '0';
    res2.innerHTML = '0';
    res3.innerHTML = '0';
    res4.innerHTML = '0';
    res5.innerHTML = '0';
    res6.innerHTML = '0';
    res7.innerHTML = '0';
}

btn.addEventListener('click', () => {
    if (pn.value == '' || kv.value == '' || tg.value == '') {
        reset();
        err.innerHTML = 'Ви не ввели усі значення !';
    } else if (isNaN(pn.value) || isNaN(kv.value) || isNaN(tg.value)) {
        reset();
        err.innerHTML = 'Введні значення повинні бути числами (якщо число дробове, то вводити його треба через крапку) !';
    } else if (Number(pn.value) <= 0 || Number(kv.value) <= 0 || Number(tg.value) <= 0) {
        reset();
        err.innerHTML = 'Введені числа повинні бути більшими за нуль !';
    } else {
        err.innerHTML = '';
        data.forEach(item => {
            if (item.Pn === "???") item.Pn = Number(pn.value);
            if (item.Kv === "???") item.Kv = Number(kv.value); 
            if (item.tgPhiBase === "???") item.tgPhiBase = Number(tg.value);
        })
        calculateAndDisplayResults();
    }
})



