const cep = document.querySelector("#cep")
const reset = document.querySelector("#reset")
const form = document.querySelector("form")

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

let respcepformat = ""

cep.addEventListener("blur", () => {
    respcepformat = cep.value.replace(/[^0-9]/gi, "");
    formatCEP(respcepformat)
})  

cep.addEventListener("keypress", (event) => {
    respcepformat = cep.value.replace(/[^0-9]/gi, "");
    if(event.keyCode == 13){
        formatCEP(respcepformat)
    }
})


function formatCEP(respcepformat){
    if (respcepformat.length == 8) {
        setEndereco(respcepformat)
    } else {
        cep.focus()
        showMenssage("CEP INVÁLIDO")
        resetInfo()
    }
}

function setEndereco(respcepformat){

    const url = `https://viacep.com.br/ws/${respcepformat}/json/`
    const options = {
        method: 'GET',
            mode: 'cors',
            cache: 'default' }

    fetch(url, options)
    .then((resposta) => {
        showMenssage("Aguarde")
        if(resposta.ok && resposta.status == 200){
            showMenssage("")
            resposta.json()
            .then((dados) => {
                
                if(!dados["erro"]){
                    if(cep.value != endereco.rescep.value){
                        resetInfo()
                        endereco["rescep"].value = respcepformat
                    }

                    setNewEndereco(dados)

                } else{
                    cep.focus()
                    showMenssage("CEP INVÁLIDO")
                    resetInfo()
                }
            })
        } else {
            showMenssage("")
            showMenssage("Erro ao consulta CEP ao Servidor")
        }
        
    })

    .catch((error) => {
        console.log(error)
    })
}

reset.addEventListener("click", (event) => {

    resetInfo()

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

const btnCloseMenssage = document.querySelector("#btn-close-menssage")

btnCloseMenssage.addEventListener("click", () => {
    showMenssage(msg="")
})


function showMenssage(msg){

    const outputmenssage = document.querySelector("#outputmenssage")
    
    if(outputmenssage.classList.contains("show")){
        outputmenssage.classList.remove("show")
        outputmenssage.querySelector("span").textContent = ""
    } else{
        outputmenssage.querySelector("span").textContent = msg
        outputmenssage.classList.add("show")
    }

}

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