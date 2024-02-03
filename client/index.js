$(document).ready(function () {
    let baseApiUrl = "http://localhost:8000/api"
    var trHTML = "";

    //load data from api
    function loadData(){
        $.ajax({       
          url : baseApiUrl + "/getstudents",
          type : 'GET',
          data : {},
          dataType: 'json',
          success : function(response){    
            loadTable(response);
          }
      });
    }

    //load table
    function loadTable (students){     
        trHTML = "";
        document.getElementById("mytable").innerHTML = "";
        students.forEach( function(item) {
          trHTML += "<tr>";
            trHTML += "<td>" + item["id"] + "</td>";
            trHTML += "<td>" + item["first_name"] + "</td>";
            trHTML += "<td>" + item["last_name"] + "</td>";
            trHTML += "<td>" + item["age"] + "</td>";
            trHTML += "<td>" + item["gender"] + "</td>";
            trHTML +=  '<td>'
            trHTML +=  '<a href="javascript:void(0);" class="btn btn-sm btn-info edit" data-id="' + item.id + '">Edit</a> &nbsp;';
            trHTML +=  '<a href="javascript:void(0);" class="btn btn-sm btn-danger delete" data-id="' + item.id + '">Delete</a>';
            trHTML +=  '</td>'
            trHTML += "</tr>";
        });
        document.getElementById("mytable").innerHTML = trHTML;
    }

    loadData();

   //event handlers
    $('#openAddModal').on('click', function () {
        $("#addModal input[name='first_name']").val(""),
        $("#addModal input[name='last_name']").val(""),
        $("#addModal input[name='age']").val(""),
        $("#addModal input[name='gender']").val("")
        $('#addModal').modal('show');
    });

    $('#mytable').on('click', '.edit', function () {
        let id = $(this).data('id');
        $.ajax({       
          url : baseApiUrl + "/getstudent?id=" + id,
          type : 'GET',
          data : {},
          dataType: 'json',
          success : function(response){   
            let student = response; 
            $("#editModal input[name='id']").val(id),
            $("#editModal input[name='first_name']").val(student.first_name),
            $("#editModal input[name='last_name']").val(student.last_name),
            $("#editModal input[name='age']").val(student.age),
            $("#editModal input[name='gender']").val(student.gender)
          }
        });
        $('#editModal').modal('show');
    });

    //showing modal for delete record
    $('#mytable').on('click', '.delete', function () {
        let id = $(this).data('id');
        $("#deleteModal input[name='id']").val(id);
        $('#deleteModal').modal('show');
    });

    $('#addStudent').on('click', function () {
        let student = {
          first_name:  $("#addModal input[name='first_name']").val(),
          last_name: $("#addModal input[name='last_name']").val(),
          age: $("#addModal input[name='age']").val(),
          gender: $("#addModal input[name='gender']").val()
        }  
      
        $.ajax({       
          url : baseApiUrl + "/addstudent",
          type : 'POST',
          data : student,
          dataType: 'json',
          success : function(response){    
            loadData(response);
            $('#addModal').modal('hide');
          }
        });
    });

    $('#editStudent').on('click', function () {
      let student = {
        id: $("#editModal input[name='id']").val(),
        first_name:  $("#editModal input[name='first_name']").val(),
        last_name: $("#editModal input[name='last_name']").val(),
        age: $("#editModal input[name='age']").val(),
        gender: $("#editModal input[name='gender']").val(),
      }    
      
      $.ajax({       
        url : baseApiUrl + "/updatestudent",
        type : 'POST',
        data : student,
        dataType: 'json',
        success : function(response){    
          loadData(response);
          $('#editModal').modal('hide');
        }
      });
    });

    $('#deleteStudent').on('click', function () {
        let id = $("#deleteModal input[name='id']").val();      
        $.ajax({       
          url : baseApiUrl + "/deletestudent",
          type : 'POST',
          data : { id: id},
          dataType: 'json',
          success : function(response){    
            loadData(response);
            $('#deleteModal').modal('hide');
          }
      });
    });
});