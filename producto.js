//Importar la libreria
const express = require("express");

//conexion BD
let mysql = require("mysql");


let conexion = mysql.createConnection({
    host:"localhost",
    database: "indupartes",
    user: "root",
    password: "jugo2024"
});

conexion.connect(function(err){
    if(err){
        throw err;
    }else{
        console.log("conexion exitosa");
    }
})

//Objetos para llamar los metodos de express
const app = express();

//Configuraciones
app.set("view engine", "ejs");

//Datos que vienen desde pagina
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", function(req, res){
    res.render("productoform");
});

app.post("/", function(req,res){
    const datos = req.body;
    
    let id = datos.id;
    let nom = datos.nom;
    let mot = datos.mot;
    let prec = datos.prec;
    let cant = datos.cant;
    let int = datos.int;
    let ext = datos.ext;
    let long = datos.long;
    let prec_caj = datos.prec_caj;

    let registrar = "INSERT INTO guias (idguias, Nombre, Motor, Precio, Cantidad_caja, Interior, Exterior, Longitud, Precio_caja) VALUES ('"+id  +"', '"+nom  +"', '"+mot  +"', '"+prec  +"', '"+cant  +"', '"+int  +"', '"+ext  +"', '"+long  +"', '"+prec_caj  +"')";

    conexion.query(registrar, function(error){
        if(error){
            throw error;
        }else{
            console.log("Datos almacenados correctamente")
        }
    })

});

//Ruta de archivos estaticos
app.use(express.static("public"));

//Configurar el puerto usado para el servidor local
app.listen(3000,function(){
    console.log("El servidor es http://localhost:3000");
});
