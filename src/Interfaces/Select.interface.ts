import MetaInterface from './Meta.interface';
import DropdownInterface from './Dropdown.interface';

export default interface SelectInterface{
    form: object,
    field: object,
    meta: MetaInterface,
    name: string,
    options: DropdownInterface[]
}