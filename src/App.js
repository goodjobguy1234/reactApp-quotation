import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import QuotationTable from "./QuotationTable";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import useLocalStorage from 'react-localstorage-hook'

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const disRef = useRef();

  // const [dataItems, setDataItems] = useState([]);
  const [dataItems, setDataItems] = useLocalStorage("dataItems",[]);
  


  const dummyProductList = [
    { id: "p001", name: 'Samsung LED TV 52"', price: 15000 },
    { id: "p002", name: "Xiaomi Air Purifier", price: 4000 },
    { id: "p003", name: "Brother Laserjet Printer", price: 5500 },
    { id: "p004", name: "Bose Speaker", price: 20000 },
  ];

  const addItem = () => {
    if (itemRef.current.value == "") {
      alert("Item name is empty");
      return;
    }

    if(disRef.current.value < 0 || disRef.current.value > (qtyRef.current.value * ppuRef.current.value)) {
      alert('Invalid discount value');
      return
    }

    const pid = itemRef.current.value;
    const product = dummyProductList.find((e) => e.id === pid);

    var itemObj = {
      pid: pid,
      item: product.name,
      ppu: ppuRef.current.value,
      qty: qtyRef.current.value,
      dis: disRef.current.value
    };
   
    let {isHave, itemIndex} = checkIsRedundant(itemObj.pid, itemObj.ppu)
 
    if(isHave) {
      dataItems[itemIndex] = {
        pid: pid,
        item: product.name,
        ppu: ppuRef.current.value,
        qty: parseInt(dataItems[itemIndex].qty) + parseInt(qtyRef.current.value),
        dis: parseInt(dataItems[itemIndex].dis) + parseInt(disRef.current.value)
      }
     
    } else {
      dataItems.push(itemObj);
    }
    setDataItems([...dataItems]);   
  };

  const productChange = (e) => {
    const pid = itemRef.current.value;
    const product = dummyProductList.find((e) => e.id === pid);
    ppuRef.current.value = product.price
  }

  const options = dummyProductList.map((v) => {
    
    return <option value={v.id}>{v.name}</option>;
  });

  let checkIsRedundant = (itemId, itemPrice) => {
    let isHave = false
    let itemIndex = -1
    console.log(dataItems)
  
    dataItems.forEach((element,index) => {

      if(element.pid === itemId && element.ppu === itemPrice) {
        isHave = true
        itemIndex = index
      }
    });
    return {
      "isHave": isHave,
      "itemIndex": itemIndex
    }
  }

  return (
    <Container>
      <Row>
        <Col xs={5} style={{ backgroundColor: "#eaeaea" }}>
          <Form>
            <Form.Group className="mb-3" controlId="formItem">
              <Form.Label>Item</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={itemRef}
                onChange={productChange}
              >
                {options}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder= "Price"
                defaultValue={dummyProductList[0].price}
                ref={ppuRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formQauntity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" placeholder="Quantity" defaultValue={1} ref={qtyRef} min={1}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" placeholder="Discount" ref={disRef} defaultValue={0} min={0}/>
            </Form.Group>

            <Button variant="outline-dark" onClick={addItem}>
              Add
            </Button>

          </Form>
        </Col>
        <Col>
          <QuotationTable data={dataItems} setDataItems={setDataItems} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
