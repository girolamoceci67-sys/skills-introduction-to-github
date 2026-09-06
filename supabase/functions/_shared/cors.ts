// Header CORS condivisi: senza questi, le richieste dal browser (web preview, dashboard master
// aperta da PC) vengono bloccate dal browser stesso prima ancora di arrivare alla funzione.
// Dal telefono (app nativa) non servirebbero, ma non fanno differenza: meglio averli sempre.
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
