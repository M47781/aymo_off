/**
 * AYMEN (AYMO) — PREMIUM BIO LINK
 * Vanilla JavaScript Engine
 * Features: Seamless Tab Switching, Algerian Order Form & Wilaya Calculator, 
 * Share & Copy Handlers, Floating Particles & Counter.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------
  // 0. PRELOADER — EXACT 3-SECOND CINEMATIC ENGINE
  // -------------------------------------------------------------
  const initPreloader = (onComplete) => {
    const preloader = document.getElementById('pagePreloader');
    const fill = document.getElementById('preloaderBarFill');
    const counter = document.getElementById('preloaderCounter');
    const status = document.getElementById('preloaderStatusMsg');

    if (!preloader) {
      document.body.classList.remove('preloader-locked');
      document.body.classList.add('page-revealed');
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    document.body.classList.add('preloader-locked');

    const TOTAL_DURATION = 3000; // Exact 3.0 seconds (3000ms)
    const startTime = performance.now();

    const stages = [
      { at: 0, text: 'جاري استدعاء النصوص ورواية بذرة الأمل...' },
      { at: 25, text: 'تهيئة الروابط الرسمية وقنوات التواصل...' },
      { at: 55, text: 'صياغة الحكايات ومشاعر الأمل...' },
      { at: 85, text: 'اكتمال التجربة الرقمية...' },
      { at: 99, text: 'مرحباً بكم في عالمي ✨' }
    ];

    let completed = false;

    const frame = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / TOTAL_DURATION);
      const percent = Math.floor(progress * 100);

      if (fill) fill.style.width = `${(progress * 100).toFixed(1)}%`;
      if (counter) counter.textContent = `${percent}%`;

      if (status) {
        for (let i = stages.length - 1; i >= 0; i--) {
          if (percent >= stages[i].at) {
            status.textContent = stages[i].text;
            break;
          }
        }
      }

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else if (!completed) {
        completed = true;
        // 4 seconds completed: smooth cinematic exit
        setTimeout(() => {
          preloader.classList.add('preloader-hidden');
          document.body.classList.remove('preloader-locked');
          document.body.classList.add('page-revealed');

          if (typeof onComplete === 'function') {
            onComplete();
          }

          setTimeout(() => {
            preloader.style.display = 'none';
          }, 800);
        }, 100);
      }
    };

    requestAnimationFrame(frame);
  };

  // -------------------------------------------------------------
  // 1. INTERACTIVE FLOATING STARDUST & CELESTIAL CANVAS
  // -------------------------------------------------------------
  const initAmbientCanvas = () => {
    const canvas = document.getElementById('ambientCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouseX = -9999, mouseY = -9999;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize, { passive: true });
    resize();

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouseX = -9999;
      mouseY = -9999;
    });

    const COUNT = window.innerWidth < 768 ? 45 : 85;
    for (let i = 0; i < COUNT; i++) {
      const typeChoice = Math.random();
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        color: typeChoice > 0.6 ? '255, 25, 60' : typeChoice > 0.25 ? '212, 175, 55' : '255, 240, 210',
        alpha: Math.random() * 0.5 + 0.2,
        speedY: Math.random() * 0.6 + 0.25,
        speedX: (Math.random() - 0.5) * 0.35,
        pulseVal: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        isStar: Math.random() > 0.75
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint constellation links between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 70) {
            const lineAlpha = (1 - dist / 70) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 40, 70, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw particles & interactive motion
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Smooth upwards drift with sine wave sway
        p.y -= p.speedY;
        p.x += Math.sin(p.pulseVal) * 0.4 + p.speedX;
        p.pulseVal += p.pulseSpeed;

        // Mouse gentle deflection
        if (mouseX > 0) {
          const mdx = p.x - mouseX;
          const mdy = p.y - mouseY;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 110 && mDist > 0) {
            const force = (1 - mDist / 110) * 2.2;
            p.x += (mdx / mDist) * force;
            p.y += (mdy / mDist) * force;
          }
        }

        const currentAlpha = Math.max(0.1, p.alpha * (0.6 + 0.4 * Math.sin(p.pulseVal)));

        // Screen wrap-around
        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        // Draw glowing ember
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
        ctx.shadowBlur = p.radius * 4;
        ctx.shadowColor = `rgba(${p.color}, 0.8)`;
        ctx.fill();

        // Star flare for select particles
        if (p.isStar && currentAlpha > 0.45) {
          const flareLen = p.radius * 2.8;
          ctx.beginPath();
          ctx.moveTo(p.x - flareLen, p.y);
          ctx.lineTo(p.x + flareLen, p.y);
          ctx.moveTo(p.x, p.y - flareLen);
          ctx.lineTo(p.x, p.y + flareLen);
          ctx.strokeStyle = `rgba(255, 245, 220, ${currentAlpha * 0.75})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      requestAnimationFrame(animate);
    };
    animate();
  };
  initAmbientCanvas();

  // -------------------------------------------------------------
  // 2. CURSOR SPOTLIGHT FOLLOWER
  // -------------------------------------------------------------
  const initCursor = () => {
    const cursor = document.getElementById('cursorGlow');
    if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let curX = targetX, curY = targetY;

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    }, { passive: true });

    const render = () => {
      curX += (targetX - curX) * 0.15;
      curY += (targetY - curY) * 0.15;
      cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
      requestAnimationFrame(render);
    };
    render();
  };
  initCursor();

  // -------------------------------------------------------------
  // 3. TOAST POPUP NOTIFICATION
  // -------------------------------------------------------------
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  let toastTimer = null;

  const showToast = (message) => {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('visible');
    }, 3000);
  };

  // -------------------------------------------------------------
  // 4. TAB / PILL SWITCHER & CTA LINK HANDLERS
  // -------------------------------------------------------------
  const navPills = document.querySelectorAll('.nav-pill');
  const tabContents = document.querySelectorAll('.tab-content');

  const switchTab = (tabName, smoothScroll = false) => {
    navPills.forEach((p) => {
      p.classList.toggle('active', p.getAttribute('data-tab') === tabName);
    });

    tabContents.forEach((tab) => {
      tab.classList.toggle('active', tab.id === `tab-${tabName}`);
    });

    if (smoothScroll) {
      const targetElement = document.getElementById(`tab-${tabName}`) || document.querySelector('.biolink-nav-tabs');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  navPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const targetTab = pill.getAttribute('data-tab');
      switchTab(targetTab, false);
    });
  });

  // Handle CTA buttons in Hero Box
  const ctaButtons = document.querySelectorAll('.neon-cta-row a[href^="#tab-"]');
  ctaButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const href = btn.getAttribute('href');
      const tabName = href.replace('#tab-', '');
      switchTab(tabName, true);
    });
  });

  // -------------------------------------------------------------
  // 5. SHARE BIO LINK & COPY ACTIONS
  // -------------------------------------------------------------
  const shareBioBtn = document.getElementById('shareBioBtn');
  if (shareBioBtn) {
    shareBioBtn.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: 'AYMEN (AYMO) — Bio Link',
          text: 'الرابط الرسمي للكاتب والروائي وصانع المحتوى أيمن (AYMO) — مؤلف رواية بذرة الأمل',
          url: window.location.href
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('تم نسخ رابط البايو بنجاح! 📋');
        }).catch(() => {
          showToast('رابط الموقع: ' + window.location.href);
        });
      }
    });
  }

  const copyEmailBioBtn = document.getElementById('copyEmailBioBtn');
  if (copyEmailBioBtn) {
    copyEmailBioBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('https://wa.me/qr/SSEPKBSWPJ5WE1').then(() => {
        showToast('تم نسخ رابط واتساب الرسمي! 💬');
      }).catch(() => {
        showToast('@AYMO_OFF');
      });
    });
  }

  // -------------------------------------------------------------
  // 6. QUICK CONTACT FORM
  // -------------------------------------------------------------
  const bioContactForm = document.getElementById('bioContactForm');
  if (bioContactForm) {
    bioContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('bioName');
      const email = document.getElementById('bioEmail');
      const msg = document.getElementById('bioMessage');

      if (!name.value.trim() || !email.value.trim() || !msg.value.trim()) {
        showToast('يرجى ملء جميع الحقول المطلوبة');
        return;
      }

      const submitBtn = document.getElementById('bioSubmitBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'جاري الإرسال...';
      }

      setTimeout(() => {
        showToast('تم إرسال رسالتك بنجاح! شكراً لتواصلك.');
        bioContactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.querySelector('span').textContent = 'تم الإرسال بنجاح ✓';
          setTimeout(() => {
            submitBtn.querySelector('span').textContent = 'إرسال الرسالة';
          }, 3000);
        }
      }, 1000);
    });
  }

  // -------------------------------------------------------------
  // 7. NOVEL ORDER FORM ENGINE (FORMULAIRE DE COMMANDE)
  // -------------------------------------------------------------
  const orderModal = document.getElementById('orderModal');
  const closeOrderModalBtn = document.getElementById('closeOrderModalBtn');
  const openOrderModalBtns = document.querySelectorAll('.open-order-modal');
  const novelOrderForm = document.getElementById('novelOrderForm');
  const orderSuccessScreen = document.getElementById('orderSuccessScreen');
  const resetOrderBtn = document.getElementById('resetOrderBtn');

  const orderWilaya = document.getElementById('orderWilaya');
  const deliveryHomeCard = document.getElementById('deliveryHomeCard');
  const deliveryDeskCard = document.getElementById('deliveryDeskCard');
  const homePriceLabel = document.getElementById('homePriceLabel');
  const deskPriceLabel = document.getElementById('deskPriceLabel');

  const qtyMinusBtn = document.getElementById('qtyMinusBtn');
  const qtyPlusBtn = document.getElementById('qtyPlusBtn');
  const orderQtyVal = document.getElementById('orderQtyVal');
  const orderBooksPrice = document.getElementById('orderBooksPrice');
  const orderShippingCost = document.getElementById('orderShippingCost');
  const orderTotalCost = document.getElementById('orderTotalCost');

  const BOOK_PRICE = 1100; // 1,100 DZD per book as shown in user screenshot
  let currentQty = 1;
  let currentMethod = 'home'; // 'home' or 'desk'
  let currentShipping = 0;

  // Open modal
  const openModal = () => {
    if (orderModal) {
      orderModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  // Close modal
  const closeModal = () => {
    if (orderModal) {
      orderModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  openOrderModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeOrderModalBtn) {
    closeOrderModalBtn.addEventListener('click', closeModal);
  }

  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && orderModal && orderModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Calculate Shipping fee based on Wilaya code and delivery method
  const getShippingRates = (wilayaCode) => {
    if (!wilayaCode) return { home: null, desk: null };
    const code = parseInt(wilayaCode, 10);

    // Alger
    if (code === 16) {
      return { home: 450, desk: 300 };
    }
    // Blida, Boumerdes, Tipaza
    if ([9, 35, 42].includes(code)) {
      return { home: 500, desk: 350 };
    }
    // Grand Nord / Proche
    if ([10, 15, 26, 44].includes(code)) {
      return { home: 550, desk: 400 };
    }
    // Nord / Côtes / Grandes villes (Oran, Constantine, Setif, Annaba, Tlemcen, etc.)
    if ([2, 6, 13, 18, 19, 21, 22, 23, 24, 25, 27, 29, 31, 34, 36, 43, 46, 48].includes(code)) {
      return { home: 650, desk: 450 };
    }
    // Hauts plateaux & Centre-Sud
    if ([3, 4, 5, 7, 8, 12, 14, 17, 20, 28, 38, 39, 40, 41, 45, 47, 51, 55, 57, 58].includes(code)) {
      return { home: 750, desk: 550 };
    }
    // Grand Sud / Sahara lointain (Adrar, Tamanrasset, Illizi, Tindouf, Timimoun, In Salah, etc.)
    return { home: 950, desk: 750 };
  };

  const updateCalculations = () => {
    const booksTotal = currentQty * BOOK_PRICE;
    if (orderBooksPrice) {
      orderBooksPrice.textContent = `${booksTotal.toLocaleString('fr-FR')} دج`;
    }

    const selectedOption = orderWilaya ? orderWilaya.options[orderWilaya.selectedIndex] : null;
    const wilayaCode = selectedOption ? selectedOption.getAttribute('data-code') : null;

    if (!wilayaCode) {
      if (homePriceLabel) homePriceLabel.textContent = 'اختر الولاية لعرض السعر';
      if (deskPriceLabel) deskPriceLabel.textContent = 'اختر الولاية لعرض السعر';
      if (orderShippingCost) orderShippingCost.textContent = 'اختر الولاية';
      if (orderTotalCost) orderTotalCost.textContent = `${booksTotal.toLocaleString('fr-FR')} دج`;
      currentShipping = 0;
      return;
    }

    const rates = getShippingRates(wilayaCode);
    if (homePriceLabel) homePriceLabel.textContent = `${rates.home} دج`;
    if (deskPriceLabel) deskPriceLabel.textContent = `${rates.desk} دج`;

    currentShipping = currentMethod === 'home' ? rates.home : rates.desk;

    if (orderShippingCost) {
      orderShippingCost.textContent = `${currentShipping} دج`;
    }

    const grandTotal = booksTotal + currentShipping;
    if (orderTotalCost) {
      orderTotalCost.textContent = `${grandTotal.toLocaleString('fr-FR')} دج`;
    }
  };

  if (orderWilaya) {
    orderWilaya.addEventListener('change', updateCalculations);
  }

  // Delivery Method Selection
  if (deliveryHomeCard && deliveryDeskCard) {
    deliveryHomeCard.addEventListener('click', () => {
      currentMethod = 'home';
      deliveryHomeCard.classList.add('active');
      deliveryDeskCard.classList.remove('active');
      updateCalculations();
    });

    deliveryDeskCard.addEventListener('click', () => {
      currentMethod = 'desk';
      deliveryDeskCard.classList.add('active');
      deliveryHomeCard.classList.remove('active');
      updateCalculations();
    });
  }

  // Quantity controls
  if (qtyMinusBtn && qtyPlusBtn && orderQtyVal) {
    qtyMinusBtn.addEventListener('click', () => {
      if (currentQty > 1) {
        currentQty--;
        orderQtyVal.textContent = currentQty;
        updateCalculations();
      }
    });

    qtyPlusBtn.addEventListener('click', () => {
      if (currentQty < 50) {
        currentQty++;
        orderQtyVal.textContent = currentQty;
        updateCalculations();
      }
    });
  }

  // Form Submission
  if (novelOrderForm) {
    novelOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('orderFullName').value.trim();
      const phone = document.getElementById('orderPhone').value.trim();
      const wilayaSelect = document.getElementById('orderWilaya');
      const wilaya = wilayaSelect ? wilayaSelect.options[wilayaSelect.selectedIndex].text : '';
      const commune = document.getElementById('orderCommune').value.trim();
      const address = document.getElementById('orderAddress').value.trim();

      if (!name) {
        showToast('يرجى كتابة الاسم واللقب');
        document.getElementById('orderFullName').focus();
        return;
      }

      if (!phone || phone.length < 9) {
        showToast('يرجى إدخال رقم هاتف جزائري صحيح');
        document.getElementById('orderPhone').focus();
        return;
      }

      if (!wilayaSelect || !wilayaSelect.value) {
        showToast('يرجى اختيار ولايتك');
        wilayaSelect.focus();
        return;
      }

      if (!commune) {
        showToast('يرجى إدخال البلدية');
        document.getElementById('orderCommune').focus();
        return;
      }

      if (!address) {
        showToast('يرجى إدخال العنوان الكامل');
        document.getElementById('orderAddress').focus();
        return;
      }

      const methodText = currentMethod === 'home' ? 'التوصيل إلى المنزل' : 'توصيل إلى مكتب (Stop Desk)';
      const booksTotal = currentQty * BOOK_PRICE;
      const grandTotal = booksTotal + currentShipping;

      // Fill success screen
      const successName = document.getElementById('successCustomerName');
      const successPhone = document.getElementById('successCustomerPhone');
      if (successName) successName.textContent = name;
      if (successPhone) successPhone.textContent = phone;

      // Build WhatsApp message
      const waMsg = `*طلب جديد: رواية بذرة الأمل 📖*
--------------------------
👤 *الاسم واللقب:* ${name}
📞 *رقم الهاتف:* ${phone}
📍 *الولاية:* ${wilaya}
🏙️ *البلدية:* ${commune}
🏠 *العنوان:* ${address}
🚚 *طريقة التوصيل:* ${methodText}
📚 *الكمية:* ${currentQty}
💰 *سعر الكتب:* ${booksTotal.toLocaleString('fr-FR')} دج
🛵 *رسوم التوصيل:* ${currentShipping} دج
💵 *المجموع الكلي:* ${grandTotal.toLocaleString('fr-FR')} دج
--------------------------
يرجى تأكيد إرسال الشحنة. شكراً لك!`;

      const successWaLink = document.getElementById('successWaLink');
      if (successWaLink) {
        successWaLink.href = `https://wa.me/qr/SSEPKBSWPJ5WE1?text=${encodeURIComponent(waMsg)}`;
      }

      // Switch view
      novelOrderForm.style.display = 'none';
      if (orderSuccessScreen) {
        orderSuccessScreen.classList.add('active');
      }

      showToast('🎉 تم تسجيل طلبك بنجاح!');
    });
  }

  if (resetOrderBtn) {
    resetOrderBtn.addEventListener('click', () => {
      if (novelOrderForm) {
        novelOrderForm.reset();
        novelOrderForm.style.display = 'block';
      }
      if (orderSuccessScreen) {
        orderSuccessScreen.classList.remove('active');
      }
      currentQty = 1;
      if (orderQtyVal) orderQtyVal.textContent = '1';
      updateCalculations();
    });
  }

  // -------------------------------------------------------------
  // 8. ANIMATED STATS NUMBER COUNTERS
  // -------------------------------------------------------------
  const animateMetrics = () => {
    const statNums = document.querySelectorAll('.metric-num');
    statNums.forEach(num => {
      const target = parseFloat(num.getAttribute('data-target'));
      const isDec = target % 1 !== 0;
      let cur = 0;
      const dur = 1500;
      const step = 20;
      const inc = target / (dur / step);
      const timer = setInterval(() => {
        cur += inc;
        if (cur >= target) {
          num.textContent = target.toString();
          clearInterval(timer);
        } else {
          num.textContent = isDec ? cur.toFixed(1) : Math.floor(cur).toString();
        }
      }, step);
    });
  };

  // Launch Preloader (3-second duration) and reveal content
  initPreloader(animateMetrics);

  // Current Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
