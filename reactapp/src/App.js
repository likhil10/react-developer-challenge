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
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
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
            {items.map((item) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.nametype}</td>
                    <td>{item.recclass}</td>
                    <td>{item.year}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};



export default function App() {
    let [apiRes, setApiRes] = React.useState([]);
    let res;
    React.useEffect(() => {
        (async () => {
            const result = await axios(url);
            setApiRes(result.data);
        })();
    }, []);

    return (
        <div className="App">
            <ProductTable
                products={apiRes}
            />
        </div>
    );
}
