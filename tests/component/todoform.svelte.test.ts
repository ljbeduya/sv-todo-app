import { describe, expect, it, beforeEach } from "vitest";
import { page } from "@vitest/browser/context";
import { render } from "vitest-browser-svelte";
import TodoForm from "../../src/routes/todo/TodoForm.svelte";

describe("TodoForm when adding a new todo", () => {
  beforeEach(() => {
    render(TodoForm, {
      saveActionPath: "?/create",
    });
  });

  it("renders a header", () => {
    const todoHeader = page.getByRole("heading", {
      name: "Add a todo:",
    });
    expect(todoHeader).toBeInTheDocument();
    expect(todoHeader).toHaveTextContent("Add a todo:");
  });

  it("renders an empty and enabled text area", () => {
    const todoTextArea = page.getByRole("textbox");
    expect(todoTextArea).toBeInTheDocument();
    expect(todoTextArea).toHaveValue("");
    expect(todoTextArea).toBeEnabled();
  });

  it("renders an active back button", () => {
    const backButton = page.getByRole("button", {
      name: "Back",
    });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toBeEnabled();
  });

  it("renders an active save button", () => {
    const saveButton = page.getByRole("button", {
      name: "Save",
    });
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeEnabled();
  });
});

describe("TodoForm when viewing an incomplete todo", () => {
  beforeEach(() => {
    render(TodoForm, {
      saveActionPath: "?/update",
      deleteActionPath: "?/delete",
      description: "Test todo",
      done: false,
    });
  });

  it("renders a non-empty and enabled text area", () => {
    const todoTextArea = page.getByRole("textbox");
    expect(todoTextArea).toBeInTheDocument();
    expect(todoTextArea).toHaveValue("Test todo");
    expect(todoTextArea).toBeEnabled();
  });

  it("renders an active back button", () => {
    const backButton = page.getByRole("button", {
      name: "Back",
    });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toBeEnabled();
  });

  it("renders an active delete button", () => {
    const deleteButton = page.getByRole("button", {
      name: "Delete",
    });
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toBeEnabled();
  });

  it("renders an active save button", () => {
    const saveButton = page.getByRole("button", {
      name: "Save",
    });
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeEnabled();
  });
});

describe("TodoForm when viewing a completed todo", () => {
  beforeEach(() => {
    render(TodoForm, {
      saveActionPath: "?/update",
      deleteActionPath: "?/delete",
      description: "Test todo",
      done: true,
    });
  });

  it("renders a non-empty and disabled text area", () => {
    const todoTextArea = page.getByRole("textbox");
    expect(todoTextArea).toBeInTheDocument();
    expect(todoTextArea).toHaveValue("Test todo");
    expect(todoTextArea).toBeDisabled();
  });

  it("renders an active back button", () => {
    const backButton = page.getByRole("button", {
      name: "Back",
    });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toBeEnabled();
  });

  it("renders an active delete button", () => {
    const deleteButton = page.getByRole("button", {
      name: "Delete",
    });
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toBeEnabled();
  });

  it("renders an disabled save button", () => {
    const saveButton = page.getByRole("button", {
      name: "Save",
    });
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeDisabled();
  });
});
