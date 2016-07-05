/**
 * Created by austin on 05/07/2016.
 * semantic ui validation 
 */
$(document).ready(function() {
  $('#deleteTenant').dropdown();
  $('#deleteLandlord').dropdown();

  $('.ui.form').form({
    fields: {
      deleteTenant: {
        identifier: 'deleteTenant',
        rules: [{
          type: 'empty',
          prompt: 'Select Tenant to delete from the dropdown'
        }]
      },

      deleteLandlord: {
        identifier: 'deleteLandlord',
        rules: [{
          type: 'empty',
          prompt: 'Select Landlord to edit from the dropdown'
        }]
      }
    }
  });
});