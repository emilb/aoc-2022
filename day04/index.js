const fs = require('fs')

function inputDataLines (filename = 'input.txt') {
  return fs.readFileSync(filename).toString().trim().split('\n')
}

function getTuple(pairRaw) {
  const pair = pairRaw.split(',')
  const firstInterval = pair[0].split('-').map( val => parseInt(val))
  const secondInterval = pair[1].split('-').map( val => parseInt(val))

  return [firstInterval, secondInterval]
}

function isOnePairFullyContained(pairTuple) {

  const first = pairTuple[0]
  const second = pairTuple[1]
  const isContained = (first[0] <= second[0] && first[1] >= second[1])
                   || (second[0] <= first[0] && second[1] >= first[1])

  //console.log(`${first}, ${second} contained: ${isContained}`)

  return isContained
}

function isOverlapping(pairTuple) {

  if (isOnePairFullyContained(pairTuple)) return true

  const first = pairTuple[0]
  const second = pairTuple[1]

  // Last element is before first element of other pair
  if (first[1] < second[0] || second[1] < first[0]) return false

  // At least one element is within range of the other pair  
  if (first[0] <= second[0] && first[1] >= second[0]) return true
  if (second[0] <= first[0] && second[1] >= first[0]) return true

  return false
}

function getSolutionPart1 () {
  const assignments = inputDataLines()
  return assignments.map(assignment => isOnePairFullyContained(getTuple(assignment))).reduce( (ack, val) => val ? ack + 1 : ack, 0)
}


function getSolutionPart2 () {
  const assignments = inputDataLines()
  return assignments.map(assignment => isOverlapping(getTuple(assignment))).reduce( (ack, val) => val ? ack + 1 : ack, 0)
}

const part = process.env.part || 'part1'
if (part === 'part1') { console.log(getSolutionPart1()) } else { console.log(getSolutionPart2()) }

module.exports = {
  getSolutionPart1, getSolutionPart2, inputDataLines
}
