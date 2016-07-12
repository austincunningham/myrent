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
      success: function (response) {
        console.log('notification: ' + response.index);
        $('#notificationTenant').html('<div class=\"ui green inverted segment\">' + response.index
            + '</div> <br>');

        // No need to call the map here as residences can exist without tenants
        let tenantId = $('#deleteTenant').dropdown('get value');
        tenantDropdownDelete(tenantId);
      },
    });
    function tenantDropdownDelete(tenantId) {
      let $obj = $('.item.tenantList');
      for (let i = 0; i < $obj.length; i += 1) {
        console.log('dropdown loop number :' + i);
        if ($obj[i].getAttribute('data-value').localeCompare(tenantId) === 0) {
          console.log('found matching tenant id and removing from the dropdown');
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
