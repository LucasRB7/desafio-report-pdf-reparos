//#region express
const express = require("express");
const cors = require("cors");
const app = express();
const QuickChart = require("quickchart-js");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
const port = 3002;
//#endregion
//#region endpoints
let dados = {
  aero: "AeroDark-23",
  blade: "BladeBattery",
  date: "25/11/2023",
  logo: "dnv",
  eexecutora: "ArtWind",
  tecnicos: [
    { nome: "Davison Martin", id: "1" },
    { nome: "Alane Stam", id: "2" },
  ],
  metodoAcesso: "interno",
  fotoDefeito: "def1",
  nivelReparo: 3,
  tipoReparo: "Internal",
  gpsLocation: "unnamed Road, Parnaíba - PI",
  process: [
    { nome: "Griding", hours: 6, allright: true },
    { nome: "Scarfing", hours: 8, allright: true },
    { nome: "Laminade", hours: 4, allright: true },
    { nome: "Postcure", hours: 6, allright: true },
    { nome: "HardnessTest", hours: 9, allright: true },
    { nome: "Finishing", hours: 3, allright: true },
    { nome: "Painting", hours: 4, allright: true },
  ],
  standByCustumer: "value",
  inneficiencyHours: 1,
  startDate: "08/08/2022",
  finalDate: "01/11/2023",
  conformances: 1,
  comments:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", //Max 220 caracteres
  DemagesWidth: "300 mm",
  DemagesLength: "200 mm",
  DemagesDistanceToHub: "500 mm",
  tipeMaterial: ["Biax", "Triax"],
  materialData: [
    {
      resina: "Resina epóxi",
      lote: "568996",
      expiration: "23/11/2024",
      description:
        "A resina poliéster é uma resina sintética que é mais barata que a resina epóxi. No entanto, ela é menos resistente e durável.",
    },
    {
      resina: "Resina poliéster",
      lote: "577796",
      expiration: "23/8/2024",
      description:
        "A resina fenólica é uma resina sintética que é conhecida por sua alta resistência ao calor e à corrosão. No entanto, ela é mais pesada e menos flexível que a resina epóxi.",
    },
  ],
};

//#region graficos
const grafico1 = new QuickChart();
grafico1
  .setConfig({
    type: "bar",
    data: {
      labels: [
        `${dados.process[0].nome}`,
        `${dados.process[1].nome}`,
        `${dados.process[2].nome}`,
      ],
      datasets: [
        {
          label: "Horas",
          data: [
            dados.process[0].hours,
            dados.process[1].hours,
            dados.process[2].hours,
          ],
          backgroundColor: ["blue"],
        },
      ],
    },
  })
  .setWidth(250)
  .setHeight(250)
  .setBackgroundColor("transparent")
  .setFormat("png");

grafico1.toFile("./src/graficos/grafico1.png");

const grafico2 = new QuickChart();
grafico2
  .setConfig({
    type: "bar",
    data: {
      labels: [
        `${dados.process[3].nome}`,
        `${dados.process[4].nome}`,
        `${dados.process[5].nome}`,
        `${dados.process[6].nome}`,
      ],
      datasets: [
        {
          label: "Horas",
          data: [
            dados.process[3].hours,
            dados.process[4].hours,
            dados.process[5].hours,
            dados.process[6].hours,
          ],
          backgroundColor: ["blue"],
        },
      ],
    },
  })
  .setWidth(250)
  .setHeight(250)
  .setBackgroundColor("transparent")
  .setFormat("png");

// const result = async() =>{
//   return(await grafico2.toDataUrl())
// }

grafico2.toFile("./src/graficos/grafico2.png");

const grafico3 = new QuickChart();
grafico3
  .setConfig({
    type: "bar",
    data: {
      labels: [
        `${dados.process[0].nome}`,
        `${dados.process[1].nome}`,
        `${dados.process[2].nome}`,
        `${dados.process[3].nome}`,
        `${dados.process[4].nome}`,
        `${dados.process[5].nome}`,
        `${dados.process[6].nome}`,
      ],
      datasets: [
        {
          label: "Hours",
          data: [
            dados.process[0].hours,
            dados.process[1].hours,
            dados.process[2].hours,
            dados.process[3].hours,
            dados.process[4].hours,
            dados.process[5].hours,
            dados.process[6].hours,
          ],
          backgroundColor: "#36a2eb",
          borderColor: "#313E5E",
          borderWidth: 2,
        },
      ],
    },
  })
  .setWidth(530)
  .setHeight(260)
  .setFormat("png");

