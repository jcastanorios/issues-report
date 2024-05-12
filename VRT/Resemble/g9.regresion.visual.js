const fs = require("fs").promises;
const resemble = require("resemblejs");
const config = require("./config.json");

const { folders, base, extension } = config;

async function executeTest() {
  try {
    const firstImagesBatchToCompare = await leerDirectorioImagenes(
      `${base}${folders[0]}`
    );
    const secondImagesBatchToCompare = await leerDirectorioImagenes(
      `${base}${folders[1]}`
    );
    console.log(firstImagesBatchToCompare, secondImagesBatchToCompare);

    // iterar las listas obtenidas
    for (let i = 0; i < firstImagesBatchToCompare.length; i++) {
      const file = `${base}${folders[0]}/${firstImagesBatchToCompare[i]}`;
      const file2 = `${base}${folders[1]}/${secondImagesBatchToCompare[i]}`;

      // Compara las imágenes
      const diff = await compararDosImagenes(
        file,
        file2,
        firstImagesBatchToCompare[i]
      );
      console.log(
        `Diferencia entre ${firstImagesBatchToCompare[i]} y ${secondImagesBatchToCompare[i]}:`
      );
      console.log(diff);
    }
    // Genera el informe HTML
    let html = await generarInformeHTML(
      firstImagesBatchToCompare,
      secondImagesBatchToCompare
    );
    await fs.writeFile("informe.html", html);
    console.log("Informe HTML generado correctamente.");
  } catch (error) {
    console.error("Error al leer el directorio de imágenes:", error);
  }
}
/**
 * Este método permite leer  de los directorios las imagenes a comparar
 * @param {*} directorio path base a las imagenes
 * @returns información de las imagnes obtenidas
 */
async function leerDirectorioImagenes(directorio) {
  try {
    const archivos = await fs.readdir(directorio);
    const imagenes = archivos.filter((archivo) =>
      archivo.endsWith(`${extension}`)
    );
    return imagenes;
  } catch (error) {
    throw new Error(`Error al leer el directorio ${directorio}: ${error}`);
  }
}

async function compararDosImagenes(file, file2, resultado) {
  console.log(file, file2);
  resemble(file)
    .compareTo(file2)
    .ignoreColors()
    .onComplete(function (data) {
      console.log(data);
      fs.writeFile(`${base}${folders[2]}/${resultado}`, data.getBuffer());
    });
}

async function generarInformeHTML(
  firstImagesBatchToCompare,
  secondImagesBatchToCompare
) {
  const resultImagesBatchToCompare = await leerDirectorioImagenes(`${base}${folders[2]}`);
  let html = `
  <html>
  <head>
    <title>Informe de comparación de imágenes con Resemble</title>
    <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          background-color: #f9f9f9;
        }
        h1 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 20px;
          background-color: #fff;
          border: 1px solid #ddd;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: center;
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
          color: #333;
        }
        img {
          max-width: 150px;
          height: auto;
          display: block;
          margin: 0 auto;
        }
      </style>
  </head>
  <body>
    <h1>Informe de comparación de imágenes</h1>
    <table>
      <thead>
        <tr>
          <th>Versión Ghost 5</th>
          <th>Versión Ghost 4</th>
          <th>Comparación</th>
        </tr>
      </thead>
      <tbody>
`;

  for (let i = 0; i < resultImagesBatchToCompare.length; i++) {
    const imgv5 = `${base}${folders[0]}/${firstImagesBatchToCompare[i]}`;
    const imgv4 = `${base}${folders[1]}/${secondImagesBatchToCompare[i]}`;
    const imgresult = `${base}${folders[2]}/${resultImagesBatchToCompare[i]}`;

    html += `
    <tr>
      <td><img src="${imgv5}" alt="Ghost 5"></td>
      <td><img src="${imgv4}" alt="Ghost 4"></td>
      <td><img src="${imgresult}" alt="Comparación"></td>
    </tr>
  `;
  }
  return html;
}

(async () => await executeTest())();
