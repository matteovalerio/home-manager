import { userUpsertSchema } from "@/modules/users/schemas/user-upsert.schema";
import { describe, expect, test } from "vitest";

describe("user-upsert.schema", () => {
  test("valid schema", () => {
    const actual = {
      name: "John",
    };

    const res = userUpsertSchema.safeParse(actual);

    expect(res.success).toBeTruthy();
  });
});
