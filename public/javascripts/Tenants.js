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
        let selectedId;
        $.each(response, function (index, geoObj) {
          if (geoObj[0] === selectedEircode) {
            selectedId = geoObj[2];
          }
        });

        residenceDropDownAdd(selectedEircode, selectedId);
        document.getElementById('eircode').value = 'Select new residence ';

        TENANTMAP.updateMarkers(response);
      },
    });
  }

  function residenceDropDownAdd(selectedEircode, selectedId) {
    let newMenuItem = '<div class="item residencesList"' + ' ' + 'data-value="' + selectedId + '">'
        + selectedEircode + '</div>';
    $('.menu.residence').append(newMenuItem);
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
        TENANTMAP.updateMarkers(response);
        let residenceId = $('#selectResidence').dropdown('get value');
        console.log('id no expected :' + residenceId);
        let residenceEircode = $('#selectResidence').dropdown('get text');
        console.log('eircode expected : ' + residenceEircode);

        // only populate value if there is an eircode present
        if (residenceEircode != '') {
          document.getElementById('eircode').value = residenceEircode;
        }

        residenceDropdownSelect(residenceId);
      },
    });
    function residenceDropdownSelect(residenceId) {
      //==========================================================================
/*
      let $obj = $('.item.residencesList');
      let removeList = [];

      for (i = 0; i < $obj.length; i++) {
        removeList[i] = $obj[i].innerHTML;
      }

      console.log(removeList);
      const val = $.each(response, function (index, geoObj) {
        console.log('Current eircode list :' + geoObj[0]);
      });

      //finds the differences between the two and puts in an array
      for (let i = 0; i < removeList.length; i++) {
        for (let j = 0; j < val.length; j++) {
          if (val[j][0] === null) {
            console.log('do nothing its null');
          } else {
            let removeL = removeList[i].toString();
            let value = val[j][0].toString();
            if (value.localeCompare(removeL) == 0) {
              console.log('Remove from remove list :' + removeList[i]);
              removeList.splice(i, 1);
            }
          }
        }

      }

      for (let x = 0; x < removeList.length; x++) {
        console.log('whats left to remove ' + removeList[x]);
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

      $('#selectResidence').dropdown('clear');
*/

      //==========================================================================
      let $obj = $('.item.residencesList');
      for (let i = 0; i < $obj.length; i += 1) {
        console.log('dropdown loop number :' + i);
        if ($obj[i].getAttribute('data-value').localeCompare(residenceId) === 0) {
          $obj[i].remove();
          $('#selectResidence').dropdown('clear');
          break;
        }
      }
    };
  };

});
