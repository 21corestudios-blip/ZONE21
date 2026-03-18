export default function LegalPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F5F0]">
      
      {/* 1. HERO SIMPLE ET STATUTAIRE */}
      <section className="relative w-full pt-40 pb-20 md:pt-48 md:pb-24 flex flex-col items-center justify-center bg-[#121110]">
        <span className="font-sans text-[0.65rem] tracking-[0.4em] text-white/50 uppercase mb-6">
          Transparence & Rigueur
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-[#EAE8E3] tracking-wide text-center animate-fade-in-up">
          Mentions Légales
        </h1>
      </section>

      {/* 2. LE CONTENU JURIDIQUE (Largeur réduite pour la lisibilité) */}
<section className="max-w-3xl mx-auto w-full px-6 md:px-12 py-24 md:py-32 flex flex-col gap-16 md:gap-20">

  {/* Éditeur */}
  <div className="flex flex-col gap-6">
    <h2 className="font-serif text-2xl text-[#121110]">1. Éditeur de la plateforme</h2>
    <p className="font-sans text-sm md:text-base leading-relaxed text-[#121110]/80 font-light text-justify">
      Le site <strong>ZONE 21</strong> est édité par la société [Nom de la société], [forme juridique] au capital de [montant] euros, dont le siège social est situé [adresse complète].<br /><br />
      La société est immatriculée au Registre du Commerce et des Sociétés sous le numéro [numéro SIRET ou RCS].<br /><br />
      Son numéro de TVA intracommunautaire est [numéro de TVA].<br /><br />
      Le directeur de la publication est [nom du directeur de la publication].
    </p>
  </div>

  {/* Hébergement */}
  <div className="flex flex-col gap-6">
    <h2 className="font-serif text-2xl text-[#121110]">2. Hébergement</h2>
    <p className="font-sans text-sm md:text-base leading-relaxed text-[#121110]/80 font-light text-justify">
      La plateforme est hébergée par [nom de l’hébergeur], dont le siège social est situé [adresse complète de l’hébergeur].<br /><br />
      Pour toute information complémentaire concernant l’hébergement, vous pouvez consulter [lien de contact ou site de l’hébergeur].
    </p>
  </div>

  {/* Propriété intellectuelle */}
  <div className="flex flex-col gap-6">
    <h2 className="font-serif text-2xl text-[#121110]">3. Propriété intellectuelle</h2>
    <p className="font-sans text-sm md:text-base leading-relaxed text-[#121110]/80 font-light text-justify">
      L’ensemble des éléments présents sur le site <strong>ZONE 21</strong>, et notamment son architecture, son identité visuelle, ses textes, images, photographies, vidéos, éléments graphiques, typographies, logos, ainsi que tout autre contenu ou composant, est protégé par le droit de la propriété intellectuelle et demeure, sauf mention contraire, la propriété exclusive de ZONE 21.<br /><br />
      Toute reproduction, représentation, adaptation, diffusion ou exploitation, totale ou partielle, de l’un quelconque de ces éléments, sur quelque support que ce soit et par quelque procédé que ce soit, sans autorisation écrite préalable, est strictement interdite.<br /><br />
      Toute utilisation non autorisée du site ou de l’un de ses contenus pourra faire l’objet de poursuites conformément aux dispositions légales en vigueur.
    </p>
  </div>

  {/* Données personnelles (RGPD) */}
  <div className="flex flex-col gap-6">
    <h2 className="font-serif text-2xl text-[#121110]">4. Protection des données personnelles</h2>
    <p className="font-sans text-sm md:text-base leading-relaxed text-[#121110]/80 font-light text-justify">
      Vous pouvez consulter la plateforme ZONE 21 sans avoir à communiquer vos données personnelles. Toutefois, certaines fonctionnalités, notamment le formulaire de contact ou l’inscription à certaines communications, peuvent nécessiter la collecte d’informations vous concernant.<br /><br />
      Les données éventuellement recueillies sont traitées dans le respect de la réglementation applicable, notamment du Règlement Général sur la Protection des Données et de la loi Informatique et Libertés.<br /><br />
      Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos données, dans les conditions prévues par la réglementation en vigueur.<br /><br />
      Toute demande relative à vos données personnelles peut être adressée à l’adresse suivante <a href="mailto:contact@zone21.com" className="text-[#121110] underline decoration-[#121110]/30 hover:decoration-[#121110] transition-colors duration-300">contact@zone21.com</a> ou à [adresse e-mail dédiée].
    </p>
  </div>

  {/* Responsabilité */}
  <div className="flex flex-col gap-6">
    <h2 className="font-serif text-2xl text-[#121110]">5. Responsabilité</h2>
    <p className="font-sans text-sm md:text-base leading-relaxed text-[#121110]/80 font-light text-justify">
      ZONE 21 s’efforce d’assurer l’exactitude et la mise à jour des informations diffusées sur la plateforme. Toutefois, aucune garantie ne peut être apportée quant à l’exhaustivité, la précision ou l’absence d’erreur des contenus accessibles sur le site.<br /><br />
      ZONE 21 ne saurait être tenue responsable de tout dommage direct ou indirect résultant de l’accès au site, de son utilisation ou de l’impossibilité d’y accéder.
    </p>
  </div>

  {/* Droit applicable */}
  <div className="flex flex-col gap-6">
    <h2 className="font-serif text-2xl text-[#121110]">6. Droit applicable</h2>
    <p className="font-sans text-sm md:text-base leading-relaxed text-[#121110]/80 font-light text-justify">
      Les présentes mentions légales sont régies par le droit français.<br /><br />
      En cas de litige et à défaut de résolution amiable, les juridictions françaises seront seules compétentes, sous réserve des dispositions légales impératives applicables.
    </p>
  </div>

</section>

</div>
);
}