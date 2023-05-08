export class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async get(endpoint) {
    try {
      const data = await (await fetch(`${this.baseUrl}/${endpoint}/`)).json()
      return data
    } catch (error) {
      console.log('Error GET', error)
    }
  }
  async post(endpoint, data) {
    try {
      const response = await (
        await fetch(`${this.baseUrl}/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
      ).json()
      return response
    } catch (error) {
      console.log('Error POST', error)
    }
  }
}
