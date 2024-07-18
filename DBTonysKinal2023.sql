/*
	Juan Pablo Ángel Yaxón Taquirá
    IN5AM
    2019386
    Fecha de Creación:
		28-03-2023
	Fecha de Modificación:
		31-05-2023
*/

Drop database if exists DBTonysKinal2023;
Create database DBTonysKinal2023;

Use DBTonysKinal2023;

Create table Empresas (
	codigoEmpresa int not null auto_increment,
    nombreEmpresa varchar(150) not null,
    direccion varchar (150) not null,
    telefono varchar(8),
    primary key PK_codigoEmpresa(codigoEmpresa)
);

Create table TipoEmpleado(
	codigoTipoEmpleado int not null auto_increment,
    descripcion varchar	(50) not null,
    primary key PK_codigoTipoEmpleado (codigoTipoEmpleado)
);

Create table TipoPlato(
	codigoTipoPlato int not null auto_increment,
    descripcionTipo varchar (100) not null,
    primary key PK_codigoTipoPlato (codigoTipoPlato)
);

Create table Productos(
	codigoProducto int not null auto_increment,
    nombreProducto varchar (150) not null,
    cantidad int not null,
    primary key PK_codigoProducto(codigoProducto)
);

Create table Empleados (
	codigoEmpleado int not null auto_increment,
    numeroEmpleado int not null,
    apellidoEmpleado varchar(150) not null,
    nombresEmpleado varchar(150) not null,
    direccionEmpleado varchar(150) not null,
    telefonoContacto varchar (8) not null,
    gradoCocinero varchar (50),
    codigoTipoEmpleado int not null,
    primary key PK_codigoEmpleado (codigoEmpleado),
    constraint FK_Empleados_TipoEmpleado foreign key(codigoEmpleado) 
		references TipoEmpleado(codigoTipoEmpleado)
);

Create table Servicios (
	codigoServicio int not null auto_increment,
    fechaServicio date not null,
    tipoServicio varchar (150) not null,
    horaServicio time not null,
    lugarServicio varchar (150) not null,
    telefonoContacto varchar (150) not null,
    codigoEmpresa int not null,
    primary key PK_codigoServicio(codigoServicio),
	constraint FK_Servicios_Empresas foreign key (codigoEmpresa)
		references Empresas(codigoEmpresa)
);

Create table Presupuesto (
	codigoPresupuesto int not null auto_increment,
    fechaSolicitud date not null,
	cantidadPresupuesto decimal (10,2) not null,
    codigoEmpresa int not null,
    primary key PK_codigoPresupuesto (codigoPresupuesto),
	constraint FK_Presupuesto_Empresas_ foreign key (codigoEmpresa)
		references Empresas(codigoEmpresa)
);

Create table Platos(
	codigoPlato int not null auto_increment,
    cantidadPlato int not null,
    nombrePlato varchar(150) not null,
    descripcionPlato varchar (150) not null,
	precioPlato decimal (10,2) not null,
    codigoTipoPlato int not null,
    primary key PK_codigoPlato(codigoPlato),
    constraint FK_Platos_TipoPlato foreign key (codigoTipoPlato)
		references TipoPlato (codigoTipoPlato)
);

Create table Productos_has_Platos(
	Productos_codigoProducto int not null,
    codigoPlato int not null,
    codigoProducto int not null,
    primary key PK_Productos_codigoProducto(Productos_codigoProducto),
    constraint FK_Productos_has_Platos_Productos foreign key (codigoProducto)
		references Productos (codigoProducto),
	constraint FK_Productos_has_Platos_Platos foreign key (codigoPlato)
		references Platos(codigoPlato)
);

Create table Servicios_has_Platos(
	Servicios_codigoServicio int not null,
    codigoPlato int not null,
    codigoServicio int not null,
    primary key PK_Servicios_codigoServicio(Servicios_codigoServicio),
    constraint FK_Servicios_has_Platos_Servicios foreign key (codigoServicio)
		references Servicios (codigoServicio),
	constraint FK_Servicios_has_Platos_Platos foreign key (codigoPlato)
		references Platos(codigoPlato)
);	

Create table Servicios_has_Empleados(
	Servicios_codigoServicio int not null,
    codigoServicio int not null,
    codigoEmpleado int not null,
    fechaEvento date not null,
    horaEvento time not null,
    lugarEvento varchar(150) not null,
    primary key PK_Servicios_codigoServicios(Servicios_codigoServicio),
    constraint FK_Servicios_has_Empleados_Servicios foreign key (codigoServicio)
		references Servicios(codigoServicio),
	constraint FK_Servicios_has_Empleados_Empleados foreign key (codigoEmpleado)
		references Empleados(codigoEmpleado)
);

Create table Usuario(
	codigoUsuario int not null auto_increment,
    nombreUsuario varchar(100) not null,
    apellidoUsuario varchar(100) not null,
    usuarioLogin varchar(50) not null,
    contrasena varchar(50) not null,
    primary key PK_codigoUsuario(codigoUsuario)
);

-- ------------------------------ Registro ------------------------------------------


