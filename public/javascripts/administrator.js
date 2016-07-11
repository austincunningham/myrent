/**
 * Created by austin on 05/07/2016.
 * semantic ui validation
 */
$(document).ready(function () {
  $('#deleteTenant').dropdown();
  $('#deleteLandlord').dropdown();

  $('.ui.form.tenant').form({
    fields: {
      deleteTenant: {
        identifier: 'deleteTenant',
        rules: [{
          type: 'empty',
          prompt: 'Select Tenant to delete from the dropdown',
        },
        ],
      },
    },
    onSuccess: function () {
      inline: true,
          console.log('on success');
      submitTenantForm();
      return false;
    },
  });

  function submitTenantForm() {
    const formData = $('.ui.form.segment input').serialize();
    $.ajax({
      type: 'POST',
      url: '/Tenants/deleteResidence',
      data: formData,
      limitValues: false,
      success: function (response) {
        console.log('What do I get here' + response);
      },
    });
  };
});

/*  $('.ui.form.landlord').form({
    fields: {
      deleteLandlord: {
        identifier: 'deleteLandlord',
        rules: [{
          type: 'empty',
          prompt: 'Select Landlord to edit from the dropdown',
        },],
      },
    },
    onSuccess : function() {
      inline: true,
          console.log('on success');
      submitLandlordForm();
      return false;
  };
});*/
