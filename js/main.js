/**
 * MY MEDICAL CENTERS - 2026 Global Scripts
 */

// Ocean Booking Link Constants
const BOOKING_LINKS = {
  carling: {
    general: 'https://ocean.cognisantmd.com/online-booking/a7eb5850-834a-4bab-8e1d-11701aa8790e',
    nonProvincial: 'https://ocean.cognisantmd.com/online-booking/a7eb5850-834a-4bab-8e1d-11701aa8790e'
  },
  richmond: {
    existing: 'https://ocean.cognisantmd.com/online-booking/fc6b34ea-8362-46ec-a106-660f8c1c5a79',
    newPatient: 'https://ocean.cognisantmd.com/online-booking/341f072e-411a-4b7a-9966-1d16966af184',
    nonProvincial: 'https://ocean.cognisantmd.com/intake/patients.html?linkRef=341f072e-411a-4b7a-9966-1d16966af184#/online-booking'
  },
  orleans: {
    existing: 'https://ocean.cognisantmd.com/online-booking/80f54306-a63f-405e-af2c-decf0faf7408',
    general: 'https://ocean.cognisantmd.com/online-booking/2d67e44f-69a8-4c88-a00e-6f8f70944ffe',
    nonProvincial: 'https://ocean.cognisantmd.com/online-booking/2d67e44f-69a8-4c88-a00e-6f8f70944ffe'
  },
  papTest: 'https://tally.so/r/jakO8a',
  immunization: 'https://tally.so/r/Xx2K6g'
};

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initGlobalModals();
});

// Mobile Navigation
function initMobileNav() {
  const hamburger = document.getElementById('hamburgerToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  if (!hamburger || !drawer) return;

  function toggleMenu() {
    hamburger.classList.toggle('active');
    drawer.classList.toggle('open');
    document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close when clicking outside drawer content
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      toggleMenu();
    }
  });

  // Close when clicking a nav link inside drawer
  drawer.querySelectorAll('.nav-link, .nav-cta-btn').forEach(link => {
    link.addEventListener('click', () => {
      if (drawer.classList.contains('open')) {
        toggleMenu();
      }
    });
  });
}