-- ----------------------------- Agregar Usuario ----------------------------------
DELIMITER $$
	Create procedure sp_AgregarUsuario(in nombreUsuario varchar(100), in apellidoUsuario varchar(100), in usuarioLogin varchar(50), in contrasena varchar(50))
    Begin
		insert into Usuario (nombreUsuario, apellidoUsuario, usuarioLogin, contrasena)
			values(nombreUsuario, apellidoUsuario, usuarioLogin, contrasena);
	End$$
DELIMITER ;

DELIMITER $$
	Create procedure sp_ListarUsuarios()
		Begin
			Select 
				U.codigoUsuario,
				U.nombreUsuario,
				U.apellidoUsuario,
				U.usuarioLogin,
				U.contrasena
			from Usuario U;
		End$$
    
DELIMITER ;

call sp_AgregarUsuario('Juan Pablo', 'Yaxon', 'jyaxon', '7777');
call sp_AgregarUsuario('Pedro', 'Armas', 'parmas', 'parmas');
call sp_ListarUsuarios();

-- ------------------------------ Login ------------------------------------------
Create table Login(
	usuarioMaster varchar(50) not null,
    passwordLogin varchar(50) not null,
    primary key PK_usuarioMaster (usuarioMaster)
);

select * from Usuario;



-- ------------------------------ CRUD -------------------------------------------

-- ------------------------------- Empresas --------------------------------------

-- ----------------------------- Agregar Empresa ---------------------------------

DELIMITER  $$ 
	Create procedure sp_AgregarEmpresa(in nombreEmpresa varchar(150), in direccion varchar (150), in telefono varchar(8))
		Begin
			Insert into Empresas (nombreEmpresa, direccion, telefono)
				values (nombreEmpresa, direccion, telefono);
        End$$
DELIMITER ;

call sp_AgregarEmpresa('Walmart', 'Calzada Roosevelt 26-95 zona 11','8010096');
call sp_AgregarEmpresa('Agencias Way', 'Cda. de Guatemala', '24212727');
call sp_AgregarEmpresa('PriceSmart', 'Bulevar Lourdes', '23273600');
call sp_AgregarEmpresa('Econo Super', '5A. Samayoa zona 7', '3857145');
call sp_AgregarEmpresa('Despensa Familiar', '5A. Calle Zona 7 Guatemala', '24859785');
call sp_AgregarEmpresa('Azúcar Caña Real', 'Calz. Atanasio Tzul, Cdad. de Guatemala', '23020500');
call sp_AgregarEmpresa('Sarita', '3A Avenida 13, Cdad. de Guatemala', '24268180');
call sp_AgregarEmpresa('Pepsi', 'San Juan Sacatepéquez', '24225252');
call sp_AgregarEmpresa('Coca-Cola', 'Bulevar Aguilar Batres', '22564060');
call sp_AgregarEmpresa('Litegua', 'Ciudad de Guatemala', '23269400');

-- ----------------------------- Editar Empresa ---------------------------------

DELIMITER $$
	Create procedure sp_EditarEmpresa(in codEmpresa int, in nombreEpr varchar (150), in direcc varchar (150), in tel varchar (8))
		Begin
			Update Empresas E
				set 
					E.nombreEmpresa = nombreEpr,
                    E.direccion = direcc,
                    E.telefono = tel
					where E.codigoEmpresa = codEmpresa;
		End$$
DELIMITER ;

-- ----------------------------- Eliminar Empresa ---------------------------------

DELIMITER $$
	Create procedure sp_EliminarEmpresa(in codEmpresa int)
		Begin 
			Delete 
				from Empresas 
					where codigoEmpresa = codEmpresa;
        End$$
DELIMITER ;

-- ----------------------------- Listar Empresas ---------------------------------

DELIMITER $$
	Create procedure sp_ListarEmpresas()
		Begin
			Select 
				E.codigoEmpresa, 
                E.nombreEmpresa, 
                E.direccion, 
                E.telefono
				From Empresas E;
		End$$
DELIMITER ;

-- ----------------------------- Buscar Empresa ---------------------------------

DELIMITER $$
	Create procedure sp_BuscarEmpresa(in codEmpresa int)
		Begin
			Select 
				E.codigoEmpresa,
				E.nombreEmpresa,
                E.direccion,
                E.telefono
				from Empresas E
				where codigoEmpresa = codEmpresa;
		End$$
DELIMITER ;

-- -------------------------------- TipoEmpleado ------------------------------------

-- ----------------------------- Agregar TipoEmpleado -------------------------------

DELIMITER  $$ 
	Create procedure sp_AgregarTipoEmpleado(in descripcion varchar(150))
		Begin
			Insert into TipoEmpleado (descripcion)
				values (descripcion);
        End$$
DELIMITER ;

call sp_AgregarTipoEmpleado('Mesero');
call sp_AgregarTipoEmpleado('Chef principal');
call sp_AgregarTipoEmpleado('Bartender');
call sp_AgregarTipoEmpleado('Gerente de restaurante');
call sp_AgregarTipoEmpleado('Ayudante de cocina');
call sp_AgregarTipoEmpleado('Recepcionista');
call sp_AgregarTipoEmpleado('Sommelier');
call sp_AgregarTipoEmpleado('Camarero');
call sp_AgregarTipoEmpleado('Jefe de sala');
call sp_AgregarTipoEmpleado('Conserje');

