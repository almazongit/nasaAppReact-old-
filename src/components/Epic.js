import EPICPhoto from "./EPICPhoto";
import React, { useState, useEffect } from "react";
import { Container} from "react-bootstrap";
import {Stars} from './Stars';
import { Helmet } from 'react-helmet';


export const Epic = () => {

    const day = () => {
        const today = new Date();
        const yesterday = new Date(today.getTime() - (48 * 60 * 60 * 1000));
        const formattedDate = yesterday.toISOString().slice(0, 10);
        return formattedDate;
    }
    const formattedDate = day();

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
        fetch(`https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Ошибка при получении данных:', error));
    };



    return (
        <>
            <Helmet>
                <title>Diamond and NASA | EPIC </title>
            </Helmet>
        <Container>
            <div className="epic">
                <div className="epic_header">
                    <h1>EPIC (Earth Polychromatic Imaging Camera) </h1>
                    <p>Камера Earth Polychromatic Imaging Camera (EPIC) представляет собой 10-канальный спектрорадиометр (317 – 780 нм) на борту космического
                        аппарата Deep Space Climate Observatory (DSCOVR).
                        EPIC предоставляет цветные изображения всей освещенной стороны Земли как минимум раз в два часа с расстояния в 1 миллион миль.
                        Эта точка называется точкой Лагранжа Земля-Солнце-1 (L-1), где гравитационное притяжение Земли и Солнца эквивалентны и удерживают
                        обсерваторию на месте.</p>
                </div>
                <span>Введите дату и посмотрите фото Земли этого дня:</span>

                <form className="send-day" onSubmit={updateDate}>
                    <input className="input-date" type="date" />
                    <input className="input-submit" type="submit" />
                </form>

                <div className="container epic-photos d-flex flex-column">
                        {
                             data && data.length > 0 ? (data.map((photo, index) => (<EPICPhoto key={index} photo={photo} />))) : (<><p>Фото на такую дату не найдены. Возможно, они отсутствуют, вводите дату от 2015 года </p><Stars/></>)
                        }
                </div>

            </div>
        </Container>
            </>
    );
};