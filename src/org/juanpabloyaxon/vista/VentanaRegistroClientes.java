
package org.juanpabloyaxon.vista;

import java.awt.Graphics;
import java.awt.Image;
import java.io.IOException;
import java.net.URL;
import javax.imageio.ImageIO;
import javax.swing.JPanel;
import org.juanpabloyaxon.modelo.Cliente;
import org.juanpabloyaxon.controlador.ControlDelCliente;

class PanelDeImagen extends JPanel{
    private Image imagen;
    public PanelDeImagen (Image imagen ){
        this.imagen = imagen;
    }
    @Override
    public void paintComponents(Graphics grafica){
        super.paintComponent(grafica);
        grafica.drawImage(imagen,0,0,528,364,this);
    }
}

public class VentanaRegistroClientes extends javax.swing.JFrame {
    private Image ImagenDelPanel;
    /**
     * Creates new form VentanaLibreria
     */
    public VentanaRegistroClientes() {
        String direccionImagen = "/org/juanpabloyaxon/recursos/Registro.jpg";
        cargarImagenDelPanel(this.getClass().getResource(direccionImagen));
        initComponents();
    }

    private void cargarImagenDelPanel (URL nombreImagen){
        try{
            ImagenDelPanel = ImageIO.read(nombreImagen);
        }catch (IOException error){
            error.printStackTrace();    
        }
    }
   
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        panelDeVentanaRegistroAlumnos = new PanelDeImagen(ImagenDelPanel);
        lbId = new javax.swing.JLabel();
        lbNombres = new javax.swing.JLabel();
        lbApellidos = new javax.swing.JLabel();
        lbDPI = new javax.swing.JLabel();
        lbTelefono = new javax.swing.JLabel();
        txtId = new javax.swing.JTextField();
        txtNombres = new javax.swing.JTextField();
        txtApellidos = new javax.swing.JTextField();
        txtDPI = new javax.swing.JTextField();
        txtTelefono = new javax.swing.JTextField();
        btnAgregarCliente = new javax.swing.JButton();
        btnActualizarCliente = new javax.swing.JButton();
        btnEliminarCliente = new javax.swing.JButton();
        jLabel1 = new javax.swing.JLabel();
        lbEmail = new javax.swing.JLabel();
        txtEmail = new javax.swing.JTextField();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        lbId.setFont(new java.awt.Font("Dialog", 0, 14)); // NOI18N
        lbId.setText("ID");
        lbId.addAncestorListener(new javax.swing.event.AncestorListener() {
            public void ancestorMoved(javax.swing.event.AncestorEvent evt) {
            }
            public void ancestorAdded(javax.swing.event.AncestorEvent evt) {
                lbIdAncestorAdded(evt);
            }
            public void ancestorRemoved(javax.swing.event.AncestorEvent evt) {
            }
        });

        lbNombres.setFont(new java.awt.Font("Dialog", 0, 14)); // NOI18N
        lbNombres.setText("Nombres");

        lbApellidos.setFont(new java.awt.Font("Dialog", 0, 14)); // NOI18N
        lbApellidos.setText("Apellidos");

        lbDPI.setFont(new java.awt.Font("Dialog", 0, 14)); // NOI18N
        lbDPI.setText("DPI");
        lbDPI.addAncestorListener(new javax.swing.event.AncestorListener() {
            public void ancestorMoved(javax.swing.event.AncestorEvent evt) {
            }
            public void ancestorAdded(javax.swing.event.AncestorEvent evt) {
                lbDPIAncestorAdded(evt);
            }
            public void ancestorRemoved(javax.swing.event.AncestorEvent evt) {
            }
        });

        lbTelefono.setFont(new java.awt.Font("Dialog", 0, 14)); // NOI18N
        lbTelefono.setText("Telefono personal");

