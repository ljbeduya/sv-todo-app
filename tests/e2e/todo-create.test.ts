import { test, expect } from "@playwright/test";

test.describe("Todo Create Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/todo/create");
    await page.waitForLoadState("networkidle");
  });

  test("initial page display", async ({ page }) => {
    const todoHeader = page.getByRole("heading", { name: "Add a todo:" });
    await expect(todoHeader).toBeVisible();

    const todoTextArea = page.getByRole("textbox");
    await expect(todoTextArea).toBeVisible();
    await expect(todoTextArea).toHaveValue("");
    await expect(todoTextArea).toBeEnabled();

    const backButton = page.getByRole("button", { name: "Back" });
    await expect(backButton).toBeVisible();
    await expect(backButton).toBeEnabled();

    const saveButton = page.getByRole("button", { name: "Save" });
    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();

    await expect(page).toHaveURL("http://localhost:5173/todo/create");
  });

  test("stays on the same page after form submission with empty todo", async ({
    page,
  }) => {
    const todoTextArea = page.getByRole("textbox");
    await todoTextArea.fill("");

    const saveButton = page.getByRole("button", { name: "Save" });
    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();

    await saveButton.click();

    const isValid = await todoTextArea.evaluate((el) =>
      (el as HTMLTextAreaElement).checkValidity()
    );
    expect(isValid).toBe(false);

    const validationMessage = await todoTextArea.evaluate(
      (el) => (el as HTMLTextAreaElement).validationMessage
    );
    expect(validationMessage).not.toBe("");

    await expect(page).toHaveURL("http://localhost:5173/todo/create");
  });

  test("navigates to todo page after form submission with valid todo", async ({
    page,
  }) => {
    const todoTextArea = page.getByRole("textbox");
    await todoTextArea.fill("test todo");

    const saveButton = page.getByRole("button", { name: "Save" });
    await expect(saveButton).toBeVisible();
    await expect(saveButton).toBeEnabled();

    await saveButton.click();

    await expect(page).toHaveURL("http://localhost:5173/todo");
  });

  test("navigates to todo page on back button click", async ({ page }) => {
    const backButton = page.getByRole("button", { name: "Back" });

    await expect(backButton).toBeVisible();
    await expect(backButton).toBeEnabled();

    await backButton.click();

    await expect(page).toHaveURL("http://localhost:5173/todo");
  });
});
