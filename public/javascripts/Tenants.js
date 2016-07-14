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
        console.log('notification: ' + response);
        let selectedEircode = document.getElementById('eircode').value;
        let selectedId = $.each(response, function (index, geoObj) {
          console.log(geoObj[0] + ' ' + geoObj[1] + ' id: ' + geoObj[2]);
          if (geoObj[0] === selectedEircode) {
            return geoObj[2];
          }
        });
        residenceDropDownAdd(selectedEircode, selectedId);
        document.getElementById('eircode').value = 'Select new residence ';

        TENANTMAP.updateMarkers(response);
      },
    });
  }

  function residenceDropDownAdd(selectedEircode, selectedId) {
    let newMenuItem = '<div class="item eircode"' + ' ' + 'data-value="' + selectedId + '">'
        + selectedEircode + '</div>';
    $('.menu.selectResidence').append(newMenuItem);
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
        console.log('notification: ' + response);

        //TENANTMAP.updateMarkers(response);
        let residenceId = $('#residencesList').dropdown('get value');
        console.log('id no expected :' + residenceId);
        let selectedEircode = $('#residencesList').dropdown('get text');
        console.log('eircode expected : ' + selectedEircode);
        document.getElementById('eircode').value = selectedEircode;
        residenceDropdownSelect(residenceId);
      },
    });
    function residenceDropdownSelect(residenceId) {
      let $obj = $('.item.residencesList');
      for (let i = 0; i < $obj.length; i += 1) {
        console.log('dropdown loop number :' + i);
        if ($obj[i].getAttribute('data-value').localeCompare(residenceId) === 0) {
          $obj[i].remove();
          $('#selectedResidences').dropdown('clear');
          break;
        }
      }
    };
  };

});
