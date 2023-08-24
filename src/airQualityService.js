const ROOT_URL = 'https://api.airvisual.com/v2/nearest_city?lat='
const API_KEY = 'b6c57507-7fde-4041-ab2f-0a6e65eb9611'

const getAirQuality = (searchParameter) => {
    const url = new URL(ROOT_URL + searchParameter.coord.lat + '&lon=' + searchParameter.coord.lon + '&key=' + API_KEY);
    //Pom Prap Sattru Phai
    //const url = new URL(ROOT_URL + searchParameter.coord.lat + '&lon=' + searchParameter.coord.lon + '&key=' + API_KEY);
    return fetch(url).then((res) => res.json())
};

export default getAirQuality;