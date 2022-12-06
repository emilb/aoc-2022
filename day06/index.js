const fs = require('fs')

function inputDataLines (filename = 'input.txt') {
  return fs.readFileSync(filename).toString().trim().split('\n')
}

const test1 = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'

function isKey(key) {
  const keySet = new Set();
  [...key].forEach(c => {
    keySet.add(c)
  });

  return keySet.size === key.length
}

function getStartOfPacketMarker(datastream, keylength) {
  for (let i = 0; i < datastream.length-keylength; i++) {
    const key = datastream.substring(i, i+keylength)
    if (isKey(key))
      return i + keylength
  }
}

function getSolutionPart1 () {
  const moves = inputDataLines()
  return getStartOfPacketMarker(moves[0], 4)
}

function getSolutionPart2 () {
  const moves = inputDataLines()
  return getStartOfPacketMarker(moves[0], 14)
}

const part = process.env.part || 'part1'
if (part === 'part1') { console.log(getSolutionPart1()) } else { console.log(getSolutionPart2()) }

module.exports = {
  getSolutionPart1, getSolutionPart2, inputDataLines
}
