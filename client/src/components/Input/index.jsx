import { ContainerInput, ErrorValidation, FlyingPlaceholder, InputBox, InputField } from "./styled"

export const Input = ({ type, name, placeholder, value, onChange, errorValidation }) => {
    return (
        <ContainerInput>
            <InputBox>
                <InputField
                    value={value}
                    onChange={onChange}
                    type={type}
                    name={name}
                    id={name}
                    placeholder=" "
                    autoComplete="off"
                />
                <FlyingPlaceholder
                    htmlFor={name}
                    className="flyingPlaceholder"
                >
                    {placeholder}
                </FlyingPlaceholder>
            </InputBox>
            <ErrorValidation>{errorValidation}</ErrorValidation>
        </ContainerInput>
    )
}