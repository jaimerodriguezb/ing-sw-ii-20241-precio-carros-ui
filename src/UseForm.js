import { useState } from "react";

function useForm() {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const finalFormEndpoint = e.target.action;
    const data = Array.from(e.target.elements)
      .filter((input) => input.name)
      .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});

    fetch(`${finalFormEndpoint}?year=${encodeURIComponent(data.anio)}&mileage=${encodeURIComponent(data.kilometraje)}&state=${encodeURIComponent(data.estado)}&make=${encodeURIComponent(data.marca)}&model=${encodeURIComponent(data.modelo)}`, 
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((response) => {
        const formattedPrice = response.price.toFixed(2);
        setMessage(`Precio del vehículo: $${formattedPrice} USD`);
        setStatus('success');
    })
    .catch((err) => {
        setMessage(err.toString());
        setStatus('error');
    });
  };

  return { handleSubmit, status, message };
}

export default useForm;