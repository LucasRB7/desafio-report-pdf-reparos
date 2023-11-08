//#region express
const express = require('express');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors({
  origin:'*'
}));
const port = 3002;
//#endregion
//#region endpoints
let dados = {
  aero:'AeroDark-23',
  blade:'BladeBattery',
  date: '25/11/2023',
  logo:'SPIC',
  eexecutora: 'ArtWind',
  tecnicos: [
    {nome:'Davison Martin' , id:'1'},
    {nome:'Alane Stam' , id:'2'}
  ],
  metodoAcesso:'interno',
  fotoDefeito:'def1',
  nivelReparo: 5,
  tipoReparo: 'Internal',
  gpsLocation: 'unnamed Road, Parnaíba - PI',
  griding: '855304',
  laminade: 'Alto',
  etc: 'value',
  finishing: 'em andamento',
  totalHours: 450,
  standByCustumer: 'value',
  inneficiencyHours: 110,
  startDate: '08/08/2022',
  finalDate: '01/11/2023',

}



app.get("/infor/pdf", (req, res) => {
   
  const fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
      }
    };
    
    const PdfPrinter = require('pdfmake');
    const QuickChart = require('quickchart-js');
    const printer = new PdfPrinter(fonts);
    const fs = require('fs');
    const data = dados;

    const severidade =  () =>{
      switch (data.nivelReparo) {
        case 1:
          return 'low'  
        case 2:
          return 'low' 
        case 3:
          return 'medium' 
        case 4:
          return 'high'
        case 5:
          return 'high'    
        default:
          break;
      }
    }

    let reparoInternal = '';
    let reparoExternal = '';
    if(data.tipoReparo == 'Internal'){
      reparoInternal = 'modoReparoOn'
      reparoExternal = 'modoReparoOff'
    }else if(data.tipoReparo == 'External'){
      reparoInternal = 'modoReparoOff'
      reparoExternal = 'modoReparoOn'
    }

    const grafico1 = new QuickChart();
    grafico1
      .setConfig({
        type: 'polarArea',
        data: {
          labels: [`${data.startDate}`, `${data.finalDate}`],
          datasets: [
            { label: [0] [1] , data: [data.totalHours, data.inneficiencyHours] }
          ],
        },
      })
      .setWidth(350)
      .setHeight(350)
      .setBackgroundColor('transparent')
      .setFormat('png')   
      
      // async function base64(){
      //   const url = await grafico1.getShortUrl();
      //   console.log(url);
      //   return url;
      // }

      // console.log(base64())
      
    
    grafico1.toFile('./src/graficos/grafico1.png')
    

    const docDefinition = {
      background: function (page) {              
          if(page == 1){
              return [                
                  {
                      image:'capa',
                      width:595,
                  },                    
              ];
          }     
          if(page == 2){
              return [                
                  {
                      image:'page1',
                      width:595,
                  },                    
              ];
          } 
          if(page == 3){
            return [                
                {
                    image:'page2',
                    width:595,
                },                    
            ];
        }         
          
      },

              
      content: 
        [
          {
              text:  data.aero,
              style: "aero"
          },
          {
              text: data.blade,
              style: "blade"
          },
          {
              text: data.date,
              style: "dataFinal"
          },
          {
              image: 'logo',
              width: 250,
              style: 'logo'
          },
          {
              text: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
          },
          {
            alignment: 'justify',
            columns: [
              [
                {
                  text:  data.eexecutora,
                  style: "eexecutora"
                },
                {                  
                  text:  `${data.tecnicos[0].nome} e ${data.tecnicos[1].nome}`,
                  style: "tecnicos"
                },
                {
                  text:  data.metodoAcesso,
                  style: "acesso"
                }
              ]
              ,
              {
                image: 'defeito',
                width: 195, 
                style:'imgReparo'           
              }
            ]
          },
          {
            alignment: 'justify',
            columns:[
              {
                width:345,
                text: 'X',
                style: severidade(),
              },
              {
                text: 'Internal',
                style: reparoInternal
              },
              {
                text: 'External',
                style: reparoExternal
              }
            ]
          },
          {
            text:'\n\n\n\n'
          },
          {
            width: 350,
            text: data.gpsLocation,
            style: 'gps'
          },
          {
            text: data.blade,
            style: 'bladeAnalytics'
          },
          {
            text: data.aero,
            style: 'turbineAnalytics'
          },      
          {
            text:'\n\n'
          },
          {
            alignment: 'justify',
            columns:[
              [
                {
                text: data.griding,
                style: 'griding'
                },
                {
                text: data.laminade,
                style: 'griding'
                },  
                {
                  text: data.etc,
                  style: 'griding'
                },
                {
                  text: data.totalHours,
                  style: 'totalHours'
                },
                {
                  text: data.inneficiencyHours,
                  style: 'inneficiencyHours'
                },
              ],
              [
                {
                  text: data.startDate,
                  style: 'startDate'
                },
                {
                  text: data.finalDate,
                  style: 'startDate'
                },
              ],
              [
                {
                  width: 185,
                  image: 'grafico1',
                  style: 'grafico'
                },
              ]                  
            ]
          },
          
          {
            text:'\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
          },
         {
          alignment: 'justify',
          columns:[
            //primeira
            {
              image:'defeito'
  
            },
            {
              image:'defeito'
  
            },
          ]
         }
        ],
      images:{
          logo:`./src/parceiros/${data.logo}.png`,
          capa:'./src/capa.png',
          page1:'./src/page1.png',
          page2:'./src/page2.png',
          defeito: './src/fotos/defeito.jpg',
          grafico1: './src/graficos/grafico1.png'

      },
      styles:{
          aero:{
              fontSize: 18,
              bold: true,
              color: "black",
              margin: [100, 190 , 0 , 0]
          },
          blade:{
              fontSize: 18,
              bold: true,
              color: "black",
              margin: [100, 15 , 0 , 0]
          },
          dataFinal:{
              fontSize: 18,
              bold: true,
              color: "black",
              margin: [100, 12 , 0 , 0]
          },
          logo:{
              margin: [70,40,0,0]
          },
          eexecutora:{
            fontSize: 14,
            bold: true,
            color: "black",
            margin: [110, 7  , 0 , 0]
          },
          tecnicos:{
            fontSize: 14,
            bold: true,
            color: "black",
            margin: [60, 18 , 0 , 0]
          },
          acesso:{
            fontSize: 14,
            bold: true,
            color: 'black',
            margin: [105, 18, 0 , 0 ]
          },
          imgReparo:{
            margin: [0, -2, 0 , 0],
          },
          low:{
            bold: true,
            margin: [143, 30, 0, 0]
          },
          medium:{
            bold: true,
            margin: [211, 30, 0, 0]
          },
          high:{
            bold: true,
            margin: [293, 30, 0, 0]
          },
          modoReparoOn:{
            bold: true,
            color: 'black',
            margin: [0, 29, 0, 0]
          },
          modoReparoOff:{
            bold: false,
            color: 'gray',
            margin: [0, 29, 0, 0]
          },
          gps:{
            fontSize: 12,
            bold: true,
            color: 'black',
            margin: [85, 6, 150, 0]
          },
          bladeAnalytics:{
            fontSize: 12,
            bold: true,
            color: 'black',
            margin: [40, 11, 0, 0]
          },
          turbineAnalytics:{
            fontSize: 12,
            bold: true,
            color: 'black',
            margin: [90, 9, 0, 0]
          },
          griding:{
            fontSize: 12,
            bold: true,
            color: 'black',
            margin: [65, 7, 0, 3]
          },
          startDate:{
            fontSize: 12,
            bold: true,
            color: 'black',
            margin: [85, 8, 0, 0]
          },
          grafico:{
            margin: [-8, -60, 0, 19]
          },
          totalHours:{
            fontSize: 12,
            bold: true,
            color: 'black',
            margin: [70, 30, 0, 0]
          },
          inneficiencyHours:{
            fontSize: 12,
            bold: true,
            color: 'black',
            margin: [108, 34, 0, 0]
          }

      }
    };
    
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    // pdfDoc.pipe(fs.createWriteStream('document.pdf')); -server para criar um arquivo pdf- voce pode escolher o caminho = ('caminho/document.pdf') 
    const chunks = [];
    pdfDoc.on('data', (chunk) =>{
      chunks.push(chunk)
    });
    pdfDoc.end();
    pdfDoc.on("end", ()=>{
      const result = Buffer.concat(chunks);
      res.end(result)
    })
});

//#endregion

app.listen(port, () => {
  console.log(`  Server On - Port${port}
  Ctrl + Clique>>>  http://localhost:${port}/infor/pdf`)
})