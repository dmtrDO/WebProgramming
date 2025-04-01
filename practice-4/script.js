
const u1 = document.getElementById('u1');
const i1 = document.getElementById('i1');
const t1 = document.getElementById('t1');
const ui1 = document.getElementById('ui1');
const mt1 = document.getElementById('mt1');
const button1 = document.getElementById('button1');
const res11 = document.getElementById('res11');
const res12 = document.getElementById('res12');
const res13 = document.getElementById('res13');
const res14 = document.getElementById('res14');
const err1 = document.getElementById('err1');

button1.addEventListener('click', function() {
    if (u1.value == '' || i1.value == '' || t1.value == '' || ui1.value == '' || mt1.value == '') {
        res11.innerHTML = '0';
        res12.innerHTML = '0';
        res13.innerHTML = '0';
        res14.innerHTML = '0';
        err1.innerHTML = 'Перевірте, чи заповнили ви усі поля !';
    } else if (isNaN(u1.value) || isNaN(i1.value) || isNaN(t1.value) || isNaN(ui1.value) || isNaN(mt1.value)) {
        res11.innerHTML = '0';
        res12.innerHTML = '0';
        res13.innerHTML = '0';
        res14.innerHTML = '0';
        err1.innerHTML = 'Усі значення мають бути числами (якщо число дробове, то вводити його треба через крапку) !';
    } else {
        err1.innerHTML = '';
        try {
            const results = function1(Number(u1.value), Number(i1.value), Number(t1.value), Number(ui1.value), Number(mt1.value));
            res11.innerHTML = `${results[0]}`; 
            res12.innerHTML = `${results[1]}`;
            res13.innerHTML = `${results[2]}`; 
            res14.innerHTML = `${results[3]}`;
        } catch (err) {
            res11.innerHTML = '0';
            res12.innerHTML = '0';
            res13.innerHTML = '0';
            res14.innerHTML = '0';
            err1.innerHTML = `${err.message}`;
        }
    }
})

function function1(u1, i1, t1, ui1, mt1) {
    if (mt1 < 1000) 
        throw new TypeError("Кількість годин використання максимуму навантаження в рік не може бути меншою за 1000");
    else if (u1 <= 0 || i1 <= 0 || t1 <= 0 || ui1 <=0)
        throw new TypeError("Усі значення повинні бути більшими за нуль !");
    let value1 = 0, value2 = 0, value3 = 0, value4 = 0;
    value1 = (ui1 / 2) / (Math.sqrt(3) * u1);
    value2 = 2 * value1;
    value3 = value1 / (mt1 >= 1000 && mt1 <= 3000 ? 1.6 : mt1 > 3000 && mt1 <= 5000 ? 1.4 : 1.2);
    value4 = (i1 * 1000 * Math.sqrt(t1)) / 92;
    return [value1.toFixed(1), value2.toFixed(1), value3.toFixed(1), value4.toFixed(1)];
}


const u2 = document.getElementById('u2');
const ui2 = document.getElementById('ui2');
const button2 = document.getElementById('button2');
const res2 = document.getElementById('res2');
const err2 = document.getElementById('err2');

button2.addEventListener('click', function() {
    if (u2.value == '' || ui2.value == '') {
        res2.innerHTML = '0';
        err2.innerHTML = 'Перевірте, чи заповнили ви усі поля !';
    } else if (isNaN(u2.value) || isNaN(ui2.value)) {
        res2.innerHTML = '0';
        err2.innerHTML = 'Усі значення мають бути числами (якщо число дробове, то вводити його треба через крапку) !';
    } else {
        err2.innerHTML = '';
        try {
            const result = function2(Number(u2.value), Number(ui2.value));
            res2.innerHTML = `${result}`;
        } catch (err) {
            res2.innerHTML = '0';
            err2.innerHTML = `${err.message}`;
        }
    }
})

