import { type FormBuilderGenericInputType } from 'src/assist'

export type FormBuilderToggleButtonType = FormBuilderGenericInputType & {
    value: string | number | boolean | object | Array<unknown>;
    toggleTextColor?: string;
    toggleColor?: string;
    push?: boolean;
    glossy?: boolean;
    clearable?: boolean;
    unelevated?: boolean;
    stretch?: boolean;
    stack?: boolean;
    spread?: boolean;
    noWrap?: boolean;
    noCaps?: boolean;
    options?: Array<{ label: string; value: unknown }>;
    color?: string;
    inline?: boolean;
    dense?: boolean;
    toggleType?: string;
    textColor?: string;
    flat?: boolean;
    outlined?: boolean;
    rounded?: boolean;
    size?: string;
    ripple?: boolean;
}
