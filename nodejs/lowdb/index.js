import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const adapter = new JSONFile('./db.json')
const db = new Low(adapter)

await db.read()

db.data ||= { posts: [] }
db.data.posts.push({ id: 1, name: 'leo' })
await db.write()

const res = db.data.posts.find(i => i.id === 1)
const res2 = db.get('posts[0].name')

console.log('debug result: ', res, res2)
