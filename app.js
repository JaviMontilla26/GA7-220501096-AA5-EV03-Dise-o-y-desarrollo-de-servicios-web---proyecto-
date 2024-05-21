//Importar la libreria
const express = require("express");

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
    res.render("clienteform");
});

app.post("/", function(req,res){
    const datos = req.body;

    let id = datos.id;
    let nom = datos.nom;
    let tel = datos.tel;
    let direc = datos.direc;
    let est = datos.est;

    let registrar = "INSERT INTO clientes (idClientes, Nombre, Telefono, Direccion, Estado) VALUES ('"+id +"', '"+nom +"','"+tel+"', '"+direc +"', '"+est +"') ";

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

 