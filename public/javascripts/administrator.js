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
      console.log('on success');
      submitTenantForm();
      return false;
    },
  });

  function submitTenantForm() {
    const formData = $('.ui.form.segment input').serialize();
    $.ajax({
      type: 'POST',
      url: '/Tenants/deleteTenant',
      data: formData,
      //limitValues: false,
      success: function (response) {
        console.log('notification: ' + response.index);
        $('#notificationTenant').html('<div class=\"ui green inverted segment\">' + response.index
            + '</div> <br>');
        let email = $('#deleteTenant').dropdown('get text');
        tenantDropdownDelete(email);
      },
    });
    function tenantDropdownDelete(email) {
      let $obj = $('.item.tenant');
      for (let i = 0; i < $obj.length; i += 1) {
        if ($obj[i].getAttribute('data-value').localeCompare(email) == 0) {
          $obj[i].remove();
          $('#deleteTenant').dropdown('clear');
          break;
        }
      }
    };
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
