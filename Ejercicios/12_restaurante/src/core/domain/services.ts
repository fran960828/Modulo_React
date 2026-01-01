import type { CartItem, ValidationError } from "./models";

export const calculateCartTotal = (items: CartItem[]): number =>
  items.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

// core/domain/validation/checkoutValidation.ts

export const validateCheckoutForm = (data: Record<string, string>): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Fullname: Al menos nombre y apellido
  if (!data.fullname || data.fullname.trim().split(' ').length < 2) {
    errors.push({ field: 'fullname', message: 'Por favor, introduce nombre y apellido completo.' });
  }

  // Email: Formato estándar
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    errors.push({ field: 'email', message: 'El formato del correo electrónico no es válido.' });
  }

  // Address: No vacía y longitud mínima
  if (!data.address || data.address.length < 5) {
    errors.push({ field: 'address', message: 'La dirección es demasiado corta.' });
  }

  // Postal Code: 5 dígitos (ejemplo España)
  const pcRegex = /^\d{5}$/;
  if (!pcRegex.test(data.postalCode)) {
    errors.push({ field: 'postalCode', message: 'El código postal debe tener 5 dígitos.' });
  }

  // City: Solo letras y espacios
  if (!data.city || data.city.length < 2) {
    errors.push({ field: 'city', message: 'La ciudad es obligatoria.' });
  }

  return errors;
};