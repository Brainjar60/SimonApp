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
        if (coppia[0].indexOf('§')>-1) {
            coppia[0] = coppia[0].replace('§', ' ');
        }
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