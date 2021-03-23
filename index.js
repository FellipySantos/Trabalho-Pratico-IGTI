const fs = require("fs").promises
async function start() {
    await creatFiles();
    await getStatesWithMoreCities()

}

async function creatFiles() {
    let data = await fs.readFile("./files/Estados.json");
    const states = JSON.parse(data);

    data = await fs.readFile("./files/Cidades.json");
    const cities = JSON.parse(data);

    for (state of states) {
        const stateCities = cities.filter(city => city.Estado === state.ID);
        await fs.writeFile(`./states/${state.Sigla}.json`, JSON.stringify(stateCities));
    }
}
async function countCities(uf) {
    const data = await fs.readFile(`./states/${uf}.json`);
    const cities = JSON.parse(data);
    return cities.length;
}
async function getStatesWithMoreCities(){
    const states = JSON.parse(await fs.readFile("./files/Estados.json"));
    const list = [];
    for (const state of states) {
        const count = await countCities(state.Sigla);
        list.push({uf: state.Sigla, count});
    }
    console.log(list);
}
start();