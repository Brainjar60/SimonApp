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
    this.record = this.territorio + '|' + this.proclamatore + '|' + 
                  this.dataUscita + '|' + this.dataRientro + '$'
}
function eliminaAssegnazione() {
    for (var t = 0; t < lista_assegnazioni.length; t++) {
        var iAss = lista_assegnazioni[t];
        // Ricerca per chiave
        if (iAss.territorio == lastAss.territorio) {
            lista_assegnazioni.splice(t,1); 
            addTableRows();
            break; 
        }
    }
}
function cercaAssegnazione(territorio) {
    for (var t = 0; t < lista_assegnazioni.length; t++) {
        var iAss = lista_assegnazioni[t];
        // Ricerca per chiave
        if (iAss.territorio == territorio) {
            return iAss;
        }
    }
    return null;
}
function cercaAssegnazioneStorico(territorio) {
    for (var t = 0; t < storico_assegnazioni.length; t++) {
        var iAss = storico_assegnazioni[t];
        // Ricerca per chiave
        if (iAss.territorio == territorio) {
            return iAss;
        }
    }
    return null;
}
function salvaAssegnazione(terr,proc, dataAss, dataRic) {
    for (var t = 0; t < lista_territori.length; t++) {
        var iTerr = lista_territori[t];
        // Ricerca per chiave
        if (iTerr.territorio == terr) {
            iTerr.dataUscita = dataAss;
            if (dataRic) 
                iTerr.dataRientro = dataRic; 
            lista_territori[t] = iTerr; 
            if (dataRic) {
                iTerr.proclamatore = ''; 
                lastAss = new objAssegnazione(terr, proc, dataAss, dataRic);
                storico_assegnazioni[storico_assegnazioni.length] = lastAss; 
                addStoricoRows();
                eliminaAssegnazione();
                saveDatiStorico(); 
                saveDatiAssegnazioni(); 
                break;
            } else  {
                iTerr.proclamatore = proc; 
                lista_assegnazioni[lista_assegnazioni.length] = new objAssegnazione(terr, proc, dataAss, null); 
                addTableRows();
                saveDatiAssegnazioni();
                break;
            }
            
        }
    }
    addTerritori(); 
    addTerritoriRic();
    var myselect = $("#cboTerritori");
    myselect[0].selectedIndex = 0;
    //myselect.selectmenu("refresh");
    myselect = $("#cboProclamatori");
    myselect[0].selectedIndex = 0;
    //myselect.selectmenu("refresh");    
}