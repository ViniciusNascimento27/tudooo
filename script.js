const fs = require("fs")
const crypto = require("crypto")
let uuid = crypto.randomUUID()
const express = require("express")
const app = express()

app.use(express.json())

const salvarLogs = (name) => {
    const data = new Date();
    const day = data.getDate();
    const month = data.getMonth();
    const year = data.getFullYear();
    const hours = data.getHours();
    const minutes = data.getMinutes();
    const seconds = data.getSeconds();


    const fswrite = (uuid + ' - ' + year + ' - ' + month + ' - ' + day + ' - ' + hours + ':- ' + minutes + ' - ' + seconds + ' - ' + name + '\n')
    
    
    fs.writeFileSync("logs.txt", fswrite, {flag: 'a'})

    return uuid
    
}
 salvarLogs()


 app.post("/logs", (req, res) => {
    
    
    const {name} = req.body
        
    if(!name){
        return res.status(400).json({erro: "Nome obrigado a colocar"})
    }
    const id = salvarLogs(name)

    res.status(200).json({
        id: id,
        msg: "Pessoa registrada"
    })
 })



 app.get(`/logs`, (req, res) => {
    
    try{
        const id = req.params.id
        const dados = fs.readFileSync("logs.txt", `${id}`)
        const Linhas = dados.split('\n')
        const ID = Linhas.find(Linha => Linha.startsWith(`${id} -`))
        
        res.status(200).json({
            msg : `Dados lidos com sucesso: ${id}`,
            dados: ID
        })
   
    }catch(erro){
        res.status(500).json({erro: "Erro ao ler os logs"})
    }
 })
 
 app.listen(3000, () => {
    console.log("Servidor rodando porta 3000")
 })
