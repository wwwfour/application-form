import React, { useState } from 'react';
import axios from 'axios';

const FormComponent = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the server
      const response = await axios.post('/submit', formData);

      // Download the file
      window.location.href = response.data.downloadLink;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Okul Numaranız:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />
      <label>Telefon Numaranız:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} />
      <label>Bölümünüz ve Sınıfınız:</label>
      <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
      <button type="submit">Gönder</button>
    </form>
  );
};

export default FormComponent;
