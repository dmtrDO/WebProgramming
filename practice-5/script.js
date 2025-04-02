
const sectionType = "Збірні шини 10 кВ на 1 приєднання";

const sub = {
    "Т-110 кВ": [0.015, 100, 1, 43],
    "Т-35 кВ": [0.02, 80, 1, 28],
    "Т-10 кВ (кабельна мережа 10 кВ)": [0.005, 60, 0.5, 10],
    "Т-10 кВ (повітряна мережа 10 кВ)": [0.05, 60, 0.5, 10],
    "В-110 кВ (елегазовий)": [0.01, 30, 0.1, 30],
    "В-10 кВ (малооливний)": [0.02, 15, 0.33, 15],
    "В-10 кВ (вакуумний)": [0.01, 15, 0.33, 15],
    sectionType: [0.03, 2, 0.167, 5]
};

const lines = {
    "ПЛ-110 кВ": [0.007, 10, 0.167, 35],
    "ПЛ-35 кВ": [0.02, 8, 0.167, 35],
    "ПЛ-10 кВ": [0.02, 10, 0.167, 35],
    "КЛ-10 кВ (траншея)": [0.03, 44, 1, 9],
    "КЛ-10 кВ (кабельний канал)": [0.005, 17.5, 1, 9]
};

const offtype = document.getElementById("offtype");
const etransfer = document.getElementById("etransfer");
const distance = document.getElementById("distance");
const transformType = document.getElementById("transformType");
const inOffType = document.getElementById("inOffType");
const sectionOffType = document.getElementById("sectionOffType");
const numOfConnects = document.getElementById("numOfConnects");
const btnCompare = document.getElementById("btnCompare");
const res11 = document.getElementById("res11");
const res12 = document.getElementById("res12");
const err1 = document.getElementById("err1");

btnCompare.addEventListener('click', function() {
    if (!(offtype.value in sub) || !(etransfer.value in lines) 
        || !(transformType.value in sub) || !(inOffType.value in sub)
        || !(sectionOffType.value in sub)) {
            res11.innerHTML = '0';
            res12.innerHTML = '0';
            err1.innerHTML = 'Ви не вибрали усі елементи ЕПС !';
    } else if (distance.value == '' || numOfConnects.value == '') {
        res11.innerHTML = '0';
        res12.innerHTML = '0';
        err1.innerHTML = 'Ви не заповнили усі поля !';
    } else if (isNaN(distance.value) || isNaN(numOfConnects.value)) {
        res11.innerHTML = '0';
        res12.innerHTML = '0';
        err1.innerHTML = 'Введені значення повинні бути числами \
        (якщо число дробове, то вводити його потрібно через крапку) !';
    } else {
        err1.innerHTML = '';
        try {
            const results = function1(offtype.value, etransfer.value, Number(distance.value), 
                                        transformType.value, inOffType.value,
                                        Number(numOfConnects.value), sectionOffType.value);
            res11.innerHTML = `${results[0]}`;
            res12.innerHTML = `${results[1]}`;
        } catch (err) {
            res11.innerHTML = '0';
            res12.innerHTML = '0';
            err1.innerHTML = `${err.message}`;
        }
    }
})

function function1(offType, etransfer, distance, transform, 
                    inOffType, numOfConnects, sectionOff) {
    if (distance <= 0 || numOfConnects <= 0) 
        throw new TypeError("Введені значення повинні бути більшими за нуль !");
    const woc = sub[offType][0] 
                + lines[etransfer][0] * distance 
                + sub[transform][0] 
                + sub[inOffType][0]
                + sub.sectionType[0] * numOfConnects;
    const sumtw = sub[offType][0] * sub[offType][1] 
                    + lines[etransfer][0] * distance * lines[etransfer][1]
                    + sub[transform][0] * sub[transform][1] 
                    + sub[inOffType][0] * sub[inOffType][1] 
                    + sub.sectionType[0] * numOfConnects * sub.sectionType[1];
    const tvoc = sumtw / woc;
    const kaoc = woc * tvoc / 8760;
    const kpmax = Math.max(
        sub[offType][2] * sub[offType][3],
        lines[etransfer][2] * lines[etransfer][3],
        sub[transform][2] * sub[transform][3],
        sub[inOffType][2] * sub[inOffType][3],
        sub.sectionType[2] * sub.sectionType[3]
    );
    const kpoc = 1.2 / 8760 * kpmax;
    const wdk = (kaoc + kpoc) * woc * 2;
    const wdc = wdk + sub[sectionOff][0];
    return [woc.toFixed(4), wdc.toFixed(4)];
}


const u = document.getElementById("u");
const losses1 = document.getElementById("losses1");
const losses2 = document.getElementById("losses2");
const btnCalculate = document.getElementById("btnCalculate");
const res2 = document.getElementById("res2");
const err2 = document.getElementById("err2");

btnCalculate.addEventListener('click', function() {
    if (u.value == '' || losses1.value == '' || losses2.value == '') {
        res2.innerHTML = '0';
        err2.innerHTML = 'Ви не заповнили усі поля !';
    } else if (isNaN(u.value) || isNaN(losses1.value) || isNaN(losses2.value)) {
        res2.innerHTML = '0';
        err2.innerHTML = 'Введені значення повинні бути числами \
        (якщо число дробове, то вводити його потрібно через крапку) !';
    } else {
        err2.innerHTML = '';
        try {
            const result = function2(Number(u.value), Number(losses1.value),
                                     Number(losses2.value));
            res2.innerHTML = `${result}`;
        } catch (err) {
            res2.innerHTML = '0';
            err2.innerHTML = `${err.message}`;
        }
    }
})

function function2(u, losses1, losses2) {
    if (u <= 0 || losses1 <= 0 || losses2 <= 0) 
        throw new TypeError("Введені значення повинні бути більшими за нуль !");
    if (u != 10 && u != 35 && u != 110) 
        throw new TypeError("Можливі значення для напруги: 10, 35, 110");
    const key = (u == 110 ? "Т-110 кВ" : u == 35 ? "Т-35 кВ" :
                             "Т-10 кВ (кабельна мережа 10 кВ)");
    const ma = sub[key][0] * sub[key][1] * 5.12 * 6451;
    const mp = 132400;
    const value = losses1 * ma + losses2 * mp;
    return value.toFixed(0);
}