-- ----------------------------- Editar TipoEmpleado -------------------------------

DELIMITER $$
	Create procedure sp_EditarTipoEmpleado(in codTipoEmpleado int, in descrip varchar (150))
		Begin
			Update TipoEmpleado T
				Set 
					T.descripcion = descrip
					where T.codigoTipoEmpleado = codTipoEmpleado;
		End$$
DELIMITER ;

-- ----------------------------- Eliminar TipoEmpleado -------------------------------

DELIMITER $$
	Create procedure sp_EliminarTipoEmpleado(in codTipoEmpleado int)
		Begin 
			Delete 
				from TipoEmpleado 
					where codigoTipoEmpleado = codTipoEmpleado;
        End$$
DELIMITER ;

-- ----------------------------- Listar TipoEmpleado -------------------------------

DELIMITER $$
	Create procedure sp_ListarTipoEmpleados()
		Begin
			Select 
				T.codigoTipoEmpleado, 
                T.descripcion
				From TipoEmpleado T;
		End$$
DELIMITER ;

-- ------------------------------ Buscar TipoEmpleado -------------------------------

DELIMITER $$
	Create procedure sp_BuscarTipoEmpleado(in codTipoEmpleado int)
		Begin
			Select 
				T.codigoTipoEmpleado,
				T.descripcion
				from TipoEmpleado T
				where codigoTipoEmpleado = codTipoEmpleado;
		End$$
DELIMITER ;

-- ------------------------------- TipoPlato --------------------------------------

-- ----------------------------- Agregar TipoPlato --------------------------------

DELIMITER  $$ 
	Create procedure sp_AgregarTipoPlato(in descripcionTipo varchar(150))
		Begin
			Insert into TipoPlato (descripcionTipo)
				values (descripcionTipo);
        End$$
DELIMITER ;

call sp_AgregarTipoPlato('Especiales');
call sp_AgregarTipoPlato('Sopa');
call sp_AgregarTipoPlato('Entrante');
call sp_AgregarTipoPlato('Plato principal de pollo');
call sp_AgregarTipoPlato('Plato principal de pescado');
call sp_AgregarTipoPlato('Pasta');
call sp_AgregarTipoPlato('Postre');
call sp_AgregarTipoPlato('Bebidas');
call sp_AgregarTipoPlato('Ensalada');
call sp_AgregarTipoPlato('Plato principal de carne');


-- ----------------------------- Editar TipoPlato --------------------------------

DELIMITER $$
	Create procedure sp_EditarTipoPlato(in codTipoPlato int, in descrip varchar (150))
		Begin
			Update TipoPlato T
				set 
					T.descripcionTipo = descrip
					where T.codigoTipoPlato = codTipoPlato;
		End$$
DELIMITER ;

-- ----------------------------- Eliminar TipoPlato --------------------------------

DELIMITER $$
	Create procedure sp_EliminarTipoPlato(in codTipoPlato int)
		Begin 
			Delete 
				from TipoPlato 
					where codigoTipoPlato = codTipoPlato;
        End$$
DELIMITER ;

-- ---------------------------- Listar TipoPlatos ----------------------------------

DELIMITER $$
	Create procedure sp_ListarTipoPlatos()
		Begin
			Select 
				T.codigoTipoPlato, 
                T.descripcionTipo
				From TipoPlato T;
		End$$
DELIMITER ;

-- ---------------------------- Buscar TipoPlato -----------------------------------


DELIMITER $$
	Create procedure sp_BuscarTipoPlato(in codTipoPlato int)
		Begin
			Select 
				T.codigoTipoPlato,
				T.descripcionTipo
				from TipoPlato T
				where codigoTipoPlato = codTipoPlato;
		End$$
DELIMITER ;

-- ------------------------------- Productos -------------------------------------

-- ---------------------------- Agregar Producto ---------------------------------

DELIMITER  $$ 
	Create procedure sp_AgregarProducto(in nombreProducto varchar(150), in cantidad int)
		Begin
			Insert Into Productos (nombreProducto, cantidad)
				values (nombreProducto, cantidad);
        End$$
DELIMITER ;

call sp_AgregarProducto('Salmón fresco', 50);
call sp_AgregarProducto('Ajo, aceite de oliva, pan, y pimentón', 30);
call sp_AgregarProducto('Gambas o camarones', 35);
call sp_AgregarProducto('Alitas de pollo frescas', 50);
call sp_AgregarProducto('Pescado marinado', 40);
call sp_AgregarProducto('Carne molida y fideos', 20);
call sp_AgregarProducto('Cacao en polvo y queso', 35);
call sp_AgregarProducto('Agua carbonatada', 25);
call sp_AgregarProducto('Mozzarella fresca', 45);
call sp_AgregarProducto('Carne molida', 15);


-- ---------------------------- Editar Producto ---------------------------------

