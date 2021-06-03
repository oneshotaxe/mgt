const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
const createModels = require('./createModels')
const createCrudRouter = require('./createCrudRouter')

const { statusesByDate } = require('../vendor/graphic_utils')

const app = express()
app.use(bodyParser.json())

mongoose.set('useFindAndModify', false)
const conn = mongoose.createConnection('mongodb://localhost/mgt',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

createModels(conn)

app.set('mongoose', conn)

app.use('/drivers', createCrudRouter('driver', [
  'bus'
]))
app.use('/buses', createCrudRouter('bus', [
  'way'
]))
app.use('/routes', createCrudRouter('route'))
app.use('/ways', createCrudRouter('way', [
  'route'
]))

app.post('/report', async (req, res) => {
  const Bus = res.app.get('mongoose').models['bus']
  let buses = await Bus.find().populate('drivers')
  buses = buses.sort((a, b) => a.num - b.num)
    .map(bus => ({
      _id: bus._id,
      num: bus.num,
      status: bus.status,
      drivers: bus.drivers.map(driver => {
        const status = statusesByDate(driver.graphic, req.body.date || '2020-06-26', 1)[0]
        
        return {
          _id: driver._id,
          num: driver.num,
          status: status.exception || status.value
        }
      })
    }))

  const report = {
    rows: [],
    buses: {
      'Ремонт': [],
      'СВАРЗ': [],
      'Резерв': []
    },
    drivers: {
      'В': [],
      'Б': [],
      'О': [],
      'Резерв': []
    }
  }

  buses.forEach(bus => {
    const row = {
      bus: null,
      first: null,
      second: null,
      full: null
    }

    if (!['Ремонт', 'СВАРЗ'].includes(bus.status)) {
      row.bus = bus
    } else {
      report.buses[bus.status].push(bus)
    }

    bus.drivers.forEach(driver => {
      if (['В', 'Б', 'О'].includes(driver.status)) {
        report.drivers[driver.status].push(driver)
        return
      }

      if (driver.status == '1') {
        row.first = driver
      } else if (driver.status == '2') {
        row.second = driver
      } else if (driver.status == 'Р') {
        row.full = driver
      }

      if (row.bus == null) {
        report.drivers['Резерв'].push(driver)
      }
    })
    if (row.first == row.second == row.full == null && row.bus != null) {
      report.buses['Резерв'].push(bus)
    }

    report.rows.push(row)
  })

  res.json(report)
})

app.post('/magazine', async (req, res) => {
  const Bus = res.app.get('mongoose').models['bus']
  let buses = await Bus.find().populate({ path: 'way', populate: 'route' }).populate('drivers')
  buses = buses.sort((a, b) => a.num - b.num)

  let daysInMonth = moment(req.body.month, "YYYY-MM").daysInMonth()

  const weekdays = Array.from(
    {
      length: moment(req.body.month, "YYYY-MM").daysInMonth()
    },
    (x, i) => moment(req.body.month, "YYYY-MM")
      .startOf('month')
      .add(i, 'days')
  ).filter(d => [6, 0].includes(d.day()))
    .map(d => d.format('D'))


  buses = buses.map(bus => ({
    num: bus.num,
    way: bus.way,
    drivers: bus.drivers.map(driver => ({
      num: driver.num,
      name: driver.shortName,
      graphic: driver.graphic,
      statuses: statusesByDate(driver.graphic, req.body.month + '-01', daysInMonth)
    }))
  }))

  const magazine = { pages: [] }
  const busesPerPage = req.body.busesPerPage || 4

  for (
    let i = 0, pageNumber = magazine.pages.length;
    i < buses.length;
    i += busesPerPage, pageNumber++
  ) {
    magazine.pages.push({
      weekdays,
      buses: buses.slice(i, i + busesPerPage),
      number: pageNumber
    })
  }

  res.json(magazine)
})

module.exports = app
