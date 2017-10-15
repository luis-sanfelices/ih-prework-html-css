var grid = [
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
];

var Rover1 = {
  position: [0, 0],
  direction: 'N',
  name: 'Destroyer'
};
var Rover2 = {
  position: [5, 1],
  direction: 'N',
  name: 'Healer'
};

var Rover1Movements = 'fflrrfflerflb';
var Rover2Movements = 'bbllbfffleerf';

function checkInitialPosition(rover1, rover2) {
  if (rover1.position == rover2.position) {
    console.log("You can't place the two rovers in the same place");
    return 'nok';
  } else if (grid[rover1.position[0]][rover1.position[1]] || grid[rover2.position[0]][rover2.position[1]]) {
    console.log("You can't place the rover where there is an obstacle");
    return 'nok';
  } else {
    return 'ok';
  }
}

function goForward(rover) {
  var nextPosition = [0, 0];
  nextPosition[0] = rover.position[0];
  nextPosition[1] = rover.position[1];
  switch (rover.direction) {
    case 'N':
      nextPosition[0]++;
      break;
    case 'E':
      nextPosition[1]++;
      break;
    case 'S':
      nextPosition[0]--;
      break;
    case 'W':
      nextPosition[1]--;
      break;
  }
  if (checkNextPosition(nextPosition)) {
    rover.position = checkNextPosition(nextPosition);
    console.log('New ' + rover.name + ' Position: [' + rover.position[0] + ', ' + rover.position[1] + ']');
    return 'ok';
  } else {
    return 'nok';
  }
}

function goBack(rover) {
  var nextPosition = [0, 0];
  nextPosition[0] = rover.position[0];
  nextPosition[1] = rover.position[1];
  switch (rover.direction) {
    case 'N':
      nextPosition[0]--;
      break;
    case 'E':
      nextPosition[1]--;
      break;
    case 'S':
      nextPosition[0]++;
      break;
    case 'W':
      nextPosition[1]++;
      break;
  }
  if (checkNextPosition(nextPosition)) {
    rover.position = checkNextPosition(nextPosition);
    console.log('New ' + rover.name + ' Position: [' + rover.position[0] + ', ' + rover.position[1] + ']');
    return 'ok';
  } else {
    return 'nok';
  }
}

function turnLeft(rover) {
  switch (rover.direction) {
    case 'N':
      rover.direction = 'W';
      break;
    case 'E':
      rover.direction = 'N';
      break;
    case 'S':
      rover.direction = 'E';
      break;
    case 'W':
      rover.direction = 'S';
      break;
  }
}

function turnRight(rover) {
  switch (rover.direction) {
    case 'N':
      rover.direction = 'E';
      break;
    case 'E':
      rover.direction = 'S';
      break;
    case 'S':
      rover.direction = 'W';
      break;
    case 'W':
      rover.direction = 'N';
      break;
  }
}

function checkNextPosition(position) {
  debugger;
  if (grid[position[0]][position[1]] == 1) {
    console.log('There is an obstacle in the position: [' + position[0] + ', ' + position[1] + "], I can't continue");
  } else if (Rover1.position == position || Rover2.position == position) {
    console.log("There is another rover in the same place, I can't continue");
  } else if (position[0] > 10) {
    position[0] = 0;
    return position;
  } else if (position[1] > 10) {
    position[1] = 0;
    return position;
  } else if (position[0] < 0) {
    position[0] = 10;
    return position;
  } else if (position[1] < 0) {
    position[1] = 10;
    return position;
  } else {
    return position;
  }
}

function moveRover(movements, rover) {
  for (var i = 0; i < movements.length; i++) {
    if (movements.charAt(i) === 'f') {
      if (goForward(rover) === 'nok') {
        break;
      }
    } else if (movements.charAt(i) === 'b') {
      if (goBack(rover) === 'nok') {
        break;
      }
    } else if (movements.charAt(i) === 'l') {
      if (turnLeft(rover) === 'nok') {
        break;
      }
    } else if (movements.charAt(i) === 'r') {
      if (turnRight(rover) === 'nok') {
        break;
      }
    } else {
      console.log('invalid instruction');
    }
  }
}
debugger;
console.log(grid);
console.log('Rover1 initial position: [' + Rover1.position[0] + ', ' + Rover1.position[1] + ']');
console.log('Rover2 initial position: [' + Rover2.position[0] + ', ' + Rover2.position[1] + ']');
if (checkInitialPosition(Rover1, Rover2) === 'ok') {
  debugger;
  moveRover(Rover1Movements, Rover1);
  moveRover(Rover2Movements, Rover2);
}
