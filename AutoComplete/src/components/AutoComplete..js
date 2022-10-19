import React, { useState, useEffect } from 'react';
import { DataTable } from './DataTable';
import { store } from '../store/store';
import { OrderAction } from '../action/OrderAction';

export const AutoComplete = () => {
  const [searchData, setSearchData] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [selCity, setSelCity] = useState(-1);
  const [msg, setMsg] = useState("Search");
  const cityData = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "Phoenix-2",
    "Dallas"
  ]
  const hdrData = ["id", "orderNo", "client", "city"];

  useEffect(() => {
    store.dispatch(OrderAction());
    const StoreData = store.getState();
    StoreData.orderData.then(data => {
      setOrderData(data);
      setTableData(data);
    }).catch(err => {
      console.log("err", err);
    })
    setSearchData(cityData);
  }, []);

  const onTextChange = (e) => {
    const { value } = e.target;
    setTextValue(value);
    if (value.length === 0) {
      setSelCity(-1);
      setMsg("Enter Value to search");
      setSearchData([...cityData]);
      setTableData(orderData);
    } else {
      const regex = new RegExp(`^${value}`, 'i');
      const Result = cityData.sort().filter(v => regex.test(v))
      setSearchData([...Result]);
      setMsg("Search");
    }
  }
  const onListSelect = (item) => {
    setTextValue(item);
    const filteredOrdData = orderData.filter(data => {
      return data.city.match(item);
    })
    setTableData([...filteredOrdData]);
  }

  const handleKeyDown = (e) => {
    const { keyCode } = e;
    if (keyCode === 40 && selCity < searchData.length - 1) {
      const SelIndex = selCity + 1;
      setTextValue(searchData[SelIndex]);
      const filteredOrdData = orderData.filter(data => {
        return data.city.match(searchData[SelIndex]);
      })
      setTableData([...filteredOrdData]);

      setSelCity(SelIndex);
    }
    if (keyCode === 38 && selCity > 0) {
      const SelIndex = selCity - 1;
      setTextValue(searchData[SelIndex]);
      const filteredOrdData = orderData.filter(data => {
        return data.city.match(searchData[SelIndex]);
      })
      setTableData([...filteredOrdData]);
      setSelCity(SelIndex);
    }
  }

  return (
    <>
      <div className="container">
        <h5>{msg}</h5>
        <div className="row">
          <div className="col-md-4">
            <label>USA City</label>
            <input type="text" value={textValue} onChange={onTextChange} onKeyDown={handleKeyDown} />
            {textValue.length > 0 &&
              <ul className='auto-list'>
                {searchData.map((item, idx) =>
                  <li key={idx} onClick={() => onListSelect(item)} className={selCity === idx ? "search-sel" : null}> {item}</li>
                )}
              </ul>}
          </div>
          <div className="col-md-12">
            <DataTable hdrData={hdrData} dataSource={tableData} />
          </div>
        </div>
      </div>

    </>
  )
}

