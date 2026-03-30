type GelatoTemplatePrice = {
  amount?: number | string | null;
  currency?: string | null;
};

type GelatoTemplateResponse = {
  retailPrice?: GelatoTemplatePrice | null;
};

const GELATO_API_URL = 'https://api.gelato.com/v2/templates';

function toNumber(value: number | string | null | undefined): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

export async function getGelatoPrice(templateId: string): Promise<number | null> {
  const normalizedTemplateId = templateId.trim();
  const apiKey = process.env.GELATO_API_KEY;

  if (!normalizedTemplateId) {
    console.error('[Gelato] templateId manquant.');
    return null;
  }

  if (!apiKey) {
    console.error('[Gelato] GELATO_API_KEY manquante.');
    return null;
  }

  try {
    const response = await fetch(`${GELATO_API_URL}/${normalizedTemplateId}`, {
      headers: {
        'X-API-KEY': apiKey,
      },
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      console.error(`[Gelato] Échec API (${response.status} ${response.statusText}).`);
      return null;
    }

    const data = (await response.json()) as GelatoTemplateResponse;
    const amount = toNumber(data?.retailPrice?.amount);

    if (amount === null) {
      console.warn('[Gelato] retailPrice.amount introuvable ou invalide.', {
        templateId: normalizedTemplateId,
      });
      return null;
    }

    return amount;
  } catch (error) {
    console.error('[Gelato] Erreur lors de la récupération du prix :', error);
    return null;
  }
}