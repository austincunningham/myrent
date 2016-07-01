/**
 * Created by austin on 01/07/2016.
 * semantic ui validation 
 */
$(document).ready(function() {
  $('#editResidence').dropdown();
  $('#deleteResidence').dropdown();

  $('.ui.form').form({
    fields: {
      deleteResidence: {
        identifier: 'deleteResidence',
        rules: [{
          type: 'empty',
          prompt: 'Select residence to delete from the dropdown'
        }]
      },

      editResidence: {
        identifier: 'editResidence',
        rules: [{
          type: 'empty',
          prompt: 'Select residence to edit from the dropdown'
        }]
      }
    }
  });
});