DELIMITER $$
	Create procedure sp_EditarProducto(in codProducto int, in nombre varchar(150), in cantid int)
		Begin
			Update Productos P
				set 
					P.nombreProducto = nombre, 
                    P.cantidad = cantid
						where codigoProducto = codProducto;
		End$$
DELIMITER ;

-- ---------------------------- Eliminar Producto --------------------------------

DELIMITER $$
	Create procedure sp_EliminarProducto(in codProducto int)
		Begin 
			Delete 
				from Productos 
					where codigoProducto = codProducto ;
        End$$
DELIMITER ;

-- ---------------------------- Listar Productos ----------------------------------

DELIMITER $$
	Create procedure sp_ListarProductos()
		Begin
			Select 
				P.codigoProducto, 
                P.nombreProducto,
                P.cantidad
				From Productos P;
		End$$
DELIMITER ;

-- ---------------------------- Buscar Producto -----------------------------------

DELIMITER $$
	Create procedure sp_BuscarProducto(in codProducto int)
		Begin
			Select 
				P.codigoProducto,
				P.nombreProducto,
                P.cantidad
				from Productos P
				where codigoProducto = codProducto;
		End$$
DELIMITER ;

-- ------------------------------- Empleados -------------------------------------

-- ---------------------------- Agregar Empleado ---------------------------------

DELIMITER  $$ 
	Create procedure sp_AgregarEmpleado(in numeroEmpleado int, in apellidoEmpleado varchar(150), in nombresEmpleado varchar(150), in direccionEmpleado varchar(150), in telefonoContacto varchar(8), in gradoCocinero varchar(50), in codigoTipoEmpleado int)
		Begin
			Insert Into Empleados (numeroEmpleado, apellidoEmpleado, nombresEmpleado, direccionEmpleado, telefonoContacto, gradoCocinero, codigoTipoEmpleado)
				values (numeroEmpleado, apellidoEmpleado, nombresEmpleado, direccionEmpleado, telefonoContacto, gradoCocinero, codigoTipoEmpleado);
        End$$
DELIMITER ;

call sp_AgregarEmpleado(001, 'Guevara Paz', 'Juan Jose', 'Zona Sur', 5551234, 'Cocinero Junior', 1);
call sp_AgregarEmpleado(002, 'Rodríguez Juárez', 'Julia María', 'Zona Sur', 5555678, 'Cocinero Junior', 2);
call sp_AgregarEmpleado(003, 'López Louis', 'Carlos Luis', 'Zona Central', 5559876, 'Cocinero Medio', 3);
call sp_AgregarEmpleado(004, 'García Estrada', 'Ana', 'Zona Oeste', 5556648, 'Cocinero Senior', 4);
call sp_AgregarEmpleado(005, 'Martínez Torres', 'Luis Sebastián', 'Zona Sur', 555965, 'Cocinero Junior', 5);
call sp_AgregarEmpleado(006, 'Sanchez Ruíz', 'Laura Sofía', 'Zona Central', 555109, 'Cocinero Medio', 6);
call sp_AgregarEmpleado(007, 'Ramírez Santa', 'Juan Pablo', 'Zona Oeste', 555543, 'Cocinero Senior', 7);
call sp_AgregarEmpleado(008, 'Torres Estrada', 'Sofía Alejandra', 'Zona Central', 5550195, 'Chef de Partida', 8);
call sp_AgregarEmpleado(009, 'Navarro Cano', 'Alexander', 'Zona Central', 5559870, 'Chef de Sección', 9);
call sp_AgregarEmpleado(010, 'Jiménez Hernández', 'Andrea Samantha', 'Zona Central', 5557410, 'Chef Ejecutivo', 10);

-- ---------------------------- Editar Empleado ---------------------------------

DELIMITER $$
	Create procedure sp_EditarEmpleado(in codEmpleado int, in numEmpleado int, in apelliEmpleado varchar(150), in nombrEmpleado varchar(150), in direccEmpleado varchar(150), in telContacto varchar(8), in gradCocinero varchar(50))
		Begin
			Update Empleados E
				set 
					E.numeroEmpleado = numEmpleado, 
					E.apellidoEmpleado = apelliEmpleado, 
					E.nombresEmpleado = nombrEmpleado, 
					E.direccionEmpleado = direccEmpleado,
					E.telefonoContacto = telContacto,
					E.gradoCocinero = gradCocinero
						where codigoEmpleado = codEmpleado;
		End$$
DELIMITER ;

-- ---------------------------- Eliminar Empleado --------------------------------

DELIMITER $$
	Create procedure sp_EliminarEmpleado(in codEmpleado int)
		Begin 
			Delete 
				from Empleados 
					where codigoEmpleado = codEmpleado;
        End$$
DELIMITER ;

-- ---------------------------- Listar Empleados ----------------------------------

DELIMITER $$
	Create procedure sp_ListarEmpleados()
		Begin
			Select 
				E.codigoEmpleado,
				E.numeroEmpleado,
				E.apellidoEmpleado,
				E.nombresEmpleado,
				E.direccionEmpleado,
				E.telefonoContacto,
				E.gradoCocinero,
				E.codigoTipoEmpleado
				From Empleados E;
		End$$
