const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const testimonies = document.querySelectorAll("details");
const whatsappForm = document.querySelector("#whatsapp-form");

const updateHeader = () => {
  header?.classList.toggle("scrolled", window.scrollY > 24);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -40px" }
);

revealItems.forEach((item) => observer.observe(item));
testimonies.forEach((testimony) => {
  testimony.open = false;
  const summary = testimony.querySelector("summary");
  if (summary) summary.textContent = "Haz clic para ver el testimonio completo";
});
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

whatsappForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(whatsappForm);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const churchTime = String(data.get("churchTime") || "").trim();
  const message = String(data.get("message") || "").trim();
  if (!name || !email || !churchTime || !message) return;

  const text = `Hola, mi nombre es ${name}.\n\nCorreo: ${email}\nTiempo de estar en la iglesia: ${churchTime}\n\n¿Por qué me gustaría estar en el Equipo de Dirección?\n${message}`;
  const url = `https://wa.me/50688159164?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
