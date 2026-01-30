/**
 * Utilitários para envio de mensagem pelo WhatsApp (wa.me / api.whatsapp.com).
 */

export function normalizePhoneForWhatsApp(phone: string): string {
  return (phone || '').replace(/\D/g, '');
}

export function getCongratulationsMessage(name: string): string {
  return `Parabéns, ${name}! 🎂 Desejamos que este novo ciclo seja iluminado, repleto de saúde, paz e muitas alegrias. Que sua trajetória continue sendo marcada pelo sucesso e por grandes realizações, tanto na vida pessoal quanto na carreira. Aproveite seu dia ao máximo! 🎈🥳`;
}

/**
 * Abre o WhatsApp com a mensagem pronta.
 * Se houver telefone válido (apenas dígitos), abre chat com o número; senão, abre "escolher contato" com o texto.
 */
export function openWhatsAppWithMessage(phone: string, text: string): void {
  const normalized = normalizePhoneForWhatsApp(phone);
  const encoded = encodeURIComponent(text);
  const url = normalized.length >= 10
    ? `https://wa.me/${normalized}?text=${encoded}`
    : `https://api.whatsapp.com/send?text=${encoded}`;
  window.open(url, '_blank');
}
