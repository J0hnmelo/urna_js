let seuVotoPara = document.querySelector("#cargo > h3")
let cargoVotado = document.querySelector("#cargos")
let info = document.querySelector("#candidato")
let aviso = document.querySelector("footer")
let candidatosImg = document.querySelector("#pessoas")
let numerosVoto = document.querySelector("#voto")
let divPrefeitoSpan = document.querySelector("#prefeito>span")
let imageCandidato = document.querySelector("#imageBig")
let imageVice = document.querySelector("#imageSmall")
let spanVice = document.querySelector("#Vice>span")
let divVice = document.querySelector("#Vice")

let etapaAtual = 0
let numeroVotado = ''
let VotouBranco = false

function começarEtapa() {
    let etapa = lista[etapaAtual]
    let numeroHtml = ''
    numeroVotado = ''
    VotouBranco = false
    for(let i = 0; i < etapa.numero ; i++){
        if(i === 0){
            numeroHtml += '<div class="numeros pisca"></div>'
        } else {
            numeroHtml += '<div class="numeros"></div>'
        }
    }
    cargoVotado.innerHTML = etapa.titulo
    info.innerHTML = ''
    aviso.style.display = 'none'
    candidatosImg.style.display = 'none'
    numerosVoto.innerHTML = numeroHtml
}
function updateTela() {
    let etapa = lista[etapaAtual]
    let candidatosAvoto = etapa.candidatos.filter((item) => {
        if (item.numero === numeroVotado){
            return true
        } else {
            return false
        }
    })
    if (candidatosAvoto.length > 0){
        if(etapa.titulo === 'VEREADOR'){
            candidatosAvoto = candidatosAvoto[0]
            info.innerHTML = `        
            <div id="candidato">
                <h3>Candidato:</h3>
                <p class="especificação">Nome: <span id="name"  class="info">${candidatosAvoto.nome}</span></p>
                <p class="especificação">Partido: <span id="partido" class="info">${candidatosAvoto.partido}</span></p>
            </div>`
            aviso.style.display = 'flex'
            candidatosImg.style.display = 'flex'
            imageCandidato.style.backgroundImage = `url(${candidatosAvoto.fotos[0].url})`
            divPrefeitoSpan.innerHTML = `${etapa.titulo}`

        }
        if(etapa.titulo === 'PREFEITO'){
            divVice.classList.remove('no')
            candidatosAvoto = candidatosAvoto[0]
            info.innerHTML = `        
            <div id="candidato">
                <h3>Candidato:</h3>
                <p class="especificação">Nome: <span id="name"  class="info">${candidatosAvoto.nome}</span></p>
                <p class="especificação">Partido: <span id="partido" class="info">${candidatosAvoto.partido}</span></p>
                <p class="especificação">Vice: <span id="viceName" class="info">${candidatosAvoto.vice}</span></p>
            </div>`
            aviso.style.display = 'flex'
            candidatosImg.style.display = 'flex'
            imageCandidato.style.backgroundImage = `url(${candidatosAvoto.fotos[0].url})`
            divPrefeitoSpan.innerHTML = `${etapa.titulo}`
            imageVice.style.backgroundImage = `url(${candidatosAvoto.fotos[1].url})`
        }
    } else {
        cargoVotado.innerHTML = etapa.titulo
        info.innerHTML = ''
        aviso.style.display = 'flex'
        candidatosImg.style.display = 'none'
        info.innerHTML = '<div class = "avisoVoto pisca">VOTO NULO</div>'
    }
}

function clicar(n){
    let eLnumero = document.querySelector(".numeros.pisca")

    if(eLnumero !== null) {
        eLnumero.innerHTML = n
        numeroVotado = `${numeroVotado}${n}`
        eLnumero.classList.remove("pisca")
        if(eLnumero.nextElementSibling !== null){
            eLnumero.nextElementSibling.classList.add("pisca")// pega o proximo elemento apos o elemento atual
        } else {
            updateTela()
        }
    }
}
function confirmar(){
    let etapa = lista[etapaAtual]
    let votoConfirmado = false

    if(VotouBranco === true){
        votoConfirmado = true
        console.log("confirmado voto em branco")
    } else if (numeroVotado.length === etapa.numero){
        votoConfirmado = true
        console.log("voto confirmado")
    }
    if(votoConfirmado == true){
        etapaAtual++
        if (lista[etapaAtual] !== undefined){
            começarEtapa()
        }else{
            seuVotoPara.style.display = 'none'
            cargoVotado.innerHTML = ''
            info.innerHTML = '<div class = "avisoFim pisca">FIM!</div>'
            aviso.style.display = 'none'
            candidatosImg.style.display = 'none'
            numerosVoto.style.display = 'none'
        }
    }
}
function branco(){
    if(numeroVotado === ''){
        let etapa = lista[etapaAtual]
        VotouBranco = true
        cargoVotado.innerHTML = etapa.titulo
        aviso.style.display = 'flex'
        candidatosImg.style.display = 'none'
        info.innerHTML = '<div class = "avisoVoto pisca">VOTO BRANCO</div>'
        numerosVoto.innerHTML = ''
    } else {
        alert("Para votar em BRANCO você não pode ter preenchido nenhum número.")
    }
}
function corrigir(){
    começarEtapa()
    numeroVotado = ''
    numerosVoto.style.display = 'flex'
}
começarEtapa()
