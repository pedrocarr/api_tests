import axios from 'axios'
import { writeFileSync } from 'fs'

const BASE_URL = 'https://api.italki.com/api/v2/teachers'
const PAGE_SIZE = 99

const createUrl = (page) => `${BASE_URL}?page=${page}&page_size=${PAGE_SIZE}`

async function fetchTotalPages() {
  const url = createUrl(0)
  const response = await axios.get(url)
  const total = response.data?.paging?.total
  return Math.ceil(total / PAGE_SIZE)
}

async function fetchPage(page) {
  const url = createUrl(page)
  const response = await axios.get(url)
  if (response.status !== 200) throw new Error(`Failed page ${page}`)
  return response.data.data
}

async function fetchAllTeachers() {
  const totalPages = await fetchTotalPages()
  const pageRequests = []

  for (let i = 0; i < totalPages; i++) {
    pageRequests.push(fetchPage(i))
  }

  const results = await Promise.allSettled(pageRequests)

  const teachersIds = results
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value)
    .map(t => t?.user_info?.user_id)
    .filter(id => id !== undefined)

  return teachersIds
}

fetchAllTeachers().then(teachersIds => {
  console.log(`Fetched ${teachersIds.length} teacher IDs`)
  writeFileSync('teachers.json', JSON.stringify(teachersIds, null, 2), 'utf-8')
})
