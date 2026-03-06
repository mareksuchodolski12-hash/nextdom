(function () {
  const params = new URLSearchParams(window.location.search);
  const storedLang = localStorage.getItem('nextdom-lang');
  const lang = params.get('lang') || storedLang || 'nl';
  document.documentElement.lang = lang;
  localStorage.setItem('nextdom-lang', lang);

  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
    btn.addEventListener('click', () => {
      localStorage.setItem('nextdom-lang', btn.dataset.lang);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', btn.dataset.lang);
      window.location.href = url.toString();
    });
  });

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const dict = window.PAGE_I18N?.[key];
    if (dict && dict[lang]) el.textContent = dict[lang];
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.dataset.i18nHtml;
    const dict = window.PAGE_I18N?.[key];
    if (dict && dict[lang]) el.innerHTML = dict[lang];
  });

  document.querySelectorAll('[data-nav-key]').forEach((a) => {
    const key = a.dataset.navKey;
    const name = window.NEXTDOM_CONTENT.nav[key][lang];
    a.textContent = name;
    const href = a.getAttribute('href').split('?')[0];
    a.href = `${href}?lang=${lang}`;
  });
  document.querySelectorAll('[data-localized-link]').forEach((a) => {
    const href = a.getAttribute('href').split('?')[0];
    a.href = `${href}?lang=${lang}`;
  });

  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href').includes(current)) a.classList.add('active');
  });

  const gaTrack = (eventName, payload = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...payload });
    if (typeof window.gtag === 'function') window.gtag('event', eventName, payload);
  };

  document.querySelectorAll('[data-track]').forEach((el) => {
    el.addEventListener('click', () => gaTrack(el.dataset.track, { label: el.textContent.trim() }));
  });

  const calc = document.getElementById('estimator-form');
  if (calc && window.NEXTDOM_CALCULATOR_CONFIG) {
    calc.addEventListener('submit', (e) => {
      e.preventDefault();
      const c = window.NEXTDOM_CALCULATOR_CONFIG;
      const data = new FormData(calc);
      const type = data.get('houseType');
      const size = Number(data.get('size'));
      const model = data.get('model');
      const pkg = data.get('package');
      const country = data.get('country');
      const selectedExtras = data.getAll('extras');

      const sizeBand = c.sizeFactor.find(b => size <= b.max) || c.sizeFactor[c.sizeFactor.length - 1];
      const base = c.basePriceByType[type] || c.basePriceByType.custom;
      const modelAdj = c.modelAdjustments[model] || 0;
      const extras = selectedExtras.reduce((sum, item) => sum + (c.extras[item] || 0), 0);
      const packageMod = c.packageModifier[pkg] || 1;
      const countryMod = c.countryMultiplier[country] || 1;

      const estimate = Math.round((base * sizeBand.multiplier + modelAdj + extras) * packageMod * countryMod);
      const low = Math.round(estimate * 0.92);
      const high = Math.round(estimate * 1.1);

      const format = (n) => new Intl.NumberFormat(lang === 'nl' ? 'nl-NL' : 'en-GB', { style: 'currency', currency: c.currency, maximumFractionDigits: 0 }).format(n);
      document.getElementById('estimator-result').textContent = `${format(low)} – ${format(high)}`;
      document.getElementById('estimator-disclaimer').textContent = c.disclaimer[lang];
      gaTrack('estimator_used', { houseType: type, package: pkg, country });
    });
  }

  const leadForm = document.getElementById('lead-form');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      gaTrack('lead_form_submit', { page: location.pathname });
      const msg = document.getElementById('form-success');
      msg.hidden = false;
      leadForm.reset();
    });
  }
})();
