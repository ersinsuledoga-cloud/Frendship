export async function downloadStandaloneHtml() {
  try {
    const res = await fetch('/friendship_game.html');
    if (!res.ok) {
      throw new Error('Dosya yüklenemedi');
    }
    const htmlText = await res.text();
    const blob = new Blob([htmlText], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'LGS_Friendship_Kelime_Oyunu.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('İndirme hatası:', err);
    // Fallback: direct window open or notification
    window.open('/friendship_game.html', '_blank');
  }
}
