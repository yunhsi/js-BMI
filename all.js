let data = JSON.parse(localStorage.getItem("data")) || [];

document.querySelector('.cm').focus();

const btn = document.querySelector('.btn');

const send = document.querySelector('.send');
const list = document.querySelector('.list');
const clear = document.querySelector('.clear');


//資料處理
send.addEventListener('click', dataHandler);
function dataHandler(e) {
    e.preventDefault();
    const cm = document.querySelector('.cm').value;
    const kg = document.querySelector('.kg').value;
    if (isNaN(cm) || isNaN(kg) || cm < 0 || kg < 0) {
        alert('請輸入有效之身高體重');
        return;
    } else if (!cm || !kg) {
        alert('請輸入身高體重')
        return;
    }
    const bmi = Math.round((kg / ((cm / 100) * (cm / 100))) * 100) / 100;
    let color = '';
    let status = '';
    switch (true) {
        case bmi >= 35:
            color = '#FF1200';
            status = '重度肥胖';
            break;
        case bmi >= 30 && bmi < 35:
            color = '#FF6C03';
            status = '中度肥胖';
            break;
        case bmi >= 27 && bmi < 30:
            color = '#FF6C03';
            status = '輕度肥胖';
            break;
        case bmi >= 24 && bmi < 27:
            color = '#FF982D';
            status = '過重';
            break;
        case bmi >= 18.5 && bmi < 24:
            color = '#86D73F';
            status = '正常';
            break;
        case bmi < 18.5:
            color = '#31BAF9';
            status = '過輕';
            break;
    }
    const today = new Date();
    const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    data.unshift({
        cm,
        kg,
        BMI: bmi,
        color,
        status,
        date,
    });
    localStorage.setItem('data', JSON.stringify(data));
    updateResult(data);
    updateList(data);
}

//顯示List
let updateList = (data) => {
    let str = '';
    const len = data.length;
    for (let i = 0; i < len; i++) {
        const item = data[i];
        str += `
            <li class="level" data-num="${i}" style="border-color:${item.color}">
                <span class="interval" style="color:${item.color}">${item.status}</span>
                <span><span class="small">BMI</span>${item.BMI}</span>
                <span><span class="small">Height</span>${item.cm}cm</span>
                <span><span class="small">Weight</span>${item.kg}kg</span>
                <span class="small">${item.date}</span>
                <a href="#" data-index="${i}" class="interval">刪除</a>
            </li>
            `
    }
    list.innerHTML = str;
    if (len !== 0) {
        clear.classList.remove('d-none');
    }else{
        clear.classList.add('d-none');
    }
}
updateList(data);

//切換result樣式
let updateResult = (data) => {
    let str = '';
    const item = data[0];
    str += `
            <div style="color:${item.color}">
                <div class="result">
                    <div class="bmi">
                       <div class="bmi-value">${item.BMI}</div>
                       <h3>BMI</h3>
                    </div>           
                    <div class="loop" style="background-color:${item.color}"><img src="assets/icons_loop.png" alt=""/></div>
                </div>
                <h2 class="result-status">${item.status}</h2>
            </div>
            `
    btn.innerHTML = str;
    const loop = document.querySelector('.loop');
    loop.addEventListener('click', (e) => {
        e.preventDefault();
        let str = `<button class="send">看結果</button>`;
        btn.innerHTML = str;
        const send = document.querySelector('.send');
        send.addEventListener('click', dataHandler);
        document.querySelector('form').reset();
        document.querySelector('.cm').focus();
    });
}

list.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.nodeName !== 'A') { return };
    const index = e.target.dataset.index;
    data.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(data));
    updateList(data);
});

clear.addEventListener('click', (e) => {
    e.preventDefault();
    data = [];
    clear.classList.add('d-none');
    localStorage.setItem('data', JSON.stringify(data));
    updateList(data);
});





