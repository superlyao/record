import React, { Component } from 'react';
import OrderItem from '../OrderItem'



class OrderList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        fetch('/mock/order.json').then(res => {
            console.log('res', res)

            if (res.ok) {
                res.json().then(data => {
                    this.setState({
                        data
                    })
                })
            }
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.data.map((item) => {
                    
                        return <OrderItem key={item.id} data={item}/>
                    })
                }
            </div>
        );
    }

    handleSubmit = (id, comment, start) => {
         const newData =  this.state.data.map(item => {
            return item.id ===id ? {
                ...item, comment, start, ifCommented : false
            }: item
        })

        return newData;
    }
}

export default OrderList;