import Excel from 'exceljs'
import Cursor from '@/vendor/excels/Cursor'

export default async function (magazine) {
  const pages = magazine.pages.length % 2 === 0 ? magazine.pages.concat({ buses: [], number: magazine.pages.length + 1 }) : magazine.pages;
  const pageCount = pages.length
  console.log({pageCount})

  const wb = new Excel.Workbook()
  const ws_left = wb.addWorksheet('Left', {
    pageSetup: {
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: pageCount + 1,
      paperSize: 8,
      horizontalCentered: true,
      verticalCentered: true,
      orientation: 'landscape',
      margins: {
        left: 0.2, right: 0.2,
        top: 0.2, bottom: 0.2,
        header: 0, footer: 0
      },
      printArea: 'A1:AQ' + 50 * (pageCount + 1)
    }
  })
  const ws_right = wb.addWorksheet('Right', {
    pageSetup: {
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: pageCount + 1,
      paperSize: 9,
      horizontalCentered: true,
      verticalCentered: true,
      margins: {
        left: 0.2, right: 0.2,
        top: 0.2, bottom: 0.2,
        header: 0, footer: 0
      },
      printArea: 'A1:X' + 50 * (pageCount + 1)
    }
  })

  renderLeftWS(new Cursor(ws_left), pages)
  renderRightWS(new Cursor(ws_left), pages)

  return await wb.xlsx.writeBuffer()
}

function renderLeftWS(cursor, pages) {
  console.log({ pages })
  cursor.setColumnWidth([6, 6, 7, 23, 9, 10].concat(new Array(13).fill(4)).concat(new Array(20).fill(4).concat([8, 8, 8, 8])))

  let k = -1;
  let n = Math.floor(pages.length / 2);
  for (let i = 0; i < pages.length ; i++) {
    n = n + i * k;
    k = k * -1;
    cursor.getCell(1 + 50 * i, 1).value = (pages[n].number + 1) * 2 - 1
    renderLeftAside(cursor.createCursor(5 + 50 * i, 1), pages[n])
    renderLeftPage(cursor.createCursor(1 + 50 * i, 3), pages[n])
  }
}

function renderLeftAside(cursor, page) {
  // merges
  new Array(
    [1, 1, 2, 1],
    [1, 2, 2, 2]
  ).forEach(pos => {
    cursor.mergeCells(pos[0], pos[1], pos[2], pos[3])
  })
  new Array(
    3, 11, 19, 27, 35
  ).forEach(pos => {
    cursor.mergeCells(pos, 1, pos + 7, 1)
    cursor.mergeCells(pos, 2, pos + 7, 2)
  })

  //font
  cursor.getArea(1, 1, 1, 2).forEach(cell => {
    cell.font = {
      size: 10
    }
  })
  cursor.getArea(3, 1, 42, 2).forEach(cell => {
    cell.font = {
      size: 14
    }
  })

  //alignment
  cursor.getCell(1, 1).alignment = {
    wrapText: true,
    vertical: 'middle',
    horizontal: 'center'
  }
  cursor.getCell(1, 2).alignment = {
    wrapText: true,
    vertical: 'middle',
    horizontal: 'center'
  }
  cursor.getArea(3, 1, 42, 2).forEach(cell => {
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
      textRotation: 90
    };
  })

  //borders
  cursor.setBordersOnArea('medium', 1, 1, 42, 2)

  fillInfoLeftAside(cursor.createCursor(), page)
}

function fillInfoLeftAside(cursor, page) {
  cursor.getCell(1, 1).value = '№ марш.'
  cursor.getCell(1, 2).value = '№ вых.'

  page.buses.forEach((bus, i) => {
    const way = bus.way
    const route = way?.route

    cursor.getCell(3 + i * 8, 1).font = { size: 14, bold: true }
    cursor.getCell(3 + i * 8, 2).font = { size: 14, bold: true }
    cursor.getCell(3 + i * 8, 1).value = route?.num || ''
    cursor.getCell(3 + i * 8, 2).value = way?.num || ''
  })
}

function renderLeftPage(cursor, page, isEmpty) {
  cursor.setRowHeight(new Array(50).fill(18.75))
  if (isEmpty) {
    return
  }
  cursor.getArea(1, 1, 50, 17).forEach(cell => {
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center'
    }
  })

  renderLeftHeader(cursor.createCursor(5, 1), page.weekdays)
  for (let i = 0; i < 5; i++) {
    renderLeftBus(cursor.createCursor(7 + i * 8, 1), page.buses[i])
  }
}

