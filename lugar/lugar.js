const axios = require('axios');

const getLugarLatLng = async(WikidataId) => {
    const encodedUrl = encodeURI(WikidataId);
    console.log(encodedUrl);

    const instance = axios.create({
        baseURL: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${encodedUrl}`,
        //timeout: 1000,
        headers: { 'X-RapidAPI-Key': 'fdb1558c31msh365f5491e6f66abp1b2974jsn6f25b3aa9037' }
    });

    const resp = await instance.get();

    if (resp.errors) {
        throw new Error(`No hay resultados para $ {WikidataId }`);
    }

    const data = resp.data.data;
    const direccion = data.name;
    const lat = data.latitude;
    const lng = data.longitude;

    return { direccion, lat, lng }
}


module.exports = {
    getLugarLatLng
};