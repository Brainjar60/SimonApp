//-------------------------------------------------- TERRITORIO -------------------------------------------------------
var nIvrea = 38;
var nBurolo = 5;
var nCascinette = 9;
var nChiaverano = 15;

function objTerritorio(localita, numero) {
    this.localita = '';
    if (localita) this.localita = localita;
    this.numero = '';
    if (numero) this.numero = numero;
    this.territorio = this.localita + numero;
    this.testo = this.localita + ' ' + numero;
    this.stato = 'L';
    this.proclamatore = '';
    this.dataUscita = '';
    this.dataRientro= '';
    this.watch = this.territorio + '\n' + this.testo + '\n' + this.dataUscita + '\n' + this.dataRientro; 
}
function creaTerritori() {
    lista_territori = new Array();
    for (var t = 1; t < (nIvrea + 1); t++) {
        var oTerr = new objTerritorio("Ivrea", t);
        lista_territori[lista_territori.length] = oTerr;
    }
    for (var t = 1; t < (nBurolo + 1); t++) {
        var oTerr = new objTerritorio("Burolo", t);
        lista_territori[lista_territori.length] = oTerr;
    }
    for (var t = 1; t < (nCascinette + 1); t++) {
        var oTerr = new objTerritorio("Cascinette", t);
        lista_territori[lista_territori.length] = oTerr;
    }
    for (var t = 1; t < (nChiaverano + 1); t++) {
        var oTerr = new objTerritorio("Chiaverano", t);
        lista_territori[lista_territori.length] = oTerr;
    }
}
function addTerritori() {
    $('#cboTerritori').empty();
    $('#cboTerritori').append('<option id="nessunTerr" value="nessunTerr"></option>');
    for (var t = 0; t < lista_territori.length; t++) {
        var iTerr = lista_territori[t];
        if (iTerr.proclamatore == '') {
            $('#cboTerritori').append('<option id="' + iTerr.territorio + '" value="' + iTerr.territorio + '">' + iTerr.testo + '</option>');
        }
    }
    $('#cboTerritori').val($("#target option:first").val());
}
function addTerritoriRic(){ 
    $('#cboTerritoriRic').empty();
    $('#cboTerritoriRic').append('<option id="nessunTerr" value="nessunTerr"></option>');
    for (var t = 0; t < lista_territori.length; t++) {
        var iTerr = lista_territori[t];
        if (iTerr.proclamatore != '') {
            $('#cboTerritoriRic').append('<option id="' + iTerr.territorio + '" value="' + iTerr.territorio + '">' + iTerr.testo + '</option>');
        }
    }
    $('#cboTerritoriRic').val($("#target option:first").val());
     
    $('#proclamatoreAss').val(''); 
    $('#dataAssRie').val(''); 
}

// Cerca il territorio per localita e numero, se passo solo il primo parametro
// la funzione cerca il territorio per chiave 
// esempio : [Ivrea1] corrisponde a localita = Ivrea e numero = 1
function cercaTerritorio(localita, numero) {
    for (var t = 0; t < lista_territori.length; t++) {
        var iTerr = lista_territori[t];
        if (numero) {
            // Ricerca per localita e numero
            if (iTerr.localita == localita && iTerr.numero == numero) {
                return iTerr;
            }
        } else {
            // Ricerca per chiave
            if (iTerr.territorio == localita) {
                return iTerr;
            }
        }
    }
    return null;
}
function bloccaTerritorio(localita) {
    for (var t = 0; t < lista_territori.length; t++) {
        var iTerr = lista_territori[t];
        // Ricerca per chiave
        if (iTerr.territorio == localita) {
            lista_territori[t].proclamatore = 'A'; 
            break;
        }
    }
    return null;
}
function registraTerritorio() {
    // Individuo il value delle scelte selezionate
    // se il territorio è uguale a nessuno O il proclamatore è uguale a nessuno (OR ||)
    terr = document.getElementById('cboTerritori').value;
    proc = document.getElementById('cboProclamatori').value;
    if (terr == 'nessunTerr' || proc == 'nessunProc') {
        alert('Impossibile assegnare il territorio ....');
    } else {
        // Essendo il value coincidente con l'ID  posso ottenere l'intero oggetto option
        // Ottengo l'intero oggetto option .....
        var oTerr = document.getElementById(terr);
        // Stesso ragionamento anche per il proclamatore .... 
        var oProc = document.getElementById(proc);
        dataAss = document.getElementById('dataAss').value;
        dataRic = document.getElementById('dataRic').value;
        var confirmQuestion = "Assegnare il territorio " + oTerr.text + "\n" + "al Proclamatore " + oProc.text+ "\n" + "il data  " + dataAss; 
        
        if (confirm(confirmQuestion)) {
            // Save it!
            salvaAssegnazione(terr,proc, dataAss, dataRic);
            //document.forms[0].refresh();
        } else {
            // Do nothing!
        }
    }
    document.location.href = "#gestione_assegnazioni";
}
function datiTerritorio(objSelect) {
    var terr = objSelect.value;    
    var oTerr = cercaTerritorio(terr);
    var oAss = cercaAssegnazione(terr);
    $('#proclamatoreAss').val('');
    $('#dataAssRie').val('');
    
    if(oAss==null) 
        return;

    $('#proclamatoreAss').val('');
    $('#dataAssRie').val('');

    var oProc = cercaProclamatore(oAss.proclamatore);

    if (oProc==null) 
        return; 

    lastTerr = terr;
    lastAss = oAss;
    lastProc = oAss.proclamatore;
    $('#proclamatoreAss').val(oProc.nominativo);
    $('#dataAssRie').val(oAss.dataUscita);
}
function rientroTerritorio() {
    dataRic = document.getElementById('dataRic').value;
    if(dataRic=='') return; 
    salvaAssegnazione(lastTerr,lastProc, lastAss.dataUscita, dataRic);
}