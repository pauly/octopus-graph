// graph library I wrote for popex
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
  step = false,
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
    let prevY = null
    const comments = []
    const descriptionTag = `<desc>${label} graph line</desc>`
    const path = '<polyline points="' + Object.values(chartData).reduce((path, pair) => {
      [ts, value] = pair
      x = marginLeft + Math.round((ts - floorX) / (ceilX - floorX) * maxWidth)
      const height = Math.round((value - floorY) / (ceilY - floorY) * maxHeight)
      y = maxHeight + marginTop - height
      comments.push(addComment({ x, y, maxX, maxY, color, label, ts, value, comments }))
      if (step && prevY !== null && prevY !== y) {
        path.push([x, prevY])
        path.push([x, y])
      } else {
        path.push([x, y])
      }
      prevY = y
      return path
    }, []).filter(Boolean).join(' ') + '" fill="none" />'
    return `<g stroke="${color}">\n    ${descriptionTag}\n    ${path}\n  </g>\n  <text fill="${color}" x="${x}" y="${y}">${label || value}</text>${comments.length ? '\n  ' + comments.filter(Boolean).join('\n  ') : ''}`
  }

  const priceLine = dataSets.map((chartData, index) => line(chartData, colors[index] || 'black', labels && labels[index])).join('\n  ')

  let axis = `<path d="m ${marginLeft} ${marginTop} v ${maxHeight} h ${maxWidth} h -${maxWidth} v -${maxHeight} z" stroke="${border}" stroke-width="2" />\n`
  axis += `  <g fill="${border}" text-anchor="end" transform="translate(${marginLeft}, ${maxHeight + marginTop})">\n`

  let interval = 5000
  while (interval >= ceilY) {
    interval = interval / 10
  }
  for (let value = 0; value < ceilY; value += interval) {
    if (value < floorY) continue
    const height = Math.round((value - floorY) / (ceilY - floorY) * maxHeight)
    axis += `    <text y="-${height}">${value} -</text>\n` // x=0
  }
  const firstDateLabelX = new Date(floorX)
  // firstDateLabelX.setDate(firstDateLabelX.getDate() + 1)
  firstDateLabelX.setHours(0, 0, 0, 0)
  ts = firstDateLabelX.getTime()
  const stepInMonths = (ceilX - floorX) / (1000 * 60 * 60 * 24) > 30
  axis += `    <g text-anchor="start" transform="translate(0, ${margin})">\n`
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
    const x = Math.round((ts - floorX) / (ceilX - floorX) * maxWidth)
    let label = String(new Date(ts)).substr(4, 6)
    if (stepInMonths) {
      label = String(new Date(ts)).substr(4, 3)
    }
    if (dateX.getYear() !== thisYear) {
      label = `${label} '${String(dateX.getFullYear()).substr(-2)}`
    }
    axis += `      <text x="${x}">${label}</text>\n` // y = 0
  }
  axis += `    </g>\n`
  axis += '  </g>'

  return `
<svg viewBox="0 0 ${imageWidth} ${imageHeight}" fill="transparent" xmlns="http://www.w3.org/2000/svg"${fontSize ? ` font-size="${fontSize}"` : ''}>
  <desc>${description || 'popex graph'}</desc>
  <rect x="${marginLeft}" y="${marginTop}" width="${maxWidth}" height="${maxHeight}" />
  ${priceLine}
  ${axis}
</svg>`
}
