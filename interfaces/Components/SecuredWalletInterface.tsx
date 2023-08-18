import { func } from 'prop-types';
export default interface SecuredWalletInterface {
    children?:any;
    otherProps?:any;
    modelVisible?:boolean;
    onPressNum?;
    disablePad?:boolean;
    onCloseModal?;
    dataCallBack?;
    title?:string;
    subTitle?:string;
    confirmData?:string
    isConfirmModal?:boolean
}