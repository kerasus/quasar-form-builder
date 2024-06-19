declare module 'quasar-form-builder' {
    import { Component, DefineComponent } from 'vue';

    // Define the FormBuilder component
    export const FormBuilder: Component;

    // Define the inputMixin with a more detailed type based on the provided inputMixin.js file
    export const inputMixin: {
        props: {
            name: { default: string; type: StringConstructor },
            label: { default: string; type: StringConstructor },
            disable: { default: boolean; type: BooleanConstructor },
            readonly: { default: boolean; type: BooleanConstructor },
            filled: { default: boolean; type: BooleanConstructor },
            min: { default: number; type: NumberConstructor },
            max: { default: number; type: NumberConstructor },
            color: { default: string; type: StringConstructor },
            behavior: { default: string; type: StringConstructor },
            type: { default: string; type: [StringConstructor, ObjectConstructor] },
            inline: { default: boolean; type: BooleanConstructor },
            dense: { default: boolean; type: BooleanConstructor },
            rounded: { default: boolean; type: BooleanConstructor },
            multiple: { default: boolean; type: BooleanConstructor },
            range: { default: boolean; type: BooleanConstructor },
            useChips: { default: boolean; type: BooleanConstructor },
            createNewValue: { default: boolean; type: BooleanConstructor },
            optionValue: { default: string; type: StringConstructor },
            optionLabel: { default: string; type: StringConstructor },
            size: { default: string; type: StringConstructor },
            fontSize: { default: string; type: StringConstructor },
            textColor: { default: string; type: StringConstructor },
            icon: { default: string; type: StringConstructor },
            class: { default: string; type: StringConstructor },
            options: { default: () => any[]; type: ArrayConstructor },
            hidden: { default: boolean; type: BooleanConstructor },
            src: { default: string | number | boolean | any[]; type: [StringConstructor, NumberConstructor, BooleanConstructor, ArrayConstructor] },
            responseKey: { default: () => any; type: [StringConstructor, NumberConstructor, BooleanConstructor, ObjectConstructor, ArrayConstructor] },
            ripple: { default: boolean | object; type: [BooleanConstructor, ObjectConstructor] },
            outlined: { default: boolean; type: BooleanConstructor },
            flat: { default: boolean; type: BooleanConstructor },
            placeholder: { default: string; type: StringConstructor },
            rules: { default: () => any[]; type: ArrayConstructor },
            lazyRules: { default: boolean; type: BooleanConstructor },
            col: { default: string; type: StringConstructor },
            customLabelStyle: { default: string; type: StringConstructor },
            inputType: { default: string; type: StringConstructor },
            clearable: { default: boolean; type: BooleanConstructor },
            loading: { default: boolean; type: BooleanConstructor }
        },
        computed: {
            customClass(): string;
        },
        watch: {
            value(): void;
        },
        emits: ['update:value', 'input', 'change', 'onClick', 'onKeyPress'],
        data(): { inputData: any },
        created(): void,
        methods: {
            onClick(data: any): void,
            onKeyPress(data: any): void,
            change(val: any): void,
            normalizeInput(input: any): any,
            getValues(): any[],
            getFormData(): FormData | Record<string, any>,
            formHasFileInput(): boolean,
            isFile(file: any): boolean
        }
    };

    // Define the FormBuilderAssist (adjust the type as needed based on what assist.js exports)
    export * as FormBuilderAssist from './src/assist.js';

    // Define the FormBuilderGenerator component
    export const FormBuilderGenerator: Component;

    // Define the default export which is an object containing the above exports
    const FormBuilderObject: {
        FormBuilder: Component;
        inputMixin: typeof inputMixin;
        FormBuilderGenerator: Component;
    };

    export default FormBuilderObject;
}
