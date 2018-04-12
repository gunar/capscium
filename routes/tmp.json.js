'use strict'

import {
  reduce,
  values,
} from 'lodash/fp'
import comb from 'combinatorics'

const criteria = {
  importance: [ 'high', 'mid', 'low' ],
  urgency: [ 'vital', 'pressing', 'necessary' ],
}


const x = (result, categories, criterion) =>
  categories.length + result
const numberOfAlternatives = reduce(x)(0)(criteria)

// identifying undominated pairs
//‘undominated pair’ is a pair of alternatives where one is characterized by a higher ranked category for at least one criterion and a lower ranked category for at least one other criterion than the other alternative, and hence a judgement is required for the alternatives to be pairwise ranked

// calculate dominated pairs

const out = comb.holistic(...values(criteria))

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(out, undefined, 2));
}
