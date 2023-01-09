// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios"

export default async function handler(req, res) {
  let posts = {}
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    posts = response.data
  } catch (e) {
    console.log('error', e);
  }
  res.status(200).json(posts)
}
