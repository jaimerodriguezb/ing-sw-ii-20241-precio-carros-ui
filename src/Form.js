import useForm from "./UseForm";
import getConfig from "./Data"
import React, { useState } from "react";
import Select from "react-select";

const Form = () => {
    const { handleSubmit, status, message } = useForm();
    const { FORM_ENDPOINT, us_states, model_codes, maker_codes } = getConfig();
    const [estado, setEstado] = useState(us_states[0]);
    const [marca, setMarca] = useState(maker_codes[0]);
    const marcas = maker_codes.map(marca => ({
        value: marca,
        label: marca
    }));
    const [modelo, setModelo] = useState(model_codes[0]);
    const modelos = model_codes.map(modelo => ({
        value: modelo,
        label: modelo
    }));

    const onchangeSelectEstado = (item) => {
        setEstado(item);
    };

    const onchangeSelectMarca = (item) => {
        setMarca(item);
    };

    const onchangeSelectModelo = (item) => {
        setModelo(item);
    };

    if (status === "success") {
        return (
            <>
                <div className="text-2xl">Gracias por utilizar el software</div>
                <div className="text-md">{message}</div>
            </>
        );
    }

    if (status === "error") {
        return (
            <>
                <div className="text-2xl">Hubo un error en la ejecuci&oacute;n</div>
                <div className="text-md">{message}</div>
            </>
        );
    }

    return (
        <form
            action={FORM_ENDPOINT}
            onSubmit={handleSubmit}
            method="GET"
        >
            <div className="pt-0 mb-3">
                <h1>Predictor de precios de veh&iacute;culos</h1>
            </div>
            <div className="pt-0 mb-3">
                <input
                    type="number"
                    placeholder="Año"
                    name="anio"
                    className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
                    required
                />
            </div>
            <div className="pt-0 mb-3">
                <input
                    type="number"
                    placeholder="Kilometraje"
                    name="kilometraje"
                    className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
                    required
                />
            </div>
            <div className="pt-0 mb-3">
                <Select
                    placeholder="Estado"
                    name="estado"
                    value={estado}
                    onChange={onchangeSelectEstado}
                    options={us_states}
                    className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
                    required
                />
            </div>
            <div className="pt-0 mb-3">
                <Select
                    placeholder="Marca"
                    name="marca"
                    value={marca}
                    onChange={onchangeSelectMarca}
                    options={marcas}
                    className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
                    required
                />
            </div>
            <div className="pt-0 mb-3">
                <Select
                    placeholder="Modelo"
                    name="modelo"
                    value={modelo}
                    onChange={onchangeSelectModelo}
                    options={modelos}
                    className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
                    required
                />
            </div>
            {status !== "loading" && (
                <div className="pt-0 mb-3">
                    <button
                        className="active:bg-blue-600 hover:shadow-lg focus:outline-none px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded shadow outline-none"
                        type="submit"
                    >
                        Predecir
                    </button>
                </div>
            )}
        </form>
    );
};

export default Form;
