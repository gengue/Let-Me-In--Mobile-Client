$( "#usuarios" ).on( "pagecreate", mostrarUsuarios());
$( "#registros" ).on( "pagecreate", mostrarRegistros());
$(document).ready(function(){
   $("#registros-refresh").click(function(evento){
      //elimino el comportamiento por defecto del enlace
      evento.preventDefault();      
      mostrarRegistros();
   });
   $("#usuarios-refresh").click(function(evento){
      //elimino el comportamiento por defecto del enlace
      evento.preventDefault();      
      mostrarUsuarios();
   });
})

function mostrarUsuarios(){
    ruta = 'http://letmein-ws.esy.es/usuarios.php';
    $('#contenido-lista').html('<p id="ajax_loader"><img src="images/ajax-loader.gif" /></p>');
    $.ajax({
        url: ruta,
        datatype: "json",
    }).done(function(usuarios){
                    $("#contenido-lista").html("");
                    $.each(usuarios, function(index){
                      var nombre = usuarios[index].nombres;
                      var apellido = usuarios[index].apellidos;
                      var tipoEmpleado = usuarios[index].tipoEmpleado;
                      $("#contenido-lista").append("<li>"+nombre+" "+apellido+"-"+tipoEmpleado+"</li><br>");                    
                                        
                });                
            });  
}

function mostrarRegistros(){
      ruta = 'http://letmein-ws.esy.es/registros.php';
      $('#tabla').html('<p id="ajax_loader"><img src="images/ajax-loader.gif" /></p>');     
       $.ajax({       
          url: ruta,
          datatype: "json",
      }).done(function(registro){
              console.log(registro);              
              $("#tabla").html(""); 
              $("#tabla").append('<div class="ui-block-a ui-bar-a">Empleado</div><div class="ui-block-b ui-bar-a">Fecha Ingreso</div><div class="ui-block-c ui-bar-a">Fecha Salida</div>');                    
                      $.each(registro, function(index){
                        var nombre = registro[index].nombres;
                        var apellido = registro[index].apellidos;
                        var fechaIngreso = registro[index].fechaYhora;
                        var id = registro[index].entradaid;
                        $.get( "http://letmein-ws.esy.es/registros.php?id="+id, function( data ) { 
                            var fechaSalida = data[0].fechasalida;
                            $("#tabla").append('<div class="ui-block-a">'+nombre+" "+apellido+'</div><div class="ui-block-b">'+fechaIngreso+'</div><div class="ui-block-c">'+fechaSalida+'</div>');
              }, "json");
                  });                
              });
  }



