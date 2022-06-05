
import axios from 'axios'

export const LinkApiDesafioTechHelper = axios.create({
  baseURL: "https://linkapi-desafio-tech.gateway.linkapi.solutions/v1/",
  auth: {
    username: "17b271f2-2c76-4240-a0d7-46f57e919ca3",
    password: "741d5db9-c596-41b4-8785-1d50367224c8",
  },
  responseType: 'json',
})
