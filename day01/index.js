const fs = require('fs')

function inputDataLinesIntegers (filename = 'input.txt') {
  return fs.readFileSync(filename).toString().trim().split('\n').map((x) => parseInt(x))
}

function getSolutionPart1 () {

  const calories = inputDataLinesIntegers()

  let highestSum = 0
  let currentSum = 0
  for (let i = 0; i < calories.length; i++) {
    const currentCalorie = calories[i]
    if (isNaN(currentCalorie)) {
      if (currentSum > highestSum) {
        highestSum = currentSum
      }
      currentSum = 0
    } else {
      currentSum += currentCalorie
    }
  }

  return highestSum
}

function getSolutionPart2 () {
  const calories = inputDataLinesIntegers()

  const sumList = []
  let currentSum = 0
  for (let i = 0; i < calories.length; i++) {
    const currentCalorie = calories[i]
    if (isNaN(currentCalorie)) {
      sumList.push(currentSum)
      currentSum = 0
    } else {
      currentSum += currentCalorie
    }
  }

  sumList.sort(function(a, b){return b - a})
  return sumList.slice(0,3).reduce((acc, val) => {
      return acc + val
    }, 0)
}

const part = process.env.part || 'part1'
if (part === 'part1') { console.log(getSolutionPart1()) } else { console.log(getSolutionPart2()) }

module.exports = {
  getSolutionPart1, getSolutionPart2, inputDataLinesIntegers
}
