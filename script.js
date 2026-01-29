document.addEventListener("DOMContentLoaded", () => {

  /* ================= MODAL ================= */
  const modal = document.getElementById("demoModal");
  const modalClose = modal.querySelector(".modal-close");
  const ctaButtons = document.querySelectorAll(".cta-btn");

  ctaButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      modal.classList.add("open");
    });
  });

  modalClose.addEventListener("click", () => {
    modal.classList.remove("open");
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("open");
  });

  /* ================= DEMO FORM ================= */
  const demoForm = document.getElementById("demoForm");

  demoForm.addEventListener("submit", e => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(demoForm).entries());
    console.log("Demo Request:", data);

    demoForm.reset();
    modal.classList.remove("open");
    showToast("Thanks! Our team will contact you shortly.");
  });

  /* ================= FAQ ACCORDION ================= */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");
      faqItems.forEach(i => i.classList.remove("active"));
      if (!isOpen) item.classList.add("active");
    });
  });

  /* ================= PRICING TOGGLE ================= */
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  const priceValue = document.getElementById("priceValue");

  const pricing = {
    monthly: { price: 2499, suffix: "/month" },
    yearly: { price: 2499 * 10, suffix: "/year" }
  };

  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      toggleBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const mode = btn.dataset.mode;
      const data = pricing[mode];
      priceValue.innerHTML = `₹${data.price.toLocaleString("en-IN")} <span>${data.suffix}</span>`;
    });
  });

  /* ================= ROI CALCULATOR LOGIC ================= */
const custRange = document.getElementById("custRange");
const aovRange = document.getElementById("aovRange");
const marginRange = document.getElementById("marginRange");

const custVal = document.getElementById("custVal");
const aovVal = document.getElementById("aovVal");
const marginVal = document.getElementById("marginVal");
const monthlySubVal = document.getElementById("monthlySubVal");

const annualGain = document.getElementById("annualGain");
const gaugeFill = document.getElementById("gaugeFill");

const y1 = document.getElementById("y1");
const y2 = document.getElementById("y2");
const y3 = document.getElementById("y3");
const y4 = document.getElementById("y4");
const y5 = document.getElementById("y5");
const y6 = document.getElementById("y6");

function formatINR(n) {
  return "₹ " + Math.round(n).toLocaleString("en-IN");
}

function updateSlider(slider) {
  const percent = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background = `linear-gradient(to right, #6366f1 ${percent}%, #e5e7eb ${percent}%)`;
}

function calculateROI() {
  const customers = +custRange.value;
  const aov = +aovRange.value;
  const margin = +marginRange.value / 100;

  const monthlyRevenue = customers * aov * margin;
  const yearlyIncrease = monthlyRevenue * 12 * 0.2;

  custVal.textContent = customers.toLocaleString("en-IN");
  aovVal.textContent = aov.toLocaleString("en-IN");
  marginVal.textContent = margin * 100;

  monthlySubVal.textContent = (monthlyRevenue * 0.05).toLocaleString("en-IN");
  annualGain.textContent = yearlyIncrease.toLocaleString("en-IN");

  const gaugePercent = Math.min(yearlyIncrease / 300000, 1);
  gaugeFill.style.strokeDashoffset = 282 - 282 * gaugePercent;

  const base = yearlyIncrease * 0.8;
  y1.textContent = formatINR(base);
  y2.textContent = formatINR(base * 1.15);
  y3.textContent = formatINR(base * 1.3);
  y4.textContent = formatINR(base * 1.45);
  y5.textContent = formatINR(base * 1.6);
  y6.textContent = formatINR(base * 1.8);

  updateSlider(custRange);
  updateSlider(aovRange);
  updateSlider(marginRange);
}

[custRange, aovRange, marginRange].forEach(slider => {
  slider.addEventListener("input", calculateROI);
});

calculateROI();

  /* ================= TOAST ================= */
  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 50);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

});
/* ================= ONBOARDING INTERACTION ================= */
document.querySelectorAll(".onboarding-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.classList.add("active");
  });

  card.addEventListener("mouseleave", () => {
    card.classList.remove("active");
  });
});
