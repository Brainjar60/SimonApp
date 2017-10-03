var lista_proclamatori = new Array();
var lista_territori = new Array();
var lista_territori_keys = new Array();
var lista_assegnazioni = new Array();
var storico_assegnazioni = new Array();
var terr = 'nessunTerr';
var proc = 'nessunProc';
var dataAss = '';
var lsProc = new Array(
    "Alberto Marina"
    ,"Andreoli Antonella" 
    ,"Andreoli Giandomenico" 
    ,"Baldassa Patrizia" 
    ,"Beratto Anelina" 
    ,"Bergamelli Renata"  
    ,"Bergamelli Riccardo" 
    ,"Bisone Anna" 
    ,"Bisone Diego"  
    ,"Bisone Gaia" 
    ,"Bisone Giusy" 
    ,"Bisone Piero" 
    ,"Blefari Adriana" 
    ,"Boato Davide" 
    ,"Boato Sara" 
    ,"Boggio Clementina" 
    ,"Boggio Renato" 
    ,"Borea Rosy" 
    ,"Cedroni Marco" 
    ,"Cedroni Sulamita" 
    ,"Cigna Elisa" 
    ,"Cigna Stefano" 
    ,"Codispoti Simone" 
    ,"Del§Bello Lorenzo" 
    ,"Del§Bello Lucia"
    ,"Del§Bello Massimo" 
    ,"Doretto Ines"
    ,"Elifani Giuseppe" 
    ,"Elifani Luca"
    ,"Elifani Simona"
    ,"Marica Giole"
    ,"Marica Ignazio" 
    ,"Marica Manuela"
    ,"Marica Misael" 
    ,"Menaldino Chiara" 
    ,"Menaldino Davide"  
    ,"Menaldino Silvana"
    ,"Merlino Carmen"
    ,"Merlino Vittorio"
    ,"Miatto Carla"
    ,"Miatto Giorgio"
    ,"Noro Edda"
    ,"Noro Fausto"
    ,"Panizza Mario" 
    ,"Panizza Susi" 
    ,"Perrotta Giovanna"
    ,"Perrotta Nicole"
    ,"Perrotta Vito"
    ,"Ravetto Filippo"
    ,"Ravetto Franco"
    ,"Ravetto Maria"
    ,"Ravetto Silvia"
    ,"Romano Alice"
    ,"Romano Loredana"
    ,"Rima Claudia"
    ,"Rima Luciano" 
    ,"Savarese Ciro"
    ,"Savarese Luisa"  
    ,"Scagliotti Angela"  
    ,"Scagliotti Giuseppe" 
    ,"Sorze Tiziana" 
    ,"Speranza Milena"  
);
var lastTerr;
var lastAss;
var lastProc;


// -----------------------------------------------------------------------------------------------------------------------------------------------------
function addTables() {
    if (lista_territori.length==0) {
        creaTerritori(); 
    }
    readDatiAssegnazioni(); 
    readDatiStorico(); 
    addTerritori(); 
    addTerritoriRic(); 
    addProclamatori();   
    addTableRows();
    addStoricoRows(); 
}
function addTableRows() {
    $('#assegnazioni-table > tbody').html("");
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
    
}
function addStoricoRows() {
    $('#storico-table > tbody').html("");
    for (var a = 0; a < storico_assegnazioni.length; a++) {
        var iAss = storico_assegnazioni[a];
        var sTerr = cercaTerritorio(iAss.territorio).testo;
        var sProc = cercaProclamatore(iAss.proclamatore).nominativo;
        var html = '<tr><th>' + ( a + 1) +'</th><td><a href="#">' + 
                         sTerr + '</a></td><td>' + 
                         sProc + '</td><td>' + 
                         iAss.dataUscita + '</td><td>' + iAss.dataRientro + '</td></tr>';
        $("#storico-table > tbody").append(html);
    }
}
function passaA(idDiv) {
    $('#storico_assegnazioni').hide(); 
    $('#tabella_assegnazioni').hide(); 
    $('#gestione_riconsegne').hide(); 
    $('#gestione_assegnazioni').hide();
    $('#gestione_territori').hide(); 

    var divObj = $('#' + idDiv);
    if (divObj)
        $('#' + idDiv).show(); 
}

function readDatiAssegnazioni(){
    lista_assegnazioni = new Array();
    
    var dataToRead = window.localStorage.getItem('assegnazioni'); 

    if (dataToRead==null) return; 

    var lista = dataToRead.split('$');
    for (var l = 0; l<lista.length; l++) {
        var aAss = new Array();
        if (lista[l]==null || lista[l]=='')
            break
        aAss = lista[l].split('|'); 
        var oAss = new objAssegnazione(aAss[0], aAss[1], aAss[2], aAss[3]); 
        lista_assegnazioni[lista_assegnazioni.length] = oAss; 
        bloccaTerritorio(aAss[0]);
        oAss = null; 
    }
}
function readDatiStorico(){
    storico_assegnazioni = new Array();

    var dataToRead = window.localStorage.getItem('storico'); 

    if (dataToRead==null) return; 
    
    var lista = dataToRead.split('$');
    for (var l = 0; l<lista.length; l++) {
        var aAss = new Array();
        aAss = lista[l].split('|'); 
        if (aAss[0]>'') {
            var oAss = new objAssegnazione(aAss[0], aAss[1], aAss[2], aAss[3]); 
            storico_assegnazioni[storico_assegnazioni.length] = oAss; 
            oAss = null; 
        }
    }   
}
function deleteAssegnazioni() {
    window.localStorage.setItem('assegnazioni', "");     
    lista_assegnazioni = new Array();
}
function deleteStorico() {
    window.localStorage.setItem('storico', '');     
    storico_assegnazioni = new Array();
}
function saveDatiAssegnazioni(){
    var dataToSave = ""; 
    for (var t=0; t<lista_assegnazioni.length; t++){
        var oAss = lista_assegnazioni[t];
        dataToSave += oAss.record; 
    } 
    window.localStorage.setItem('assegnazioni', dataToSave); 
}
function saveDatiStorico(){
    var dataToSave = ""; 
    for (var t=0; t<storico_assegnazioni.length; t++){
        var oAss = storico_assegnazioni[t];
        dataToSave += oAss.record; 
    } 
    window.localStorage.setItem('storico', dataToSave); 
}