DELIMITER ;

-- ---------------------------- Buscar Empleado -----------------------------------

DELIMITER $$
	Create procedure sp_BuscarEmpleado(in codEmpleado int)
		Begin
			Select 
				E.codigoEmpleado,
				E.numeroEmpleado,
				E.apellidoEmpleado,
				E.nombresEmpleado,
				E.direccionEmpleado,
				E.telefonoContacto,
				E.gradoCocinero,
				E.codigoTipoEmpleado
				From Empleados E
				where codigoEmpleado = codEmpleado;
		End$$
DELIMITER ;

-- ------------------------------- Servicios ------------------------------------

-- ---------------------------- Agregar Servicio --------------------------------

DELIMITER  $$ 
	Create procedure sp_AgregarServicio(in fechaServicio date, in tipoServicio varchar(150), in horaServicio time, in lugarServicio varchar(150), in telefonoContacto varchar (150), in codigoEmpresa int)
		Begin
			Insert Into Servicios (fechaServicio, tipoServicio, horaServicio, lugarServicio, telefonoContacto, codigoEmpresa)
				values (fechaServicio, tipoServicio, horaServicio, lugarServicio, telefonoContacto, codigoEmpresa);
        End$$
DELIMITER ;

call sp_AgregarServicio('2023-07-25','Inglesa', '13:30:00','Salón Principal', '6664488', 1);
call sp_AgregarServicio('2023-08-05','Desayuno', '07:00:00','Salón Principal', '5645555', 2);
call sp_AgregarServicio('2023-09-20','Cena', '21:00:00','Salón Premium', '3335444', 3);
call sp_AgregarServicio('2023-07-10','Buffet Asistido', '19:00:00','Salón Premium', '8998771', 4);
call sp_AgregarServicio('2023-08-15','Degustación', '13:00:00','Terraza', '8876333', 5);
call sp_AgregarServicio('2023-09-05','Desayuno', '08:30:00','Salón Principal', '5558888', 6);
call sp_AgregarServicio('2022-05-23','Almuerzo', '12:00:00','Terraza', '5559999', 7);
call sp_AgregarServicio('2023-06-01','Cena', '19:00:00','Salón Principal', '4488989', 8);
call sp_AgregarServicio('2023-07-15','Desayuno', '08:00:00','Salón Secundario', '5551234', 9);
call sp_AgregarServicio('2023-08-20','Autoservicio', '12:30:00','Terraza', '5559876', 10);

select * from Servicios;

-- ---------------------------- Editar Servicio ---------------------------------

DELIMITER $$
	Create procedure sp_EditarServicio(in codServicio int, in fechServicio date, in tipServicio varchar(150), in horServicio time, in lugServicio varchar(150), in telContacto varchar(150))
		Begin
			Update Servicios S
				set 
					S.fechaServicio = fechServicio, 
					S.tipoServicio = tipServicio, 
					S.horaServicio = horServicio, 
					S.lugarServicio = lugServicio, 
					S.telefonoContacto = telContacto
						where codigoServicio  = codServicio;
		End$$
DELIMITER ;

-- ---------------------------- Eliminar Servicio --------------------------------

DELIMITER $$
	Create procedure sp_EliminarServicio(in codServicio int)
		Begin 
			Delete 
				from Servicios
					where codigoServicio = codServicio;
        End$$
DELIMITER ;

-- ---------------------------- Listar Servicios ----------------------------------

DELIMITER $$
	Create procedure sp_ListarServicios()
		Begin
			Select 
				S.codigoServicio, 
                S.fechaServicio, 
                S.tipoServicio,
                S.horaServicio, 
                S.lugarServicio,
                S.telefonoContacto, 
                S.codigoEmpresa
				from Servicios S;
		End$$
DELIMITER ;

-- ---------------------------- Buscar Servicio -----------------------------------

DELIMITER $$
	Create procedure sp_BuscarServicio(in codServicio int)
		Begin
			Select 
				S.codigoServicio, 
                S.fechaServicio, 
                S.tipoServicio,
                S.horaServicio, 
                S.lugarServicio,
                S.telefonoContacto, 
                S.codigoEmpresa
				from Servicios S
				where codigoServicio = codServicio;
		End$$
DELIMITER ;

-- ------------------------------- Presupuesto -------------------------------------

-- ---------------------------- Agregar Presupuesto --------------------------------

DELIMITER  $$ 
	Create procedure sp_AgregarPresupuesto(in fechaSolicitud date, in cantidadPresupuesto decimal(10,2), in codigoEmpresa int)
		Begin
			Insert Into Presupuesto  (fechaSolicitud, cantidadPresupuesto, codigoEmpresa)
				values (fechaSolicitud, cantidadPresupuesto, codigoEmpresa);
        End$$
DELIMITER ;

