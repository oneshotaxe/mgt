import Excel from 'exceljs'

const months = [
  'январе',
  'феврале',
  'марте',
  'апреле',
  'мае',
  'июне',
  'июле',
  'августе',
  'сентябре',
  'октябре',
  'ноябре',
  'декабре',
]

export default async function (template, drivers, month) {
  const wb = new Excel.Workbook();
  await wb.xlsx.load(template)
  console.log(drivers)
  const ws = wb.getWorksheet('main')

  const [y, m] = month.split('-')
  const text = `Администрация Филиала "Юго-Западный", в лице директора  Р.А. Езохова, предлагает нижеперечисленным водителям 13-ой автоколонны выполнять сверхурочную работу за пределами установленной продолжительности рабочего времени (баланса), а так же работу в выходные, праздничные дни в ${months[m - 1]} ${y} года.`
  ws.getCell(1, 1).value = text
  
  drivers.sort((a, b) => a.num === b.num ? 0 : a.num < b.num ? -1 : 1)
    .forEach((driver, index) => {
    ws.getCell(3 + index % 48, 2 + 4 * (Math.floor(index / 48))).value = driver.num
    ws.getCell(3 + index % 48, 3 + 4 * (Math.floor(index / 48))).value = driver.shortName
  })

  return await wb.xlsx.writeBuffer()
}