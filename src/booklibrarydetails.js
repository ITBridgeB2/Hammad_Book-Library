import axios from "axios";

const URL_1= 'http://localhost:2630/books'; 

const saveBooksDetails = (postData) => {
    return axios.post(`${URL_1}`, postData);
}

const getBooks = () => {
    return axios.get(`${URL_1}`);
} 

const deleteBooks = (id) => {
    return axios.delete(`${URL_1}/${id}`);
}

const updateBooks = (id, postData) => {
    return axios.put(`${URL_1}/${id}`, postData);
  };

const getBookByTitle = (title) => {
  return axios.get(`${URL_1}/title/${title}`);
};

export default {
  getBooks, deleteBooks, updateBooks, saveBooksDetails , getBookByTitle
 
};