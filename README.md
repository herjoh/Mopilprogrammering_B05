# Fiksa · mobilapp

Fiksa samler dialogen mellom leietaker og utleier på ett sted. Fiksa alt lett.

Mobilappen til Fiksa, prosjektet til gruppe B05 i Mobilprogrammering (ITF21019)
ved Høgskolen i Østfold høsten 2026. Webappen ligger i et eget repo:
https://github.com/jowiu2766/Webapplikasjoner_B05.

Bygget med Expo SDK 58, Expo Router, React Native, TypeScript, Zod 4 og Jest
(jest-expo + Testing Library).

## Hva appen gjør

Leietakeren melder inn ting som er galt i boligen, for eksempel en lekkasje
eller en stikkontakt som er død, og ser status på sakene sine. Utleieren ser
sakene på eiendommene sine og setter status på dem.

Hovedflyten er: logg inn, meld inn en sak, se den i lista. Utleier logger inn,
ser den samme saken og kan endre status.

## Krav

| | Versjon | Sjekk med |
| --- | --- | --- |
| Node.js | 22 eller nyere | `node -v` |
| npm | følger med Node | `npm -v` |
| Expo Go | nyeste fra App Store / Play | på telefonen |

Simulator er valgfritt. Xcode gir iOS-simulator, Android Studio gir emulator.
Telefon med Expo Go på samme nett holder lenge.

## Kom i gang

```bash
npm install
npx expo start
```

Så en av disse:

- `i` åpner iOS-simulatoren
- `a` åpner Android-emulatoren
- `w` åpner appen i nettleseren
- scan QR-koden med Expo Go på telefonen

Første gang appen starter henter den brukere fra dummyjson.com og lager seg en
lokal database, så den trenger nett den første gangen. Logg inn med en av dem:

- emily.johnson@x.dummyjson.com / emilyspass (leietaker)
- michael.williams@x.dummyjson.com / michaelwpass (utleier)

Forsiden har også to snarveier som logger deg rett inn som leietaker eller
utleier, så du slipper å skrive når du bare skal se på noe.

## Hva som ligger her

```
src/
├─ app/                      rutene. Expo Router lager navigasjonen av filnavnene
│  ├─ _layout.tsx            rot-stacken. Stack.Protected slipper bare riktig rolle inn
│  ├─ index.tsx              forsiden
│  ├─ login.tsx              innlogging
│  ├─ (tenant)/              tabs for leietaker: hjem og profil
│  ├─ (landlord)/            tabs for utleier: hjem og profil
│  └─ api/fakedb+api.ts      API-rute som skriver databasen til disk når appen kjører på web
├─ context/AuthContext.tsx   hvem som er logget inn, delt med hele appen
├─ features/                 forretningslogikken, delt i repository og service
│  ├─ cases/                 saker: validering (zod), lagring, hvem får gjøre hva
│  ├─ users/                 brukere og innlogging
│  └─ properties/            eiendommer
├─ data/
│  ├─ db.ts                  databasen er ett json-dokument. Her ligger seed og lasting
│  ├─ storage.ts             skriver fila på telefonen (expo-file-system)
│  ├─ storage.web.ts         samme jobb på web, via API-ruta over
│  ├─ session.ts             hvem som er logget inn, i SecureStore
│  ├─ session.web.ts         samme jobb på web, i localStorage
│  └─ apiSeed.ts             henter brukere fra dummyjson.com første gang
├─ components/
│  ├─ caseComponents/        skjema for ny sak, liste, sakskort
│  └─ ui/theme/              farger, avstander og skjermstørrelse
├─ pages/CasePage.tsx        setter sammen skjema og liste for begge rollene
└─ types/                    felles typer

data/fakeDb.json             databasen når appen kjører på web. Ligger i .gitignore
```

Metro velger `.web.ts`-fila på web og den vanlige på telefon, så resten av koden
slipper å vite hvor den kjører.

## Kommandoer

| Kommando | Hva den gjør |
| --- | --- |
| `npx expo start` | utviklingsserver med QR-kode |
| `npm run ios` / `npm run android` / `npm run web` | starter rett i simulator, emulator eller nettleser |
| `npm test` | kjører testene en gang |
| `npx jest --watch` | kjører testene på nytt når du lagrer |
| `npx tsc --noEmit` | typesjekk |
| `npx expo start -c` | start med tom cache når Metro oppfører seg rart |

## Innlogging og lagring

Innlogging sjekker e-post og passord mot brukerne i databasen. Går det bra,
lagres bruker-id-en i **expo-secure-store**, som er nøkkelringen på iOS og
Keystore på Android. Neste gang appen åpnes leser `AuthContext` id-en derfra
og logger deg inn igjen. Logg ut sletter den. Appen har ingen server som deler
ut tokens, så det er id-en som er «tokenet». På web finnes ikke SecureStore,
der brukes localStorage.

Selve dataene (brukere, eiendommer, saker) er ett json-dokument. På telefonen
ligger det som `fakeDb.json` i appens dokumentmappe, på web skriver dev-serveren
det til `data/fakeDb.json`. Slett fila, så starter appen fra seed igjen.

## Tester

```bash
npm test
```

Testene ligger i `__tests__`-mapper ved siden av koden de tester.

- Enhetstester: zod-skjemaet for saker (`case-validator`), innlogging
  (`user-service`), rollereglene i `case-service` og repositoryene mot en
  database i minnet.
- Komponenttest: `CaseRegister.test.tsx` rendrer skjemaet for ny sak og sjekker
  at det viser feilmelding, sender inn og tømmes etterpå.
- Hovedflyt: `src/__tests__/hovedflyt.test.tsx` starter hele appen med
  `renderRouter`, logger inn som Kari, melder inn en sak og ser at den dukker
  opp i lista. Filsystemet, SecureStore og API-et er mocket, så testen går
  uten nett og uten telefon.

## Valg vi tok

- **Expo Router med `Stack.Protected`.** Rollen avgjør hvilke ruter som finnes
  i det hele tatt. En leietaker kan ikke navigere seg til utleiersidene, for
  de er ikke registrert. Det var enklere enn å sjekke rolle i hver skjerm.
- **Repository og service, som i forelesningen.** Skjermene snakker med en
  service, servicen med et repository, og alt svarer med `Result<T>` i stedet
  for å kaste. Det gjorde testene enkle: bytt ut repositoryet med en database i
  minnet.
- **Ett json-dokument som database.** Vi vurderte Appwrite og SQLite, men
  webappen eier de ekte dataene, og mobilappen trengte bare noe som overlever
  at appen lukkes. Ett dokument via expo-file-system var nok, og det kunne
  mockes i tester på ti linjer.

## Når noe ikke virker

| Problem | Løsning |
| --- | --- |
| Expo Go sier feil SDK-versjon | Oppdater Expo Go på telefonen |
| QR-koden gjør ingenting | Telefon og maskin må være på samme nett. Prøv `npx expo start --tunnel` |
| «Klarte ikke å hente data fra API-et» | Ingen nett ved første start. Koble til og start på nytt |
| Innlogging virker ikke på web | Slett `data/fakeDb.json` og last siden på nytt |
| Rare feil etter en pull | `rm -rf node_modules && npm install`, så `npx expo start -c` |
| Testene klager på en modul som ikke finnes | Samme som over |

## Lenker

- Kurset i Canvas: https://hiof.instructure.com/courses/11080
- Expo-dokumentasjon for SDK 58: https://docs.expo.dev/versions/v58.0.0/
- Webappen: https://github.com/jowiu2766/Webapplikasjoner_B05
