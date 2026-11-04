import { createMemoryDb } from "@/data/db";

import { createUserRepository } from "../user-repository";
import { createUserService, type UserService } from "../user-service";

let service: UserService;

beforeEach(() => {
  service = createUserService(createUserRepository(createMemoryDb()));
});

describe("userService.login", () => {
  it("gir brukeren ved riktig e-post og passord", async () => {
    const result = await service.login("Kari@fiksa.no", "kari1234");
    expect(result.success && result.data).toMatchObject({ id: "u1", role: "Tenant" });
  });

  it("gir 401 med samme melding for feil passord og ukjent e-post", async () => {
    const feilPassord = await service.login("kari@fiksa.no", "feil");
    const ukjent = await service.login("ingen@fiksa.no", "kari1234");
    expect(feilPassord).toEqual({ success: false, error: "Feil e-post eller passord", code: 401 });
    expect(ukjent).toEqual(feilPassord);
  });

  it("gir 400 når e-post eller passord mangler", async () => {
    expect(await service.login("  ", "kari1234")).toMatchObject({ success: false, code: 400 });
    expect(await service.login("kari@fiksa.no", "")).toMatchObject({ success: false, code: 400 });
  });
});
