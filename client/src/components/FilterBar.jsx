import React, { useEffect, useState } from "react";
import { obtener_ordenes } from "../api/orden";
import { obtener_clientes } from "../api/usuario";

const FilterBar = ({ setPropsOrdenes, usuario }) => {
  const [idsOrden, setIdsOrden] = useState([]);
  const [clientes, setIdsClientes] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    id: "",
    clienteId: "",
    total: "",
    totalMin: "",
    totalMax: "",
  });

  const handleChangeFilter = (key, value) => {
    setFilterCriteria((prevFilter) => ({ 
      ...prevFilter,
      [key]: value,
    }));
  };

  useEffect(() => {
    const obtenerIDsOrden = async () => {
      const ordenes = await obtener_ordenes({clienteId: usuario.id});
      const ids = ordenes.map((order) => order.id);
      setIdsOrden(ids);
    };

    const obtenerIDsCliente = async () => {
      const clientes = await obtener_clientes();
      const ids = clientes.map((cliente) => cliente.id);
      setIdsClientes(ids);
    };

    obtenerIDsOrden();
    obtenerIDsCliente();
  }, []);

  useEffect(() => {
    setPropsOrdenes(filterCriteria);
  }, [filterCriteria, setPropsOrdenes]);

  return (
    <div className="grid grid-cols-4 gap-5 w-full">
      <div className="flex flex-col justify-center items-center gap-2">
        <label htmlFor="id" className="uppercase font-semibold text-sm">
          seleccionar ID
        </label>
        <select
          id="id"
          name="id"
          className="p-2 bg-blue-600 text-white font-bold uppercase outline-none border-none"
          value={filterCriteria.id}
          onChange={(event) => handleChangeFilter("id", event.target.value)}
        >
          <option value="" className="uppercase">
            seleccionar
          </option>
          {idsOrden.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>

      {usuario.rol === "administrador" ? (
        <div className="flex flex-col justify-center items-center gap-2">
          <label
            htmlFor="idCliente"
            className="uppercase font-semibold text-sm"
          >
            seleccionar clienteId
          </label>
          <select
            id="idCliente"
            name="clienteId"
            className="p-2 bg-blue-600 text-white font-bold uppercase outline-none border-none"
            value={filterCriteria.clienteId}
            onChange={(event) =>
              handleChangeFilter("clienteId", event.target.value)
            }
          >
            <option value="" className="uppercase">
              seleccionar
            </option>
            {clientes.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className="flex flex-col justify-center items-center gap-2">
        <label htmlFor="min" className="uppercase font-semibold text-sm">
          seleccionar min
        </label>
        <select
          id="min"
          name="totalMin"
          className="p-2 bg-blue-600 text-white font-bold uppercase outline-none border-none"
          value={filterCriteria.totalMin}
          onChange={(event) =>
            handleChangeFilter("totalMin", event.target.value)
          }
        >
          <option value="" className="uppercase">
            seleccionar
          </option>
          <option value="0">$0</option>
          <option value="100">$100</option>
          <option value="200">$200</option>
          <option value="500">$500</option>
          <option value="1000">$1000</option>
          <option value="2000">$2000</option>
        </select>
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        <label htmlFor="max" className="uppercase font-semibold text-sm">
          seleccionar max
        </label>
        <select
          id="max"
          name="totalMax"
          className="p-2 bg-blue-600 text-white font-bold uppercase outline-none border-none"
          value={filterCriteria.totalMax}
          onChange={(event) =>
            handleChangeFilter("totalMax", event.target.value)
          }
        >
          <option value="" className="uppercase">
            seleccionar
          </option>
          <option value="100">$100</option>
          <option value="200">$200</option>
          <option value="500">$500</option>
          <option value="1000">$1000</option>
          <option value="2000">$2000</option>
          <option value="5000">$5000</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
