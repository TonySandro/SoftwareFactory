import { RequiredFieldValidation, ValidationComposite, CompareFieldsValidation, EmailValidation } from "../../../presentation/helpers/validators";
import { EmailValidatorAdapter } from "../../adapters/validators/email-validator-adapter";
import { Validation } from "../../../presentation/protocols/validation";

export const makeSignUpValidation = (): ValidationComposite => {
    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation', 'cpf']) {
        validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

    return new ValidationComposite(validations)
}