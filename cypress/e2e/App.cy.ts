describe('端對端測試 App.ts', () => {
  it('測試 Header 結構', { viewportWidth: 1280, viewportHeight: 720 }, () => {
    cy.visit('http://localhost:3000');

    cy.wait(3000);
    cy.get('.header__menu-nav-pc').should('contain', '線上投保');
    cy.get('.header__menu-nav-pc').should('contain', '保險服務');
    cy.get('.header__menu-nav-pc').should('contain', '活動訊息');
    cy.get('a').should('contain', '我要繳費');
    cy.get('a').should('contain', '審核件查詢');
    cy.get('#center').should('have.text', '會員中心');
  });

  it('測試會員登入', { viewportWidth: 1280, viewportHeight: 720 }, () => {
    cy.visit('http://localhost:3000');

    cy.wait(3000);
    cy.get('.header__head').then(($body) => {
      if ($body.text().includes('登入/註冊')) {
        cy.get('#login').click();
        cy.get('input[name="memberId"]').type('A151273978');
        cy.get('input[name="captchaCode"]').type('123456');
        cy.get('#otpAuth').click();
        cy.get('input[name="otpCode"]').type('000000');
        cy.get('#otpVerify').click();
        cy.wait(1000);
        cy.get('#memName').should('have.text', '林寶寶');
      }
    });
  });

  it('(跨平台) 手機測試', { viewportWidth: 360, viewportHeight: 740 }, () => {
    cy.visit('http://localhost:3000');

    cy.wait(3000);
    cy.get('.header').should('not.contain', 'Line官方帳號');
    cy.get('.header').should('not.contain', 'FB專頁');
  });
});