function renderLeftHeader(cursor, weekdays = []) {
  // merges
  new Array(
    [1, 1, 2, 1],
    [1, 2, 2, 2],
    [1, 3, 2, 3],
    [1, 4, 2, 4],
    [1, 5, 1, 17]
  ).forEach(pos => {
    cursor.mergeCells(pos[0], pos[1], pos[2], pos[3])
  })

  //font
  cursor.getArea(1, 1, 2, 17).forEach(cell => {
    cell.font = {
      size: 10
    }
  })

  //alignment
  cursor.getCell(1, 1).alignment.wrapText = true
  cursor.getCell(1, 3).alignment.wrapText = true

  //borders
  cursor.setBordersOnArea('medium', 1, 1, 2, 16)

  // content
  new Array(
    { pos: [1, 1], text: '№ автоб.' },
    { pos: [1, 2], text: 'Фамилия' },
    { pos: [1, 3], text: 'Таб. номер' },
    { pos: [1, 4], text: 'Роспись' },
    { pos: [1, 5], text: 'Календарные' },
  ).forEach(({ pos, text }) => {
    cursor.getCell(pos[0], pos[1]).value = text
  })

  new Array(12).fill(1).map((_, i) => i + 1).forEach(i => {
    const cell = cursor.getCell(2, 4 + i)
    cell.value = i

    if (weekdays.includes(i.toString())) {
      cursor.createCursor(2, 4 + i)
        .getArea(1, 1, 41, 1)
        .forEach(cell => {
          cell.fill = {
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'FFbfbfbf'}
          }
        })
    }
  })
}

function renderLeftBus(cursor, bus) {
  cursor.mergeCells(1, 1, 8, 1)
  cursor.getArea(1, 2, 8, 2).forEach(cell => {
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'left'
    }
  })

  //font
  cursor.getArea(1, 1, 8, 17).forEach(cell => {
    cell.font = {
      size: 14
    }
  })

  //alignment
  cursor.getCell(1, 1).alignment.textRotation = 90

  //borders
  cursor.setBordersOnArea('thin', 1, 1, 8, 16)
  new Array(16, 4, 3, 2, 1).forEach(c => {
    cursor.setBordersAroundArea('medium', 1, 1, 8, c)
  })

  if (bus) {
    fillBusInfo(cursor.createCursor(), bus)
  }
}

function fillBusInfo(cursor, bus) {
  cursor.getCell(1, 1).font = { size: 14, bold: true }
  cursor.getCell(1, 1).value = bus.num

  const positions = getDriverPositionsByCount(bus.drivers.length)
  positions.forEach((pos, i) => {
    fillLeftDriverInfo(cursor.createCursor(pos, 2), bus.drivers[i])
  })
}

function fillLeftDriverInfo(cursor, driver) {
  // alignment
  cursor.getArea(1, 1, 8, 2).forEach(cell => {
    cell.alignment.horizontal = 'center'
    cell.alignment.horizontal = 'center'
  })

  // font
  cursor.getCell(1, 1).font = { size: 14, bold: true }
  cursor.getCell(5, 1).font = { size: 14, bold: true }
  cursor.getCell(4, 1).font = { size: 10 }
  cursor.getCell(8, 1).font = { size: 10 }
  cursor.getCell(2, 2).font = { size: 14, bold: true }

  // content
  const [lastname, firstname, middlename] = driver.fullname.split(' ')
  cursor.getCell(1, 1).value = lastname || ''
  cursor.getCell(2, 1).value = firstname || ''
  cursor.getCell(3, 1).value = middlename || ''
  let graphicName = driver.graphic?.name || ''
  if (graphicName) {
    graphicName = `${graphicName} (${graphicName[0]}раб. / ${graphicName[1]}вых.)`
  }
  cursor.getCell(4, 1).value = graphicName
  cursor.getCell(1, 2).value = driver.num.slice(0, 4)
  cursor.getCell(2, 2).value = driver.num.slice(4)

  for (let i = 0; i < 12; i++) {
    cursor.getCell(1, i + 4).value = driver.statuses[i].value
  }
}

function renderRightWS(cursor, pages) {
  let k = 1;
  let n = Math.floor(pages.length / 2);
  for (let i = 0; i < pages.length ; i++) {
    n = n + i * k;
    k = k * -1;
    renderRightPage(cursor.createCursor(1 + 50 * i, 20), pages[n])
  }
}

