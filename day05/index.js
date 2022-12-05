const fs = require('fs')

function inputDataLines (filename = 'input.txt') {
  return fs.readFileSync(filename).toString().trim().split('\n')
}

function parseDataLine(line) {
  // line looks like: move 1 from 2 to 1
  const splitted = line.split(' ')
  return {
    noof: parseInt(splitted[1]),
    from: parseInt(splitted[3]),
    to: parseInt(splitted[5])
  }
}

/*
[J]             [F] [M]            
[Z] [F]     [G] [Q] [F]            
[G] [P]     [H] [Z] [S] [Q]        
[V] [W] [Z] [P] [D] [G] [P]        
[T] [D] [S] [Z] [N] [W] [B] [N]    
[D] [M] [R] [J] [J] [P] [V] [P] [J]
[B] [R] [C] [T] [C] [V] [C] [B] [P]
[N] [S] [V] [R] [T] [N] [G] [Z] [W]
 1   2   3   4   5   6   7   8   9 
*/
const stacks = [
  ['N', 'B', 'D', 'T', 'V', 'G', 'Z', 'J'],
  ['S', 'R', 'M', 'D', 'W', 'P', 'F'],
  ['V', 'C', 'R', 'S', 'Z'],
  ['R', 'T', 'J', 'Z', 'P', 'H', 'G'],
  ['T', 'C', 'J', 'N', 'D', 'Z', 'Q', 'F'],
  ['N', 'V', 'P', 'W', 'G', 'S', 'F', 'M'],
  ['G', 'C', 'V', 'B', 'P', 'Q'],
  ['Z', 'B', 'P', 'N'],
  ['W', 'P', 'J'],
]

function getTopCrates() {
  let result = ''

  stacks.forEach(stack => {
    result += stack[stack.length-1]
  })

  return result
}

function executeCrateMover9001(move) {

  const toMove = []
  for (let i = 0; i < move.noof; i++) {
    toMove.push(stacks[move.from-1].pop())
  }
  
  const toCrate = stacks[move.to-1]
  stacks[move.to-1] = toCrate.concat(toMove.reverse())
}

function executeCrateMover9000(move) {
  for (i=0; i < move.noof; i++) {
    const fromCrate = stacks[move.from-1]
    const toCrate = stacks[move.to-1]
    toCrate.push(fromCrate.pop())
  }
}

function getSolutionPart1 () {
  const moves = inputDataLines()

  moves.forEach(move => {
    const instruction = parseDataLine(move)
    executeCrateMover9000(instruction)
  })
  
  return getTopCrates()
}


function getSolutionPart2 () {
  const moves = inputDataLines()

  moves.forEach(move => {
    const instruction = parseDataLine(move)
    executeCrateMover9001(instruction)
  })
  
  return getTopCrates()
}

// part1 GFTNRBZPF
// part2 VRQWPDSGP

const part = process.env.part || 'part1'
if (part === 'part1') { console.log(getSolutionPart1()) } else { console.log(getSolutionPart2()) }

module.exports = {
  getSolutionPart1, getSolutionPart2, inputDataLines
}
