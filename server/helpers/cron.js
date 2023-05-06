import cron from "node-cron";
import Cliente from "../models/ClienteModel.js";

// Define la tarea cron
const eliminarClientesNoConfirmados = cron.schedule("0 */2 * * *", async function () {
  try {
    await Cliente.borrarClientesNoConfirmados();
    console.log("Clientes no confirmados eliminados con éxito");
  } catch (error) {
    console.error(error);
  }
});

// Exporta la tarea cron
export { eliminarClientesNoConfirmados };