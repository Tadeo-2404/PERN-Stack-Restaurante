import dotenv from 'dotenv';
dotenv.config();

import SibApiV3Sdk from 'sib-api-v3-sdk';
let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

const enviarEmail = async (tipo ,cliente, token) => {
  if(tipo === "confirmar cuenta") {
    sendSmtpEmail.subject = 'Confirmar tu cuenta';
    sendSmtpEmail.htmlContent = `
    <html>
        <body>
            <h1>Hola ${cliente.dataValues.nombre}!!</h1>
            <p>Recientemente haz creado una cuenta en Restaurante, para confirmarla presiona el siguiente link:</p>
            <a href='http://localhost:3000/cliente/confirmar-cuenta/${token}'>Confirmar mi cuenta</a>
            <p>Si tu no has creado esta cuenta, puedes ignorar el correo</p>
        </body>
    </html>
  `;
  sendSmtpEmail.sender = {'name':'Restaurante App','email':'sender@example.com'};
    sendSmtpEmail.to = [{ email: cliente.dataValues.correo, name: cliente.dataValues.nombre }];
    
    await apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      console.log('API call success:', data);
    }, function(error) {
      console.error('API call error:', error);
    });
  } else if(tipo === "restablecer contraseña") {
    sendSmtpEmail.subject = 'Restablecer tu contraseña';
    sendSmtpEmail.htmlContent = `
    <html>
        <body>
            <h1>Hola ${cliente.dataValues.nombre}!!</h1>
            <p>Recientemente haz solicitado un cambio de contraseña en Restaurante, para confirmar presiona el siguiente link:</p>
            <a href='http://localhost:3000/cliente/restablecer-contrasena/${token}'>Restablecer mi contraseña</a>
            <p>Si tu no has solicitado este cambio, puedes ignorar el correo</p>
        </body>
    </html>
  `;
  sendSmtpEmail.sender = {'name':'Restaurante App','email':'sender@example.com'};
    sendSmtpEmail.to = [{ email: cliente.dataValues.correo, name: cliente.dataValues.nombre }];
    
    await apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      console.log('API call success:', data);
    }, function(error) {
      console.error('API call error:', error);
    });
  }
}

export {
  enviarEmail
}