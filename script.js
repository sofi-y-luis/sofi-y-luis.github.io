// Edita solo este bloque para cambiar la información principal de la invitación.
const INVITACION = {
  novia: "Sofía",
  novio: "Luis",
  fechaISO: "2026-10-10T17:00:00-03:00",
  fechaTexto: "10 de octubre de 2026 · 17:00 hrs",
  ceremoniaNombre: "Iglesia Cerro Blanco",
  ceremoniaDireccion: "Til Til, Región Metropolitana",
  ceremoniaMaps: "https://www.google.com/maps/search/?api=1&query=Iglesia%20Cerro%20Blanco%20Til%20Til",
  celebracionNombre: "Lugar por confirmar",
  celebracionDireccion: "Pronto compartiremos más detalles.",
  whatsappNumero: "56900000000",
  whatsappMensaje: "Hola, confirmo mi asistencia al matrimonio de S&L."
};

function setText(id, text) {
  const element = document.getElementById(id);
  if (element) element.textContent = text;
}

function setHref(id, href) {
  const element = document.getElementById(id);
  if (element) element.href = href;
}

function hydrateContent() {
  setText("nombreNovia", INVITACION.novia);
  setText("nombreNovio", INVITACION.novio);
  setText("fechaPrincipal", INVITACION.fechaTexto);
  setText("ceremoniaNombre", INVITACION.ceremoniaNombre);
  setText("ceremoniaDireccion", INVITACION.ceremoniaDireccion);
  setText("celebracionNombre", INVITACION.celebracionNombre);
  setText("celebracionDireccion", INVITACION.celebracionDireccion);
  setHref("mapsCeremonia", INVITACION.ceremoniaMaps);

  const encodedMessage = encodeURIComponent(INVITACION.whatsappMensaje);
  setHref("whatsappButton", `https://wa.me/${INVITACION.whatsappNumero}?text=${encodedMessage}`);
}

function updateCountdown() {
  const target = new Date(INVITACION.fechaISO).getTime();
  const now = Date.now();
  const diff = Math.max(target - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  setText("days", String(days).padStart(2, "0"));
  setText("hours", String(hours).padStart(2, "0"));
  setText("minutes", String(minutes).padStart(2, "0"));
  setText("seconds", String(seconds).padStart(2, "0"));
}

hydrateContent();
updateCountdown();
setInterval(updateCountdown, 1000);
