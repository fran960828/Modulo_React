import { useActionState, useContext, useEffect } from "react";
import type { FormState } from "../../core/domain/models";
import {
  calculateCartTotal,
  validateCheckoutForm,
} from "../../core/domain/services";
import { checkoutOrder } from "../../config/dependencies";
import { contextRestaurant } from "../store/ContextRest";
import { FormView } from "../complements/FormView";
import { contextGlobal } from "../store/ContextGlobal";
import { createPortal } from "react-dom";

export function FormContainer() {
  async function signUpAction(
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> {
    const values = {
      fullname: formData.get("fullname") as string,
      email: formData.get("email") as string,
      address: formData.get("address") as string,
      postalCode: formData.get("postalCode") as string,
      city: formData.get("city") as string,
    };
    const errors = validateCheckoutForm(values);
    // Simulación de validación
    if (errors.length > 0) {
      return {
        success: false,
        message: "Error de validación",
        errors: errors,
        inputs: values, // Devolvemos el input para persistirlo
      };
    }

    return { success: true, message: "¡Registro exitoso!", inputs: values };
  }

  // useActionState(acción, estadoInicial)
  const [state, formAction, pending] = useActionState(signUpAction, {
    success: false,
    message: "",
  });
  const { stateCart, handleClearCart } = useContext(contextRestaurant);
  const totalAmount = calculateCartTotal(stateCart);

  const { handleUISuccess, closeAll } = useContext(contextGlobal);

  useEffect(() => {
    if (state.success && state.inputs) {
      const processOrder = async () => {
        try {
          // Ajustamos la estructura al contrato que espera tu Backend
          const formattedData = {
            order: {
              items: stateCart,
              customer: {
                name: state.inputs!.fullname,
                email: state.inputs!.email,
                street: state.inputs!.address, // El backend pide 'street'
                "postal-code": state.inputs!.postalCode, // El backend pide 'postal-code'
                city: state.inputs!.city,
              },
            },
          };

          // 1. Enviamos al backend con la estructura 'order' envuelta
          await checkoutOrder(formattedData);

          // 2. Si la API responde OK, limpiamos y cambiamos UI
          handleClearCart();
          handleUISuccess();
        } catch (error) {
          console.error("Error al enviar el pedido:", error);
        }
      };

      processOrder();
    }
  }, [
    state.success,
    state.inputs,
    stateCart,
    handleClearCart,
    handleUISuccess,
    // Nota: checkoutOrder usualmente es una importación estática,
    // no necesita estar en dependencias a menos que sea un mock/prop.
  ]);

  return createPortal(
    <FormView
      pending={pending}
      formAction={formAction}
      totalAmount={totalAmount}
      closeAll={closeAll}
    />,
    document.getElementById("modal")!
  );
}