// Global Modals Setup (Pap Test & Immunization + Health Card selector)
function initGlobalModals() {
  // Inject Pap/Immunization modal into DOM if not present
  if (!document.getElementById('papImmunModal')) {
    const papModalHTML = `
      <div class="modal-overlay" id="papImmunModal" aria-hidden="true" role="dialog">
        <div class="modal-card">
          <button class="modal-close-btn" data-close-modal aria-label="Close modal">&times;</button>
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🩺</div>
          <h3 class="modal-title">Pap Test & Immunization</h3>
          <p class="modal-desc">Please select which service you would like to request an intake form for:</p>
          <div class="modal-actions-list">
            <a href="${BOOKING_LINKS.papTest}" class="modal-action-button primary" target="_blank" rel="noopener">
              <span><strong>Pap Test Request</strong><br><small style="opacity:0.9;">Routine cervical screening form</small></span>
              <span style="font-size:1.3rem;">&rarr;</span>
            </a>
            <a href="${BOOKING_LINKS.immunization}" class="modal-action-button" target="_blank" rel="noopener">
              <span><strong>Immunization Request</strong><br><small style="color:var(--text-muted);">Vaccines & routine immunizations</small></span>
              <span style="font-size:1.3rem;">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', papModalHTML);
  }

  // Bind clicks on any Pap Test & Immunization triggers
  document.querySelectorAll('.open-pap-immun-modal').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('papImmunModal');
    });
  });

  // Global close button triggers
  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-close-modal]') || e.target.closest('[data-close-modal]')) {
      const modal = e.target.closest('.modal-overlay');
      if (modal) closeModal(modal.id);
    }
    // Click on backdrop to close
    if (e.target.classList.contains('modal-overlay')) {
      closeModal(e.target.id);
    }
  });

  // ESC key to close open modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModalElem = document.querySelector('.modal-overlay.show');
      if (openModalElem) closeModal(openModalElem.id);
    }
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    const anyModalOpen = document.querySelector('.modal-overlay.show');
    if (!anyModalOpen && !document.getElementById('mobileNavDrawer')?.classList.contains('open')) {
      document.body.style.overflow = '';
    }
  }
}

// Booking Modal Launcher for Location Pages
function triggerClinicBooking(locationKey) {
  const modalId = `${locationKey}BookingModal`;
  let modal = document.getElementById(modalId);
  if (!modal) {
    createClinicBookingModal(locationKey);
    modal = document.getElementById(modalId);
  }
  openModal(modalId);
}

function createClinicBookingModal(locationKey) {
  let contentHTML = '';

  if (locationKey === 'carling') {
    contentHTML = `
      <div class="modal-overlay" id="carlingBookingModal" aria-hidden="true" role="dialog">
        <div class="modal-card">
          <button class="modal-close-btn" data-close-modal aria-label="Close modal">&times;</button>
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.4rem;">
            <span class="status-badge accepting">Carling Location</span>
          </div>
          <h3 class="modal-title">Book at Carling</h3>
          <p class="modal-desc">Select your patient type or coverage to proceed to our secure Ocean booking portal:</p>
          <div class="modal-actions-list">
            <a href="${BOOKING_LINKS.carling.general}" target="_blank" rel="noopener" class="modal-action-button primary">
              <span><strong>Provincial Health Card</strong><br><small style="opacity:0.9;">OHIP, RAMQ, AHCIP, MSP, MSI, etc.</small></span>
              <span>&rarr;</span>
            </a>
            <a href="${BOOKING_LINKS.carling.nonProvincial}" target="_blank" rel="noopener" class="modal-action-button">
              <span><strong>Non-Provincial / Private Coverage</strong><br><small style="color:var(--text-muted);">UHIP, Refugee (IFHP), Brown Card, Out-of-pocket</small></span>
              <span>&rarr;</span>
            </a>
            <a href="WHealth.html" class="modal-action-button" style="border-left: 4px solid var(--accent-coral);">
              <span><strong>Women's Health Clinic Appointment</strong><br><small style="color:var(--text-muted);">Consultations with Dr. Keiko Chan & Dr. Sawini Fernando</small></span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    `;
  } else if (locationKey === 'richmond') {
    contentHTML = `
      <div class="modal-overlay" id="richmondBookingModal" aria-hidden="true" role="dialog">
        <div class="modal-card">
          <button class="modal-close-btn" data-close-modal aria-label="Close modal">&times;</button>
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.4rem;">
            <span class="status-badge accepting">Richmond Location</span>
          </div>
          <h3 class="modal-title">Book at Richmond</h3>
          <p class="modal-desc">Please choose your patient status to open the appropriate booking system:</p>
          <div class="modal-actions-list">
            <a href="${BOOKING_LINKS.richmond.existing}" target="_blank" rel="noopener" class="modal-action-button primary">
              <span><strong>Existing Rostered Patient</strong><br><small style="opacity:0.9;">Book follow-up or routine check-up</small></span>
              <span>&rarr;</span>
            </a>
            <a href="${BOOKING_LINKS.richmond.newPatient}" target="_blank" rel="noopener" class="modal-action-button">
              <span><strong>New Patient Registration</strong><br><small style="color:var(--text-muted);">Register with Dr. Sydney Chinagorom, Dr. Nsikak Usoroh, Dr. Alex Carrington</small></span>
              <span>&rarr;</span>
            </a>
            <a href="${BOOKING_LINKS.richmond.nonProvincial}" target="_blank" rel="noopener" class="modal-action-button">
              <span><strong>Non-Provincial Coverage / Intake</strong><br><small style="color:var(--text-muted);">UHIP, Refugee (IFHP), Private</small></span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    `;
  } else if (locationKey === 'orleans') {
    contentHTML = `
      <div class="modal-overlay" id="orleansBookingModal" aria-hidden="true" role="dialog">
        <div class="modal-card">
          <button class="modal-close-btn" data-close-modal aria-label="Close modal">&times;</button>
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.4rem;">
            <span class="status-badge accepting">Orléans Location</span>
          </div>
          <h3 class="modal-title">Book at Orléans</h3>
          <p class="modal-desc">Select your booking request for our Orléans clinic (6497 Jeanne-d'Arc Blvd N. (between shoppers drug mart and dollarama)):</p>
          <div class="modal-actions-list">
            <a href="${BOOKING_LINKS.orleans.existing}" target="_blank" rel="noopener" class="modal-action-button primary">
              <span><strong>Existing Rostered Patient</strong><br><small style="opacity:0.9;">Book with your family physician</small></span>
              <span>&rarr;</span>
            </a>
            <a href="${BOOKING_LINKS.orleans.general}" target="_blank" rel="noopener" class="modal-action-button">
              <span><strong>New Patient / General Booking</strong><br><small style="color:var(--text-muted);">Dr. Iqbal Kashif, Dr. Imran Malik, Dr. Hasnain Sadiq</small></span>
              <span>&rarr;</span>
            </a>
            <a href="dr-sadiku.html" class="modal-action-button" style="border-left: 4px solid var(--accent-purple);">
              <span><strong>Psychiatric Clinic (Dr. Olayemi Sadiku)</strong><br><small style="color:var(--text-muted);">Physician referrals & intake guidelines</small></span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  if (contentHTML) {
    document.body.insertAdjacentHTML('beforeend', contentHTML);
  }
}
