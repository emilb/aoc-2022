const fs = require('fs')

function inputDataLines (filename = 'input.txt') {
  return fs.readFileSync(filename).toString().trim().split('\n')
}

const scoreMap = {
  "A X" : 4,
  "A Y" : 8,
  "A Z" : 3,
  "B X" : 1,
  "B Y" : 5,
  "B Z" : 9,
  "C X" : 7,
  "C Y" : 2,
  "C Z" : 6,
}

const realScoreMap = {
  "A A" : 4,
  "A B" : 8,
  "A C" : 3,
  "B A" : 1,
  "B B" : 5,
  "B C" : 9,
  "C A" : 7,
  "C B" : 2,
  "C C" : 6,
}

const transformMap = {
  "A X" : "A C",
  "B X" : "B A",
  "C X" : "C B",
  "A Y" : "A A",
  "B Y" : "B B",
  "C Y" : "C C",
  "A Z" : "A B",
  "B Z" : "B C",
  "C Z" : "C A"
}

function getSolutionPart1 () {

  const games = inputDataLines()

  let sum = 0
  for (let i = 0; i < games.length; i++) {
    const game = games[i]
    sum += scoreMap[game]
  }

  return sum
}

function getSolutionPart2 () {
  const games = inputDataLines()

  let sum = 0
  for (let i = 0; i < games.length; i++) {
    const game = games[i]
    const realGame = transformMap[game]

    sum += realScoreMap[realGame]
  }

  return sum
}

const part = process.env.part || 'part1'
if (part === 'part1') { console.log(getSolutionPart1()) } else { console.log(getSolutionPart2()) }

module.exports = {
  getSolutionPart1, getSolutionPart2, inputDataLines
}
