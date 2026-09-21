/* ==========================================================
   JUAN DIEGO PERDOMO — JAVASCRIPT PRINCIPAL
   Este archivo controla únicamente comportamiento e interacción.
   No es necesario editarlo para el diseño general.
   ========================================================== */

/* ----------------------------------------------------------
   1. CONFIGURACIÓN DEL PROYECTO CAFÉ LOS CEDROS
   ----------------------------------------------------------
   false = el proyecto aparece bloqueado como "En proceso".
   true  = el proyecto se habilita y muestra el enlace real.

   Para publicarlo posteriormente, cambia SOLO esta variable.
*/
const SHOW_CAFE_PROJECT = false;

const CAFE_PROJECT_URL = "https://cafe-los-cedros.github.io/PaginaOficial/";

/* ----------------------------------------------------------
   2. EDAD AUTOMÁTICA
   La fecha se mantiene fija como fecha de nacimiento.
   El número mostrado se calcula cada vez que se abre la página,
   así no tendrás que cambiar la edad manualmente.
*/
const birthDate = new Date(2010, 3, 28); // Mes 3 = abril en JavaScript.
const ageElement = document.getElementById("age");

function calculateAge(dateOfBirth) {
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDifference = today.getMonth() - dateOfBirth.getMonth();

    if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())
    ) {
        age--;
    }

    return age;
}

if (ageElement) {
    ageElement.textContent = `${calculateAge(birthDate)} años`;
}

/* ----------------------------------------------------------
   3. PROYECTO CAFÉ LOS CEDROS
   Cambia los textos, clases y enlace según el booleano anterior.
*/
const cafeStatus = document.getElementById("cafeStatus");
const cafeDescription = document.getElementById("cafeDescription");
const cafeLink = document.getElementById("cafeProjectLink");
const cafeCard = document.getElementById("cafeProjectCard");

function updateCafeProjectState() {
    if (!cafeStatus || !cafeDescription || !cafeLink || !cafeCard) return;

    if (SHOW_CAFE_PROJECT) {
        cafeStatus.textContent = "Publicado";

        cafeDescription.textContent =
            "Sitio web para presentar la historia, proceso, galería y contacto de un proyecto cafetero de Teruel, Huila.";

        cafeLink.href = CAFE_PROJECT_URL;
        cafeLink.target = "_blank";
        cafeLink.rel = "noopener noreferrer";
        cafeLink.textContent = "Visitar proyecto ↗";

        cafeLink.classList.remove("project-link-disabled");
        cafeLink.removeAttribute("aria-disabled");
    } else {
        cafeStatus.textContent = "En proceso";

        cafeDescription.textContent =
            "Sitio web para presentar la historia, proceso, galería y contacto de un proyecto cafetero de Teruel, Huila. Actualmente se encuentra en proceso de publicación.";

        cafeLink.href = "#";
        cafeLink.removeAttribute("target");
        cafeLink.removeAttribute("rel");
        cafeLink.textContent = "En proceso de ser publicada •";

        cafeLink.classList.add("project-link-disabled");
        cafeLink.setAttribute("aria-disabled", "true");
    }
}

updateCafeProjectState();

/* Evita que el enlace deshabilitado lleve al principio de la página. */
if (cafeLink) {
    cafeLink.addEventListener("click", (event) => {
        if (!SHOW_CAFE_PROJECT) {
            event.preventDefault();
        }
    });
}

/* ----------------------------------------------------------
   4. AÑO ACTUAL DEL FOOTER
*/
const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

/* ----------------------------------------------------------
   5. MENÚ MÓVIL
*/
const menuToggle = document.getElementById("menuToggle");
const mainMenu = document.getElementById("mainMenu");

if (menuToggle && mainMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mainMenu.classList.toggle("open");

        menuToggle.classList.toggle("open", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });

    mainMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mainMenu.classList.remove("open");
            menuToggle.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        });
    });
}

/* ----------------------------------------------------------
   6. HEADER + BARRA DE PROGRESO DE LECTURA
*/
const header = document.querySelector(".site-header");
const scrollProgress = document.getElementById("scrollProgress");

function updateScrollUI() {
    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    if (header) {
        header.classList.toggle(
            "scrolled",
            scrollTop > 20
        );
    }

    if (scrollProgress) {
        const progress =
            pageHeight > 0
                ? (scrollTop / pageHeight) * 100
                : 0;

        scrollProgress.style.width = `${progress}%`;
    }
}

window.addEventListener(
    "scroll",
    updateScrollUI,
    { passive: true }
);

updateScrollUI();

/* ----------------------------------------------------------
   7. REVEAL DE SECCIONES AL HACER SCROLL
*/
const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("visible");

                    observer.unobserve(
                        entry.target
                    );
                });
            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px 0px"
            }
        );

    revealElements.forEach((element) =>
        revealObserver.observe(element)
    );
} else {
    revealElements.forEach((element) =>
        element.classList.add("visible")
    );
}

/* ----------------------------------------------------------
   8. ENLACE ACTIVO DEL NAV SEGÚN LA SECCIÓN VISIBLE
*/
const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );

if (
    "IntersectionObserver" in window &&
    sections.length &&
    navLinks.length
) {
    const sectionObserver =
        new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting)
                        return;

                    navLinks.forEach((link) => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                                `#${entry.target.id}`
                        );
                    });
                });
            },
            {
                rootMargin:
                    "-35% 0px -55% 0px",
                threshold: 0
            }
        );

    sections.forEach((section) =>
        sectionObserver.observe(section)
    );
}