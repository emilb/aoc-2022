const fs = require('fs')

function inputDataLines (filename = 'input.txt') {
  return fs.readFileSync(filename).toString().trim().split('\n').map(row =>
    {
      const row_split = row.split(' ')
      return {
        cmd: row_split[0],
        value: parseInt(row_split[1])
      }
    })
}



function cycleForward(state) {
  if (state.currentInstruction == null) {
    console.log('No instruction to cycle')
    process.exit(9)
  }

  state.X = state.Xnext

  if (state.currentInstruction.cmd === 'noop') {
    state.currentInstruction = null
  } else if (state.currentInstruction.cmd === 'addx') {
    if (state.subCycle === 1) {
      state.Xnext = state.X + state.currentInstruction.value
      state.subCycle = 0
      state.currentInstruction = null
    } else {
      state.subCycle += 1
    }
  }

  state.cycle += 1
  return state
}

function storeSignalStrength(state) {
  if (state.cycle == 20) {
    state.signalStrengthSum += state.cycle * state.X
  } else if ((state.cycle-20) % 40 == 0) {
    state.signalStrengthSum += state.cycle * state.X
  }

  return state
}

function getSolutionPart1 () {
  const instructions = inputDataLines('input.txt')
  let state = {
    cycle: 0,
    subCycle: 0,
    X: 1,
    Xnext: 1,
    currentInstruction: null,
    signalStrengthSum: 0
  }

  instructions.forEach(instruction => {
    if (state.currentInstruction == null) {
      state.currentInstruction = instruction
    }

    do {
      state = cycleForward(state)
      state = storeSignalStrength(state)
    } while (state.currentInstruction != null);
  });

  state.currentInstruction = { cmd: 'noop'}
  cycleForward(state)
  return state.signalStrengthSum
}


function getSolutionPart2 () {
  const instructions = inputDataLines('input.txt')
  let state = {
    cycle: 0,
    subCycle: 0,
    X: 1,
    Xnext: 1,
    currentInstruction: null,
    signalStrengthSum: 0
  }

  let output = ''
  instructions.forEach(instruction => {
    if (state.currentInstruction == null) {
      state.currentInstruction = instruction
    }

    do {
      state = cycleForward(state)
      pos = (state.cycle-1) % 40
      if (pos >= state.X-1 && pos <= state.X+1) {
        output += '#'
      } else {
        output += '.'
      }
    } while (state.currentInstruction != null);
  });

  let currpos = 0
  let result = ''
  for (i = 40; i <= 240; i = i+40) {
    result += output.substring(currpos, i) + '\n'
    currpos = i
  }
  return result
}

const part = process.env.part || 'part1'
if (part === 'part1') { console.log(getSolutionPart1()) } else { console.log(getSolutionPart2()) }

module.exports = {
  getSolutionPart1, getSolutionPart2, inputDataLines
}
