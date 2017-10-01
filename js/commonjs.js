var lista_proclamatori = new Array();
var lista_territori = new Array();
var lista_territori_keys = new Array();
var lista_assegnazioni = new Array();
var storico_assegnazioni = new Array();
var terr = 'nessunTerr';
var proc = 'nessunProc';
var dataAss = '';
var lsProc = new Array(
    'ALBERTO MARINA', 'BERGAMENLLI RENATA', 'BERGAMELLI RICCARDO', 'BISONE ANNA', 'BISONE DIEGO', 'BISONE GAIA', 'BISONE GIUSY'
);
//-------------------------------------------------- PROCLAMATORE ------------------------------------------------------
function objProclamatore(cognome, nome) {
    this.cognome = '';
    if (cognome) this.cognome = cognome;
    this.nome = '';
    if (nome) this.nome = nome;
    this.nominativo = this.cognome.toUpperCase() + ' ' + this.nome.toUpperCase();
    this.id = this.cognome.toUpperCase() + '_' + this.nome.toUpperCase();
    this.ruolo = 'P';
}
function addProclamatori() {
    $('#cboProclamatori').append('<option id="nessunProc" value="nessunProc"></option>');
    
    for (var p = 0; p < lsProc.length; p++) {
        var coppia = lsProc[p].split(' ');
        var oProc = new objProclamatore(coppia[0], coppia[1]);
        lista_proclamatori[lista_proclamatori.length] = oProc;
        $('#cboProclamatori').append('<option id="' + oProc.id + '" value="' + oProc.id + '">' + oProc.nominativo + '</option>');
    }
}
function cercaProclamatore(cognome, nome) {
    for (var t = 0; t < lista_proclamatori.length; t++) {
        var iProc = lista_proclamatori[t];
        if (nome) {
            // Ricerca per cognome e nome
            if (iProc.cognome == cognome && iProc.nome == nome) {
                return iProc;
            }
        } else {
            // Ricerca per chiave
            if (iProc.id == cognome) {
                return iProc;
            }
        }
    }
    return null;
}
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
    this.dataUscita = '';
    this.dataRientro = '';
    this.proclamatore = ''; 
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
    if (lista_territori.length==0) {
        creaTerritori(); 
    }
    $('#cboTerritori').empty();
    $('#cboTerritori').append('<option id="nessunTerr" value="nessunTerr"></option>');
    for (var t = 0; t < lista_territori.length; t++) {
        var iTerr = lista_territori[t];
        if (iTerr.proclamatore == '') {
            $('#cboTerritori').append('<option id="' + iTerr.territorio + '" value="' + iTerr.territorio + '">' + iTerr.testo + '</option>');
        }
    }
    $('#cboTerritori').val($("#target option:first").val());
    //$('#cboTerritori').refresh(); 
    
}
function uscitaTerritorio(localita, numero, proclamatore, data) {
    var iTerr = cercaTerritorio(localita, numero);
    if (iTerr == null) return;
    iTerr.dataUscita = data;
    iTerr.proclamatore = proclamatore; 
}
function rientroTerritorio(localita, numero, data) {
    var iTerr = cercaTerritorio(localita, numero);
    if (iTerr == null) return;
    iTerr.dataRientro = data;
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
// -------------------------------------------------------------------------------- ASSEGNAZIONI --------------------------------------------------------
function objAssegnazione(terr, proc, dataUscita, dataRientro) {
    this.territorio = ''; // terr; 
    this.proclamatore = ''; //  proc; 
    this.dataUscita = ''; //  dataUscita;
    this.dataRientro = ''; //  dataRientro; 

    if (terr) this.territorio = terr; 
    if (proc) this.proclamatore = proc; 
    if (dataUscita) this.dataUscita = dataUscita;
    if (dataRientro) this.dataRientro = dataRientro; 
}
// -----------------------------------------------------------------------------------------------------------------------------------------------------
function selTerritorio(oggeto) {

}
function selProclamatore(oggeto) {

}
function assegnaTerritorio() {
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
        var confirmQuestion = "Assegnare il territorio " + oTerr.text + "\n" + "al Proclamatore " + oProc.text+ "\n" + "il data  " + dataAss; 
        
        if (confirm(confirmQuestion)) {
            // Save it!
            salvaAssegnazione(terr,proc, dataAss);

            //document.forms[0].refresh();
        } else {
            // Do nothing!
        }
    }
    document.location.href = "#gestione_assegnazioni";
}
function salvaAssegnazione(terr,proc, dataAss) {
    for (var t = 0; t < lista_territori.length; t++) {
        var iTerr = lista_territori[t];
        // Ricerca per chiave
        if (iTerr.territorio == terr) {
            iTerr.dataUscita = dataAss;
            iTerr.proclamatore = proc; 
            lista_territori[t] = iTerr; 
            lista_assegnazioni[lista_assegnazioni.length] = new objAssegnazione(terr, proc, dataAss, null); 
        }
    }
    addTableRows();
    addTerritori(); 
    var myselect = $("#cboTerritori");
    myselect[0].selectedIndex = 0;
    //myselect.selectmenu("refresh");
    myselect = $("#cboProclamatori");
    myselect[0].selectedIndex = 0;
    //myselect.selectmenu("refresh");    
}
function addTables() {
    addTerritori(); 
    addProclamatori();   
    addTableRows();
}
function deleteTableRows() {
    $('#assegnazioni-table > tbody').html("");
}
function addTableRows() {
    deleteTableRows();
    // var html = '<tr><th>1</th><td><a href="#">Ivrea 1</a></td><td>ALBERTO MARINA</td><td>2017-10-01</td><td></td></tr>'
    // $("#assegnazioni-table > tbody").append(html);
    // $("#assegnazioni-table").table("refresh");
    for (var a = 0; a < lista_assegnazioni.length; a++) {
        var iAss = lista_assegnazioni[a];
        var sTerr = cercaTerritorio(iAss.territorio).testo;
        var sProc = cercaProclamatore(iAss.proclamatore).nominativo;
        var html = '<tr><th>' + ( a + 1) +'</th><td><a href="#">' + 
                         sTerr + '</a></td><td>' + 
                         sProc + '</td><td>' + 
                         iAss.dataUscita + '</td><td>' + iAss.dataRientro + '</td></tr>';
        $("#assegnazioni-table > tbody").append(html);
    }
    //$("#assegnazioni-table").table("refresh");
    
}
function passaA(idDiv) {
    $('#tabella_assegnazioni').hide(); 
    $('#gestione_assegnazioni').hide(); 
    $('#gestione_territori').hide(); 

    var divObj = $('#' + idDiv);
    if (divObj)
        $('#' + idDiv).show(); 
}