        btnAgregarCliente.setFont(new java.awt.Font("Dialog", 0, 14)); // NOI18N
        btnAgregarCliente.setText("Agregar ");
        btnAgregarCliente.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnAgregarClienteActionPerformed(evt);
            }
        });

        btnActualizarCliente.setFont(new java.awt.Font("Dialog", 0, 14)); // NOI18N
        btnActualizarCliente.setText("Actualizar ");
        btnActualizarCliente.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnActualizarClienteActionPerformed(evt);
            }
        });

        btnEliminarCliente.setFont(new java.awt.Font("Dialog", 0, 14)); // NOI18N
        btnEliminarCliente.setText("Eliminar");
        btnEliminarCliente.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnEliminarClienteActionPerformed(evt);
            }
        });

        jLabel1.setFont(new java.awt.Font("Dialog", 0, 14)); // NOI18N
        jLabel1.setText("Registro de clientes");

        lbEmail.setFont(new java.awt.Font("Dialog", 0, 14)); // NOI18N
        lbEmail.setText("E-mail");

        javax.swing.GroupLayout panelDeVentanaRegistroAlumnosLayout = new javax.swing.GroupLayout(panelDeVentanaRegistroAlumnos);
        panelDeVentanaRegistroAlumnos.setLayout(panelDeVentanaRegistroAlumnosLayout);
        panelDeVentanaRegistroAlumnosLayout.setHorizontalGroup(
            panelDeVentanaRegistroAlumnosLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(panelDeVentanaRegistroAlumnosLayout.createSequentialGroup()
                .addContainerGap(103, Short.MAX_VALUE)
                .addGroup(panelDeVentanaRegistroAlumnosLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, panelDeVentanaRegistroAlumnosLayout.createSequentialGroup()
                        .addComponent(jLabel1)
                        .addGap(198, 198, 198))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, panelDeVentanaRegistroAlumnosLayout.createSequentialGroup()
                        .addGap(2, 2, 2)
                        .addComponent(btnAgregarCliente)
                        .addGap(35, 35, 35)
                        .addComponent(btnActualizarCliente)
                        .addGap(41, 41, 41)
                        .addComponent(btnEliminarCliente)
                        .addGap(101, 101, 101))))
            .addGroup(panelDeVentanaRegistroAlumnosLayout.createSequentialGroup()
                .addGap(91, 91, 91)
                .addGroup(panelDeVentanaRegistroAlumnosLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(lbEmail)
                    .addComponent(lbTelefono)
                    .addComponent(lbDPI)
                    .addComponent(lbApellidos)
                    .addComponent(lbNombres)
                    .addComponent(lbId))
                .addGap(62, 62, 62)
                .addGroup(panelDeVentanaRegistroAlumnosLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addComponent(txtId)
                    .addComponent(txtNombres)
                    .addComponent(txtApellidos)
                    .addComponent(txtEmail)
                    .addComponent(txtTelefono)
                    .addComponent(txtDPI, javax.swing.GroupLayout.PREFERRED_SIZE, 161, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(0, 0, Short.MAX_VALUE))
        );
        panelDeVentanaRegistroAlumnosLayout.setVerticalGroup(
            panelDeVentanaRegistroAlumnosLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(panelDeVentanaRegistroAlumnosLayout.createSequentialGroup()
                .addGap(30, 30, 30)
                .addComponent(jLabel1)
                .addGap(36, 36, 36)
                .addGroup(panelDeVentanaRegistroAlumnosLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(lbId)
                    .addComponent(txtId, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(18, 18, 18)
                .addGroup(panelDeVentanaRegistroAlumnosLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(lbNombres)
                    .addComponent(txtNombres, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(18, 18, 18)
                .addGroup(panelDeVentanaRegistroAlumnosLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(lbApellidos)
                    .addComponent(txtApellidos, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(18, 18, 18)
                .addGroup(panelDeVentanaRegistroAlumnosLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(lbDPI)
                    .addComponent(txtDPI, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(18, 18, 18)
                .addGroup(panelDeVentanaRegistroAlumnosLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(lbTelefono)
                    .addComponent(txtTelefono, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(22, 22, 22)
                .addGroup(panelDeVentanaRegistroAlumnosLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(lbEmail)
                    .addComponent(txtEmail, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(55, 55, 55)
                .addGroup(panelDeVentanaRegistroAlumnosLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(btnAgregarCliente)
                    .addComponent(btnActualizarCliente)
                    .addComponent(btnEliminarCliente))
                .addContainerGap(55, Short.MAX_VALUE))
        );

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addComponent(panelDeVentanaRegistroAlumnos, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 7, Short.MAX_VALUE))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addComponent(panelDeVentanaRegistroAlumnos, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 0, Short.MAX_VALUE))
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void btnAgregarClienteActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnAgregarClienteActionPerformed
        // TODO add your handling code here:
        Cliente cliente = new Cliente();
        cliente.setIdCliente(Integer.parseInt(txtId.getText()));  
        cliente.setNombreDelCliente(txtNombres.getText());
        cliente.setApellidoDelCliente(txtApellidos.getText());
        cliente.setDocumentoDeIdentificacion(Integer.parseInt(txtDPI.getText()));
        cliente.setTelefonoCliente(Integer.parseInt(txtTelefono.getText()));
        cliente.setCorreoElectronico (txtEmail.getText());
        cliente.setEstado_activo(true);
        ControlDelCliente controlador = new ControlDelCliente();
        controlador.ingresarCliente(cliente);
        
    }//GEN-LAST:event_btnAgregarClienteActionPerformed

    private void lbIdAncestorAdded(javax.swing.event.AncestorEvent evt) {//GEN-FIRST:event_lbIdAncestorAdded
        // TODO add your handling code here:
    }//GEN-LAST:event_lbIdAncestorAdded

    private void lbDPIAncestorAdded(javax.swing.event.AncestorEvent evt) {//GEN-FIRST:event_lbDPIAncestorAdded
        // TODO add your handling code here:
    }//GEN-LAST:event_lbDPIAncestorAdded

    private void btnActualizarClienteActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnActualizarClienteActionPerformed
        Cliente cliente = new Cliente();
        cliente.setIdCliente(Integer.parseInt(txtId.getText()));  
        cliente.setNombreDelCliente(txtNombres.getText());
        cliente.setApellidoDelCliente(txtApellidos.getText());
        cliente.setDocumentoDeIdentificacion(Integer.parseInt(txtDPI.getText()));
        cliente.setTelefonoCliente(Integer.parseInt(txtTelefono.getText()));
        cliente.setCorreoElectronico (txtEmail.getText());
        cliente.setEstado_activo(true);
        ControlDelCliente controlador = new ControlDelCliente();
        controlador.actualizarCliente(cliente);
    }//GEN-LAST:event_btnActualizarClienteActionPerformed

    private void btnEliminarClienteActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnEliminarClienteActionPerformed
        Cliente cliente = new Cliente();
        cliente.setIdCliente(Integer.parseInt(txtId.getText()));  
        cliente.setEstado_activo(false);
        ControlDelCliente controlador = new ControlDelCliente();
        controlador.eliminarCliente(cliente); 
    }//GEN-LAST:event_btnEliminarClienteActionPerformed

    

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btnActualizarCliente;
    private javax.swing.JButton btnAgregarCliente;
    private javax.swing.JButton btnEliminarCliente;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel lbApellidos;
    private javax.swing.JLabel lbDPI;
    private javax.swing.JLabel lbEmail;
    private javax.swing.JLabel lbId;
    private javax.swing.JLabel lbNombres;
    private javax.swing.JLabel lbTelefono;
    private javax.swing.JPanel panelDeVentanaRegistroAlumnos;
    private javax.swing.JTextField txtApellidos;
    private javax.swing.JTextField txtDPI;
    private javax.swing.JTextField txtEmail;
    private javax.swing.JTextField txtId;
    private javax.swing.JTextField txtNombres;
    private javax.swing.JTextField txtTelefono;
    // End of variables declaration//GEN-END:variables
}


