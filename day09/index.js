const fs = require('fs')

function inputDataLines (filename = 'input.txt') {
  return fs.readFileSync(filename).toString().trim().split('\n').map(row =>
    {
      const row_split = row.split(' ')
      return {
        direction: row_split[0],
        length: parseInt(row_split[1])
      }
    })
}

const TPositions = new Set()
const knots = []

function addPosition(pos) {
  TPositions.add(pos.x + ',' + pos.y)
}

function adjustTail(head, tail) {
  const mDistance = Math.abs(head.x - tail.x) + Math.abs(head.y - tail.y)
  if (mDistance == 2) {
    // x or y?
    if (tail.x != head.x && tail.y != head.y) {
      // do nothing, we're close enough
    } else if (tail.x != head.x) {
      tail.x += tail.x < head.x ? 1 : -1
    } else if (tail.y != head.y) {
      tail.y += tail.y < head.y ? 1 : -1
    }
  }

  if (mDistance > 2) {
    // do diagonal move
    tail.x += head.x - tail.x > 0 ? 1 : -1
    tail.y += head.y - tail.y > 0 ? 1 : -1

  }
}

function doMove(dx, dy, length) {
  for (let i=0; i < length; i++) {
    knots[0].x += dx
    knots[0].y += dy

    for (let p = 0; p < knots.length-1; p++) {
      adjustTail(knots[p], knots[p+1])
    }
    //print()
    addPosition(knots[knots.length-1])
  }
  //console.log("done")
  //print()
}

function print() {
  const s = 27
  let row = ''
  const posH = knots[0]


  for (let y = s-1; y >= 0; y--) {
    const dx = 11
    const dy = 5

    for (let x = 0; x < s; x++) {
      const rx = x - dx
      const ry = y - dy
      if (posH.x == rx && posH.y == ry) {
        row += 'H'
      } else {
        c = '.'
        for (let k = knots.length-1; k > 0; k--) {
          if (knots[k].x == rx && knots[k].y == ry)
            c = k
        }
        row += c
      }
    }
    console.log(row)
    row = ''
  }
  console.log('\n')
}

function executeMoves(moves) {
  moves.forEach(move => {
    let dx, dy = 0
    switch (move.direction) {
      case 'U': 
        dx = 0
        dy = 1
      break

      case 'D': 
        dx = 0
        dy = -1
      break

      case 'R': 
        dx = 1
        dy = 0
      break

      case 'L': 
        dx = -1
        dy = 0
      break
      default: 
        console.log(`Found unknown direction: ${move.direction}`)
    }

    doMove(dx, dy, move.length)
  });
}

function getSolutionPart1 () {
  const movements = inputDataLines('input.txt')
  for (let i = 0; i < 2; i++) {
    knots.push(
      {
        x: 0,
        y: 0
      }
    );
  }

  executeMoves(movements)
  return TPositions.size
}


function getSolutionPart2 () {
  const movements = inputDataLines('input.txt')
  for (let i = 0; i < 10; i++) {
    knots.push(
      {
        x: 0,
        y: 0
      }
    );
  }

  executeMoves(movements)
  return TPositions.size
}

const part = process.env.part || 'part1'
if (part === 'part1') { console.log(getSolutionPart1()) } else { console.log(getSolutionPart2()) }

module.exports = {
  getSolutionPart1, getSolutionPart2, inputDataLines
}
