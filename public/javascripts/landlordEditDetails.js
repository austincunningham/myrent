/**
 * Created by austin on 10/07/2016.
 */
$('.ui.radio.checkbox').checkbox();

$('.ui.form')
    .form({
      fields: {
        conditions: {
          identifier: 'conditions',
          rules: [
            {
              type: 'checked',
              prompt: 'Tick the box to confirm the changes',
            },
          ],
        },
      },
    })
;

