import { POST } from "../utils/constants"

export default (axios) => ({
  getList(params) {
    return new Promise((resolve, reject) => {
      axios.get(POST, { params: params }).then((res) => {
        resolve((res))
      }).catch((err) => {
        reject((err))
      })
    })
  },
  getPostObject(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${POST}/${id}`).then((res) => {
        resolve((res))
      }).catch((err) => {
        reject((err))
      })
    })
  },
  getPostCommentObject(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${POST}/${id}/comments`).then((res) => {
        resolve((res))
      }).catch((err) => {
        reject((err))
      })
    })
  },
})
