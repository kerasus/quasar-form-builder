import { DefineComponent } from 'vue'

// Define the FormBuilder component
export const FormBuilder: DefineComponent<Record<string, never>, Record<string, never>, unknown>

// Define the inputMixin type
export interface InputMixin {
    props: {
        name: { default: string; type: StringConstructor };
        label: { default: string; type: StringConstructor };
        disable: { default: boolean; type: BooleanConstructor };
        readonly: { default: boolean; type: BooleanConstructor };
        filled: { default: boolean; type: BooleanConstructor };
        min: { default: number; type: NumberConstructor };
        max: { default: number; type: NumberConstructor };
        color: { default: string; type: StringConstructor };
        behavior: { default: string; type: StringConstructor };
        type: { default: string; type: [StringConstructor, ObjectConstructor] };
        inline: { default: boolean; type: BooleanConstructor };
        dense: { default: boolean; type: BooleanConstructor };
        rounded: { default: boolean; type: BooleanConstructor };
        multiple: { default: boolean; type: BooleanConstructor };
        range: { default: boolean; type: BooleanConstructor };
        useChips: { default: boolean; type: BooleanConstructor };
        createNewValue: { default: boolean; type: BooleanConstructor };
        optionValue: { default: string; type: StringConstructor };
        optionLabel: { default: string; type: StringConstructor };
        size: { default: string; type: StringConstructor };
        fontSize: { default: string; type: StringConstructor };
        textColor: { default: string; type: StringConstructor };
        icon: { default: string; type: StringConstructor };
        class: { default: string; type: StringConstructor };
        options: { default: () => unknown[]; type: ArrayConstructor };
        hidden: { default: boolean; type: BooleanConstructor };
        src: {
            default: string | number | boolean | unknown[];
            type: [StringConstructor, NumberConstructor, BooleanConstructor, ArrayConstructor];
        };
        responseKey: {
            default: () => unknown;
            type: [StringConstructor, NumberConstructor, BooleanConstructor, ObjectConstructor, ArrayConstructor];
        };
        ripple: { default: boolean | object; type: [BooleanConstructor, ObjectConstructor] };
        outlined: { default: boolean; type: BooleanConstructor };
        flat: { default: boolean; type: BooleanConstructor };
        placeholder: { default: string; type: StringConstructor };
        rules: { default: () => unknown[]; type: ArrayConstructor };
        lazyRules: { default: boolean; type: BooleanConstructor };
        col: { default: string; type: StringConstructor };
        customLabelStyle: { default: string; type: StringConstructor };
        inputType: { default: string; type: StringConstructor };
        clearable: { default: boolean; type: BooleanConstructor };
        loading: { default: boolean; type: BooleanConstructor };
    };
    computed: {
        customClass(): string;
    };
    watch: {
        value(): void;
    };
    emits: ['update:value', 'input', 'change', 'onClick', 'onKeyPress'];
    data(): { inputData: unknown };
    created(): void;
    methods: {
        onClick(data: unknown): void;
        onKeyPress(data: unknown): void;
        change(val: unknown): void;
        normalizeInput(input: unknown): unknown;
        getValues(): unknown[];
        getFormData(): FormData | Record<string, unknown>;
        formHasFileInput(): boolean;
        isFile(file: unknown): boolean;
    };
}

// Define the FormBuilderAssist type
export interface FormBuilderAssist {
    normalizeInput: (input: unknown) => unknown;
    setAttributeByName: (
        inputData: unknown[],
        name: string,
        attribute: string,
        value: unknown
    ) => void;
    getFormData: (inputData: unknown[]) => object;
    getFlatInputs: (inputData: unknown[]) => unknown[];
    getInputsByName: (inputs: unknown[], name: string) => unknown;
    setInputValues: (responseData: unknown, inputs: unknown[]) => void;
}

// Define the FormBuilderGenerator component
export const FormBuilderGenerator: DefineComponent<Record<string, never>, Record<string, never>, unknown>

// Define the default export which is an object containing the above exports
declare const FormBuilderObject: {
    FormBuilder: typeof FormBuilder;
    inputMixin: InputMixin;
    FormBuilderGenerator: typeof FormBuilderGenerator;
    FormBuilderAssist: FormBuilderAssist;
}

export default FormBuilderObject
