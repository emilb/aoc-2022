const fs = require('fs')

function inputDataLines (filename = 'input.txt') {
  return fs.readFileSync(filename).toString().trim().split('\n').map(row =>
    {
      return row.split('').map( x => {
        return parseInt(x)
      })
    })
}

function isVisibleXAxisUp(x, y, forest) {
  const height = forest[y][x]

  for (let xd = x-1; xd >= 0; xd--) {
    if (height <= forest[y][xd])
      return false
  }

  return true
}

function isVisibleXAxisDown(x, y, forest) {
  const height = forest[y][x]

  for (let xd = x+1; xd < forest[y].length; xd++) {
    if (height <= forest[y][xd])
      return false
  }

  return true
}

function isVisibleYAxisLeft(x, y, forest) {
  const height = forest[y][x]

  for (let yd = y-1; yd >= 0; yd--) {
    if (height <= forest[yd][x])
      return false
  }

  return true
}

function isVisibleYAxisRight(x, y, forest) {
  const height = forest[y][x]

  for (let yd = y+1; yd < forest.length; yd++) {
    if (height <= forest[yd][x])
      return false
  }

  return true
}

function isVisible(x, y, forest) {
  if (x == 0 || y == 0 || x == forest[0].length-1 || y == forest.length-1)
    return 1

  if (isVisibleXAxisUp(x, y, forest)) return 1
  if (isVisibleXAxisDown(x, y, forest)) return 1
  if (isVisibleYAxisLeft(x, y, forest)) return 1
  if (isVisibleYAxisRight(x, y, forest)) return 1
  
  return 0
}

function getSolutionPart1 () {
  const forest = inputDataLines('input.txt')
  const visibleMap = forest.map((row, y) => {
    return row.map((val, x) => {
      return isVisible(x, y, forest)
    })
  })
  
  return visibleMap.reduce((ack, row) => {
    return ack + row.reduce((ack, val) => {
      return ack + val
    }, 0)
  }, 0)
}

function getScenicScoreLeft(x, y, forest) {
  const height = forest[y][x]

  for (let xd = x-1; xd >= 0; xd--) {
    if (height <= forest[y][xd])
      return x - xd
  }

  return x
}

function getScenicScoreRight(x, y, forest) {
  const height = forest[y][x]

  for (let xd = x+1; xd < forest[y].length; xd++) {
    if (height <= forest[y][xd])
      return xd - x
  }

  return forest[y].length - x - 1
}

function getScenicScoreUp(x, y, forest) {
  const height = forest[y][x]

  for (let yd = y-1; yd >= 0; yd--) {
    if (height <= forest[yd][x])
      return y - yd
  }

  return y
}

function getScenicScoreDown(x, y, forest) {
  const height = forest[y][x]

  for (let yd = y+1; yd < forest.length; yd++) {
    if (height <= forest[yd][x])
      return yd - y
  }

  return forest.length - y - 1
}

function getScenicScore(x, y, forest) {
  if (x == 0 || y == 0 || x == forest[0].length-1 || y == forest.length-1)
    return 0

  return getScenicScoreUp(x, y, forest) *
    getScenicScoreDown(x, y, forest) *
    getScenicScoreLeft(x, y, forest) *
    getScenicScoreRight(x, y, forest)
}

function getSolutionPart2 () {
  const forest = inputDataLines('input.txt')
  const scenicScoreMap = forest.map((row, y) => {
    return row.map((val, x) => {
      return getScenicScore(x, y, forest)
    })
  })

  return scenicScoreMap.reduce((highest, row) => {
    const rowHighest = row.reduce((rhighest, val) => {
      return val > rhighest ? val : rhighest
    }, highest)
    return highest > rowHighest ? highest : rowHighest 
  }, Number.MIN_SAFE_INTEGER)
}

const part = process.env.part || 'part1'
if (part === 'part1') { console.log(getSolutionPart1()) } else { console.log(getSolutionPart2()) }

module.exports = {
  getSolutionPart1, getSolutionPart2, inputDataLines
}
