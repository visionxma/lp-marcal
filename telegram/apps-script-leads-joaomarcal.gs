/**
 * ============================================================================
 *  LEADS JOÃO MARÇAL  —  Google Apps Script (Web App) -> Google Sheets
 * ============================================================================
 *  Recebe os leads que a landing page (grupo-vip) envia pro LEAD_ENDPOINT
 *  e grava cada um numa linha da planilha.
 *
 *  COMO USAR (resumo — passo a passo completo no chat):
 *   1. Crie uma Google Sheet nova (sheets.new).
 *   2. Extensões > Apps Script. Apague o conteúdo e cole ESTE arquivo.
 *   3. Deploy > Nova implantação > tipo "App da Web":
 *        - Executar como: Eu
 *        - Quem pode acessar: Qualquer pessoa
 *      Autorize quando o Google pedir. Copie a URL que termina em /exec.
 *   4. Cole essa URL no LEAD_ENDPOINT da LP (eu faço isso pra você).
 *
 *  O token abaixo TEM que ser igual ao LEAD_TOKEN da LP.
 * ============================================================================
 */

// Precisa ser IDÊNTICO ao CONFIG.LEAD_TOKEN da landing page.
var LEAD_TOKEN = 'joaomarcal_9ce1a13d45fe1e9d94c0b8c7';

// Nome da aba onde os leads são gravados (criada automaticamente se não existir).
var SHEET_NAME = 'Leads';

// Cabeçalho / ordem das colunas.
var HEADERS = [
  'Data/Hora', 'Telefone', 'E-mail', 'Origem', 'Evento', 'Respostas',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'fbclid', 'criativo'
];

/** Recebe o POST da landing page. */
function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Anti-spam: descarta se o token não bater.
    if (data.token !== LEAD_TOKEN) {
      return _json({ ok: false, error: 'token invalido' });
    }

    var sheet = _getSheet();
    var lead = data.lead || {};
    var utm = data.utm_params || {};

    sheet.appendRow([
      data.timestamp ? new Date(data.timestamp) : new Date(),
      _tel(lead.telefone),
      lead.email || '',
      data.origem || '',
      data.event || '',
      data.respostas ? JSON.stringify(data.respostas) : '',
      utm.utm_source || '',
      utm.utm_medium || '',
      utm.utm_campaign || '',
      utm.utm_content || '',
      utm.utm_term || '',
      utm.fbclid || '',
      utm.criativo || ''
    ]);

    return _json({ ok: true });
  } catch (err) {
    return _json({ ok: false, error: String(err) });
  }
}

/** Teste rápido no navegador: abrir a URL /exec deve mostrar "ok". */
function doGet() {
  return _json({ ok: true, service: 'leads-joaomarcal' });
}

/** Pega (ou cria) a aba de leads, garantindo o cabeçalho. */
function _getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Mantém o telefone como texto (não vira número e não perde o zero). */
function _tel(v) {
  var s = String(v || '').replace(/\D/g, '');
  return s ? "'" + s : '';
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
