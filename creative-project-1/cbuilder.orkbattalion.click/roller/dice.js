var dice = {
    sides: 6,
    roll: function () {
        return Math.floor(Math.random() * this.sides) + 1;
    }
}

let hasAssigned = true;
var rollButton = document.getElementById('roll');
var resetButton = document.getElementById('reset');
var strAssign = document.getElementById('str-assign');
var dexAssign = document.getElementById('dex-assign');
var conAssign = document.getElementById('con-assign');
var intAssign = document.getElementById('int-assign');
var wisAssign = document.getElementById('wis-assign');
var chaAssign = document.getElementById('cha-assign');


function displayNumber(number, id) {
    document.getElementById(id).innerHTML = number;
}

function assignClick(id, button) {
    if (hasAssigned){
        return;
    }
    else {
        document.getElementById(id).innerHTML = document.getElementById('total').innerText;
        hasAssigned = true;
        button.disabled = true;
        button.setAttribute('style', 'background-color:grey; color:darkgrey');
        rollButton.setAttribute('style', "background-color: #17C2AC; color: #010887");
    }
    
}
function reset(id, button) {
    button.disabled = false;
    document.getElementById(id).innerHTML = 0;
    button.setAttribute('style', "background-color: #17C2AC; color: #010887");
    rollButton.setAttribute('style', "background-color: #17C2AC; color: #010887");
}
function getStatDescription(stat) {
    const url = "https://www.dnd5eapi.co/api/ability-scores/" + stat
    fetch(url)
        .then(function(response) {
            return response.json();
    })
        .then(function(json) {
            document.getElementById('description').innerHTML = json.desc;
        })
}

rollButton.onclick = function() {
    if(!hasAssigned) { return;}
    hasAssigned = false;
    let total = 0;
    let lowest = 6;
    for(let i=1; i <= 4; ++i) {
        let id = "die" + i;
        let number = dice.roll();
        total += number;
        if (number <= lowest) {
            lowest = number;
        }
        displayNumber(number, id);
    }
    rollButton.setAttribute('style', 'background-color:grey; color:darkgrey');
    document.getElementById('total').innerHTML = (total - lowest);
}
resetButton.onclick = function() {
    reset('str', strAssign);
    reset('dex', dexAssign);
    reset('con', conAssign);
    reset('int', intAssign);
    reset('wis', wisAssign);
    reset('cha', chaAssign);

    for(let i=1; i <= 4; ++i) {
        let id = "die" + i;
        displayNumber(0, id);
    }
    document.getElementById('total').innerHTML = 0;


    hasAssigned = true;
}
strAssign.onclick = function() {
    assignClick('str', strAssign);
}
dexAssign.onclick = function() {
    assignClick('dex', dexAssign);
}
conAssign.onclick = function() {
    assignClick('con', conAssign);
}
intAssign.onclick = function() {
    assignClick('int', intAssign);
}
wisAssign.onclick = function() {
    assignClick('wis', wisAssign);
}
chaAssign.onclick = function() {
    assignClick('cha', chaAssign);
}

document.getElementById('str-stat').addEventListener('click', function() {
    getStatDescription('str');
})
document.getElementById('dex-stat').addEventListener('click', function() {
    getStatDescription('dex');
})
document.getElementById('dex-stat').addEventListener('click', function() {
    getStatDescription('dex');
})
document.getElementById('con-stat').addEventListener('click', function() {
    getStatDescription('con');
})
document.getElementById('int-stat').addEventListener('click', function() {
    getStatDescription('int');
})
document.getElementById('wis-stat').addEventListener('click', function() {
    getStatDescription('wis');
})
document.getElementById('cha-stat').addEventListener('click', function() {
    getStatDescription('cha');
})