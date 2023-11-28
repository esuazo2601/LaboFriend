INSERT INTO public."Administrador" (email) VALUES
	 ('richixdpro@gmail.com');
INSERT INTO public."Agenda" (fecha,email_estudiante,id_sala,id_bloque) VALUES
	 ('2023-11-28','gustavoXdPro@udequiano.com',1,4);
INSERT INTO public."Bloque" (hora_inicio,hora_fin) VALUES
	 ('08:15:00','09:00:00'),
	 ('09:15:00','10:00:00'),
	 ('10:15:00','11:00:00'),
	 ('11:15:00','12:00:00'),
	 ('12:15:00','13:00:00'),
	 ('13:15:00','14:00:00'),
	 ('14:15:00','15:00:00'),
	 ('15:15:00','16:00:00'),
	 ('16:15:00','17:00:00'),
	 ('17:15:00','18:00:00');
INSERT INTO public."Equipo" (nombre,fecha_mantencion,descripcion,id_sala) VALUES
	 ('Congelador','2023-11-16','Ideal para cultivo de microorganismos',1),
	 ('Campana','2023-11-27','Es para el vacio',1),
	 ('Campana de Flujo Laminar','2023-01-10','Garantiza un entorno libre de partículas para trabajos microbiológicos.',1),
	 ('Mechero Bunsen','2023-02-15','Utilizado para proporcionar una llama controlada en experimentos de laboratorio.',1),
	 ('Microscopio de Fluorescencia','2023-03-20','Permite la observación de muestras a nivel microscópico mediante fluorescencia.',1),
	 ('Centrífuga de Alta Velocidad','2023-04-25','Utilizada para separar componentes celulares o de laboratorio a través de la centrifugación.',1),
	 ('PCR Termociclador','2023-05-30','Instrumento para realizar la reacción en cadena de la polimerasa (PCR).',1),
	 ('Incubadora de Cultivo Celular','2023-06-05','Proporciona condiciones controladas para el crecimiento de células y microorganismos.',1),
	 ('Espectrofotómetro UV-Vis','2023-07-10','Se utiliza para medir la absorbancia y transmitancia de sustancias en función de la longitud de onda.',1),
	 ('Agitador Magnético con Calefacción','2023-08-15','Mezcla y calienta soluciones mediante agitación magnética.',1);
INSERT INTO public."Equipo" (nombre,fecha_mantencion,descripcion,id_sala) VALUES
	 ('Electroforesis de Gel','2023-09-20','Se utiliza para separar y analizar moléculas de ADN, ARN y proteínas.',1),
	 ('Liofilizador','2023-10-25','Equipo para la deshidratación de muestras mediante congelación y sublimación.',1),
	 ('Microscopio Electrónico de Transmisión','2023-11-30','Ofrece una alta resolución para la observación detallada de estructuras celulares y moleculares.',1);
INSERT INTO public."Estudiante" (email) VALUES
	 ('rialgou@gmail.com'),
	 ('gustavoXdPro@udequiano.com'),
	 ('richixdpro@gmail.com');
INSERT INTO public."Investigacion" (titulo,descripcion,fecha) VALUES
	 ('Estudio de expresión génica en plantas de tomate','Investigación sobre los mecanismos moleculares que regulan la expresión génica durante el desarrollo de las plantas de tomate.','2023-01-15 00:00:00'),
	 ('Análisis de resistencia a plagas en cultivos de maíz','Investigación para identificar genes responsables de la resistencia a plagas en variedades de maíz y su aplicación en la agricultura sostenible.','2023-02-20 00:00:00'),
	 ('Desarrollo de vacunas vegetales contra enfermedades fúngicas','Investigación enfocada en el diseño y evaluación de vacunas vegetales para prevenir enfermedades fúngicas en cultivos de hortalizas.','2023-03-25 00:00:00'),
	 ('Efecto de microorganismos en la promoción de crecimiento en arroz','Investigación para comprender cómo ciertos microorganismos benefician el crecimiento de las plantas de arroz y su aplicación en la agricultura.','2023-04-30 00:00:00'),
	 ('Optimización de la producción de enzimas celulolíticas','Investigación para mejorar la producción de enzimas celulolíticas mediante técnicas de ingeniería genética para su aplicación en la industria bioenergética.','2023-05-05 00:00:00'),
	 ('Estudio de la interacción planta-microorganismo en simbiosis','Investigación centrada en la comprensión de las interacciones entre plantas y microorganismos simbióticos, con implicaciones en la salud de las plantas.','2023-06-10 00:00:00'),
	 ('Desarrollo de cultivos hidropónicos de alta eficiencia','Investigación sobre la optimización de sistemas de cultivo hidropónico para mejorar la eficiencia en el uso de recursos y la producción de alimentos.','2023-07-15 00:00:00'),
	 ('Evaluación de impacto ambiental de técnicas biotecnológicas','Investigación que analiza los efectos ambientales de diversas técnicas biotecnológicas utilizadas en la agricultura moderna.','2023-08-20 00:00:00'),
	 ('Identificación de genes de resistencia a sequía en trigo','Investigación para identificar y caracterizar genes de resistencia a la sequía en variedades de trigo con el objetivo de mejorar la tolerancia al estrés hídrico.','2023-09-25 00:00:00'),
	 ('Desarrollo de cultivos transgénicos resistentes a herbicidas','Investigación para diseñar cultivos transgénicos capaces de resistir herbicidas comunes, con el fin de facilitar la gestión de malezas en la agricultura.','2023-10-30 00:00:00');
