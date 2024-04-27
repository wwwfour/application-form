// App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verileri kontrol et
    if (formData.firstName && formData.lastName && formData.email) {
      // Verileri Node.js'e gönder
      fetch('http://localhost:3001/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    } else {
      alert('Lütfen tüm alanları doldurun');
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            İsim Soyisim
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </label>
          <label>
            Telefon Numaranız
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </label>
          <label>
            Okul Numaranız
            <input type="text" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <button type="submit">Başvur</button>
        </form>
      </div>
    </div>
  );
}

export default App;
