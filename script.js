var xp = 0;
var health = 100;
var gold = 50;
var currentWeapon = 0;
let fighting;
let monsterHelth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const  text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
    {name: "stick", power: 5,},
    {name:"dagger" ,power: 30,},
    {name:"clew hammer" , power: 50, },
    {name: "sword",power: 100,}
]
const monsters = [
    {
      name:"slime",
      level:2,
      health:15
    },
    {
        name:"fanged beast",
        level:8,
        health:60,
    },
    {
        name:"dragon",
        level:20,
        health:300,
    }
]
const locations = [
    {
        name: "town square",
        "button text": ["Go to store","Go to cave","Fight dragon"],
        "button functions": [goStore,goCave,fightdragon],
        text: "you are in the town squre, you see a sign that says\"store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)","Buy weapon (30 gold)","Go to town squre"],
        "button functions": [buyHealth, buyWeapon, goTown],
         text: "you enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime","Fight fanged beast","Go to town squre"],
        "button functions":  [fightSlime, fightBeast, goTown],
        text: "you enter the cave you see some moster"
    },
    {
        name: "fight",
        "button text":["Attack","Dodge","Run"],
        "button functions": [attack,dodge,goTown],
        text: "you are fighting a monster"
    },
    {
        name: "kill monster",
        "button text":["Go to town squre","Go to town squre","Go to town squre"],
        "button functions": [goTown,goTown,goTown],
        text: 'The monster screams "Arg!" as it dies. you gain experiance pionts and find gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?","REPLAY?","REPLAY?"],
        "button functions": [restart,restart,restart],
        text: "You die." 
    },
    {
        name: "lose",
        "button text": ["REPLAY?","REPLAY?","REPLAY?"],
        "button functions": [restart,restart,restart],
        text: "You defeat the dragon! YOU WIN THE GAME!S"
    }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick  = fightdragon;

function update(location) {
    monsterStats.style.display = "none"
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location[ "button functions"][0];
    button2.onclick =  location[ "button functions"][1];
    button3.onclick =  location[ "button functions"][2];
    text.innerText = location.text;
}

function goTown() {
        update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if (gold >= 10) {
      gold -= 10;
      health += 10;
      goldText.innerText = gold;
      healthText.innerText = health;
} else {
    text.innerText = "you do not have enough gold to buy health.";
}
 }

function buyWeapon() {
    if (currentWeapon < weapons.length -1) {
if (gold >= 30) {
    gold -= 30;
    currentWeapon++;
    goldText.innerText = gold;
    let newWeapon = weapons[currentWeapon].name;
    text.innerText = "you now have a " + newWeapon + ".";
    inventory.push(newWeapon);
    text.innerText += " In your inventory you have: " + inventory;
}  else {
    text.innerText = "you do not have enough gold to buy a weapon.";
}
    } else {
        text.innerText = "you already have the most powerful weapon!";
        button2.innerText ="sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "you sold a " + currentWeapon + ".";
        text.innerText = "In your inventory you have:" + inventory;
    } else [
        text.innerText = "Don't sell your only Weapon!"
    ]
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightdragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHelth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText =monsters[fighting].name;
    monsterHealthText.innerText = monsters[fighting].health;
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks."
    text.innerText += " you attack it with your" +  weapons[currentWeapon].name + ".";
     health -= getMonsterAttackValue(monsters[fighting].level);
    monsterHelth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1; 
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHelth;
    if (health <= 0) {
        lose() 
    }else if (monsterHelth <= 0) {
            if (fighting === 2) {
                winGame()
            } else {
                defeatMonster();
            }
        }
    }

function getMonsterAttackValue(level) {
    const hit = (level * 5 ) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return(hit)
}

function dodge() {
    text.innerText = "you dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);   
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose() {
    update(locations[5])
}

function winGame() {
    update(locations[6]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}