function llenarFormulario() {
    chrome.storage.local.get(
        ["matricula", "dia", "mes", "year"],
        (data) => {
            const fields = {
                "#txtMatricula": data.matricula || "",
                "#Dia": data.dia || "1",
                "#Mes": data.mes || "1",
                "#Year": data.year || "2000"
            };
            for (const [id, val] of Object.entries(fields)) {
                const el = document.querySelector(id);
                if (el) el.value = val;
            }
        }
    );
}

const currentUrl = window.location.href;
// Solo se ejecuta en la página de login específica
if (currentUrl.includes("op=211") && currentUrl.includes("re=1")) {
    const btn = document.createElement("button");
    btn.innerText = "AUTO";
    
    // Aplicamos la clase nativa del sitio para heredar estilos base
    btn.className = "btn";

    // Estilos manuales para igualar el "contornito" (box-shadow) y el color exacto
    Object.assign(btn.style, {
        backgroundColor: "#02B394",
        backgroundImage: "linear-gradient(to bottom, #02B394, #019278)", // Degradado sutil
        color: "white",
        fontSize: "14px",
        fontWeight: "normal",
        lineHeight: "20px",
        padding: "4px 12px",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderBottomColor: "rgba(0, 0, 0, 0.25)",
        borderRadius: "4px", // El borde redondeado que faltaba
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05)",
        cursor: "pointer",
        marginRight: "8px",
        textShadow: "0 -1px 0 rgba(0, 0, 0, 0.25)",
        verticalAlign: "middle"
    });

    btn.onclick = (e) => {
        e.preventDefault();
        llenarFormulario();
    };

    // Buscamos el contenedor del botón "Acceder" para ponerlo justo al lado
    const btnAcceder = document.querySelector('input[type="submit"], #btnAcceder');
    
    if (btnAcceder && btnAcceder.parentElement) {
        btnAcceder.parentElement.insertBefore(btn, btnAcceder);
    } else {
        // Respaldo si no encuentra el contenedor
        btn.style.position = "fixed";
        btn.style.top = "365px";
        btn.style.left = "480px";
        btn.style.zIndex = "9999";
        document.body.appendChild(btn);
    }
}