call sp_AgregarPresupuesto('2022-2-10','3000.55',1);
call sp_AgregarPresupuesto('2010-03-12','5556.25',2);
call sp_AgregarPresupuesto('2015-06-03','6667.20',3);
call sp_AgregarPresupuesto('2021-07-05', '1000.00',4);
call sp_AgregarPresupuesto('2017-02-11', '76000.00',5);
call sp_AgregarPresupuesto('2023-05-04', '12000.00',6);
call sp_AgregarPresupuesto('2021-06-07', '10000.00',7);
call sp_AgregarPresupuesto('2023-11-12', '96000.00',8);
call sp_AgregarPresupuesto('2018-01-04', '9000.00',9);
call sp_AgregarPresupuesto('2019-05-06', '5000.00',10);


-- ---------------------------- Editar Presupuesto ---------------------------------

DELIMITER $$
	Create procedure sp_EditarPresupuesto(in codPresupuesto int, in fechSolicitud date, in cantPresupuesto decimal(10,2))
		Begin
			Update Presupuesto P
				set 
					P.fechaSolicitud = fechSolicitud,
					P.cantidadPresupuesto = cantPresupuesto
					where codigoPresupuesto  = codPresupuesto;
		End$$
DELIMITER ;

-- ---------------------------- Eliminar Presupuesto --------------------------------

DELIMITER $$
	Create procedure sp_EliminarPresupuesto(in codPresupuesto int)
		Begin 
			Delete 
				from Presupuesto
					where codigoPresupuesto = codPresupuesto;
        End$$
DELIMITER ;

-- ---------------------------- Listar Presupuestos ----------------------------------

DELIMITER $$
	Create procedure sp_ListarPresupuestos()
		Begin
			Select 
				P.codigoPresupuesto, 
                P.fechaSolicitud, 
                P.cantidadPresupuesto, 
                P.codigoEmpresa
                from Presupuesto P;
		End$$
DELIMITER ;


-- ---------------------------- Buscar Presupuesto -----------------------------------

DELIMITER $$
	Create procedure sp_BuscarPresupuesto(in codPresupuesto int)
		Begin
			Select 
				P.codigoPresupuesto, 
                P.fechaSolicitud, 
                P.cantidadPresupuesto, 
                P.codigoEmpresa
				from Presupuesto P
				where codigoPrespuesto = codPresupuesto;
		End$$
DELIMITER ;

-- ---------------------------------- Platos --------------------------------------

-- -------------------------------- Agregar Plato ---------------------------------

DELIMITER  $$ 
	Create procedure sp_AgregarPlato(in cantidadPlato int, in nombrePlato varchar (150), in descripcionPlato varchar(150), in precioPlato decimal (10,2), in codigoTipoPlato int)
		Begin
			Insert Into Platos(cantidadPlato, nombrePlato, descripcionPlato, precioPlato, codigoTipoPlato)
				values (cantidadPlato, nombrePlato, descripcionPlato, precioPlato, codigoTipoPlato);
        End$$
DELIMITER ;

call sp_AgregarPlato(60, 'Salmón con salsa hoisin', 'Delicioso salmón bañado con salsa vegana', 300.00, 1);
call sp_AgregarPlato(35, 'Sopa de ajo de El Bohío', 'Sopa con leves trozos de ajo seco', 65.00, 2);
call sp_AgregarPlato(20, 'Gambas a la plancha', 'Perfecto entrante con gambas, ajos y zumos', 70.00, 3);
call sp_AgregarPlato(20, 'Alitas guisadas', 'Alitas de pollo bañadas en barbacoa', 35.00, 4);
call sp_AgregarPlato(15, 'Pescado al Escabeche', 'Filete de pescado acompañado de aceites', 35.00, 5);
call sp_AgregarPlato(30, 'Espagueti a la Boloñesa', 'Pasta con salsa de tomate y carnes', 70.00, 6);
call sp_AgregarPlato(15, 'Tiramisú de Helado', 'Helado de chocolate', 30.00, 7);
call sp_AgregarPlato(15, 'Refrescos', 'Refrescos de sabores variados y gaseosas', 10.00, 8);
call sp_AgregarPlato(25, 'Ensalada caprese de pasta', 'Ensalada vegana con trozos de fideos', 30.00, 9);
call sp_AgregarPlato(20, 'Lasaña de Carne', 'Lasaña clásica con carne y queso', 50.00, 10);

-- ---------------------------- Editar Plato ---------------------------------

DELIMITER $$
	Create procedure sp_EditarPlato(in codPlato int, in canti int, in nombPlato varchar (150), in descripPlato varchar(150), in precPlato decimal (10,2))
		Begin
			Update Platos P
				set 
					cantidadPlato = canti,
					nombrePlato = nombPlato,
					descripcionPlato = descripPlato,
					precioPlato = precPlato
					where codigoPlato  = codPlato;
		End$$
DELIMITER ;

-- ---------------------------- Eliminar Plato --------------------------------

DELIMITER $$
	Create procedure sp_EliminarPlato(in codPlato int)
		Begin 
			Delete 
				from Platos
					where codigoPlato = codPlato;
        End$$
DELIMITER ;

-- ---------------------------- Listar Platos ----------------------------------

DELIMITER $$
	Create procedure sp_ListarPlatos()
		Begin
			Select 
				P.codigoPlato, 
                P.cantidadPlato, 
                P.nombrePlato, 
                P.descripcionPlato,
                P.precioPlato,
				P.codigoTipoPlato
                from Platos P;
		End$$
