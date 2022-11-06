describe("ログイン", () => {
    it('access', () => {
        cy.visit('http://localhost:3000/signin')
    });
    
    it("email error", () => {
        cy.get("[data-cy=email]").type('test')
        cy.get('button').contains('サインイン').click()
        cy.get("[data-cy=error-message]").should('have.text', 'サインインに失敗しました。')
    });

    it("email success", () => {
        cy.get("[data-cy=email]").type('aaaa@email.com')
        cy.get('button').contains('サインイン').click()
    });
});