// graph library I wrote gor popex
// designed to create some unbloated svg of a graph

const byTimestamp = (a, b) => a[0] - b[0]

const thisYear = new Date().getYear()

module.exports = ({
  addComment = () => {},
  border = '#000',
  colors = [
    'red',
    'orange',
    'green',
    'blue',
    'pink'
  ],
  dataSets = [ // should be using typescript here!
    [
      // timestamp,
      // value
    ]
  ],
  fontSize,
  labels = [],
  description,
  rounding = 100,
  margin = 30,
  height = 300,
  width = 900 }) => {
  const marginTop = margin
  const marginBottom = margin
  const marginLeft = margin * 2
  const marginRight = margin * 4

  const maxHeight = height
  const maxWidth = width || (maxHeight * 3) // to get image proportions
  const imageHeight = maxHeight + marginTop + marginBottom
  const imageWidth = maxWidth + marginLeft + marginRight

  const allChartData = dataSets.reduce((acc, val) => acc.concat(val), []).filter(Boolean)

  const values = Object.values(allChartData).map(value => value[1])
  const times = Object.values(allChartData).map(value => value[0])
  const floorX = Math.floor(Math.min.apply(null, times) / rounding) * rounding
  const maxX = Math.max.apply(null, times)
  const ceilX = Math.ceil(maxX / rounding) * rounding
  const floorY = 0 // Math.floor(Math.min.apply(null, values) / rounding) * rounding
  const maxY = Math.max.apply(null, values)
  const ceilY = Math.ceil(maxY / rounding) * rounding
  let value = null
  let ts = null

  const line = (chartData, color, label) => {
    if (!chartData) return ''
    chartData.sort(byTimestamp)
    let x = 0
    let y = 0
    const comments = []
    const descriptionTag = `<desc>${label} graph line</desc>`
    const path = '<polyline points="' + Object.values(chartData).map(pair => {
      [ts, value] = pair
      x = marginLeft + Math.round((ts - floorX) / (ceilX - floorX) * maxWidth)
      const height = Math.round((value - floorY) / (ceilY - floorY) * maxHeight)
      y = maxHeight + marginTop - height
      comments.push(addComment({ x, y, maxX, maxY, color, label, ts, value, comments }))
      return [x, y]
    }).filter(Boolean).join(' ') + '" fill="none" />'
    return `<svg stroke="${color}">\n    ${descriptionTag}\n    ${path}\n  </svg>\n  <text fill="${color}" x="${x}" y="${y}">${label || value}</text>${comments.length ? '\n  ' + comments.filter(Boolean).join('\n  ') : ''}`
  }

  const priceLine = dataSets.map((chartData, index) => line(chartData, colors[index] || 'black', labels && labels[index])).join('\n  ')

  let axis = `<svg fill="${border}" text-anchor="end">\n    <path d="m ${marginLeft} ${marginTop} v ${maxHeight} h ${maxWidth}" stroke="${border}" fill="transparent" stroke-width="2" />\n`
  let interval = 5000
  while (interval >= ceilY) {
    interval = interval / 10
  }
  for (let value = 0; value < ceilY; value += interval) {
    if (value < floorY) continue
    const height = Math.round((value - floorY) / (ceilY - floorY) * maxHeight)
    const y = maxHeight + marginTop - height
    axis += `    <text x="${marginLeft}" y="${y}">${value} -</text>\n`
  }
  const firstDateLabelX = new Date(floorX)
  firstDateLabelX.setDate(firstDateLabelX.getDate() + 1)
  firstDateLabelX.setHours(0, 0, 0, 0)
  ts = firstDateLabelX.getTime()
  const stepInMonths = (ceilX - floorX) / (1000 * 60 * 60 * 24) > 30
  const anchor = stepInMonths ? '' : ' text-anchor="start"' // actually wrong anchoring if stepping in months @todo
  while (ts < ceilX) {
    const dateX = new Date(ts)
    if (stepInMonths) {
      dateX.setMonth(dateX.getMonth() + 1)
      dateX.setDate(1)
    } else {
      dateX.setDate(dateX.getDate() + 1)
      dateX.setHours(0, 0, 0, 0)
    }
    ts = dateX.getTime()
    const y = maxHeight + marginTop + margin / 2
    const x = marginLeft + Math.round((ts - floorX) / (ceilX - floorX) * maxWidth)
    let label = String(new Date(ts)).substr(4, 6)
    if (stepInMonths) {
      label = String(new Date(ts)).substr(4, 3)
    }
    if (dateX.getYear() !== thisYear) {
      label = `${label} '${String(dateX.getFullYear()).substr(-2)}`
    }
    axis += `    <text x="${x}" y="${y}"${anchor}>${label}</text>\n`
  }
  axis += '  </svg>'

  return `
<svg viewBox="0 0 ${imageWidth} ${imageHeight}" fill="transparent" xmlns="http://www.w3.org/2000/svg"${fontSize ? ` font-size="${fontSize}"` : ''}>
  <desc>${description || 'popex graph'}</desc>
  <rect x="${marginLeft}" y="${marginTop}" width="${maxWidth}" height="${maxHeight}" />
  ${priceLine}
  ${axis}
</svg>`
}
