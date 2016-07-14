/**
 * Created by austin on 03/07/2016.
 * semantic ui validation
 */
$(document).ready(function () {
  $('.ui.dropdown').dropdown();

  $('.ui.form.deleteResidence').form({
    fields: {
      deleteResidence: {
        identifier: 'deleteResidence',
        rules: [{
          type: 'empty',
        },
        ],
      },
    },
    onSuccess: function () {
      console.log('on success');
      deleteResidenceForm();
      return false;
    },
  });

  function deleteResidenceForm() {
    const formData = $('.ui.form.segment input').serialize();
    $.ajax({
      type: 'GET',
      url: '/Tenants/deleteResidence',
      data: formData,
      success: function (response) {
        console.log('notification: ' + response.index);
        //$('#eircode').html(response.index);
        document.getElementById("eircode").value = response.index;

        //TENANTMAP.updateMarkers(response);
      },
    });
  }

  $('.ui.form.selectResidence').form({
    fields: {
      selectResidence: {
        identifier: 'selectResidence',
        rules: [{
          type: 'empty',
          prompt: 'Select residence to Add from the dropdown',
        },
        ],
      },
    },
    onSuccess: function () {
      console.log('on success');
      selectResidenceForm();
      return false;
    },
  });

  function selectResidenceForm() {
    const formData = $('.ui.form.segment input').serialize();
    $.ajax({
      type: 'POST',
      url: '/Tenants/selectResidence',
      data: formData,
      success: function (response) {
        console.log('notification: ' + response.index);

        //TENANTMAP.updateMarkers(response);
        let residenceId = $('#selectResidences').dropdown('get value');
        residenceDropdownSelect(residenceId);
      },
    });
    function residenceDropdownSelect(residenceId) {
      let $obj = $('.item.residencesList');
      for (let i = 0; i < $obj.length; i += 1) {
        console.log('dropdown loop number :' + i);
        if ($obj[i].getAttribute('data-value').localeCompare(residenceId) === 0) {
          console.log('found matching landlord id and removing from the dropdown');
          $obj[i].remove();
          $('#deleteLandlord').dropdown('clear');
          break;
        }
      }
    };
  };

});
