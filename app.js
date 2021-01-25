const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');


const argv = require('yargs').options({
    WikidataId: {
        alias: 'w',
        desc: 'Código de wikidata de la ciudad',
        demand: true
    }
}).argv;

//
/*
lugar.getLugarLatLng(argv.WikidataId)
    .then(
        console.log
    );
    */

//clima.getClima(40.750, -74.00).then(console.log).catch(console.log)

let DatosCiudad = undefined;
const getInfo = async(WikidataId) => {
    try {
        const DatosCiudad = await lugar.getLugarLatLng(WikidataId);
        const Temperatura = await clima.getClima(DatosCiudad.lat, DatosCiudad.lng);
        return `El clima de ${DatosCiudad.direccion} es de ${Temperatura}`;
    } catch (e) {
        return `No se pudo determinar el clima de ${ WikidataId}`;
    }
}



getInfo(argv.WikidataId)
    .then(console.log)
    .catch(console.log);