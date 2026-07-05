// Configuración principal de la invitación.
// Cambia solo este bloque para modificar datos, direcciones, WhatsApp y fecha.
const INVITACION = {
  novia: "Sofía",
  novio: "Luis",
  fechaISO: "2026-10-10T17:00:00-03:00",
  fechaTexto: "10 de octubre de 2026 · 17:00 hrs",

  ceremoniaNombre: "Iglesia de Cerro Blanco",
  ceremoniaDireccion: "Tiltil, Región Metropolitana",
  ceremoniaMaps: "https://www.google.com/maps/search/?api=1&query=Iglesia%20Cerro%20Blanco%20Tiltil",

  celebracionNombre: "Lugar por confirmar",
  celebracionDireccion: "Pronto compartiremos más detalles.",

  whatsappNumero: "56900000000",
  whatsappMensaje: "Hola, confirmo mi asistencia al matrimonio de Sofía y Luis.",

  calendarTitle: "Matrimonio Sofía y Luis",
  calendarDescription: "Ceremonia de matrimonio. Se solicita llegar al menos 30 minutos antes.",
  calendarLocation: "Iglesia de Cerro Blanco, Tiltil, Región Metropolitana",
  calendarEndISO: "2026-10-10T19:00:00-03:00"
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
  setText("horarioTitulo", INVITACION.fechaTexto.split("·")[1]?.trim() || "17:00 hrs");
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

function formatCalendarDate(isoString) {
  return new Date(isoString)
    .toISOString()
    .replace(/[-:]/g, "")
    .split(".")[0] + "Z";
}

function downloadCalendarInvite() {
  const start = formatCalendarDate(INVITACION.fechaISO);
  const end = formatCalendarDate(INVITACION.calendarEndISO);
  const safeText = (text) => String(text).replace(/\n/g, "\\n").replace(/,/g, "\\,");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SofiaLuis//Invitacion//ES",
    "BEGIN:VEVENT",
    `UID:matrimonio-sofia-luis-${Date.now()}@githubpages`,
    `DTSTAMP:${formatCalendarDate(new Date().toISOString())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${safeText(INVITACION.calendarTitle)}`,
    `DESCRIPTION:${safeText(INVITACION.calendarDescription)}`,
    `LOCATION:${safeText(INVITACION.calendarLocation)}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "matrimonio-sofia-luis.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function setupRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  elements.forEach((element) => observer.observe(element));
}

hydrateContent();
updateCountdown();
setupRevealAnimations();
setInterval(updateCountdown, 1000);

document.getElementById("calendarButton")?.addEventListener("click", downloadCalendarInvite);
