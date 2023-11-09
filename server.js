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
  logo:'DNV',
  eexecutora: 'ArtWind',
  tecnicos: [
    {nome:'Davison Martin' , id:'1'},
    {nome:'Alane Stam' , id:'2'}
  ],
  metodoAcesso:'interno',
  fotoDefeito:'def1',
  nivelReparo: 3,
  tipoReparo: 'Internal',
  gpsLocation: 'unnamed Road, Parnaíba - PI',
  griding: 6,
  scarfing: 8,
  laminade: 4,
  postcure: 6,
  hardnessTest: 9,
  finishing: 3,
  painting:4,
  standByCustumer: 'value',
  inneficiencyHours: 1,
  startDate: '08/08/2022',
  finalDate: '01/11/2023',
  conformances: 1,
  comments: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' //Max 220 caracteres
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

    let yes = '';
    let not = '';
    if(data.conformances == 1){
      yes = 'modoReparoOn'
      not = 'modoReparoOff'
    }else if(data.conformances == 2){
      yes = 'modoReparoOff'
      not = 'modoReparoOn'
    }

    const totalHrs = () =>{
      return (data.griding + data.scarfing + data.laminade + data.postcure + data.hardnessTest + data.finishing + data.painting)
    }

    const grafico1 = new QuickChart();
    grafico1
      .setConfig({
        type: 'bar',
        data: {
          labels: ["Griding", "Scarfing","Laminade"],
          datasets: [
            { 
              label: 'Horas' , data: [data.griding, data.scarfing ,data.laminade],
              backgroundColor: ['blue'] 
            }        
          ],
        },
      })
      .setWidth(250)
      .setHeight(250)
      .setBackgroundColor('transparent')
      .setFormat('png')   
      
      // async function base64(){
      //   const url = await grafico1.getShortUrl();
      //   console.log(url);
      //   return url;
      // }

      // console.log(base64())
      
    
    grafico1.toFile('./src/graficos/grafico1.png')

    const grafico2 = new QuickChart();
    grafico2
      .setConfig({
        type: 'bar',
        data: {
          labels: ["Postcure", "Hardness Test","Finishing", "Painting"],
          datasets: [
            { 
              label: 'Horas' , data: [data.postcure, data.hardnessTest ,data.finishing, data.painting],
              backgroundColor: ['blue'] 
            }        
          ],
        },
      })
      .setWidth(250)
      .setHeight(250)
      .setBackgroundColor('transparent')
      .setFormat('png')   
      
      // async function base64(){
      //   const url = await grafico1.getShortUrl();
      //   console.log(url);
      //   return url;
      // }

      // console.log(base64())
      
    
    grafico2.toFile('./src/graficos/grafico2.png')
    

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
                text: `${data.griding} hrs`,
                style: 'griding'
                },
                {
                text: `${data.scarfing} hrs`,
                style: 'griding'
                },  
                {
                  text: `${data.laminade} hrs`,
                  style: 'griding'
                },
                {
                  text: `${data.postcure} hrs`,
                  style: 'griding'
                },
                {
                  text: `${data.hardnessTest} hrs`,
                  style: 'griding'
                },
                {
                  text: `${data.finishing} hrs`,
                  style: 'griding'
                },
                 {
                  text: `${data.painting} hrs`,
                  style: 'griding'
                },
                
              ],
              [
                {
                  text: data.startDate,
                  style: 'startDate'
                },
                {
                  text: data.finalDate,
                  style: 'finalDate'
                },
                {
                  text:  `${totalHrs()} hrs`,
                  style: 'totalHours'
                },
                {
                  text:  `${data.inneficiencyHours} hrs`,
                  style: 'inneficiencyHours'
                },
              ],
              [
                {
                  width: 170,
                  height:140,
                  image: 'grafico1',
                  style: 'graficoUp'
                },
                {
                  width: 170,
                  height:140,
                  image: 'grafico2',
                  style: 'graficoDown'
                },
              ],           
            ],            
          },
          {
            text:'\n'
          },
          {
            alignment:'justify',
            columns:[
              [
                {
                  text:  "Yes",
                  style:  yes
                },
                {
                  text:  "Not",
                  style:  not
                },
              ],
              [
                {
                  text: data.comments,
                  style: 'comments'
                }
              ]      
            ]
          },
          
          {
            text:'\n\n\n\n\n'
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
          grafico1: './src/graficos/grafico1.png',
          grafico2: './src/graficos/grafico2.png'

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
            color: '#dfdfdf',
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
            margin: [85, 7, 0, 3]
          },
          startDate:{
            fontSize: 12,
            bold: true,
            color: 'black',
            margin: [65, 6, 0, 0]
          },
          finalDate:{
            fontSize: 12,
            bold: true,
            color: 'black',
            margin: [65, 10, 0, 0]
          },
          graficoUp:{
            margin: [5, -100, 0, 25]
          },
          graficoDown:{
            margin: [5, -25, 0, 25]
          },
          totalHours:{
            fontSize: 12,
            bold: true,
            color: 'black',
            margin: [70, 58, 0, 0]
          },
          inneficiencyHours:{
            fontSize: 12,
            bold: true,
            color: 'black',
            margin: [108, 33, 0, 0]
          },
          comments:{
            fontSize: 12,
            color: 'black',
            margin: [22, 23, 0, 0]
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