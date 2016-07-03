/**
 * Created by austin on 03/07/2016.
 * semantic ui validation 
 */
$(document).ready(function() {
  $('.ui.dropdown').dropdown();

  $('.ui.form').form({
    fields: {
      selectResidence: {
        identifier: 'selectResidence',
        rules: [{
          type: 'empty',
          prompt: 'Select residence to Add from the dropdown'
        }]
      }
    }
  });
});