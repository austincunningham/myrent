/**
 * Created by austin on 10/07/2016.
 */

$('.ui.form')
    .form({
      fields: {
        email: {
          identifier: 'email',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your user name, it is the email address you signed up with',
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