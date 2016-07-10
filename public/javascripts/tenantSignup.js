/**
 * Created by austin on 10/07/2016.
 */

$('.ui.radio.checkbox').checkbox();

$('.ui.form')
    .form({
      fields: {
        firstName: {
          identifier: 'firstName',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your first name',
            },
          ],
        },
        lastName: {
          identifier: 'lastName',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your last name',
            },
          ],
        },
        email: {
          identifier: 'email',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your email',
            },
          ],
        },
        password: {
          identifier: 'password',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter a password',
            },
            {
              type: 'minLength[6]',
              prompt: 'Your password must be at least {ruleValue} characters',
            },
          ],
        },
        tenantReference: {
          identifier: 'tenantReference',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your tenant reference',
            },
          ],
        },
        conditions: {
          identifier: 'conditions',
          rules: [
            {
              type: 'checked',
              prompt: 'You must agree to the terms and conditions i.e. rent money is dead money',
            },
          ],
        },
      },
    })
;
