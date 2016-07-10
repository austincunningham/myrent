/**
 * Created by austin on 10/07/2016.
 */

$('.ui.form')
    .form({
      fields: {
        cEmail: {
          identifier: 'cEmail',
          rules: [
            {
              type: 'email',
              prompt: 'Please enter valid email address',
            },
          ],
        },
        fName: {
          identifier: 'fName',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your first name',
            },
          ],
        },
        lName: {
          identifier: 'lName',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your last name',
            },
          ],
        },
        msgtxt: {
          identifier: 'msgtxt',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your messages in the text box',
            },
          ],
        },
      },
    })
;
