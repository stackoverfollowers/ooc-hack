import {NumberInput, TextInput, TextInputProps} from "@mantine/core";

export type AreaInputProps = Pick<TextInputProps, ['label', 'placeholder', 'onChange', 'value']> & {

}
export default function AreaInput({label, placeholder, onChange, value} : AreaInputProps) {
    return <NumberInput
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        parser={(value) => value.replace(/\s?|(,*)/g, '')}
        formatter={(value) =>
            !Number.isNaN(parseFloat(value))
                ? `${value} \u33A1`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                : '0 \u33A1'}
        />
}