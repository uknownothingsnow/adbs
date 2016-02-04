var chalk = require('chalk');
var inquirer = require("inquirer");
var child_process = require('child_process');
var adbOutput = child_process.execSync('adb devices');
var outputStr = adbOutput.toString();

if (outputStr.indexOf('List of devices attached') == 0) {
  var lines = outputStr.split('\n');
  var devices = lines.slice(1);
  if (!!devices.length) {
    console.log(chalk.red('No device connected!'));
  } else {
    prompt(devices);
  }
} else {
  console.log('adb run with some error');
}

function prompt(devices) {
  inquirer.prompt([
    {
      type: "list",
      name: "theme",
      message: "Please choice one device",
      choices: devices
    }
  ], function(answers) {
      console.log( JSON.stringify(answers, null, "  ") );
    });
}
