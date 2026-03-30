export async function getGelatoPrice(templateId: string): Promise<number> {
  try {
    const response = await fetch(`https://api.gelato.com/v2/templates/${templateId}`, {
      headers: {
        'X-API-KEY': process.env.GELATO_API_KEY!
      },
      next: { revalidate: 3600 } // Cache le prix pendant 1h pour la rapidité
    });

    if (!response.ok) throw new Error("Impossible de joindre Gelato");

    const data = await response.json();
    
    // On récupère le retailPrice (prix de vente) défini dans Gelato
    // Si pas de prix de vente, on peut mettre une valeur de secours
    return data.retailPrice?.amount || 0; 
  } catch (error) {
    console.error("Erreur prix Gelato:", error);
    return 0;
  }
}