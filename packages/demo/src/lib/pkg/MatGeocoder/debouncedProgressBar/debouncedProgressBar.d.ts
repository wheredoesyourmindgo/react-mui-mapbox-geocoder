/// <reference types="react" />
declare type Props = {
    show: boolean;
};
declare const debouncedProgressBar: ({ show: showProp }: Props) => JSX.Element;
export default debouncedProgressBar;
