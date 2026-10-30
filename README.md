# Mopilprogrammering_B05
Mobilprogrammering repositeriy for gruppe B-05

## Hva er Fiksa

Fiksa er en app for folk som leier bolig. Leietakeren kan melde inn ting som er galt i boligen, for eksempel en lekkasje eller strøm som ikke virker. Utleieren ser sakene på eiendommene sine og kan sette status på dem.

Hovedflyten er: logg inn, meld inn en sak, se den i lista. Utleier logger inn, ser samme sak og kan endre status.

## Kom i gang

```bash
npm install
npx expo start
```

Trykk `w` for å åpne i nettleser, eller scan QR-koden med Expo Go på mobilen.

Testbrukere:

- kari@fiksa.no / kari1234 (leietaker)
- ola@fiksa.no / ola12345 (utleier)

## Tester

```bash
npx jest
```

Vi bruker Jest (jest-expo) og Testing Library. Testene ligger i `__tests__`-mapper ved siden av koden de tester.

- Enhetstester: zod-skjemaet for saker (`case-validator`), innlogging (`user-service`), rollereglene i `case-service` og repositoryene.
- Komponenttest: `CaseRegister.test.tsx` rendrer skjemaet for ny sak og sjekker at det viser feilmelding, sender inn og tømmes etterpå.
- Hovedflyt: `src/__tests__/hovedflyt.test.tsx` starter hele appen med lagringen mocket i minnet, logger inn som Kari, melder inn en sak og sjekker at den dukker opp i lista.
