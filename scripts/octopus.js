#!/usr/bin/env node

/* eslint-disable camelcase */

const graph = require('../src/lib/graph') // graph library I wrote for popex

/* work out my rate etc
const products = require('../data/products')
const product = require('../data/product')
// my deal is E-1R-VAR-22-04-02-J so find it - @todo don't hardcode this
const key = Object.keys(product.single_register_electricity_tariffs).find(key => product.single_register_electricity_tariffs[key].direct_debit_monthly.code === 'E-1R-VAR-22-04-02-J')
const { standing_charge_inc_vat: standingCharge, standard_unit_rate_inc_vat: rate } = product.single_register_electricity_tariffs[key].direct_debit_monthly
// or just hardcode this here...
*/

const rate = 29.48
const standingCharge = 41.39

// octopus format is like [{ consumption: 666, interval_start: '2022-06-01T12:00:00Z' }]
// popex graph format needs only [timestamp, consumption]
// so use this to map it
const fromOctopusToPair = ({ consumption, interval_start, interval_end }) => {
  return [
    new Date(interval_end).getTime(),
    consumption
  ]
}
const lastWeek = new Date()
lastWeek.setDate(lastWeek.getDate() - 7)
lastWeek.setHours(0, 0, 0, 0)
const thisWeek = (pair) => pair[0] > lastWeek.getTime()
const electricity = require('../data/electricity_this_week').results.map(fromOctopusToPair).filter(thisWeek)

const hackyWidthOfLabelPerDay = day => {
  if (day === 1) return 48 // wider for the M in Mon
  if (day === 3) return 48 // wider for the W in Wed
  return 43
}

const dataSets = [electricity] // popex graph function needs an array of arrays
const labels = ['Kwh 💡'] // popex graph function wants an optional array of labels
const description = 'Energy usage graph'
const border = '#999' // colours
const colors = ['#9e9', '#99e', '#e99'] // colours
const width = 800
const height = 80
const margin = 15
const rounding = 1
const fontSize = '0.6em'
let sum = 0

const svgComment = ({ x, y, top, width, height = 12, color, text }) => {
  return `<g stroke="${color}">
    <line x1="${x}" y1="${y}" x2="${x}" y2="${top}" />
    <rect x="${x - (width - 10)}" y="${top}" width="${width}" height="${height}" fill="#fff" />
  </g>
  <text fill="${color}" x="${x - (width - 13)}" y="${top + 10}">${text}</text>`
}

// popex graph function takes an optional addComment hook,
// it is provided these params which we can use to drop a label in
// at a point on the graph
function addComment ({ x, y, maxX, maxY, color, label, ts, value }) {
  sum += value
  const thisDay = new Date(ts)
  const endOfDay = (thisDay.getHours() === 23 && thisDay.getMinutes() === 30)
  if (endOfDay) {
    const cost = (standingCharge + rate * sum) / 100
    const top = parseInt(5 + 5 * Math.random(), 10)
    const width = hackyWidthOfLabelPerDay(thisDay.getDay()) || 48
    sum = 0 // reset sum, we only really want the sum per day
    const text = `${thisDay.toDateString().substr(0, 3)} £${cost.toFixed(2)}`
    return svgComment({ x, y, top, width, color, text })
  }
  const wakeUpTime = (thisDay.getHours() === 7 && thisDay.getMinutes() === 0)
  if (wakeUpTime) {
    const cost = (rate * sum) / 100 // no standingCharge this time
    const top = parseInt(y - 30 - 5 * Math.random(), 10)
    const text = `🕖 £${cost.toFixed(2)}`
    return svgComment({ x, y, top, width: 40, color, text })
  }
  // another label for the peak usage
  if (value === maxY) {
    if (ts !== maxX) {
      const text = `⚠️ ${value.toFixed(2)}${label}`
      const width = 60
      const height = 12
      return svgComment({ x: x + width, y, top: y - height, width, color, text })
    }
  }
  // could add other labels here?
}

// everything but dataSets is optional
console.log(graph({ dataSets, labels, description, width, height, border, margin, colors, rounding, addComment, fontSize, step: true }))
