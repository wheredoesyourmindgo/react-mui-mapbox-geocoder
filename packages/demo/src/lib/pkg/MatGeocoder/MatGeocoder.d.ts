import { PaperProps, TextFieldProps } from '@mui/material';
declare type Props = {
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
    inputClasses?: any;
    inputPaperProps?: Partial<PaperProps>;
    suggestionsPaperProps?: PaperProps;
    inputTextFieldProps?: TextFieldProps;
    showInputContainer?: boolean;
    disableUnderline?: boolean;
};
/**
 * Geocoder component: connects to Mapbox.com Geocoding API
 * and provides an auto-completing interface for finding locations.
 */
declare const MatGeocoder: ({ endpoint, inputPlaceholder, showLoader, source, onSuggest, focusOnMount, showInputContainer, inputValue, proximity, country, bbox, types, limit, autocomplete, language, suggestionsPaperProps, onSelect, accessToken, onInputFocus, onInputBlur, inputClasses, inputTextFieldProps, disableUnderline, inputPaperProps, }: Props) => JSX.Element | null;
export default MatGeocoder;
