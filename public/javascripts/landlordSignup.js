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
      line1Address: {
        identifier: 'line1Address',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the first line of your address',
          },
        ],
      },
      line2Address: {
        identifier: 'line2Address',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the second line of your address',
          },
        ],
      },
      city: {
        identifier: 'city',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the city/town where you live',
          },
        ],
      },
      county: {
        identifier: 'county',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter the county where you live',
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
