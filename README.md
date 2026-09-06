# CorpoLibero

App mobile (iOS/Android, Expo/React Native + TypeScript) per allenamento a corpo libero a
casa, pensata per principianti. Include un motore di coaching adattivo che modifica il piano
settimanale in base al feedback soggettivo dopo ogni sessione (facile/giusto/difficile), non un
semplice catalogo statico di video.

Questa app propone esercizi a corpo libero a intensità accessibile e **non sostituisce il
parere di un medico o di un fisioterapista**.

## Funzionalità

- **Onboarding**: livello di partenza, obiettivo, giorni disponibili a settimana, limitazioni fisiche.
- **Motore adattivo**: genera il piano settimanale e lo fa progredire/regredire in base al feedback e alla costanza (`src/domain/engine`).
- **Libreria esercizi**: 20 esercizi originali a corpo libero, istruzioni passo-passo, segnali di corretta esecuzione, varianti facilitate/avanzate (`src/domain/exercises`).
- **Sessione guidata**: timer per esercizi isometrici, conferma serie per esercizi a ripetizioni, transizione automatica, feedback post-sessione.
- **Progressi**: streak di costanza, grafico di aderenza settimanale, storico sessioni.
- **Goal-setting**: obiettivo settimanale esplicito con promemoria giornaliero opzionale (notifiche locali).
- **Offline-first**: dati persistiti localmente con WatermelonDB, dietro un layer di repository (`src/data/repositories`) pensato per poter aggiungere una sincronizzazione cloud in futuro senza toccare i moduli applicativi.

## Stack

Expo (managed + dev client) · TypeScript strict · Expo Router · Zustand · WatermelonDB (SQLite) ·
react-native-reanimated · react-native-gifted-charts · date-fns · zod

## Eseguire il progetto

WatermelonDB usa moduli nativi: **l'app non funziona su Expo Go**. Ci sono due modi per ottenere una build installabile.

### Opzione A — build in locale (richiede Android Studio o Xcode)

```bash
npm install
npx expo prebuild
npx expo run:android   # oppure: npx expo run:ios (richiede macOS)
```

Per lo sviluppo quotidiano, una volta creata la build nativa:

```bash
npx expo start --dev-client
```

### Opzione B — build nel cloud con EAS (nessun tool locale richiesto)

Compila l'app sui server di Expo e produce un file installabile direttamente sul telefono
(su Android non serve un account sviluppatore a pagamento):

```bash
npm install -g eas-cli
eas login          # crea un account Expo gratuito se non ne hai uno
eas build --platform android --profile preview
```

Al termine della build (qualche minuto), il comando restituisce un link: apri quel link dal
telefono Android e installa il file `.apk` scaricato.

## Struttura del progetto

```
app/                  # schermate e routing (Expo Router)
src/
  domain/             # tipi, motore di adattamento, libreria esercizi — nessuna dipendenza RN
  data/                # storage locale (WatermelonDB) e repository
  features/            # logica applicativa per modulo (onboarding, home, goals)
  components/          # componenti UI riutilizzabili
  theme/               # colori, spaziature, tipografia
```

## Test

La logica di dominio (motore adattivo, streak/aderenza, libreria esercizi) è pura TypeScript
senza dipendenze RN e verificabile con `npx tsx` senza build nativa. Non è ancora presente una
suite di test automatizzata integrata nel progetto (vedi limiti noti).
