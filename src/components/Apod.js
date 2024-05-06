import FetchedPhoto from "./FetchedPhoto";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Stars } from "./Stars";
import { Helmet } from 'react-helmet';


export const Apod = () => {

    const today = () => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1; // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
        const year = today.getFullYear();
        const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        return formattedDate;
    }
    const formattedDate = today();


    const [date, setDate] = useState(formattedDate);
    const [data, setData] = useState([]);

    const updateDate = (e) => {
        e.preventDefault();
        let dateFromInput = e.target[0].value;
        setDate(dateFromInput);
    };

    useEffect(() => {
        FetchPhotoFromApi(date);
      }, [date]);

    const FetchPhotoFromApi = (date) => {
        const apiKey = 'CCzpixoLyMPRK216VVNBYcLUcK84N7mPqtUTu7Ui';
        fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => setData(data))
        .catch((error) => {console.error('Ошибка при получении данных:', error); setData([])});
    };

    return (
        <>
            <Helmet>
                <title>Diamond and NASA | APOD</title>
            </Helmet>
        <Container>
            <div className="apod">
                <div className="apod_header">
                    <h1>APOD (Astronomy Picture of the Day)</h1>
                    <p>Это веб-сайт, поддерживаемый NASA и Мичиганским технологическим университетом. По данным самого сайта на нём «каждый день
                        публикуется изображение или фотоснимок из нашей Вселенной, а также краткое пояснение к нему, написанное профессиональным астрономом». </p>
                </div>
                <span>Введите дату и посмотрите астрономическое фото этого дня:</span>
                <form className="send-day" onSubmit={updateDate}>
                    <input className="input-date" type="date" placeholder="Введите день"/>
                    <input className="input-submit" type="submit" />
                </form>
                
                {
                    data.length === 0 ? <><p>Данные не найдены, возможно ошибка запроса</p><Stars/></> : <FetchedPhoto data={data}/>
                }
                
            </div>
        </Container>
        </>
    );
};