function renderRightPage(cursor, page, isEmpty = false) {
  cursor.setRowHeight(new Array(50).fill(18.75))
  if (isEmpty) {
    return
  }
  renderRightHeader(cursor.createCursor(5, 1), page.weekdays)
  for (let i = 0; i < 5; i++) {
    renderRightBus(cursor.createCursor(7 + i * 8, 1), page.buses[i])
  }
  cursor.getCell(1,24).value = (page.number + 1) * 2
}

function renderRightHeader(cursor, weekdays = []) {
  cursor.getArea(1, 1, 2, 24).forEach(cell => {
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center'
    }
  })
  // content
  new Array(
    { pos: [1, 1], text: 'числа месяца' },
    { pos: [1, 21], text: 'Режим работы' },
  ).forEach(({ pos, text }) => {
    cursor.getCell(pos[0], pos[1]).value = text
  })
  new Array(19).fill(1).map((_, i) => i + 13).forEach(i => {
    const cell = cursor.getCell(2, i - 11)
    cell.value = i

    if (weekdays.includes(i.toString())) {
      cursor.createCursor(2, i - 11)
        .getArea(1, 1, 41, 1)
        .forEach(cell => {
          cell.fill = {
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'FFbfbfbf'}
          }
        })
    }
  })

  // merges
  new Array(
    [1, 1, 1, 20],
    [1, 21, 2, 24]
  ).forEach(pos => {
    cursor.mergeCells(pos[0], pos[1], pos[2], pos[3])
  })

  //font
  cursor.getArea(1, 1, 2, 24).forEach(cell => {
    cell.font = {
      size: 10
    }
  })

  //borders
  cursor.setBordersOnArea('medium', 1, 2, 2, 24)

}

function renderRightBus(cursor, bus) {
  cursor.getArea(1, 1, 8, 20).forEach(cell => {
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center'
    }
  })
  // merges
  new Array(
    [1, 21, 1, 23],
    [2, 21, 2, 24],
    [4, 21, 4, 23],
    [5, 21, 5, 23],
    [6, 21, 6, 23],
    [7, 21, 7, 24]
  ).forEach(pos => {
    cursor.mergeCells(pos[0], pos[1], pos[2], pos[3])
  })
  //borders
  cursor.setBordersOnArea('thin', 1, 2, 8, 20)
  new Array(24, 20).forEach(c => {
    cursor.setBordersAroundArea('medium', 1, 2, 8, c)
  })
  //content
  cursor.getCell(1, 21).value = 'Выход:'
  cursor.getCell(2, 21).value = 'Продолжительность работы'
  cursor.getCell(3, 21).value = '1 смена:'
  cursor.getCell(3, 23).value = '2 смена:'
  cursor.getCell(4, 21).value = 'Выезд из парка:'
  cursor.getCell(5, 21).value = 'Время смены:'
  cursor.getCell(6, 21).value = 'Окончание работы:'
  cursor.getCell(7, 21).value = 'Время обеда'
  cursor.getCell(8, 21).value = '1 смена:'
  cursor.getCell(8, 23).value = '2 смена:'

  if (bus) {
    const positions = getDriverPositionsByCount(bus.drivers.length)
    positions.forEach((pos, i) => {
      fillRightDriverInfo(cursor.createCursor(pos, 2), bus.drivers[i])
    })
    if (bus.way) {
      fillWayInfo(cursor.createCursor(1, 21), bus.way)
    }
  }

}

function fillRightDriverInfo(cursor, driver) {
  for (let i = 12; i < driver.statuses.length; i++) {
    cursor.getCell(1, i - 11).value = driver.statuses[i].value
  }
}

function fillWayInfo(cursor, way) {
  cursor.getCell(1, 4).value = way.num

  if (way.times) {
    cursor.getCell(3, 2).value = way.times.durationFirstSmene
    cursor.getCell(3, 4).value = way.times.durationSecondSmene
    cursor.getCell(4, 4).value = way.times.outPark
    cursor.getCell(5, 4).value = way.times.change
    cursor.getCell(6, 4).value = way.times.endWork
    cursor.getCell(8, 2).value = way.times.lunchFirstSmene
    cursor.getCell(8, 4).value = way.times.lunchSecondSmene
  }
}

function getDriverPositionsByCount(count) {
  switch (count) {
    case 1:
      return [1]
    case 2:
      return [1, 5]
    default:
      return []
  }
}