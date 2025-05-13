const fs = require("fs")
const crypto = require("crypto")
let uuid = crypto.randomUUID()
const express = require("express")
const app = express()



const salvarLogs = (name) => {
    const data = new Date();
    const dia = data.getDate();
    const mes = data.getMonth();
    const year = data.getFullYear();
    const hora = data.getHours();
    const minutos = data.getMinutes();
    const segundos = data.getSeconds();


    const fswrite = (uuid + ' - ' + year + ' - ' + mes + ' - ' + dia + ' - ' + hora + ':- ' + minutos + ' - ' + segundos + ' - ' + name + '\n')
    fs.writeFileSync("logs.txt", fswrite, {flag: 'a'})
    
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



 app.get(`/:id`, (req, res) => {
    try{
        const id = req.params.id
        const dados = fs.readFileSync("logs.txt", `${id}`)
        const dadosID = dados.find(dado => dado.startsWith(`${id} -`))
        res.status(200).json({
            msg : `Dados lidos com sucesso para o ID: ${id}`,
            dados: dadosID
        })
    }catch(erro){
        res.status(500).json({erro: "Erro ao ler os logs"})
    }
 })
 app.listen(3000, () => {
    console.log("Servidor rodando porta 3000")
 })
