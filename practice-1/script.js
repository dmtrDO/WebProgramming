
const calculateBtn = document.getElementById('calculateBtn');
const HpInput = document.getElementById('Hp');
const CpInput = document.getElementById('Cp');
const SpInput = document.getElementById('Sp');
const NpInput = document.getElementById('Np');
const OpInput = document.getElementById('Op');
const WpInput = document.getElementById('Wp');
const ApInput = document.getElementById('Ap');

const dryMassDiv = document.getElementById('dryMass');
const combustibleMassDiv = document.getElementById('combustibleMass');
const heatValueDiv = document.getElementById('heatValue');

calculateBtn.addEventListener('click', function() {
    const Hp = parseFloat(HpInput.value) || 0;
    const Cp = parseFloat(CpInput.value) || 0;
    const Sp = parseFloat(SpInput.value) || 0;
    const Np = parseFloat(NpInput.value) || 0;
    const Op = parseFloat(OpInput.value) || 0;
    const Wp = parseFloat(WpInput.value) || 0;
    const Ap = parseFloat(ApInput.value) || 0;

    // Перевірка валідності вхідних даних
    const sumComponents = Hp + Cp + Sp + Np + Op + Wp + Ap;
    if (Math.abs(sumComponents - 100) > 0.01) {
        alert(`Сума всіх компонентів має дорівнювати 100%.\nУ вас сума вийшла:\n${Hp} + ${Cp} + ${Sp} + ${Np} + ${Op} + ${Wp} + ${Ap} = ${sumComponents}`);
        return;
    }

    // Розрахунок коефіцієнтів
    const kРС = 100 / (100 - Wp);
    const kРГ = 100 / (100 - Wp - Ap);

    // Розрахунок сухої маси
    const Hc = Hp * kРС;
    const Cc = Cp * kРС;
    const Sc = Sp * kРС;
    const Nc = Np * kРС;
    const Oc = Op * kРС;
    const Ac = Ap * kРС;

    dryMassDiv.innerHTML = `<strong>Склад сухої маси:</strong><br>
                             H: ${Hc.toFixed(2)}%<br>
                             C: ${Cc.toFixed(2)}%<br>
                             S: ${Sc.toFixed(2)}%<br>
                             N: ${Nc.toFixed(2)}%<br>
                             O: ${Oc.toFixed(2)}%<br>
                             A: ${Ac.toFixed(2)}%`;

    // Розрахунок горючої маси
    const Hf = Hp * kРГ;
    const Cf = Cp * kРГ;
    const Sf = Sp * kРГ;
    const Nf = Np * kРГ;
    const Of = Op * kРГ;

    combustibleMassDiv.innerHTML = `<strong>Склад горючої маси:</strong><br>
                                     H: ${Hf.toFixed(2)}%<br>
                                     C: ${Cf.toFixed(2)}%<br>
                                     S: ${Sf.toFixed(2)}%<br>
                                     N: ${Nf.toFixed(2)}%<br>
                                     O: ${Of.toFixed(2)}%`;

    // Розрахунок нижчої теплоти згоряння (за формулою Мендєлєєва)
    const QPH = (339 * Cp + 1030 * Hp - 108.8 * (Op - Sp) - 25 * Wp) / 1000;

    // РоРозрахунок нижчої теплоти згоряння для сухої маси
    const QCH = (QPH + 0.025 * Wp) * 100 / (100 - Wp);

    // РоРозрахунок нижчої теплоти згоряння для горючої маси
    const QGH = (QPH + 0.025 * Wp) * 100 / (100 - Wp - Ap);

    heatValueDiv.innerHTML = `<strong>Нижча теплота згоряння (робоча маса):</strong> ${QPH.toFixed(2)} МДж/кг<br><br>
                              <strong>Нижча теплота згоряння (суха маса):</strong> ${QCH.toFixed(2)} МДж/кг<br><br>
                              <strong>Нижча теплота згоряння (горюча маса):</strong> ${QGH.toFixed(2)} МДж/кг`;

});


