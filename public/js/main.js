const cep = document.querySelector("#cep")

let endereco = {
    rescep: document.querySelector("#rescep"),
    rua: document.querySelector("#rua"),
    bairro: document.querySelector("#bairro"),
    numero: document.querySelector("#numero"),
    complemento: document.querySelector("#complemento"),
    municipio: document.querySelector("#municipio"),
    uf: document.querySelector("#uf"),
    ibge: document.querySelector("#ibge")
}

cep.addEventListener("blur", () => {

    const respcepformat = cep.value.replace(/[^0-9]/gi, "");

    if (respcepformat.length == 8) {
        setEndereco(respcepformat)
    } else {
        showMenssage("CEP INVÁLIDO")
        resetInfo()
    }
})  

function setEndereco(respcepformat){

    const url = `https://viacep.com.br/ws/${respcepformat}/json/`
    const options = {
        method: 'GET',
            mode: 'cors',
            cache: 'default' }

    fetch(url, options)
    .then((resposta) => {
        if(resposta.ok && resposta.status == 200){
            resposta.json()
            .then((dados) => {
                if(!dados["erro"]){
                    if(cep.value != endereco.rescep.value){
                        resetInfo()
                        
                        // let respcepformat = dados.cep.replace("-", "")
                        // respcepformat = dados.cep.replace(".", "")

                        endereco["rescep"].value = respcepformat
                    }

                    setNewEndereco(dados)
                    showMenssage("Localizado")

                } else{
                    showMenssage("CEP INVÁLIDO")
                    resetInfo()
                }
            })
        } else {
            console.log("Error")
        }
        
    })

    .catch((error) => {
        console.log(error)
    })
}



const reset = document.querySelector("#reset")

reset.addEventListener("click", (event) => {

    resetInfo()
    showMenssage("Digite o CEP")

    event.preventDefault()
})

function resetInfo(difere){
    if(!difere){
        endereco['rescep'].value = ''
    }
    endereco["rua"].value = ''
    endereco["numero"].value = ''
    endereco["bairro"].value = ''
    endereco["complemento"].value = ''
    endereco["municipio"].value = ''
    endereco["uf"].value = ''
    endereco["ibge"].value = ''
}

function showMenssage(msg){
    let menssage = document.querySelector("h3")
    menssage.innerHTML = msg
}

const form = document.querySelector("form")

form.addEventListener("load", (e)=> {
    e.preventDefault()
})

function setNewEndereco(dados){
    endereco["rua"].value == ''? endereco["rua"].value = (dados.logradouro == ''? endereco["rua"].value = "Não encontrado": dados.logradouro ) : false
    endereco["bairro"].value == ''? endereco["bairro"].value = (dados.bairro == ''? endereco["bairro"].value = "Não encontrado": dados.bairro ) : false
    endereco["complemento"].value == ''? endereco["complemento"].value = (dados.complemento == ''? endereco["complemento"].value = "Não encontrado": dados.complemento ) : false
    endereco["municipio"].value == ''? endereco["municipio"].value = (dados.localidade == ''? endereco["municipio"].value = "Não encontrado": dados.localidade  ) : false
    endereco["uf"].value == ''? endereco["uf"].value = (dados.uf == ''? endereco["uf"].value = "Não encontrado": dados.uf ) : false
    endereco["ibge"].value == ''? endereco["ibge"].value = (dados.ibge == ''? endereco["ibge"].value = "Não encontrado": dados.ibge ) : false
}