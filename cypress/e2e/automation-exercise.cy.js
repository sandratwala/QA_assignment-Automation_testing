const generateEmail = () => `user${Date.now()}@test.com`;

describe('Homepage Test', () => {
  it('TC 1: Verify Homepage Loads', () => {
    cy.visit('https://automationexercise.com');
  });

  it('verifies that the logo is visible', () => {
    cy.visit('https://automationexercise.com');
    cy.get('.logo img').should('be.visible');
  });

  it('verify that the navigation menu is visible', () => {
    cy.visit('https://automationexercise.com');
    cy.get('.shop-menu').should('be.visible');
  });

  it('verify that the signup/Login link is visible', () => {
    cy.visit('https://automationexercise.com');
    cy.get('a[href="/login"]').should('be.visible');
  });
});

describe('Automation Exercise - User Registration, Login, and Product Search', () => {
  const userEmail = generateEmail();

  it('TC 2: Successfully registers a new user', () => {
    cy.visit('https://automationexercise.com');
    cy.contains('Signup / Login').should('be.visible').click();
    cy.contains('New User Signup!').should('be.visible');
    cy.get('[data-qa="signup-name"]').type('QA Testing');
    cy.get('[data-qa="signup-email"]').type(userEmail);
    cy.get('[data-qa="signup-button"]').click();

    cy.get('#id_gender1').check();
    cy.get('#password').type('sandie123');
    cy.get('#days').select('7');
    cy.get('#months').select('December');
    cy.get('#years').select('2007');

    cy.get('#first_name').type('Sandra');
    cy.get('#last_name').type('Twala');
    cy.get('#company').type('QA Testing LTD');
    cy.get('#address1').type('QA test st');
    cy.get('#address2').type('FM 23');
    cy.get('#state').type('California');
    cy.get('#city').type('San Francisco');
    cy.get('#zipcode').type('94105');
    cy.get('#mobile_number').type('1276789089');

    cy.get('[data-qa="create-account"]').click();

  
    cy.contains('Account Created!').should('be.visible');

    cy.get('[data-qa="continue-button"]').click();

    cy.contains('Logged in as').should('be.visible');


    cy.get('a[href="/logout"]').click();


    cy.url().should('include', '/login');
  });

  it('TC 3: Logs in with valid credentials', () => {
    const email = generateEmail();

    cy.visit('https://automationexercise.com');
    cy.contains('Signup / Login').should('be.visible').click();

    cy.get('[data-qa="signup-name"]').type('QA Testing');
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    cy.get('#id_gender1').check();
    cy.get('#password').type('sandie123');
    cy.get('#days').select('7');
    cy.get('#months').select('December');
    cy.get('#years').select('2007');

    cy.get('#first_name').type('Sandra');
    cy.get('#last_name').type('Twala');
    cy.get('#company').type('QA Testing LTD');
    cy.get('#address1').type('QA test st');
    cy.get('#address2').type('FM 23');
    cy.get('#state').type('California');
    cy.get('#city').type('San Francisco');
    cy.get('#zipcode').type('94105');
    cy.get('#mobile_number').type('1276789089');

    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="continue-button"]').click();

    cy.get('a[href="/logout"]').click();


    cy.contains('Signup / Login').click();

    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type('sandie123');
    cy.get('[data-qa="login-button"]').click();

    cy.get('.navbar-nav').should('contain.text', 'Logged in as QA Testing');

    cy.get('a[href="/logout"]').click();


    cy.url().should('include', '/login');
  });

it('TC 4: Login With Invalid Credentials', () => {

  cy.visit('https://automationexercise.com');

  cy.contains('Signup / Login', { timeout: 10000 }).should('be.visible').click();

  cy.get('[data-qa="login-email"]').type('fake_nonexistent_user@invalid.com');
  cy.get('[data-qa="login-password"]').type('WrongPassword123');
  cy.get('[data-qa="login-button"]').click();

  cy.get('.login-form p')
    .should('be.visible')
    .and('contain.text', 'Your email or password is incorrect!');
})



  it('TC 5: Searches for a product', () => {

  cy.visit('https://automationexercise.com');

  cy.get('a[href="/products"]', { timeout: 10000 }).should('be.visible').click();

  cy.get('#search_product', { timeout: 10000 }).should('be.visible').type('Dress');


  cy.get('#submit_search').should('be.visible').click();

  cy.get('.title').should('contain.text', 'Searched Products');

  cy.get('.features_items').should('contain.text', 'Dress');
})

it('TC 6: View Product Details', () => {

  cy.visit('https://automationexercise.com');


  cy.get('a[href="/products"]', { timeout: 10000 }).should('be.visible').click();

  
  cy.get('.choose > .nav > li > a', { timeout: 10000 }).first().should('be.visible').click();


  cy.url().should('include', '/product_details/');


  cy.get('.product-information h2').should('be.visible');

  cy.get('.product-information p').should('contain.text', 'Category:');

  cy.get('.product-information').within(() => {
  
    cy.contains('span', 'Availability').should('be.visible');
    cy.contains('span', 'Condition').should('be.visible');
    cy.contains('span', 'Brand').should('be.visible');
  });
  cy.get('.product-information').within(() => {
  
    cy.contains('span', 'Availability:').next('span').should('not.be.empty');
    cy.contains('span', 'Condition:').next('span').should('not.be.empty');
    cy.contains('span', 'Brand:').next('span').should('not.be.empty');
  })



it('Test Case 7: Add Product to Cart', () => {
cy.get('a[href="/products"]').click();
cy.get('.features_items .col-sm-4').first().within(() => {
cy.get('.add-to-cart').first().click();
});

cy.get('.modal-content').should('be.visible');
cy.get('.modal-body a[href="/view_cart"]').click();
cy.url().should('include', '/view_cart');

cy.get('#cart_info_table tbody tr').should('have.length.at.least', 1);
cy.get('.cart_price').should('be.visible');
cy.get('.cart_quantity').should('be.visible');
});


it('TC 8: Remove Product From Cart', () => {
cy.get('a[href="/products"]').click();
cy.get('.features_items .col-sm-4').first().within(() => {
cy.get('.add-to-cart').first().click();
});
cy.get('.modal-body a[href="/view_cart"]').click();

cy.get('.cart_quantity_delete').click();
cy.get('#empty_cart').should('be.visible');
});


it('Test Case 9: Submit Contact Us Form', () => {
cy.get('a[href="/contact_us"]').click();
cy.get('.contact-form').should('be.visible');

cy.get('[data-qa="name"]').type('QA Tester');
cy.get('[data-qa="email"]').type('tester@example.com');
cy.get('[data-qa="subject"]').type('Automation Query');
cy.get('[data-qa="message"]').type('Automating this form using Cypress.');

cy.on('window:alert', (text) => {
expect(text).to.contain('Press OK');
});
cy.on('window:confirm', () => {
return true;
});

cy.get('[data-qa="submit-button"]').click();
cy.get('.status').should('be.visible')
.and('contain.text', 'Success! Your details have been submitted successfully.');
});

it('Challenge Task 2: Verify Product Quantity', () => {
cy.get('a[href="/products"]').click();
cy.get('.choose > .nav > li > a').first().click();

cy.get('#quantity').clear().type('3');
cy.get(':nth-child(5) > .btn').click();

cy.get('.modal-body a[href="/view_cart"]').click();
cy.get('.cart_quantity button').should('contain.text', '3');
});

it('Challenge Task 3: Subscribe to Newsletter', () => {
cy.get('#footer').scrollIntoView();
cy.get('.single-widget h2').should('contain.text', 'Subscription');

cy.get('#susbscribe_email').type('subscriber@example.com');
cy.get('#subscribe').click();

cy.get('.alert-success').should('be.visible')
.and('contain.text', 'You have been successfully subscribed!');
});



});
});






























