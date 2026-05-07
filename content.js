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

function inyectarBotonOriginal() {
    // Si ya existe el botón o no estamos en la página de login, abortamos
    if (document.getElementById("btn-auto-uth") || !window.location.href.includes("op=211")) {
        return;
    }

    const btn = document.createElement("button");
    btn.id = "btn-auto-uth";
    btn.innerText = "AUTO";
    btn.className = "btn"; // Hereda la clase de la UTH

    // Tus estilos exactos para el diseño de "gemelo idéntico"
    Object.assign(btn.style, {
        backgroundColor: "#02B394",
        backgroundImage: "linear-gradient(to bottom, #02B394, #019278)",
        color: "white",
        fontSize: "14px",
        fontWeight: "normal",
        lineHeight: "20px",
        padding: "4px 12px",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderBottomColor: "rgba(0, 0, 0, 0.25)",
        borderRadius: "4px",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05)",
        cursor: "pointer",
        marginRight: "8px",
        textShadow: "0 -1px 0 rgba(0, 0, 0, 0.25)",
        verticalAlign: "middle",
        height: "30px"
    });

    btn.onclick = (e) => {
        e.preventDefault();
        llenarFormulario();
    };

    // Buscamos el botón de Acceder original
    const btnAcceder = document.querySelector('input[type="submit"], #btnAcceder');

    if (btnAcceder && btnAcceder.parentElement) {
        // Se coloca justo a la izquierda del botón Acceder
        btnAcceder.parentElement.insertBefore(btn, btnAcceder);
    }
}

// El "seguro" para que aparezca aunque la página cargue lento
const loopDeteccion = setInterval(() => {
    inyectarBotonOriginal();
}, 1000);

// Detenemos el loop después de 10 segundos para no saturar
setTimeout(() => clearInterval(loopDeteccion), 10000);