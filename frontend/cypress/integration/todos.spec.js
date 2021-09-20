function addTodo(todo) {
  const randomTask = todo ? todo : String(Math.random());
  const input = cy.get("input");
  input.type(randomTask);
  const btn = cy.get("button");
  btn.click();
  const list = cy.get(".TodoList");
  list.contains(randomTask);
}
describe("Todo Application", () => {
  const url = "http://localhost:3000/";
  it("shows an empty list when no todos", () => {
    cy.visit(url);
    cy.get(".EmptyList");
  });
  it("adds a todo", () => {
    cy.visit(url);
    addTodo();
    cy.get(".EmptyList").should("not.exist");
  });
  it("does not add a blank todo", () => {
    cy.visit(url);
    const btn = cy.get("button");
    btn.click();
    cy.get(".EmptyList");
  });
  it("edits a todo", () => {
    cy.visit(url);
    const todo = String(Math.random());
    addTodo(todo);
    const btnEdit = cy.get(".BtnEdit");
    btnEdit.click();

    const editInput = cy.get(".Todo input");
    todo.split("").forEach((c) => editInput.type("{backspace}"));
    const modifiedTask = String(Math.random());
    editInput.type(modifiedTask);
    editInput.type("{enter}");
    const list = cy.get(".TodoList");
    list.contains(modifiedTask);
  });
  it("toggles a todo complete and incomplete", () => {
    cy.visit(url);
    addTodo();

    const label = cy.get(".TodoLabel");
    label.dblclick();
    cy.get(".TodoLabel.done");
    label.dblclick();
    cy.get(".TodoLabel.done").should("not.exist");
  });
  it("deletes a todo", () => {
    cy.visit(url);
    addTodo();

    const btnDelete = cy.get(".BtnDelete");
    btnDelete.click();
    cy.get(".EmptyList");
  });
});