function function2(u2, ui2) {
    if (u2 != 6 && u2 != 10 && u2 != 35 && u2 != 110 && u2 != 220)
        throw new TypeError("Допустимі значення для напруги: 6, 10, 35, 110, 220");
    else if (ui2 <= 0)
        throw new TypeError("Напруга повинна бути більшою за нуль !");
    let value = 0;
    const val = u2 == 6 ? 6.3 : u2 == 10 ? 10.5 : u2 == 35 ? 37 : u2 == 110 ? 115 : 230
    const xc = Math.pow(val, 2) / ui2;
    const xt = Math.pow(val, 3) / 630;
    value = val / (Math.sqrt(3) * (xc + xt));
    return value.toFixed(1);
}


const nr31 = document.getElementById('nr31');
const nr32 = document.getElementById('nr32');
const mr31 = document.getElementById('mr31');
const mr32 = document.getElementById('mr32');
const button3 = document.getElementById('button3');
const res3n3 = document.getElementById('res3n3');
const res3n2 = document.getElementById('res3n2');
const res3m3 = document.getElementById('res3m3');
const res3m2 = document.getElementById('res3m2');
const err3 = document.getElementById('err3');

button3.addEventListener('click', function() {
    if (nr31.value == '' || nr32.value == '' || mr31.value == '' || mr32.value == '') {
        res3n3.innerHTML = '0'; 
        res3n2.innerHTML = '0'; 
        res3m3.innerHTML = '0'; 
        res3m2.innerHTML = '0';
        err3.innerHTML = 'Перевірте, чи заповнили ви усі поля !';
    } else if (isNaN(nr31.value) || isNaN(nr32.value) || isNaN(mr31.value) || isNaN(mr32.value)) {
        res3n3.innerHTML = '0'; 
        res3n2.innerHTML = '0'; 
        res3m3.innerHTML = '0'; 
        res3m2.innerHTML = '0';
        err3.innerHTML = 'Усі значення мають бути числами (якщо число дробове, то вводити його треба через крапку) !';
    } else {
        err3.innerHTML = '';
        try {
            const results = function3(Number(nr31.value), Number(nr32.value), Number(mr31.value), Number(mr32.value));
            res3n3.innerHTML = `${results[0]}`; 
            res3n2.innerHTML = `${results[1]}`;
            res3m3.innerHTML = `${results[2]}`; 
            res3m2.innerHTML = `${results[3]}`;
        } catch (err) {
            res3n3.innerHTML = '0'; 
            res3n2.innerHTML = '0'; 
            res3m3.innerHTML = '0'; 
            res3m2.innerHTML = '0';
            err3.innerHTML = `${err.message}`;
        }
    }
})

function function3(nr31, nr32, mr31, mr32) {
    if (nr31 <= 0 || nr32 <= 0 || mr31 <= 0 || mr32 <= 0)
        throw new TypeError("Усі значення повинні бути більшими за нуль !");
    let value1 = 0, value2 = 0, value3 = 0, value4 = 0;
    const xt = 233;
    const rsh = nr31;
    const xsh = nr32 + xt;
    const rshmin = mr31;
    const xshmin = mr32 + xt;
    const kpr = 0.009;
    const rshn = rsh * kpr;
    const xshn = xsh * kpr;
    const zshn = Math.sqrt(rshn * rshn + xshn * xshn);
    const rshnmin = rshmin * kpr;
    const xshnmin = xshmin * kpr;
    const zshnmin = Math.sqrt(rshnmin * rshnmin + xshnmin * xshnmin);
    value1 = 11000 / (Math.sqrt(3) * zshn);
    value2 = value1 * Math.sqrt(3) / 2;
    value3 = 11000 / (Math.sqrt(3) * zshnmin);
    value4 = value3 * Math.sqrt(3) / 2; 
    return [value1.toFixed(1), value2.toFixed(1), value3.toFixed(1), value4.toFixed(1)];
}



