var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[3]);


// fight funtion 
var fight = function (enemyName) {
  while (enemyHealth > 0 && playerHealth > 0) {
    //ask plyer if they'd like to fight or run 
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // If player choses to skip
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      //if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + " has decided to skip the fight. Goodbye!");
        // subtract money from playerMoney for skipping 
        playerMoney = playerMoney - 10;

        break;
      }
    }

    // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemyHealth = enemyHealth - playerAttack;
    console.log(
      playerName + " attacked " + enemyName + " . " + enemyName + " now has " + enemyHealth + " health remaining."
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died");
      break;
    } else {
      window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }


    // remove player's health by subtracting the amount set in the enemyAttack variable
    playerHealth = playerHealth - enemyAttack;
    console.log(
      enemyName + " attacked " + playerName + " . " + playerName + " now has " + playerHealth + " health remaining."
    );


    // check player's health 
    if (playerHealth <= 0) {
      window.alert(playerName + " has died ");
      break;

    } else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }
  }
};


//    // if player choses to fight, then fight 
//    if (promptFight === "fight" || promptFight === "FIGHT") {
//       // if no (false), ask question again by running fight() again
//       else {
//       fight();
//     }
//     // if player did not choose fight or skip in prompt 
//   } else {
//     window.alert("You need to choose a valid option. Try again!");
//   }
// }
// };

// //alert players that they are starting the round
//


// run fight funtion to start game 
for (var i = 0; i < enemyNames.length; i++) {
  if (playerHealth > 0) {
    // let player know what round they are in, remeber that arrays start at 0 so it needs to have + 1 on it 
    window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

    // pick new enemy to fight based on the index of the enemyNames array
    var pickedEnemyName = enemyNames[i];

    // reset enemyHealth before starting new fight
    enemyHealth = 50;

    // use debugger to pause script running and check whats going on at that moment in the code
    // debugger;

    // pass the pickedEnemyName variable's vaule into the fight funtion, where it will assume the value of the enemyName parameter
    fight(pickedEnemyName);
  }
  //if player isn't alive, stop the game
  else {
    window.alert("You have lost your robot in battle! Game Over!");
  }
}