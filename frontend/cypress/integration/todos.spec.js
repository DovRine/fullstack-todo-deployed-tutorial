const url = "http://localhost";

function mockListTodos(cy, retval, alias) {
  cy.intercept("GET", "/api/todos", retval).as(alias);
}
function mockAddTodo(cy, retval, alias) {
  cy.intercept("POST", "/api/todos", retval).as(alias);
}
function mockEditTodo(cy, retval, alias) {
  cy.intercept("PUT", "/api/todos", retval).as(alias);
}
function mockDeleteTodo(cy, retval, alias) {
  cy.intercept("DELETE", "/api/todos", retval).as(alias);
}

describe("Todo Application", () => {
  it("shows an empty list when no todos", () => {
    mockListTodos(cy, [], "listTodos");
    cy.visit(url);
    cy.wait("@listTodos");
    cy.get(".EmptyList");
  });

  it("adds a todo", () => {
    mockListTodos(cy, [], "listTodosEmpty");
    cy.visit(url);
    cy.wait("@listTodosEmpty");

    const newTodo = { id: 1, task: String(Math.random()), done: false };
    mockAddTodo(cy, { id: newTodo.id }, "addTodo");
    mockListTodos(cy, [newTodo], "listTodosNotEmpty");
    const input = cy.get("input");
    input.type(`${newTodo.task}{enter}`);
    cy.wait("@addTodo");
    cy.wait("@listTodosNotEmpty");

    const list = cy.get(".TodoList");
    list.contains(newTodo.task);
    cy.get(".EmptyList").should("not.exist");
  });

  it("edits a todo", () => {
    const initialTodo = { id: 1, task: "buy milk", done: false };
    mockListTodos(cy, [initialTodo], "listTodosInitial");
    cy.visit(url);
    cy.wait("@listTodosInitial");

    const btnEdit = cy.get(".BtnEdit");
    btnEdit.click();

    mockEditTodo(cy, { id: initialTodo.id }, "editTodo");
    const modifiedTask = String(Math.random());
    mockListTodos(
      cy,
      [{ ...initialTodo, task: modifiedTask }],
      "listTodosModified"
    );

    const editInput = cy.get(".Todo input");
    initialTodo.task.split("").forEach((c) => editInput.type("{backspace}"));

    editInput.type(`${modifiedTask}{enter}`);
    cy.wait("@editTodo");
    cy.wait("@listTodosModified");

    const list = cy.get(".TodoList");
    list.contains(modifiedTask);
  });

  it("toggles an incomplete todo to complete", () => {
    const initialTodo = { id: 1, task: "buy milk", done: false };
    mockListTodos(cy, [initialTodo], "listTodos");
    cy.visit(url);
    cy.wait("@listTodos");

    mockEditTodo(cy, [{ id: initialTodo.id }], "editTodo");
    mockListTodos(cy, [{ ...initialTodo, done: true }], "listTodosComplete");
    
    const label = cy.get(".TodoLabel");
    label.dblclick();
    cy.wait("@editTodo");

    cy.wait("@listTodosComplete");
    cy.get(".TodoLabel.done");
  });

  it("toggles a complete todo to incomplete", () => {
    const initialTodo = { id: 1, task: "buy milk", done: true };
    mockListTodos(cy, [initialTodo], "listTodos");
    cy.visit(url);
    cy.wait("@listTodos");

    mockEditTodo(cy, [{ id: initialTodo.id }], "editTodo");
    mockListTodos(cy, [{ ...initialTodo, done: false }], "listTodosComplete");

    const label = cy.get(".TodoLabel");
    label.dblclick();
    cy.wait("@editTodo");

    cy.wait("@listTodosComplete");
    cy.get(".TodoLabel.done").should("not.exist");
  });

  it("deletes a todo", () => {
    const initialTodo = {id: 1, task: 'buy milk', done: true}
    mockListTodos(cy, [initialTodo], "listTodos")
    cy.visit(url);
    cy.wait('@listTodos');

    mockDeleteTodo(cy, {status: 'ok'}, 'deleteTodo')
    mockListTodos(cy, [], 'listTodosEmpty')
    const btnDelete = cy.get('.BtnDelete')
    btnDelete.click();
    cy.wait('@deleteTodo')
    cy.wait('@listTodosEmpty')
    cy.get(".EmptyList");
  });
});
