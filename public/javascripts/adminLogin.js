$('.ui.form').form({
  fields: {
    email: {
          identifier: 'email',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your user name, It will be the email you signed up with',
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
