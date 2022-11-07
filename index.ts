import { create, insertBatch, search } from '@lyrasearch/lyra'
import pinyin from 'pinyin'

const data = [
  {
    quote: 'It is during our darkest moments that we must focus to see the light.',
    author: '版本控制系统规范',
  },
  {
    quote: 'If you really look closely, most overnight successes took a long time.',
    author: '版测试',
  },
  {
    quote: 'If you are not willing to risk the usual, you will have to settle for the ordinary.',
    author: '反对改革的是疯狂了',
  },
  {
    quote: "You miss 100% of the shots you don't take",
    author: '史蒂夫 dfgdgjk 的赶快 的版本 sdd 发过来',
  },
]

function initDB() {
  const db = create({
    schema: {
      author: 'string',
      authorCN:"string",
      quote: 'string',
    },
  })
  return db
}

async function insertData(db, data) {
  await insertBatch(db, [...data])
}

function searchResult(db, keyword) {
  const result = search(db, {
    term: keyword,
    properties: '*',
  })

  return result
}

function toPin(data) {
  const formatData = [] as any
  data.forEach(({ quote, author }) =>
    formatData.push({
      quote,
      authorCN: author,
      author: pinyin(author, {
        style: 'normal',
      }).join(' '),
    })
  )

  return formatData
}

const db = initDB()
const formatData = toPin(data)

insertData(db, formatData).then(() => {
  const result = searchResult(db, pinyin('版本', { style: 'normal' }).join(' '))
  console.log('result:', result)
})
