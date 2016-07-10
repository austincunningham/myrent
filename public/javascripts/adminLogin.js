$('.ui.form')
    .form({
      fields: {
        email: {
          identifier: 'email',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your Administrator user name',
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
              prompt: 'Your password is at least {ruleValue} characters',
            },
          ],
        },
      },
    })
;