grafico3.toFile("./src/graficos/grafico3.png");

const graficoPosCura = new QuickChart();
graficoPosCura
  .setConfig({
    type: "line",
    data: {
      labels: ["Dia 1", "Dia 2", "Dia 3", "Dia 4", "Dia 5"],
      datasets: [
        {
          label: "Tempo de Recuperação (horas)",
          data: [9, 8, 8, 7, 5],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
  .setWidth(800)
  .setHeight(400)
  // .setBackgroundColor('transparent')
  .setFormat("jpeg");

graficoPosCura.toFile("./src/graficos/graficoPosCura.png");

//#endregion Graficos

app.get("/infor/pdf", (req, res) => {
  const fonts = {
    Roboto: {
      normal: "fonts/Roboto-Regular.ttf",
      bold: "fonts/Roboto-Medium.ttf",
      italics: "fonts/Roboto-Italic.ttf",
      bolditalics: "fonts/Roboto-MediumItalic.ttf",
    },
  };

  const PdfPrinter = require("pdfmake");
  const printer = new PdfPrinter(fonts);
  const data = dados;

  const severidade = () => {
    switch (data.nivelReparo) {
      case 1:
        return "low";
      case 2:
        return "low";
      case 3:
        return "medium";
      case 4:
        return "high";
      case 5:
        return "high";
      default:
        break;
    }
  };

  let reparoInternal = "";
  let reparoExternal = "";
  if (data.tipoReparo == "Internal") {
    reparoInternal = "modoReparoOn";
    reparoExternal = "modoReparoOff";
  } else if (data.tipoReparo == "External") {
    reparoInternal = "modoReparoOff";
    reparoExternal = "modoReparoOn";
  }

  let yes = "";
  let not = "";
  if (data.conformances == 1) {
    yes = "modoReparoOn";
    not = "modoReparoOff";
  } else if (data.conformances == 2) {
    yes = "modoReparoOff";
    not = "modoReparoOn";
  }

  const totalHrs = () => {
    let soma = 0;
    for (let index = 0; index < data.process.length; index++) {
      soma += data.process[index].hours;
    }
    return soma;
  };

  const docDefinition = {
    background: function (page) {
      if (page == 1) {
        return [
          {
            image: "capa",
            width: 595,
          },
        ];
      }
      if (page == 2) {
        return [
          {
            image: "page1",
            width: 595,
          },
        ];
      }
      if (page == 3) {
        return [
          {
            image: "page2",
            width: 595,
          },
        ];
      }
      if (page == 4) {
        return [
          {
            image: "page3",
            width: 595,
          },
        ];
      }
      if (page == 5) {
        return [
          {
            image: "page4",
            width: 595,
          },
        ];
      }
    },

    content: [
      {
        text: data.aero,
        style: "aero",
      },
      {
        text: data.blade,
        style: "blade",
      },
      {
        text: data.date,
        style: "dataFinal",
      },
      {
        image: "logo",
        width: 250,
        style: "logo",
      },
      {
        text: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
      },
      {
        alignment: "justify",
        columns: [
          [
            {
              text: data.eexecutora,
              style: "eexecutora",
            },
            {
              text: `${data.tecnicos[0].nome} e ${data.tecnicos[1].nome}`,
              style: "tecnicos",
            },
            {
              text: data.metodoAcesso,
              style: "acesso",
            },
          ],
          {
            image: "defeito",
            width: 195,
            style: "imgReparo",
          },
        ],
      },
      {
        alignment: "justify",
        columns: [
          {
            width: 345,
            text: "X",
            style: severidade(),
          },
          {
            text: "Internal",
            style: reparoInternal,
          },
          {
            text: "External",
            style: reparoExternal,
          },
        ],
      },
      {
        text: "\n\n\n\n",
      },
      {
        width: 350,
        text: data.gpsLocation,
        style: "gps",
      },
      {
        text: data.blade,
        style: "bladeAnalytics",
      },
      {
        text: data.aero,
        style: "turbineAnalytics",
      },
      {
        text: "\n\n",
      },
      {
        alignment: "justify",
        columns: [
          [
            {
              text: `${data.process[0].hours} hrs`,
              style: "griding",
            },
            {
              text: `${data.process[1].hours} hrs`,
              style: "griding",
            },
            {
              text: `${data.process[2].hours} hrs`,
              style: "griding",
            },
            {
              text: `${data.process[3].hours} hrs`,
              style: "griding",
            },
            {
              text: `${data.process[4].hours} hrs`,
              style: "griding",
            },
            {
              text: `${data.process[5].hours} hrs`,
              style: "griding",
            },
            {
              text: `${data.process[6].hours} hrs`,
              style: "griding",
            },
          ],
          [
            {
              text: data.startDate,
              style: "startDate",
            },
            {
              text: data.finalDate,
              style: "finalDate",
            },
            {
              text: `${totalHrs()} hrs`,
              style: "totalHours",
            },
            {
              text: `${data.inneficiencyHours} hrs`,
              style: "inneficiencyHours",
            },
          ],
          [
            {
              width: 170,
              height: 140,
              image: "grafico1",
              style: "graficoUp",
            },
            {
              width: 170,
              height: 140,
              image: "grafico2",
              style: "graficoDown",
            },
          ],
        ],
      },
      {
        text: "\n",
      },
      {
        alignment: "justify",
        columns: [
          [
            {
              text: "Yes",
              style: yes,
            },
            {
              text: "Not",
              style: not,
            },
          ],
          [
            {
              text: data.comments,
              style: "comments",
            },
          ],
        ],
      },

      {
        text: "\n\n\n\n\n",
      },
      {
        alignment: "justify",
        columns: [
          //primeira
          {
            image: "defeito",
            style: "reparoImg",
            width: 126,
            height: 90,
          },
          {
            image: "defeito",
            style: "reparoImg2",
            width: 126,
            height: 90,
          },
          {
            image: "defeito",
            style: "reparoImg3",
            width: 126,
            height: 90,
          },

          {
            image: "defeito",
            style: "reparoImg4",
            width: 126,
            height: 90,
          },
        ],
      },
      {
        alignment: "justify",
        columns: [
          //segunda
          {
            image: "defeito",
            style: "reparoImg5",
            width: 126,
            height: 90,
          },
          {
            image: "defeito",
            style: "reparoImg6",
            width: 126,
            height: 90,
          },
          {
            image: "defeito",
            style: "reparoImg7",
            width: 126,
            height: 90,
          },
        ],
      },
      {
        text:'\n\n\n\n\n\n\n\n'
      },
      {
        image:'grafico3',
        style:'grafico3'
      },
      {
        text:'\n\n\n\n\n\n\n\n'
      },
      {
        text: dados.DemagesWidth,
        style: "text",
      },
      {
        text: dados.DemagesLength,
        style: "text",
      },
      {
        text: dados.DemagesDistanceToHub,
        style: "text",
      },
      {
        text: "\n\n\n\n",
      },
      {
        text: dados.tipeMaterial[0],
        style: "repair",
      },
      {
        text: dados.tipeMaterial[1],
        style: "repair",
      },
      {
        text: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
      },

      {
        image: "graficoPosCura",
        width: 400,
        height: 200,
        style: "graficoPosCura",
      },
      {
        text: "\n\n\n\n\n\n\n\n\n\n",
      },
      {
        text: `${dados.materialData[0].resina}  \n\n  ${dados.materialData[0].lote}  \n\n ${dados.materialData[0].expiration}`,
        style: "list",
      },
      {
        text: "\n\n\n\n\n\n\n\n",
      },
      {
        text: `${dados.materialData[1].resina}  \n\n  ${dados.materialData[1].lote}  \n\n ${dados.materialData[1].expiration}`,
        style: "list",
      },
      {
        text: "\n\n\n\n\n\n",
      },
      {
        text: dados.materialData.map((e) => e.description + "\n"),
        style: "list",
      },
    ],
    images: {
      logo: `./src/parceiros/${data.logo}.png`,
      capa: "./src/capa.png",
      page1: "./src/page1.png",
      page2: "./src/page2.png",
      page3: "./src/page3.png",
      page4: "./src/page4.png",
      defeito: "./src/fotos/defeito.jpg",
      grafico1: "./src/graficos/grafico1.png",
      grafico2: "./src/graficos/grafico2.png",
      grafico3: './src/graficos/grafico3.png',
      graficoPosCura: "./src/graficos/graficoPosCura.png",
    },
    styles: {
      margPage: {
        margin: [35, 100, 0, 0],
      },
      marginGrafico: {
        margin: [0, 240, 0, 0],
      },
      repair: {
        margin: [30, 0, 0, 18],
      },
      text: {
        margin: [30, -2, 0, 18],
      },
      list: {
        margin: [60, -2, 0, 18],
      },
      aero: {
        fontSize: 18,
        bold: true,
        color: "black",
        margin: [100, 190, 0, 0],
      },
      blade: {
        fontSize: 18,
        bold: true,
        color: "black",
        margin: [100, 15, 0, 0],
      },
      dataFinal: {
        fontSize: 18,
        bold: true,
        color: "black",
        margin: [100, 12, 0, 0],
      },
      logo: {
        margin: [70, 40, 0, 0],
      },
      eexecutora: {
        fontSize: 14,
        bold: true,
        color: "black",
        margin: [110, 7, 0, 0],
      },
      tecnicos: {
        fontSize: 14,
        bold: true,
        color: "black",
        margin: [60, 18, 0, 0],
      },
      acesso: {
        fontSize: 14,
        bold: true,
        color: "black",
        margin: [105, 18, 0, 0],
      },
      imgReparo: {
        margin: [0, -2, 0, 0],
      },
      low: {
        bold: true,
        margin: [143, 30, 0, 0],
      },
      medium: {
        bold: true,
        margin: [211, 30, 0, 0],
      },
      high: {
        bold: true,
        margin: [293, 30, 0, 0],
      },
      modoReparoOn: {
        bold: true,
        color: "black",
        margin: [0, 29, 0, 0],
      },
      modoReparoOff: {
        bold: false,
        color: "#dfdfdf",
        margin: [0, 29, 0, 0],
      },
      gps: {
        fontSize: 12,
        bold: true,
        color: "black",
        margin: [85, 6, 150, 0],
      },
      bladeAnalytics: {
        fontSize: 12,
        bold: true,
        color: "black",
        margin: [40, 11, 0, 0],
      },
      turbineAnalytics: {
        fontSize: 12,
        bold: true,
        color: "black",
        margin: [90, 9, 0, 0],
      },
      griding: {
        fontSize: 12,
        bold: true,
        color: "black",
        margin: [90, 7, 0, 3],
      },
      startDate: {
        fontSize: 12,
        bold: true,
        color: "black",
        margin: [65, 6, 0, 0],
      },
      finalDate: {
        fontSize: 12,
        bold: true,
        color: "black",
        margin: [65, 10, 0, 0],
      },
      graficoUp: {
        margin: [5, -100, 0, 25],
      },
      graficoDown: {
        margin: [5, -25, 0, 25],
      },
      totalHours: {
        fontSize: 12,
        bold: true,
        color: "black",
        margin: [70, 58, 0, 0],
      },
      inneficiencyHours: {
        fontSize: 12,
        bold: true,
        color: "black",
        margin: [108, 33, 0, 0],
      },
      comments: {
        fontSize: 12,
        color: "black",
        margin: [22, 23, 0, 0],
      },
      reparoImg:{
        margin: [-15, 43, 30, 0],
      },
      reparoImg2:{
        margin: [0.5, 43, 30, 0],
      },
      reparoImg3:{
        margin: [17, 43, 30, 0],
      },
      reparoImg4:{
        margin: [32, 43, 30, 0],
      },
      reparoImg5:{
        margin: [-15, 75, 20, 0],
      },
      reparoImg6:{
        margin: [0.5, 75, 30, 0],
      },
      reparoImg7:{
        margin: [17, 75, 30, 0],
      },
      grafico3:{
        margin: [-5,0,0,0]
      },
      graficoPosCura: {
        margin: [25, -25, 0, 0],
      },
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  // pdfDoc.pipe(fs.createWriteStream('document.pdf')); -server para criar um arquivo pdf- voce pode escolher o caminho = ('caminho/document.pdf')
  const chunks = [];
  pdfDoc.on("data", (chunk) => {
    chunks.push(chunk);
  });
  pdfDoc.end();
  pdfDoc.on("end", () => {
    const result = Buffer.concat(chunks);
    res.end(result);
  });
});

//#endregion

app.listen(port, () => {
  console.log(`  Server On - Port${port}
  Ctrl + Clique>>>  http://localhost:${port}/infor/pdf`);
});
