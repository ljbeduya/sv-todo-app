import { describe, it, expect, vi, afterEach } from "vitest";
vi.mock("$lib/server/database", () => ({
  getTodos: vi.fn(() => []),
}));
import { load } from "../../src/routes/todo/+page.server";
import * as db from "$lib/server/database";

describe("todo list page's load() function", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns an empty array when DB is empty", () => {
    const cookiesGetSpy = vi.fn(() => "test-user-id");
    const dependsSpy = vi.fn();
    const event = {
      cookies: {
        get: cookiesGetSpy,
        set: vi.fn(),
      },
      depends: dependsSpy,
    };

    const result = load(event);

    expect(vi.mocked(db.getTodos)).toHaveBeenCalledWith("test-user-id");
    expect(result).toMatchObject({
      todos: expect.any(Array),
    });
    expect(result.todos.length).toBe(0);
  });

  it("returns a non-empty array when DB is not empty", () => {
    const cookiesGetSpy = vi.fn(() => "test-user-id");
    const dependsSpy = vi.fn();
    const event = {
      cookies: {
        get: cookiesGetSpy,
        set: vi.fn(),
      },
      depends: dependsSpy,
    };
    vi.mocked(db.getTodos).mockReturnValue([
      {
        id: "1",
        description: "Test todo",
        done: false,
      },
      {
        id: "2",
        description: "Another todo",
        done: true,
      },
    ]);

    const result = load(event);

    expect(vi.mocked(db.getTodos)).toHaveBeenCalledWith("test-user-id");
    expect(result).toMatchObject({
      todos: expect.any(Array),
    });
    expect(result.todos.length).toBe(2);
    expect(result.todos[0]).toMatchObject({
      id: "1",
      description: "Test todo",
      done: false,
    });
    expect(result.todos[1]).toMatchObject({
      id: "2",
      description: "Another todo",
      done: true,
    });
  });

  it("calls cookies.get and depends", () => {
    const cookiesGetSpy = vi.fn();
    const dependsSpy = vi.fn();
    const event = {
      cookies: {
        get: cookiesGetSpy,
        set: vi.fn(),
      },
      depends: dependsSpy,
    };

    load(event);

    expect(cookiesGetSpy).toHaveBeenCalledWith("userid");
    expect(dependsSpy).toHaveBeenCalledWith("todo:todos");
  });
});
