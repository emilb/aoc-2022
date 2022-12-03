const fs = require('fs')

function inputDataLines (filename = 'input.txt') {
  return fs.readFileSync(filename).toString().trim().split('\n')
}

function letterExistsInAll(l, lArr) {
  for (let el of lArr) {
    if (!el.includes(l)) return false
  }
  return true
}

function findCommonLetters(lArr) {
  const common = []
  for (let l of lArr[0]) {
    if (letterExistsInAll(l, lArr) && !common.includes(l)) common.push(l)
  }
  return common
}

function getPrioritiesSum(common) {
  const upperAdj = 38
  const lowerAdj = 96
  return common.map((l) => {
    const code = l.charCodeAt(0)
    if (code > 96) return code - lowerAdj
    return code - upperAdj
  }).reduce( (ack, val) => ack + val, 0)
}

function splitSack(sack) {
  if (sack.length % 2 != 0)
    throw new Error('Sack not even divisible ' + sack)

  const middle = sack.length / 2
  return [sack.substring(0,middle), sack.substring(middle, sack.length)]
}

function getSolutionPart1 () {

  const sacks = inputDataLines()

  return sacks.map( (sack) => {
    const splittedSack = splitSack(sack)
    const common = findCommonLetters(splittedSack)
    return getPrioritiesSum(common)
  }).reduce( (ack, val) => ack + val, 0)
}

function getGroups(sacks, size) {
  let counter = 0
  const groups = []
  let currentGroup = []
  groups.push(currentGroup)

  sacks.forEach( (sack) => {
    if (counter > size-1) {
      currentGroup = []
      currentGroup.push(sack)
      groups.push(currentGroup)
      counter = 1
    } else {
      currentGroup.push(sack)
      counter++
    }
  })

  return groups
}

function getSolutionPart2 () {

  const sacks = inputDataLines()

  return getGroups(sacks, 3).map( (group) => {
    return getPrioritiesSum(findCommonLetters(group))
  }).reduce( (ack, val) => ack + val, 0) 
}


const part = process.env.part || 'part1'
if (part === 'part1') { console.log(getSolutionPart1()) } else { console.log(getSolutionPart2()) }

module.exports = {
  getSolutionPart1, getSolutionPart2, inputDataLines
}
