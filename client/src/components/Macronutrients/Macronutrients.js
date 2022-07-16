import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { getMacros } from '../../services/mealService';
import { Macrotable } from './Macrotable';

import styles from './Macronutrients.module.css';

export const Macronutrients = ({ isLoading,
    setIsLoading,
    setErrorMessage,
    errorMessage,
    products,
    setProducts }) => {

    useEffect(() => {
        if (products.length === 0) {
            getMacros()
                .then(res => {
                    console.log(res);
                    if (res.length > 0) {
                        setProducts(res);
                        setIsLoading(false);
                    }
                }).catch(error => {
                    console.log(error.message);
                    setErrorMessage({ error: error.message });
                });
        } else {
            return
        }
    }, [setErrorMessage, setProducts, products, setIsLoading]);

    const [filterValue, setFilterValue] = useState("");
    const [quantify, setQuantify] = useState("");

    const filterHandler = (e) => {
        setFilterValue(e.target.value.toLowerCase());
    };

    const quantityHandler = (e) => {
        let value = Number(e.target.value);
        setQuantify(value);
        console.log(e.target.value);
    };

    return (
        <>
        <title>Хранителни стойности</title>
            <div className={styles['table-container']}>
                {
                    isLoading
                        ? <><BeatLoader loading={() => isLoading} /></>
                        : <>
                            < h1 className="already-reg">Търсене на продукти</h1>
                            < h3 className="already-reg">Моля въведете име на продукт на Български език:</h3>
                            <form className="search-nutrients" method="GET">
                                <label htmlFor='search'>Моля въведете име на Български</label>
                                <input type="text" placeholder="пилешко..." name="search"
                                    value={filterValue} onChange={filterHandler} />
                                <label htmlFor='quantity'>Моля въведете име количество в грамове</label>
                                <input type="number" placeholder="1000гр..." name="quantity"
                                    value={quantify || ''} onChange={quantityHandler} />
                            </form>
                            <h3 className="already-reg">На тази таблица можете да намерите основните хранителни
                                стойности на най-често срещаните и употребявани продукти!</h3>
                            <h3 className="already-reg">Стойностите са в грамове и се отнасят за 100гр. продукт!</h3>
                            <div className="row">
                                <div className="col-xs-12">
                                    <caption className="already-reg">!!!Важно:
                                        Данните относителни,и може да същестуват разминавания с други източници!
                                    </caption>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Име на продукт</th>
                                                <th>Вода гр.</th>
                                                <th>Белтъчини гр.</th>
                                                <th>Мазнини гр.</th>
                                                <th>Въглехидрати гр.</th>
                                                <th>Калории гр.</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {/* филтриране по време на писане, ако има нещо въведено в state 
                                            тогава работим с първия филтър, ако ли не изобразяваме всичко,
                                            също при въвеждане на стойност самостоятелно или с име, се променят и стойностите */}
                                            <>
                                                {
                                                    quantify !== 0 || filterValue
                                                        ?
                                                        products.filter(p => p.name.toLowerCase().includes(filterValue))
                                                            .map(row => <Macrotable key={row._id} {...row} value={quantify / 100} />)
                                                        : products.map(row => <Macrotable key={row._id} {...row} value={1} />)
                                                }
                                            </>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                }
                {errorMessage
                    ? <p className="error-message"> {errorMessage.error}</p>
                    : ""
                }
            </div >
        </>
    );
}