// Configuración general
document.addEventListener('DOMContentLoaded', function() {
  initializeLightbox();
  initializeScrollAnimations();
  initializeParallax();
  initializeSmootherScroll();
  initializeFormValidation();
});

// ============================================
// 1. LIGHTBOX MODAL MEJORADO
// ============================================
function initializeLightbox() {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.querySelector('.modal-close');
  const galeriaImages = document.querySelectorAll('.galeria img');
  let currentImageIndex = 0;

  // Abrir modal al hacer clic en imagen
  galeriaImages.forEach((img, index) => {
    img.addEventListener('click', function() {
      modal.classList.add('show');
      modalImg.src = this.src;
      currentImageIndex = index;
      document.body.style.overflow = 'hidden';
      playOpenAnimation();
    });
  });

  // Cerrar modal
  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Navegar con teclado
  document.addEventListener('keydown', function(event) {
    if (!modal.classList.contains('show')) return;
    
    if (event.key === 'Escape') {
      closeModal();
    } else if (event.key === 'ArrowRight') {
      navigateGallery(1, galeriaImages);
    } else if (event.key === 'ArrowLeft') {
      navigateGallery(-1, galeriaImages);
    }
  });

  function navigateGallery(direction, images) {
    currentImageIndex += direction;
    if (currentImageIndex >= images.length) currentImageIndex = 0;
    if (currentImageIndex < 0) currentImageIndex = images.length - 1;
    modalImg.src = images[currentImageIndex].src;
    playOpenAnimation();
  }

  function playOpenAnimation() {
    modalImg.style.animation = 'none';
    setTimeout(() => {
      modalImg.style.animation = 'zoomIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }, 10);
  }
}

// ============================================
// 2. SCROLL ANIMATIONS (Reveal on scroll)
// ============================================
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Animar elementos al hacer scroll
  const elementsToAnimate = document.querySelectorAll(
    '.galeria img, #sobre-mi img, .form-group, #servicios li'
  );
  
  elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ============================================
// 3. PARALLAX EFFECT
// ============================================
function initializeParallax() {
  const hero = document.querySelector('.hero');
  
  window.addEventListener('scroll', () => {
    if (hero) {
      const scrollPosition = window.scrollY;
      hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
  });
}

// ============================================
// 4. SMOOTH SCROLL MEJORADO
// ============================================
function initializeSmootherScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        
        const target = document.querySelector(href);
        const headerOffset = 60;
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// 5. VALIDACIÓN DE FORMULARIO
// ============================================
function initializeFormValidation() {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');
    
    // Validaciones simples
    if (!nombre.value.trim()) {
      showError(nombre, 'El nombre es requerido');
      return;
    }
    
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      showError(email, 'Email inválido');
      return;
    }
    
    if (!mensaje.value.trim()) {
      showError(mensaje, 'El mensaje es requerido');
      return;
    }

    // Si todo es válido, mostrar confirmación
    showSuccess();
    form.reset();
  });

  function showError(input, message) {
    input.style.borderColor = '#ff006e';
    input.style.boxShadow = '0 0 20px rgba(255, 0, 110, 0.3)';
    
    let error = input.nextElementSibling;
    if (error && error.classList.contains('error-msg')) {
      error.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-msg';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff006e';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '-15px';
    input.parentNode.insertBefore(errorDiv, input.nextSibling);

    setTimeout(() => {
      input.style.borderColor = '';
      input.style.boxShadow = '';
      if (errorDiv) errorDiv.remove();
    }, 3000);
  }

  function showSuccess() {
    const button = form.querySelector('button');
    const originalText = button.textContent;
    button.textContent = '✓ Mensaje enviado!';
    button.style.background = 'linear-gradient(135deg, #00d4ff 0%, #8338ec 100%)';
    
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
    }, 3000);
  }
}

// ============================================
// 6. EFECTOS DINÁMICOS ADICIONALES
// ============================================

// Animar números al llegar a la sección
window.addEventListener('scroll', () => {
  const nav = document.querySelector('header');
  if (window.scrollY > 50) {
    nav.style.boxShadow = '0 10px 40px rgba(0, 212, 255, 0.15)';
  } else {
    nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
  }
});
