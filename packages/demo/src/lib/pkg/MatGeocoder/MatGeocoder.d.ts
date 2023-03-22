/// <reference types="react" />
import { PaperProps, InputBaseProps, TextFieldProps } from '@mui/material';
declare type Props = {
    /**
     * Anytime this value changed, the user input will be overriden with it. WARN: This is not a callback, inputValue won't change when the user types.
     */
    inputValue?: string;
    endpoint?: string;
    source?: string;
    inputPlaceholder?: string;
    accessToken: string;
    proximity?: {
        longitude: number;
        latitude: number;
    };
    country?: string;
    bbox?: number[];
    types?: string;
    limit?: number;
    autocomplete?: boolean;
    language?: string;
    showLoader?: boolean;
    focusOnMount?: boolean;
    onSelect: (param: any) => void;
    onSuggest?: (results: any[]) => void;
    onInputBlur?: (event: any) => void;
    onInputFocus?: (event: any) => void;
    /**
     * Override css classes to input.
     */
    inputClasses?: any;
    /**
     * Override input container props.
     */
    inputPaperProps?: Partial<PaperProps>;
    /**
     * Override suggestions container props.
     */
    suggestionsPaperProps?: PaperProps;
    /**
     * If textFieldsProps is provided, these props will be ignored.
     */
    inputProps?: Partial<InputBaseProps>;
    /**
     * Specify if you want the input to be a TextField instead of a MUI input. rawInputProps will be ignored.
     */
    textFieldProps?: Partial<TextFieldProps>;
    showInputContainer?: boolean;
};
/**
 * Geocoder component: connects to Mapbox.com Geocoding API
 * and provides an auto-completing interface for finding locations.
 */
declare const MatGeocoder: ({ endpoint, inputPlaceholder, showLoader, source, onSuggest, focusOnMount, showInputContainer, inputValue, proximity, country, bbox, types, limit, autocomplete, language, suggestionsPaperProps, onSelect, accessToken, onInputFocus, onInputBlur, inputClasses, inputProps: inputPropsParam, textFieldProps, inputPaperProps, }: Props) => JSX.Element | null;
export default MatGeocoder;
