'use strict'

const {
  reduce,
  flow,
  flatten,
  toPairs,
  mapValues,
  map,
} = require('lodash/fp')
const comb = require('combinatorics')

const mapWithIndex = map.convert({ 'cap': false })

const criteria = {
  // importance: [ 'high', 'mid', 'low' ],
  // urgency: [ 'vital', 'pressing', 'necessary' ],
  a: ['high', 'low'],
  b: ['high', 'low'],
}


const x = (result, categories, criterion) =>
  categories.length + result
const numberOfAlternatives = reduce(x)(0)(criteria)

// identifying undominated pairs
//‘undominated pair’ is a pair of alternatives where one is characterized by a higher ranked category for at least one criterion and a lower ranked category for at least one other criterion than the other alternative, and hence a judgement is required for the alternatives to be pairwise ranked

// calculate dominated pairs

const y = (categories, criterion) =>
  map((value, index) =>
    ({value,index}))(categories)

const z = ([criterion, categories]) =>
  mapWithIndex((category, index) =>
    // we could remove category from here, and find it again later on based on index
    ({ criterion, category, index })
  )(categories)

const categories = flow(toPairs, map(z))(criteria)

const combinations = comb.holistic(...categories)

const out = combinations
console.log(JSON.stringify(out, undefined, 2))

// export function get(req, res) {
// 	res.writeHead(200, {
// 		'Content-Type': 'application/json'
// 	});
//
// 	res.end(JSON.stringify(out, undefined, 2));
// }
