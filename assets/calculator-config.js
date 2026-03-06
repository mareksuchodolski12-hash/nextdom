window.NEXTDOM_CALCULATOR_CONFIG = {
  currency: 'EUR',
  basePriceByType: {
    compact: 52000,
    family: 79000,
    mezzanine: 88000,
    custom: 95000
  },
  sizeFactor: [
    { max: 35, multiplier: 0.92 },
    { max: 55, multiplier: 1.0 },
    { max: 75, multiplier: 1.15 },
    { max: 95, multiplier: 1.32 },
    { max: 140, multiplier: 1.55 }
  ],
  countryMultiplier: {
    Netherlands: 1,
    Belgium: 1.04,
    France: 1.06
  },
  packageModifier: {
    basic: 1,
    extended: 1.18,
    premium: 1.35
  },
  extras: {
    glazing: 2400,
    pergola: 5200,
    facade: 3900,
    prepInstallations: 4600,
    other: 3000
  },
  modelAdjustments: {
    'NXT-Compact 35': 0,
    'NXT-Compact 45': 4500,
    'NXT-Family 70': 7200,
    'NXT-Mezzanine 80': 8900,
    'Help me choose': 1500
  },
  disclaimer: {
    nl: 'Indicatieve prijs. De definitieve offerte hangt af van model, scope, transport, locatie, funderingskeuze en aanvullende opties.',
    en: 'Indicative estimate only. Final offer depends on model, scope, transport, project location, foundation option and selected add-ons.'
  }
};