INSERT INTO public."Microorganismo" (nombre_cientifico,nombre_comun,procedencia,detalles) VALUES
	 ('Agrobacterium tumefaciens','Agrobacteria','Suelo','Utilizado para transferencia de genes en ingeniería genética vegetal.'),
	 ('Rhizobium leguminosarum','Rhizobium','Raíces de leguminosas','Forma simbiosis con las raíces de plantas leguminosas y fija nitrógeno.'),
	 ('Pseudomonas fluorescens','Pseudomonas','Suelo','Actúa como antagonista contra patógenos de plantas.'),
	 ('Saccharomyces cerevisiae','Levadura de panadería','Ambiente natural','Se utiliza en biotecnología para la producción de etanol y levaduras.'),
	 ('Trichoderma harzianum','Trichoderma','Suelo','Hongo utilizado como agente de control biológico contra patógenos de plantas.'),
	 ('Azospirillum brasilense','Azospirillum','Raíces de plantas','Bacteria que promueve el crecimiento de las plantas.'),
	 ('Bacillus thuringiensis','Bacillus thuringiensis','Suelo','Produce toxinas que son usadas en bioinsecticidas.'),
	 ('Mycobacterium vaccae','Mycobacterium','Suelo','Puede tener efectos beneficiosos en la salud de las plantas y animales.'),
	 ('Escherichia coli','E. coli','Intestinos de mamíferos','Ampliamente utilizado en la investigación biotecnológica y producción de proteínas recombinantes.'),
	 ('Aspergillus niger','Aspergillus niger','Ambiente natural','Utilizado en la producción industrial de enzimas y ácido cítrico.');
INSERT INTO public."Producto" (nombre,cantidad_total,tipo) VALUES
	 ('Placas de Petri',10,'unidades'),
	 ('Etanol',25,'litros'),
	 ('Guantes',20,'pares'),
	 ('Pipetas',15,'unidades'),
	 ('Tubos de Microcentrífuga',20,'unidades'),
	 ('Papel de Filtro',30,'hojas'),
	 ('Jeringas Desechables',8,'unidades'),
	 ('Tubos de Cultivo',15,'unidades'),
	 ('Vasos de precipitado',8,'unidades'),
	 ('Ácido sulfúrico',15,'litros');
INSERT INTO public."Producto" (nombre,cantidad_total,tipo) VALUES
	 ('Láminas de vidrio',5,'unidades'),
	 ('Matraces Erlenmeyer',20,'unidades'),
	 ('Alcohol',34,'litros'),
	 ('Fenolftaleína',11,'gramos');
INSERT INTO public."Sala" (capacidad,nombre) VALUES
	 (1,'Sala 1');
INSERT INTO public."Trabaja" (email_usuario,id_investigacion) VALUES
	 ('rialgou@gmail.com',2),
	 ('gustavoXdPro@udequiano.com',4),
	 ('rialgou@gmail.com',6),
	 ('gustavoXdPro@udequiano.com',8),
	 ('rialgou@gmail.com',10);
INSERT INTO public."Usuario" (email,nombre,"password") VALUES
	 ('rialgou@gmail.com','Richard','$2b$12$/6meFbYSkIiknD339MCayOFWplvagwLaRuW3wE1AApYdfEhypJP3y'),
	 ('gustavoXdPro@udequiano.com','Gustavo','$2b$12$VVPIn13HlpwJzGzM00RU..NdYu16ucTEWHrYYWVQ/JFZLZ.PFX//q'),
	 ('richixdpro@gmail.com','Richard','$2b$12$VW5Q6KdAaEqCbNw9ShE8HejuKLPKEfRgCR/ySoHJEzJnInHwimDwi');
