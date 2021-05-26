import MetaInterface from './Meta.interface';

export default interface InputInterface{
    form: object,
    field: object,
    meta: MetaInterface,
    placeholder: string,
    labelName: string,
    id: string,
    inputType: string,
    halfWidth: boolean,
    required: boolean
}