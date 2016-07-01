/**
 * Created by austin on 01/07/2016.
 */
$(document).ready(function() {
  $('#editresidence').dropdown();
  $('#deleteresidence').dropdown();

  $('.ui.form').form({
    fields: {
      eircode_delete: {
        identifier: 'eircode_delete',
        rules: [{
          type: 'empty',
          prompt: 'Select residence to delete'
        }]
      },

      eircode_edit: {
        identifier: 'eircode_edit',
        rules: [{
          type: 'empty',
          prompt: 'Select residence to edit'
        }]
      }
    }
  });
});