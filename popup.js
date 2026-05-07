const guardarBtn = document.getElementById("guardar");

guardarBtn.onclick = () => {

    const matricula =
        document.getElementById("matricula").value;

    const dia =
        document.getElementById("dia").value;

    const mes =
        document.getElementById("mes").value;

    const year =
        document.getElementById("year").value;

    chrome.storage.local.set({

        matricula: matricula,
        dia: dia,
        mes: mes,
        year: year

    });

    alert("Datos guardados");

};