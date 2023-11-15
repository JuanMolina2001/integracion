import React, { useRef, useEffect, useState } from 'react';

import carnet from "../../assets/images/carnet.png"
function ImageEditor({datos}) {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
      
        const image = new Image();
        image.src = carnet;
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0, image.width, image.height);
      
          context.font = '20px Arial';
          context.fillStyle = 'black';
          const x = 0; // Coordenada X
          const y = 0; // Coordenada Y
      
          context.fillText(` ${datos.nombre}`, x + 185, y + 140);
          context.fillText(` ${datos.apellidos}`, x + 185, y + 90);
          context.fillText(`${datos.rut}`, x + 70, y + 320);
          context.fillText(` ${datos.documento}`, x + 185, y + 250);
          context.fillText(`Chile`, x + 185, y + 190);
      
          const imagenAdicional = new Image();
      
          imagenAdicional.src = datos.photoUrl;
      
          imagenAdicional.onload = () => {
      
            const anchoDeseado = 140; // Define el ancho deseado en píxeles
            const altoDeseado = 140; // Define el alto deseado en píxeles
      
            // Coordenadas donde deseas que aparezca la imagen (ajusta según tus mediciones)
            const xImagen = x + 30; // Coordenada X para la imagen
            const yImagen = y + 100; // Coordenada Y para la imagen
      
            context.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Color de la sombra (negro con transparencia)
            context.shadowBlur = 10; // Tamaño del efecto de sombra
      
            context.drawImage(imagenAdicional, xImagen, yImagen, anchoDeseado, altoDeseado);
      
            // Restablece la sombra después de dibujar la imagen si no deseas aplicarla a otros elementos
            context.shadowColor = 'transparent';
            context.shadowBlur = 0;
          };
        };
      }, []);
      


    return (
        <div>
            <canvas ref={canvasRef} className='img-fluid'/>
            
        </div>
    );
}

export default ImageEditor;
