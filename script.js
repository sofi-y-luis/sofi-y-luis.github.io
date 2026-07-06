const WEDDING = {
  couple: "Sofía & Luis",
  dateISO: "2026-10-10T17:00:00-03:00",
  dateText: "Sábado 10 de octubre de 2026 · 17:00 h",
  ceremony: {
    name: "Iglesia de Cerro Blanco, Til Til",
    address: "Panamericana Norte S/N, kilómetro 38, Til Til",
    mapsUrl: "https://www.google.com/maps/place/Iglesia+de+Cerro+Blanco/@-33.1597855,-70.8304705,1011m/data=!3m2!1e3!4b1!4m6!3m5!1s0x966299003ed1f501:0x5eb46f5c49fae7a2!8m2!3d-33.1597855!4d-70.8278902!16s%2Fg%2F11xf38mxfp?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D",
    embedUrl: "https://www.google.com/maps?q=Iglesia%20de%20Cerro%20Blanco%2C%20Til%20Til&z=15&output=embed"
  },
  reception: {
    name: "Centro de Eventos",
    address: "Andrés Bello 398, Til Til",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Andr%C3%A9s%20Bello%20398%20Til%20Til",
    embedUrl: "https://www.google.com/maps?q=Andr%C3%A9s%20Bello%20398%2C%20Til%20Til&z=15&output=embed"
  },
  contact: {
    whatsappNumber: "56942700723"
  },
  links: {
    googlePhotos: "https://photos.app.goo.gl/wu8K3VKtTCs8gnqh7",
    spotify: "https://open.spotify.com/playlist/4hy8zOiTNJQg7jGgVLXBJX?si=DUFQguI0Q0iU609MLDPADA&pt=0107e08eef05be227965b9aea9d40bc1&pi=sxgLYykGTDKPs"
  },
  bank: {
    holder: "Por definir",
    rut: "Por definir",
    bank: "Por definir",
    accountType: "Por definir",
    accountNumber: "Por definir",
    email: "Por definir"
  }
};

const $ = (selector) => document.querySelector(selector);

function setupEnvelope() {
  const screen = $("#envelopeScreen");
  const opener = $("#openInvitation");
  if (!screen || !opener) return;

  document.body.classList.add("no-scroll");

  const open = () => {
    screen.classList.add("opened");
    document.body.classList.remove("no-scroll");
    setTimeout(() => screen.remove(), 900);
  };

  opener.addEventListener("click", open);
  opener.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  });
}

function setupReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
}

function updateCountdown() {
  const eventDate = new Date(WEDDING.dateISO).getTime();
  const now = Date.now();
  const diff = Math.max(eventDate - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const set = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(value).padStart(2, "0");
  };

  set("days", days);
  set("hours", hours);
  set("minutes", minutes);
  set("seconds", seconds);
}

function setupLinks() {
  const mapsCeremonia = $("#mapsCeremonia");
  const mapsFiesta = $("#mapsFiesta");
  const ceremonyEmbed = $("#ceremonyMapEmbed");
  const receptionEmbed = $("#receptionMapEmbed");
  const photosButton = $("#photosButton");
  const spotifyButton = $("#spotifyButton");
  const photosButtonText = $("#photosButtonText");
  const spotifyButtonText = $("#spotifyButtonText");

  if (mapsCeremonia) mapsCeremonia.href = WEDDING.ceremony.mapsUrl;
  if (mapsFiesta) mapsFiesta.href = WEDDING.reception.mapsUrl;
  if (ceremonyEmbed) ceremonyEmbed.src = WEDDING.ceremony.embedUrl;
  if (receptionEmbed) receptionEmbed.src = WEDDING.reception.embedUrl;
  if (photosButton) photosButton.href = WEDDING.links.googlePhotos;
  if (photosButtonText) photosButtonText.href = WEDDING.links.googlePhotos;
  if (spotifyButton) spotifyButton.href = WEDDING.links.spotify;
  if (spotifyButtonText) spotifyButtonText.href = WEDDING.links.spotify;

  [photosButton, photosButtonText, spotifyButton, spotifyButtonText].forEach((button) => {
    if (!button) return;
    button.addEventListener("click", (event) => {
      if (button.getAttribute("href") === "#") {
        event.preventDefault();
        alert("Este enlace aún está pendiente de configurar.");
      }
    });
  });
}

function setupCalendar() {
  const button = $("#calendarButton");
  if (!button) return;

  button.addEventListener("click", () => {
    const title = encodeURIComponent("Matrimonio Sofía & Luis");
    const details = encodeURIComponent("Ceremonia religiosa y celebración. Se solicita llegar al menos 30 minutos antes.");
    const location = encodeURIComponent(`${WEDDING.ceremony.name}, ${WEDDING.ceremony.address}`);
    const start = "20261010T200000Z"; // 17:00 Chile continental, UTC-3.
    const end = "20261011T030000Z";
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
    window.open(url, "_blank", "noopener");
  });
}

function setupBank() {
  const showButton = $("#showBankButton");
  const copyButton = $("#copyBankButton");
  const box = $("#bankBox");
  if (!showButton || !box) return;

  const fields = {
    bankHolder: WEDDING.bank.holder,
    bankRut: WEDDING.bank.rut,
    bankName: WEDDING.bank.bank,
    bankAccount: `${WEDDING.bank.accountType} · ${WEDDING.bank.accountNumber}`,
    bankEmail: WEDDING.bank.email
  };

  Object.entries(fields).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  });

  showButton.addEventListener("click", () => {
    box.hidden = !box.hidden;
    showButton.textContent = box.hidden ? "Ver datos de transferencia" : "Ocultar datos";
  });

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const text = [
        "Datos de transferencia - Sofía & Luis",
        `Titular: ${WEDDING.bank.holder}`,
        `RUT: ${WEDDING.bank.rut}`,
        `Banco: ${WEDDING.bank.bank}`,
        `Tipo de cuenta: ${WEDDING.bank.accountType}`,
        `Número de cuenta: ${WEDDING.bank.accountNumber}`,
        `Correo: ${WEDDING.bank.email}`
      ].join("\n");

      try {
        await navigator.clipboard.writeText(text);
        copyButton.textContent = "Datos copiados";
        setTimeout(() => copyButton.textContent = "Copiar datos", 1800);
      } catch {
        alert(text);
      }
    });
  }
}

function setupRSVP() {
  const form = $("#rsvpForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const nombre = data.get("nombre")?.toString().trim();
    const asistencia = data.get("asistencia")?.toString();
    const alimentacion = data.get("alimentacion")?.toString().trim() || "No indica";
    const mensaje = data.get("mensaje")?.toString().trim() || "Sin mensaje adicional";

    const text = [
      "Hola, confirmo mi asistencia al matrimonio de Sofía & Luis.",
      `Nombre: ${nombre}`,
      `Asistencia: ${asistencia}`,
      `Restricción alimentaria: ${alimentacion}`,
      `Mensaje: ${mensaje}`
    ].join("\n");

    const url = `https://wa.me/${WEDDING.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
  });
}

function init() {
  setupEnvelope();
  setupReveal();
  setupLinks();
  setupCalendar();
  setupBank();
  setupRSVP();
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

document.addEventListener("DOMContentLoaded", init);
