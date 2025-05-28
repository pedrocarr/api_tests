import axios from 'axios'
import { writeFileSync } from 'fs'

const BASE_URL = 'https://api.italki.com/api/v2/teachers'

const PAGE_SIZE = 99

const createUrl = (page) => `${BASE_URL}?page=${page}&page_size=${PAGE_SIZE}`


async function fecthAllTeachers () {

  const teachersIds = []

  let page = 0
  let hasNext = 1

  while (hasNext) {
    const url = createUrl(page)
    try {
      const response = await axios.get(url)
      if (response.status !== 200) throw new Error(`Status Code Failed is ${response.status}`);
      const data = response.data

      if (Array.isArray(data?.data)) {
        const ids = data.data
          .map(t => t?.user_info?.user_id)
          .filter(id => id !== undefined)

        teachersIds.push(...ids)
        console.log(`✅ Page ${page}: fetched ${ids.length} teacher IDs`)
      }
      hasNext = data?.paging?.has_next || 0
      page++
    } catch (error) {
      console.error(error.message)
      break
    }
  }
  return teachersIds
}

fecthAllTeachers().then(teachersIds => {
  console.log("🚀 ~ fecthAllTeachers ~ teachers:", teachersIds)
  console.log(`Teachers ids fetched: ${teachersIds.length}`)
  writeFileSync('teachers.json', JSON.stringify(teachersIds, null, 2), 'utf-8')
})