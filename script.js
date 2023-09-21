// model
let app = document.getElementById('app')
let model = {
    'playerWaffles': 0,
    'totalWafflesEarned': 0,
    'cursorStrength': 1,
    'income': 0,
    'incomePerSec': 0,
    'upgrades': [
        autoClicker = {
            'autoAmount': 0,
            'autoPrice': 10,
            'autoStrength': 1,
        },
        autoGrandma = {
            'autoAmount': 0,
            'autoPrice': 100,
            'autoStrength': 10,
        },
        autoFarm = {
            'autoAmount': 0,
            'autoPrice': 1000,
            'autoStrength': 100,
        },
        autoWin = {
            'autoAmount': 0,
            'autoPrice': 0,
            'autoStrength': 100000,
        },
    ],
    'passiveBuffs': [
        autoClicker = [
            strengthMulitiplier1 = {
                'amountCriteria': 25,
                'unlocked': false,
                'buff': 2,
            },
            strengthMulitiplier2 = {
                'amountCriteria': 50,
                'unlocked': false,
                'buff': 2,
            },
        ],
        autoGrandma = [
            strengthMulitiplier1 = {
                'amountCriteria': 25,
                'unlocked': false,
                'buff': 2,
            },
            strengthMulitiplier2 = {
                'amountCriteria': 50,
                'unlocked': false,
                'buff': 2,
            },
        ],
        autoFarm = [
            strengthMulitiplier1 = {
                'amountCriteria': 25,
                'unlocked': false,
                'buff': 2,
            },
            strengthMulitiplier2 = {
                'amountCriteria': 50,
                'unlocked': false,
                'buff': 2,
            },
        ],
    ],
    'buffs': {

    }
}

// view
init();
function updateView() {
    app.innerHTML = /*HTML*/`
    <div id="stats">
        <div>All time Waffles:${model.totalWafflesEarned.toFixed(1)}</div>
        <div>Current Waffles:${model.playerWaffles.toFixed(1)}</div>
        <div>Waffles per second:${model.incomePerSec.toFixed(1)}</div>
    </div>
    <div id="waffle" onclick="clicker()"><img src="img/waffle.png" alt=""/></div>
    <div id="buffs">Buffs</div>
    <div id="upgrades">
        <div onclick="buyUpgrade(0)"><img src="img/cursor.png" alt=""/>${model.upgrades[0].autoAmount}</div>
        <div onclick="buyUpgrade(0)"> Cost: ${model.upgrades[0].autoPrice}</div>
        <div onclick="buyUpgrade(1)"><img src="img/grandma.png" alt=""/>${model.upgrades[1].autoAmount}</div>
        <div onclick="buyUpgrade(1)">Cost: ${model.upgrades[1].autoPrice}</div>
        <div onclick="buyUpgrade(2)"><img src="img/farm.png" alt=""/>${model.upgrades[2].autoAmount}</div>
        <div onclick="buyUpgrade(2)">Cost: ${model.upgrades[2].autoPrice}</div>
        <div onclick="buyUpgrade(3)"><img src="" alt=""/>${model.upgrades[3].autoAmount}</div>
        <div onclick="buyUpgrade(3)">Cost: ${model.upgrades[3].autoPrice}</div>
    </div>
`;
}

// controller
function init() {
    setInterval(game, 500);
    updateView();
}

function game() {
    checkUnlocks();
    gameUpgrades();
    updateView();
}

function gameUpgrades() {
    model.income = 0;
    for (index in model.upgrades) {
        model.income += model.upgrades[index].autoAmount * model.upgrades[index].autoStrength / 2;
    }
    model.playerWaffles += model.income;
    model.totalWafflesEarned += model.income;
    model.incomePerSec = model.income * 2;
}

function clicker() {
    model.playerWaffles += model.cursorStrength;
    model.totalWafflesEarned += model.cursorStrength;
    updateView();
}

function buyUpgrade(upgradeType) {
    let upgrade = model.upgrades[upgradeType];
    if (model.playerWaffles >= upgrade.autoPrice) {
        model.playerWaffles -= upgrade.autoPrice;
        upgrade.autoAmount++;
        upgrade.autoPrice = Math.floor((upgrade.autoPrice / 2) * Math.exp(1));
    }
    updateView();
}

function checkUnlocks() {
    for (buff in model.passiveBuffs) {
        for (tier in model.passiveBuffs[buff]) {
            const upgradeBuff = model.upgrades[buff];
            const upgradeBuffTier = model.passiveBuffs[buff][tier];
            if (upgradeBuff.autoAmount >= upgradeBuffTier.amountCriteria && upgradeBuffTier.unlocked == false) {
                upgradeBuff.autoStrength *= upgradeBuffTier.buff;
                upgradeBuffTier.unlocked = true;
            }
        }
    }
}