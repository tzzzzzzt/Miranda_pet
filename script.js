// EStados
let hambre = 50;//0 = sin hambre, 100 = con un chingo de hambre
let salud = 70;//normal solo indica salud de 0 a 100
let entretenimiento = 50;//igual a salud de 0 a 100

//la felicidad se calcula: (100 - hambre + salud + entretenimiento) / 3
//asi mas facil :D
let intervalID;

//recordatorios y nombre persistentes
let recordatorios = JSON.parse(localStorage.getItem("recordatorios")) || [];
//almacenamiento de recordatorios :V

let saveName = localStorage.getItem("petName") || "MirandaPet";

//barras, imagenes, recordatorios y asi :C
const petImg = document.getElementById("pet");
const barraHambre = document.getElementById("barraHambre");
const barraSalud = document.getElementById("barraSalud");
const barraEntretenimiento = document.getElementById("barraEntretenimiento");
const barraFelicidad = document.getElementById("barraFelicidad");
const listaRecordatorios = document.getElementById("listaRecordatorios");
const petNameHeading = document.getElementById("petName");
const messagebox = document.getElementById("message");

//botones pal menu
document.getElementById("btnTienda").addEventListener("click", showTienda);
document.getElementById("btnMenuJuegos").addEventListener("click", menuJuegos);

//iniciador (se viene lo chido)
document.getElementById("btnComenzar").addEventListener("click", () => {
    const input = document.getElementById("inputName");
    const chosen = input.value.trim();
    const nameToUse = chosen || saveName || "MirandaPet";
    localStorage.setItem("petName", nameToUse);
    iniciarJuego(nameToUse);
});

//matematicas (aiuaaa mi mente wey :O)
function calcularFelicidad() {
    const felicidad = Math.round(((100 - hambre) + salud + entretenimiento) / 3);
    return Math.max(0, Math.min(100, felicidad));
}

setInterval(() => {
    actualizarEstado();
}, 0); // cada frame

//actualizacion de barras segun las mates (ya no pienso ayuda)
function actualizarEstado() {
    barraHambre.value = Math.max(0, Math.min(100, hambre));
    barraSalud.value = Math.max(0, Math.min(100, salud));
    barraEntretenimiento.value = Math.max(0, Math.min(100, entretenimiento));
    barraFelicidad.value = calcularFelicidad();
    //cambio de lugares :D (cambia la imagen segun como se sienta la mascota)
    if (hambre > 75) {
        petImg.src = "hambrienta.png";
    }
    else
    if (salud < 30) {
        petImg.src = "durmiendo.png";
    }
    else {
        petImg.src = "feliz.png";
    }
    //nombrecito
    petNameHeading.textContent = localStorage.getItem("petName") || "MirandaPet";
}

//el cliente siempre tiene la razon
function alimentar() {
    hambre = Math.max(0, hambre - 25);
    salud = Math.max(100, salud + 5);
    showMessage(" 🥩 mmm Comidaaa!!! ")
    actualizarEstado();
}
function jugar() {
    entretenimiento = Math.min(100, entretenimiento + 20);
    hambre = Math.min(100, hambre + 10);
    salud = Math.max(0, salud - 2);//huuuuy se canso el niño
    showTemporaryPetFace("feliz.png", 1200);
    showMessage(" Jugaste con mirandaPet. +subio tu aura😎");
    actualizarEstado();
}
function dormir() {
    salud = Math.min(100, salud + 15);
    hambre = Math.min(100, hambre + 5);
    showTemporaryPetFace("durmiendo.png", 1200);
    showMessage(" La pet ya durmio. +salud");
    actualizacion();
}
//reinicio juego :D
function reiniciarJuego() {
    clearInterval(intervalID);
    document.getElementById("jeugo").style.display = "none";
    document.getElementById("inicio").style.display = "block";
}
function menuJuegos() {
    entretenimiento = Math.min(100, entretenimiento + 15);
    hambre = Math.min(100, hambre + 6);
    showMessage(" (Menú) Juegos: +Entretenimiento. ");
    actualizarEstado();
}
//para esto se programan los placeholder's
function showTienda() {
    showMessage(" Tienda: Próximamente más contenido :D ");
}
//calculo interno de tiempo (se te muere la pet de vieja :D)
function iniciarCiclo() {
    intervalID = setInterval(() =>{
        hambre = Math.min(100, hambre + 1);
        entretenimiento = Math.max(0, entretenimiento - 1);
        if (hambre > 80) salud = Math.max(0, salud - 2);
        else if (hambre < 40 && salud < 100) salud = Math.min(100, salud + 1);
        actualizarEstado();
    }, 2000);
}
//mensajes interactivos
function showMessage(text, ms = 1800) {
    messagebox.textContent = text;
    messagebox.style.display = "inline-block";
    clearTimeout(messagebox._hideTimer);
    messagebox._hideTimer = setTimeout(() => {
        messagebox.style.display = "none";
    }, ms);
}
//volver a imagen segun corresponda 
function showTemporaryPetFace(src, ms = 1000) {
    const original = petImg.src;
    petImg.src = src;
    setTimeout(() => {
        actualizarEstado();
    }, ms);
}
//notitas para recordar (falta implementacion completa)
function agregarRecordatorio() {
    const texto = document.getElementById("nota").value.trim();
    if (!texto) return;
    recordatorios.push(texto);
    localStorage.setItem("recordatorios", JSON.stringify(recordatorios));
    document.getElementById("nota").value = "";
    mostrarRecordatorios();
    showMessage(" Recordatorio agregado. ");
}
function mostrarRecordatorios() {
    listaRecordatorios.innerHTML = "";
    recordatorios.forEach((r, i) => {
        const li = document.createElement("li");
        li.innerHTML = `${r} <button onclick = "borrarRecordatorio(${i})">✖️</button>`;
    });
}
function borrarRecordatorio(i) {
    recordatorios.splice(i, 1);
    localStorage.setItem("recordatorios", JSON.stringify(recordatorios));
    mostrarRecordatorios();
}
//inicio
function iniciarJuego(name) {
    hambre = 50;
    salud = 70;
    entretenimiento = 50;
    localStorage.setItem("petName", name);
    document.getElementById("inicio").style.display = "none";
    document.getElementById("juego").style.display = "block";
    mostrarRecordatorios();
    actualizarEstado();
    clearInterval(intervalID);
    iniciarCiclo();
}
document.getElementById("inputName").value = localStorage.getItem("pet") || "";

mostrarRecordatorios();
