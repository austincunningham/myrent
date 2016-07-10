/**
 * Created by austin on 10/07/2016.
 */

$('.ui.form')
    .form({
      fields: {
        rent: {
          identifier: 'rent',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter new rent to the nearest whole number',
            },
          ],
        },
      },
    })
;
