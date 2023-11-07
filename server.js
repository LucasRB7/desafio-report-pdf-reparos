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

      if(data.nivelReparo == 1 || 2) {
        return 'low'
      }else if(data.nivelReparo == 3){
        return 'medium'
      }else if(data.nivelReparo == 4 || 5){
        return 'high'
      }
    }

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
            text: 'X',
            style: severidade(),
          },

        ],
      images:{
          logo:`./src/parceiros/${data.logo}.png`,
          capa:'./src/capa.png',
          page1:'./src/page1.png',
          defeito: './src/fotos/defeito.jpg'
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
  console.log(`Server on - port ${port}`)
})