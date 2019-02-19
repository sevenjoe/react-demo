import  axios from 'axios'
export  const api = "https://5c29bdb4b1c87d001421e632.mockapi.io"||"http://localhost:5000";
export  const getAll = ()=> axios.get(`${api}/api/v1/records`);
export  const create = (body)=> axios.post(`${api}/api/v1/records`,body);
export  const update = (id,body)=> axios.put(`${api}/api/v1/records/${id}`,body);
export  const remove = (id)=> axios.delete(`${api}/api/v1/records/${id}`);