DELIMITER ;

-- ---------------------------- Buscar Plato -----------------------------------

DELIMITER $$
	Create procedure sp_BuscarPlato(in codPlato int)
		Begin
			Select 
				P.codigoPlato, 
                P.cantidadPlato, 
                P.nombrePlato, 
                P.descripcionPlato,
                P.precioPlato,
				P.codigoTipoPlato
                from Plato P
				where codigoPlato = codPlato;
		End$$
DELIMITER ;

-- ------------------------- Productos_has_Platos --------------------------------

-- ----------------------- Agregar Productos_has_Plato ----------------------------

DELIMITER  $$ 
	Create procedure sp_AgregarProductos_has_Plato(in Productos_codigoProducto int, in codigoPlato int , in codigoProducto int)
		Begin
			Insert into Productos_has_Platos (Productos_codigoProducto, codigoPlato, codigoProducto)
				values (Productos_codigoProducto, codigoPlato, codigoProducto);
        End$$
DELIMITER ; 

call sp_AgregarProductos_has_Plato(1, 1, 1);
call sp_AgregarProductos_has_Plato(2, 2, 2);
call sp_AgregarProductos_has_Plato(3, 3, 3);
call sp_AgregarProductos_has_Plato(4, 4, 4);
call sp_AgregarProductos_has_Plato(5, 5, 5);
call sp_AgregarProductos_has_Plato(6, 6, 6);
call sp_AgregarProductos_has_Plato(7, 7, 7);
call sp_AgregarProductos_has_Plato(8, 8, 8);
call sp_AgregarProductos_has_Plato(9, 9, 9);
call sp_AgregarProductos_has_Plato(10, 10, 10);

-- ----------------------- Listar Productos_has_Platos ----------------------------

DELIMITER $$
	Create procedure sp_ListarProductos_has_Platos()
		Begin
			Select 
				P.Productos_codigoProducto, 
                P.codigoPlato, 
                P.codigoProducto
                from Productos_has_Platos P;
		End$$
DELIMITER ;

-- ----------------------- Buscar Productos_has_Plato ------------------------------

DELIMITER $$
	Create procedure sp_BuscarProductos_has_Plato(in Productos_codProducto int)
		Begin
			Select 
				P.Productos_codigoProducto, 
                P.codigoPlato, 
                P.codigoProducto
                from Produtos_has_Platos P
				where Productos_codigoProducto = Productos_codProducto;
		End$$
DELIMITER ;

-- ------------------------- Servicios_has_Platos ---------------------------------


-- ------------------------- Agregar Servicios_has_Plato -------------------------

DELIMITER  $$ 
	Create procedure sp_AgregarServicios_has_Plato(in Servicios_codigoServicio int, in codigoPlato int, in codigoServicio int)
		Begin
			Insert into Servicios_has_Platos(Servicios_codigoServicio, codigoPlato, codigoServicio)
				values (Servicios_codigoServicio, codigoPlato, codigoServicio);
        End$$
DELIMITER ;

call sp_AgregarServicios_has_Plato(1, 1, 1);
call sp_AgregarServicios_has_Plato(2, 2, 2);
call sp_AgregarServicios_has_Plato(3, 3, 3);
call sp_AgregarServicios_has_Plato(4, 4, 4);
call sp_AgregarServicios_has_Plato(5, 5, 5);
call sp_AgregarServicios_has_Plato(6, 6, 6);
call sp_AgregarServicios_has_Plato(7, 7, 7);
call sp_AgregarServicios_has_Plato(8, 8, 8);
call sp_AgregarServicios_has_Plato(9, 9, 9);
call sp_AgregarServicios_has_Plato(10, 10, 10);


-- ----------------------- Listar Servicios_has_Platos ----------------------------

DELIMITER $$
	Create procedure sp_ListarServicios_has_Platos()
		Begin
			Select 
				S.Servicios_codigoServicio, 
                S.codigoPlato, 
                S.codigoServicio
                from Servicios_has_Platos S;
		End$$
DELIMITER ;

-- ----------------------- Buscar Servicios_has_Platos ------------------------------

DELIMITER $$
	Create procedure sp_BuscarServicios_has_Platos(in Servicios_codServicio int)
		Begin
			Select 
				S.Servicios_codigoServicio, 
                S.codigoPlato, 
                S.codigoServicio
                from Servicios_has_Platos S
				where Servicios_codigoServicio = Servicios_codServicio;
		End$$
DELIMITER ;

-- ------------------------- Servicios_has_Empleados ---------------------------------


-- ---------------------- Agregar Servicios_has_Empleado ----------------------------

DELIMITER  $$ 
	Create procedure sp_AgregarServicios_has_Empleados(in Servicios_codigoServicio int, in codigoServicio int, in codigoEmpleado int, in fechaEvento date, in horaEvento time, in lugarEvento varchar(150))
		Begin
			Insert into Servicios_has_Empleados (Servicios_codigoServicio, codigoServicio, codigoEmpleado, fechaEvento, horaEvento, lugarEvento)
				values (Servicios_codigoServicio, codigoServicio, codigoEmpleado, fechaEvento, horaEvento, lugarEvento);
        End$$
