import React from "react";
import "./App.css";
import axios from 'axios';

const url = "https://data.nasa.gov/resource/gh4g-9sfh.json";
const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = "ascending";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "ascending"
        ) {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
    const { items, requestSort, sortConfig } = useSortableData(props.products);
    const { flag } = props;
    let value = flag.value;
    let f = false;
    let i = 0, j =0;
    console.log("hi man", props);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

     function search(nameKey, items){
         if (flag.flag) {
            for (i=0; i < items.length; i++) {
                if (flag.value === "id") {
                    if (items[i].id === nameKey) {
                        f = true;
                        return i;
                    }
                } else if (flag.value === "name") {
                    if (items[i].name === nameKey) {
                        console.log("hi man", items[i].name, nameKey, i);
                        f = true;
                        return i;
                    }
                } else if (flag.value === "nametype") {
                    if (items[i].nametype === nameKey) {
                        f = true;
                        return i;
                    }
                }else if (flag.value === "recclass") {
                    if (items[i].recclass === nameKey) {
                        f = true;
                        return i;
                    }
                }else if (flag.value === "year") {
                    if (items[i].year === nameKey) {
                        f = true;
                        return i;
                    }
                }
            }
            f = false;
            return 0;
        }
    }

    j = search(flag.text, items);

    return (
        <table id="table">
            <thead>
            <tr>
                <th>
                    <button
                        type="button"
                        onClick={() => requestSort("id")}
                        className={getClassNamesFor("id")}
                    >
                        ID
                    </button>
                </th>
                <th>
                    <button
                        type="button"
                        onClick={() => requestSort("name")}
                        className={getClassNamesFor("name")}
                    >
                        Name
                    </button>
                </th>
                <th>
                    <button
                        type="button"
                        onClick={() => requestSort("nametype")}
                        className={getClassNamesFor("nametype")}
                    >
                        Name Type
                    </button>
                </th>
                <th>
                    <button
                        type="button"
                        onClick={() => requestSort("recclass")}
                        className={getClassNamesFor("recclass")}
                    >
                        RecClass
                    </button>
                </th>
                <th>
                    <button
                        type="button"
                        onClick={() => requestSort("year")}
                        className={getClassNamesFor("year")}
                    >
                        Year
                    </button>
                </th>
            </tr>
            </thead>
            <tbody>
            {f && flag.flag ?
                <tr key={items[j].id}>
                    <td>{items[j].id}</td>
                    <td>{items[j].name}</td>
                    <td>{items[j].nametype}</td>
                    <td>{items[j].recclass}</td>
                    <td>{items[j].year}</td>
                </tr>
                : !f && flag.flag?
                    null
                    :
                items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.nametype}</td>
                        <td>{item.recclass}</td>
                        <td>{item.year}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
};



export default function App() {
    let [apiRes, setApiRes] = React.useState([]);
    let [value, setValue] = React.useState(null);
    let [text, setText] = React.useState(null);
    let [flag, setFlag] = React.useState(false);


    React.useEffect(() => {
        (async () => {
            const result = await axios(url);
            setApiRes(result.data);
        })();
    }, []);

    const handleValueChange = event =>{
        setValue(event.target.value);
        if(event.target.value === ""){
            setFlag(false);
        }
    };
    const handleTextChange = event =>{
        setText(event.target.value);
        if(event.target.value === ""){
            setFlag(false);
        }
    };
    const handleClick = () => {
        if (value !== "" && value !== null && text !== null && text !== "") {
            setFlag(true);
        } else {
            setFlag(false);
        }
    };

    return (
        <div className="App">
            <select
                id="select"
                onChange={handleValueChange}
            >
                <option selected value="" />
                <option value="id">ID</option>
                <option value="name">Name</option>
                <option value="nametype">NameType</option>
                <option value="recclass">RecClass</option>
                <option value="year">Year</option>
            </select>
            <input
                type="text"
                id="selectText"
                onChange={handleTextChange}
            />
            <button type="button" onClick={handleClick}>Go</button>
            <ProductTable
                products={apiRes}
                flag={flag? {"value": value,"text": text, "flag":true} : {"flag": false}}
            />
        </div>
    );
}
