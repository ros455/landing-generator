import React, { useState, useEffect } from 'react';
import style from '../styles/Timer.module.scss';
function Timer() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [fullDate, setFullDate] = useState({});
  const [dateInput, setDateInput] = useState('');

  useEffect(() => {
    fetch('http://localhost:4444/get-timer')
      .then((res) => res.json())
      .then((res) => {
        setFullDate(res)
      })
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(fullDate.timer).getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
    }, 1000);

    return () => clearInterval(intervalId);

  }, [fullDate.timer]);

  const handleUpdateTimer = () => {
    fetch('http://localhost:4444/update-timer', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ timer: dateInput })
    })
      .then((res) => res.json())
      .then((res) => {
        setFullDate(res)
      })

      window.location.reload();
  }

  return (
    <div>
        <div className={style.display_time}>
            <h4>Таймер</h4>
            <h4>{days} днів</h4>
            <h4>{hours} годин</h4>
            <h4>{minutes} хвилин</h4>
        </div>
      <div className={style.choise_time}>
        <p>Вибрати дату</p>
        <input type="date" id="date" onChange={(e) => setDateInput(e.target.value)} value={dateInput}/>
        <button onClick={handleUpdateTimer}>Підтвердити зміни</button>
      </div>
    </div>
  );
}

export default Timer;