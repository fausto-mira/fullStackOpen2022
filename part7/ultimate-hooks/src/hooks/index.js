import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setResources(response.data)
      })
  }, [setResources, baseUrl])

  // const getAll = () => {
  //   const request = axios.get(baseUrl)
  //   request.then(response => setResources(response.data))
  // }

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    setResources([...resources, response.data])
  }

  const update = (id, newObject) => {
    const request = axios.put(`${ baseUrl } /${id}`, newObject)
    request.then(response => {
      const updatedResources = resources.map(resource => 
        resource.id !== id ? resource : response 
        )
      setResources(updatedResources)
    })
  }

  const service = {
    create, 
    update
  }

  return [
    resources, service
  ]
}