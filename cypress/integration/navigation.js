context("Navigation", () => {
	before(() => {
		cy.visit("/login");
		cy.login();
		cy.visit("/admin/website");
	});
	it("Navigate to route with hash in document name", () => {
		cy.insert_doc(
			"Client Script",
			{
				__newname: "ABC#123",
				dt: "User",
				script: "console.log('ran')",
				enabled: 0,
			},
			true
		);
		cy.visit(`/admin/client-script/${encodeURIComponent("ABC#123")}`);
		cy.title().should("eq", "ABC#123");
		cy.go("back");
		cy.title().should("eq", "Website");
	});

	it("Navigate to previous page after login", () => {
		cy.visit("/admin/todo");
		cy.get(".page-head").findByTitle("To Do").should("be.visible");
		cy.clear_filters();
		cy.call("logout");
		cy.reload().as("reload");
		cy.get("@reload").get(".page-card .btn-primary").contains("Login").click();
		cy.location("pathname").should("eq", "/login");
		cy.login();
		cy.reload().as("reload");
		cy.location("pathname").should("eq", "/admin/todo");
	});
});
