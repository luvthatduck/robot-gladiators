// function to generate a random numeric value
var randomNumber = function () {
  var value = Math.floor(Math.random() * 21) + 40;

  return value;
};

// function to set name
var getPlayerName = function() {
  var name = "";
//
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is" + name);
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10, 
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  }, 
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -=7;
    }
    else {
      window.alert("You dont have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack +=6;
      this.money -=7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo trumble",
    attack: randomNumber(10, 14)
  },
];

// run fight funtion to start game 
var startGame = function () {
  //reset player stats
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      // let player know what round they are in, remeber that arrays start at 0 so it needs to have + 1 on it 
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
 
      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyObj = enemyInfo[i];

      // reset enemy.health before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);

      // use debugger to pause script running and check whats going on at that moment in the code
      // debugger;

      // pass the pickedEnemyName variable's vaule into the fight funtion, where it will assume the value of the enemyName parameter
      fight(pickedEnemyObj);
      // if we're not at the last enemy in the array 
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask if player wants to use the shop before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round? ");

        // if yes, take them to the store() funtion 
        if (storeConfirm) {
          shop();
        }
      }
    }
    //if player is not alive, break out of loop to endGame funtion
    else {
      break;
    }
  }
  // after loops ends, player is either out of health or enemies to fight
  endGame();
};

// function to end the entire game
var endGame = function () {
  window.alert("The game has now ended. Let's see how you did!");
  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + " . ");
  } else {
    window.alert("You've lost your robot in battle.");
  }
  //ask the player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

// fight funtion 
var fight = function (enemy) {

  while (enemy.health > 0 && playerInfo.health > 0) {
    //ask plyer if they'd like to fight or run 
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // If player choses to skip
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      //if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip the fight. Goodbye!");
        // subtract money from playerInfo.money for skipping 
        playerInfo.money = Math.max(0, playerInfo.money - 10);

        break;
      }
    }

    // generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name + " attacked " + enemy.name + " . " + enemy.name + " now has " + enemy.health + " health remaining."
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + " has died");
      break;
    } else {
      window.alert(enemy.name + " still has " + enemy.health + " health left.");
    }


    // generate random damage value based on enemy attack power
    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.name + " attacked " + playerInfo.name + " . " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );


    // check player's health 
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + " has died ");
      break;
    } else {
      window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
    }
  }
};





var shop = function () {
  // ask player what they'd like to do 
  var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store. Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice");

  // use switch to carry out action
  switch (shopOptionPrompt) {
    case "REFILL": // new case
    case "refill":
      playerInfo.refillHealth();
      break;
    case "UPGRADE": // new case
    case "upgrade":
      playerInfo.upgradeAttack();
      break;
      
    case "LEAVE": // new case
    case "leave":
      window.alert("Leaving the store.");

      // do nothing, so function will end
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");

      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

//start first game when page loads
startGame();