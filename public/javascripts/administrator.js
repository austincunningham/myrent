/**
 * Created by austin on 05/07/2016.
 * semantic ui validation
 */
$(document).ready(function () {
  $('#deleteTenant').dropdown();
  $('#deleteLandlord').dropdown();

  /**
   * Uses the response from the ajax call to compare with the existing page list dropdown and
   * remove what is not in the DB
   * @param response
   */
  function tenantDropdownDelete(response) {
    let $obj = $('.item.tenantList');
    let removeList = [];

    for (i = 0; i < $obj.length; i++) {
      removeList[i] = $obj[i].innerHTML;
    }

    console.log(removeList);
    const val = $.each(response, function (index, geoObj) {
      console.log('Current email list :' + geoObj[4]);
    });

    //finds the differences between the two and puts in an array
    for (let i = 0; i < removeList.length; i++) {
      for (let j = 0; j < val.length; j++) {
        if (val[j][4] === null) {
          console.log('do nothing its null');
        } else {
          let removeL = removeList[i].toString();
          let value = val[j][4].toString();
          if (value.localeCompare(removeL) == 0) {
            console.log('do i ever remove :' + removeList[i]);
            removeList.splice(i, 1);
          }
        }
      }

    }

    for (let x = 0; x < removeList.length; x++) {
      console.log('whats left ' + removeList[x]);
    }

    for (let i = 0; i < $obj.length; i++) {
      for (let j = 0; j < removeList.length; j++) {
        console.log('should be something here: ' + removeList[j] + ' innerHtml '
            + $obj[i].innerHTML);
        if ($obj[i].innerHTML.localeCompare(removeList[j]) == 0) {
          console.log('do i ever remove :'  + $obj[i].innerHTML);
          $obj[i].remove();
        }
      }
    }

    $('#deleteTenant').dropdown('clear');
  }

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
        //console.log('notification: ' + response.index);
        //$('#notification').html('<br><div class=\"ui green inverted segment\">' + response.index
        //   + '</div> <br>');
        ADMINMAP.updateMarkers(response);

        //let tenantId = $('#deleteTenant').dropdown('get value');
        tenantDropdownDelete(response);
      },
    });

  };

  $('.ui.form.landlord').form({
    fields: {
      deleteLandlord: {
        identifier: 'deleteLandlord',
        rules: [{
          type: 'empty',
          prompt: 'Select Landlord to edit from the dropdown',
        },
        ],
      },
    },
    onSuccess: function () {
      console.log('on success');
      submitLandlordForm();
      return false;
    },
  });

  function submitLandlordForm() {
    const formData = $('.ui.form.segment input').serialize();
    $.ajax({
      type: 'POST',
      url: '/Landlords/deleteLandlord',
      data: formData,
      success: function (response) {
        //console.log('notification: ' + response.index);
        //$('#notification').html('<br><div class=\"ui green inverted segment\">' + response.index
        //    + '</div> <br>');
        ADMINMAP.updateMarkers(response);
        let landlordId = $('#deleteLandlord').dropdown('get value');
        landlordDropdownDelete(landlordId);
        tenantDropdownDelete(response);
      },
    });
    function landlordDropdownDelete(landlordId) {
      let $obj = $('.item.landlordList');
      for (let i = 0; i < $obj.length; i += 1) {
        console.log('dropdown loop number :' + i);
        if ($obj[i].getAttribute('data-value').localeCompare(landlordId) === 0) {
          console.log('found matching landlord id and removing from the dropdown');
          $obj[i].remove();
          $('#deleteLandlord').dropdown('clear');
          break;
        }
      }
    };
  };
});
