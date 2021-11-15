function tomarImagenPorSeccion() {

	html2canvas(document.querySelector("#" + "main")).then(canvas => {
		var img = canvas.toDataURL();
		console.log(img);
		base = "img=" + img + "&nombre=image";

		$.ajax({
			type:"POST",
			url:"procesos/crearImagenes.php",
			data:base,
			success:function(respuesta) {	
				respuesta = parseInt(respuesta);
				if (respuesta > 0) {
					alert("Imagen creada con exito!");
				} else {
					alert("No se pudo crear la imagen :(");
				}
			}
		});
	});	
}