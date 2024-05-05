import React from "react";

 const FetchedPhoto = ({data}) => {
    // Проверяем, есть ли объект photo и не является ли он пустым
    if (!data) {
        return <div>Ошибка в получении данных</div>;
    }
    return (
            <div className="fetched-photo">
                <div className="photo-text">
                    <img src={data.hdurl} alt={data.title} />
                     <div className="text">
                        <h3>{data.title}</h3>
                        <p>{data.explanation}</p>
                    </div>
                </div>
            </div>
    );
};

export default FetchedPhoto;

