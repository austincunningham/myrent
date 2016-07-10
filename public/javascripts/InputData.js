/** force semantic ui forms to work*/
$('.ui.dropdown').dropdown();
$('#progress').progress();
$('.ui.radio.checkbox').checkbox();

$('.ui.form')
.form({
  fields: {
    rent: {
      identifier: 'rent',
      rules: [
        {
          type: 'empty',
          prompt: 'Please enter the Eircode for the geo location specified ',
        },
      ],
    },
    eircode: {
      identifier: 'eircode',
      rules: [
        {
          type: 'empty',
          prompt: 'Please enter the rent at specified location',
        },
      ],
    },
    bedrooms: {
      identifier: 'bedrooms',
      rules: [
        {
          type: 'empty',
          prompt: 'Please enter number of Bedrooms at specified location',
        },
      ],
    },
    area: {
        identifier: 'area',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter area of the property at specified location',
          },
        ],
      },
    type: {
          identifier: 'type',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter the type of the property at specified location',
            },
          ],
        },
    numberBathrooms: {
        identifier: 'numberBathrooms',
        rules: [
          {
            type: 'empty',
            prompt: 'You forgot to enter the number of bathrooms at specified location',
          },
        ],
      },
  },
})
;

