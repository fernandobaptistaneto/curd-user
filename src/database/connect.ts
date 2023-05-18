import { appDataSource } from "./data-source";

appDataSource.initialize().then(() => {
    console.log("Banco Conectado");
}).catch((error) => {
    console.log("Error: " + error)
});

export default appDataSource