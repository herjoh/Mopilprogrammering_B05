# Lagene i datatilgangen

Samme oppdeling som forelesningens `task-repository` / `task-service`, tilpasset den falske databasen.

| Lag | Fil | Ansvar |
| --- | --- | --- |
| Lagring | `src/data/storage.ts` / `storage.web.ts` | Les og skriv én tekst: fil i appens dokumentmappe på telefon; på web via API-ruten `app/api/fakedb+api.ts` til `data/fakeDb.json` i prosjektmappa |
| Database | `src/data/db.ts` | JSON-dokumentet med `users`, `properties`, `cases`; seed, `createId`, `createMemoryDb` til tester |
| Repository | `features/*/…-repository.ts` | Ren lagring per tabell: `list(filter)`, `get`, `create`, `update`, `remove`. Ingen regler |
| Service | `features/cases/case-service.ts` | Validering (zod i `case-validator.ts`), hvem får gjøre hva, kaller repository |

Alle funksjoner gir `Result<T>` fra `src/providers/resultTypes.ts`: `{ success: true, data }` eller `{ success: false, error, code?, fieldErrors? }`.

Skjermer og contexts bruker servicen:

```ts
import { caseService } from "@/features/cases/case-service";

const result = await caseService.create(user, formValues);
if (!result.success) setErrors(result.fieldErrors ?? {});
```

Tester bruker minnet i stedet for fila, så ingenting må mockes:

```ts
const db = createMemoryDb();
const service = createCaseService(createCaseRepository(db), createPropertyRepository(db));
```

`src/data/fakeDb.ts` er de gamle funksjonene (`getCases`, `createCase`, …) oppå repository-ene, beholdt så eksisterende kode virker.
