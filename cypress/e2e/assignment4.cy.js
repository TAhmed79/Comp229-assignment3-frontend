describe("Assignment 4 Authentication and Project Tests", () => {
    it("signs up, signs in, adds and edits a project, then signs out", () => {
        const email = `tahseen${Date.now()}@test.com`;
        const password = "Password123!";
        const projectTitle = `Cypress Project ${Date.now()}`;
        const editedTitle = `${projectTitle} Edited`;

        cy.visit("/signup");

        cy.get("#signup-firstname").type("Tahseen");
        cy.get("#signup-lastname").type("Ahmed");
        cy.get("#signup-email").type(email);
        cy.get("#signup-password").type(password);
        cy.contains("button", "Sign Up").click();

        cy.url().should("include", "/signin");

        cy.get("#signin-email").type(email);
        cy.get("#signin-password").type(password);
        cy.contains("button", "Sign In").click();

        cy.url().should("include", "/admin");
        cy.contains("h1", "Admin Dashboard").should("be.visible");

        cy.contains("a", "Manage Projects").click();
        cy.contains("a", "Add Project").click();

        cy.get("#title").type(projectTitle);
        cy.get("#completion").type("2026-08-01");
        cy.get("#description").type("Project created by Cypress automated testing.");
        cy.get("#image").type("cypress-project.png");
        cy.contains("button", "Add Project").click();

        cy.url().should("include", "/admin/projects");
        cy.contains("td", projectTitle).should("be.visible");

        cy.contains("tr", projectTitle).within(() => {
            cy.contains("a", "Edit").click();
        });

        cy.get("#title").clear().type(editedTitle);
        cy.get("#description")
            .clear()
            .type("Project edited by Cypress automated testing.");
        cy.contains("button", "Update Project").click();

        cy.url().should("include", "/admin/projects");
        cy.contains("td", editedTitle).should("be.visible");

        cy.contains("button", "Sign Out").click();
        cy.url().should("include", "/signin");
        cy.window().then((window) => {
            expect(window.localStorage.getItem("token")).to.equal(null);
        });
    });
});
