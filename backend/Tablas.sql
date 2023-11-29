-- public."Bloque" definition

-- Drop table

-- DROP TABLE "Bloque";

CREATE TABLE "Bloque" (
	id int2 NOT NULL GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 32767 START 1 CACHE 1 NO CYCLE),
	hora_inicio time NOT NULL,
	hora_fin time NOT NULL,
	CONSTRAINT "Bloque_pkey" PRIMARY KEY (id)
);


-- public."Investigacion" definition

-- Drop table

-- DROP TABLE "Investigacion";

CREATE TABLE "Investigacion" (
	id int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE),
	titulo varchar NOT NULL,
	descripcion text NULL,
	fecha timestamp NULL,
	CONSTRAINT "Investigación_pkey" PRIMARY KEY (id)
);


-- public."Microorganismo" definition

-- Drop table

-- DROP TABLE "Microorganismo";

CREATE TABLE "Microorganismo" (
	id int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE),
	nombre_cientifico varchar NOT NULL DEFAULT '100'::character varying,
	nombre_comun varchar NULL DEFAULT '100'::character varying,
	procedencia text NULL DEFAULT 'EMPTY'::text,
	detalles text NULL DEFAULT 'EMPTY'::text,
	CONSTRAINT microorganismo_pkey PRIMARY KEY (id)
);


-- public."Producto" definition

-- Drop table

-- DROP TABLE "Producto";

CREATE TABLE "Producto" (
	id int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE),
	nombre varchar NOT NULL,
	cantidad_total int4 NULL,
	tipo varchar NULL,
	CONSTRAINT "Producto _pkey" PRIMARY KEY (id)
);


-- public."Sala" definition

-- Drop table

-- DROP TABLE "Sala";

CREATE TABLE "Sala" (
	id int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE),
	capacidad int4 NOT NULL,
	nombre text NULL,
	CONSTRAINT "Sala_pkey" PRIMARY KEY (id)
);


-- public."Usuario" definition

-- Drop table

-- DROP TABLE "Usuario";

CREATE TABLE "Usuario" (
	email text NOT NULL,
	nombre varchar NULL DEFAULT '100'::character varying,
	"password" text NULL,
	CONSTRAINT usuario_pkey PRIMARY KEY (email)
);


-- public."Administrador" definition

-- Drop table

-- DROP TABLE "Administrador";

CREATE TABLE "Administrador" (
	email text NOT NULL,
	id int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE),
	CONSTRAINT "Administrador_pkey" PRIMARY KEY (id),
	CONSTRAINT email_unique UNIQUE (email),
	CONSTRAINT "Administrador_email_fkey" FOREIGN KEY (email) REFERENCES "Usuario"(email) ON DELETE CASCADE
);


-- public."Ayudante" definition

-- Drop table

-- DROP TABLE "Ayudante";

CREATE TABLE "Ayudante" (
	email text NOT NULL,
	id serial4 NOT NULL,
	CONSTRAINT "Ayudante_pkey" PRIMARY KEY (id),
	CONSTRAINT ayudante_email_key UNIQUE (email),
	CONSTRAINT ayudante_email_fkey FOREIGN KEY (email) REFERENCES "Usuario"(email) ON DELETE CASCADE
);


-- public."Equipo" definition

-- Drop table

-- DROP TABLE "Equipo";

CREATE TABLE "Equipo" (
	id int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE),
	nombre varchar NOT NULL,
	fecha_mantencion date NULL,
	descripcion text NULL,
	id_sala int4 NULL,
	CONSTRAINT "Equipo_pkey" PRIMARY KEY (id),
	CONSTRAINT "Equipo_id_sala_fkey" FOREIGN KEY (id_sala) REFERENCES "Sala"(id)
);


-- public."Estudiante" definition

-- Drop table

-- DROP TABLE "Estudiante";

CREATE TABLE "Estudiante" (
	email text NOT NULL,
	id serial4 NOT NULL,
	CONSTRAINT "Estudiante_pkey" PRIMARY KEY (id),
	CONSTRAINT estudiante_email_key UNIQUE (email),
	CONSTRAINT estudiante_email_fkey FOREIGN KEY (email) REFERENCES "Usuario"(email) ON DELETE CASCADE
);


-- public."Incidencia" definition

-- Drop table

-- DROP TABLE "Incidencia";

CREATE TABLE "Incidencia" (
	id int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE),
	observacion text NOT NULL,
	fecha timestamp NOT NULL,
	id_investigacion int4 NULL,
	CONSTRAINT incidencia_pkey PRIMARY KEY (id),
	CONSTRAINT "Incidencia_id_investigacion_fkey" FOREIGN KEY (id_investigacion) REFERENCES "Investigacion"(id)
);


-- public."Inv_microorganismo" definition

-- Drop table

-- DROP TABLE "Inv_microorganismo";

CREATE TABLE "Inv_microorganismo" (
	id_investigacion int4 NOT NULL,
	id_microorganismo int4 NOT NULL,
	CONSTRAINT "Inv_microorganismo_pkey" PRIMARY KEY (id_investigacion, id_microorganismo),
	CONSTRAINT "Inv_microorganismo_id_investigacion_fkey" FOREIGN KEY (id_investigacion) REFERENCES "Investigacion"(id),
	CONSTRAINT "Inv_microorganismo_id_microorganismo_fkey" FOREIGN KEY (id_microorganismo) REFERENCES "Microorganismo"(id)
);


-- public."Producto_en_sala" definition

-- Drop table

-- DROP TABLE "Producto_en_sala";

CREATE TABLE "Producto_en_sala" (
	cantidad int4 NULL,
	id_producto int4 NOT NULL,
	id_sala int4 NOT NULL,
	lugar text NULL,
	id int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE),
	CONSTRAINT "Producto_en_sala_pkey" PRIMARY KEY (id),
	CONSTRAINT "Producto_en_sala_id_producto_fkey" FOREIGN KEY (id_producto) REFERENCES "Producto"(id) ON DELETE CASCADE,
	CONSTRAINT "Producto_en_sala_id_sala_fkey" FOREIGN KEY (id_sala) REFERENCES "Sala"(id),
	CONSTRAINT fk_parent_id_sala FOREIGN KEY (id_producto) REFERENCES "Producto"(id) ON DELETE CASCADE
);


-- public."Trabaja" definition

-- Drop table

-- DROP TABLE "Trabaja";

CREATE TABLE public."Trabaja" (
    id serial,
    email_usuario text not null,
    id_investigacion integer not null,
    constraint "trabaja_pkey" primary key (id),
    constraint "trabaja_email_usuario_fkey" foreign key (email_usuario) references "Usuario" (email) on delete cascade,
    constraint "trabaja_id_investigacion_fkey" foreign key (id_investigacion) references "Investigacion" (id) on update cascade on delete cascade
  ) 

-- public."Agenda" definition

-- Drop table

-- DROP TABLE "Agenda";

CREATE TABLE "Agenda" (
	id int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE),
	fecha date NOT NULL,
	email_estudiante text NOT NULL,
	id_sala int4 NOT NULL,
	id_bloque int2 NOT NULL,
	CONSTRAINT "Agenda_pkey" PRIMARY KEY (id),
	CONSTRAINT "Agenda_email_estudiante_fkey" FOREIGN KEY (email_estudiante) REFERENCES "Estudiante"(email) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "Agenda_id_bloque_fkey" FOREIGN KEY (id_bloque) REFERENCES "Bloque"(id),
	CONSTRAINT "Agenda_id_sala_fkey" FOREIGN KEY (id_sala) REFERENCES "Sala"(id)
);