DELIMITER ;

call sp_AgregarServicios_has_Empleados(1, 1, 1, '2023-06-01', '12:00:00', 'San Cristobal');
call sp_AgregarServicios_has_Empleados(2, 2, 2, '2023-06-02', '14:30:00', 'Antigua Guatemala');
call sp_AgregarServicios_has_Empleados(3, 3, 3, '2023-06-03', '10:00:00', 'Ciudad de Guatemala');
call sp_AgregarServicios_has_Empleados(4, 4, 4, '2023-06-04', '16:45:00', 'Ciudad de Guatemala');
call sp_AgregarServicios_has_Empleados(5, 5, 5, '2023-06-05', '09:15:00', 'Ciudad de Guatemala');
call sp_AgregarServicios_has_Empleados(6, 6, 6, '2023-06-06', '13:30:00', 'San Lucas');
call sp_AgregarServicios_has_Empleados(7, 7, 7, '2023-06-07', '11:45:00', 'Sololá');
call sp_AgregarServicios_has_Empleados(8, 8, 8, '2023-06-08', '15:00:00', 'Zacatepéquez');
call sp_AgregarServicios_has_Empleados(9, 9, 9, '2023-06-09', '10:30:00', 'Tierra Nueva');
call sp_AgregarServicios_has_Empleados(10, 10, 10, '2023-06-10', '12:45:00', 'Antigua Guatemala');


-- ------------------------- Editar Servicios_has_Empleados -------------------------

DELIMITER $$
	Create procedure sp_Servicios_has_Empleado(in Servicios_codServicios int, in fechEvento date, in hrsEvento time, in lugEvento varchar(150))
		Begin
			Update Servicios_has_Empleados SE
				set 
                    SE.fechaEvento = fechEvento,
                    SE.horaEvento = hrsEvento,
                    SE.lugarEvento = lugEvento
					where Servicios_codigoServicio  = Servicios_codServicios;
		End$$
DELIMITER ;


-- ----------------------- Listar Servicios_has_Empleados ----------------------------

DELIMITER $$
	Create procedure sp_ListarServicios_has_Empleados()
		Begin
			Select 
				S.Servicios_codigoServicio, 
				S.codigoServicio,
				S.codigoEmpleado, 
				S.fechaEvento,
				S.horaEvento,
				S.lugarEvento
                from Servicios_has_Empleados S;
		End$$
DELIMITER ;

call sp_ListarServicios_has_Empleados();

-- ----------------------- Buscar Servicios_has_Empleado ----------------------------

DELIMITER $$
	Create procedure sp_BuscarServicios_has_Empleados(in Servicios_codServicio int)
		Begin
			Select 
				S.Servicios_codigoServicio, 
				S.codigoServicio,
				S.codigoEmpleado, 
				S.fechaEvento,
				S.horaEvento,
				S.lugarEvento
                from Servicios_has_Empleados S
				where Servicios_codigoServicio = Servicios_codServicio;
		End$$
DELIMITER ;

-- ------------------------------- REPORTE GENERAL -------------------------------------
DELIMITER $$
Create procedure sp_ReporteFinal(in codEmpresa int)
	begin
		select 
			E.nombreEmpresa, 
            E.direccion,
            E.telefono,
			P.cantidadPresupuesto, 
            P.fechaSolicitud,
            S.tipoServicio, 
            S.lugarServicio,
            S.horaServicio,
            S.telefonoContacto,
            S.fechaServicio,
            PL.nombrePlato,
			PL.cantidadPlato,
            PL.descripcionPlato,
            Pl.precioPlato,
            PR.codigoProducto,
            PR.nombreProducto,
            PR.cantidad,
            EM.codigoEmpleado,
            EM.nombresEmpleado,
            EM.apellidoEmpleado,
            EM.gradoCocinero,
            T.descripcion,
            TP.descripcionTipo
			from Empresas E
				inner join Servicios S on E.codigoEmpresa = S.codigoEmpresa
					inner join Servicios_has_Platos SP on S.codigoServicio = SP.codigoServicio
						inner join Platos PL on SP.codigoPlato = PL.codigoPlato
							inner join Productos_has_Platos PP on PL.codigoPlato = PP.codigoPlato
								inner join Productos PR on PP.codigoProducto = PR.codigoProducto
									inner join Servicios_has_Empleados SE on S.codigoServicio = SE.codigoServicio
										inner join Empleados EM on SE.codigoEmpleado = EM.codigoEmpleado
											inner join Presupuesto P on E.codigoEmpresa = P.codigoEmpresa
												inner join TipoEmpleado T on EM.codigoTipoEmpleado = T.codigoTipoEmpleado
													inner join TipoPlato TP on PL.codigoTipoPlato = TP.codigoTipoPlato
			where E.codigoEmpresa = codEmpresa;
	End$$
DELIMITER ;

call sp_ReporteFinal(1);


-- alter user 'root'@'localhost' identified with mysql_native_password by'admin';

