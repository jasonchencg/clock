let idxCirc = document.querySelector('.index-circle');
let amRadi = document.querySelector('.am').offsetWidth;
let pmRadi = document.querySelector('.pm').offsetWidth;
let handHr = document.querySelector('.hand-hr');
let handMin = document.querySelector('.hand-min');
let handSec = document.querySelector('.hand-sec');
let idxCircRadi = idxCirc.offsetWidth/2;
let dotCol = '#ffffff';
let round = 0;
let getTime =  () => {
    let d = new Date();
    let h = d.getHours() % 12;
    let m = d.getMinutes();
    let s = d.getSeconds();
    console.log(s);
    let AngS = ((s + 1)/30 + 2 * round) * Math.PI;
    let AngM = (m/30 + s/1800 + 2 * round) * Math.PI;
    let AngH = (h/6 + m/360 + s/21600 + 2 * round) * Math.PI;
    handSec.style.transform = `rotate(${AngS}rad)`;
    handMin.style.transform = `rotate(${AngM}rad)`;
    handHr.style.transform = `rotate(${AngH}rad)`;
    if(s == 59){
        round ++;
    };
};
setInterval('getTime()', 1000);
for(i=0; i<24; i++){
    if(i % 2){
            let ang = i * Math.PI/12;
            let scaleEl = document.createElement('div');
            scaleEl.classList.add('index');
            scaleEl.style.cssText = `transform : rotate(${ang}rad);
                top : ${idxCircRadi - (idxCircRadi + 5) * Math.cos(ang)}px;
                left : ${idxCircRadi + (idxCircRadi + 5) * Math.sin(ang)}px;`;
            scaleEl.innerHTML = `<div class="star">
                <div class="shadow tl"></div>
                <div class="shadow tr"></div>
                <div class="shadow bl"></div>
                <div class="shadow br"></div>
            </div>`;
            idxCirc.appendChild(scaleEl);
    }
};
for(i=0; i<60; i++){
    let ang = ((i + 5) * Math.PI)/30;
    let scaleEl = document.createElement('div');
    switch(i % 5){
        case 0 : 
            let amEl = document.createElement('div');
            let pmEl = document.createElement('div');
            amEl.classList.add('hour');
            pmEl.classList.add('hour');
            scaleEl.classList.add('index');
            amEl.style.cssText = `top : ${idxCircRadi - amRadi * Math.cos(ang)}px;
                left : ${idxCircRadi + amRadi * Math.sin(ang)}px`;
            pmEl.style.cssText = `top : ${idxCircRadi - pmRadi * Math.cos(ang)}px;
                left : ${idxCircRadi + pmRadi * Math.sin(ang)}px`;
            scaleEl.style.cssText = `transform : rotate(${ang}rad);
                top : ${idxCircRadi * (1 - Math.cos(ang))}px;
                left : ${idxCircRadi * (1 + Math.sin(ang))}px;`;
            amEl.innerHTML = `<em class="hour-num">${i/5 + 1}<em>`;
            pmEl.innerHTML = `<em class="hour-num">${i/5 + 13}<em>`;
            scaleEl.innerHTML = `<div class="bar"></div>`;
            idxCirc.appendChild(amEl);
            idxCirc.appendChild(pmEl);
            idxCirc.appendChild(scaleEl);
            break;
        default :
            scaleEl.classList.add('dot');
            scaleEl.style.cssText = `position: absolute;
                top : ${idxCircRadi * (1 - Math.cos(ang)) - 1}px;
                left : ${idxCircRadi * (1 + Math.sin(ang)) - 1}px;`;
            idxCirc.appendChild(scaleEl);
            break;
    }
};

