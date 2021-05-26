
import { Field, ErrorMessage } from 'formik';
import SelectInterface from './../../Interfaces/Select.interface';
import DropdownInterface from './../../Interfaces/Dropdown.interface';
import styles from '../styles.module.scss';

export default function Select(props: SelectInterface){
    const { name, options, field} = props;

    return(
        <div className={styles.selectContainer}>
            <Field {...field} as="select" >
                {
                    options.map((option: DropdownInterface) => {
                        return(
                            <option key={option.value} value={option.value}>{option.key}</option>
                        )
                    })
                }
            </Field>
            <ErrorMessage name={name}>
                {
                    (msg) => {
                        return(<span style={{color: 'red'}}>{msg}</span>)
                    }
                }
            </ErrorMessage>
        </div>
    )
}