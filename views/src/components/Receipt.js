import React, {useEffect, useState, useRef, useContext} from 'react';
import { useSelector } from 'react-redux';
import ContactLinks from './ContactLinks';
import moment from 'moment';

function Receipt({invoice, action}) {
    const docRef = useRef(null);
    const [ position, setPostion ] = useState({x: 0, y: 0});
    const [ display, setDisplay ] = useState(false);
    const state = useSelector(state=>state);
    const { activeDocument, activeDashboard } = state;

    function openCmd(e){
        if(e.target === e.currentTarget){
            setPostion({
                x: e.offsetX,
                y: e.offsetY,
            });
            setDisplay(true)
        }   
    }

    function closeCmd(e){
        setTimeout(()=>{
            setDisplay(false);
            setPostion({
                x: 0,
                y: 0,
            });
        }, 0)
    }

    useEffect(()=>{
        docRef.current.addEventListener('contextmenu', openCmd, false)
        docRef.current.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.addEventListener('click', closeCmd, false);
                
    }, [])

    let totalActualprice_ = 0;
    let totalDiscountedprice_ = 0;
    
    for(let i=0; i<invoice.data ?(invoice.data.length) : 0; i++){
        totalActualprice_ += invoice.data[i].totalActualPrice;
    }

    for(let i=0; i<(invoice.data ? invoice.data.length : 0); i++){
        totalDiscountedprice_ += invoice.data[i].totalDiscountedPrice;
    }

    return (
        <div className="receipt">
            <div className="receipt-header">
                <div className="receipt-header-name">{invoice.doc.name.toUpperCase()}</div>
                {invoice.doc.about ? <div className="receipt-header-about">({invoice.doc.about})</div> : ''}
                {invoice.doc.address ? <div className="receipt-header-address">{invoice.doc.address}</div> : ''}
                {invoice.doc.branch ? <div className="receipt-header-address branch">Branch: {invoice.doc.branch}</div>: ''}
                <div className="date">
                    {
                        invoice.createdAt ?
                        (
                            <div className="datec createdAt">Date: {invoice.createdAt}</div>
                        ):''
                    }
                    {
                        invoice.updatedAt ?
                        (
                            <div className="datec updatedAt">Updated: {invoice.updatedAt}</div>
                        ):''
                    }
                </div>
                <div className="invoiceID">Invoice ID: {invoice.id ? invoice.id : '---'}</div>
            </div>

            <div className="receipt-contents">
                <table className='receipt-table'>
                    <thead>
                        <tr>
                            <th>ITEMS</th>
                            <th>QTY</th>
                            <th>PRICE</th>
                            <th>DISC</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            invoice.data.map((item, key)=>{
                                return (
                                    <tr title={item.item} key={key}>
                                        <td>{item.item}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.price}</td>
                                        <td>{item.discount}%</td>
                                        <td>{item.totalDiscountedPrice}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className="receipt-footer">
                <div className="receipt-currency ellipsis">Currency: {invoice.doc.currency}</div>
                <div className="receipt-grand-total">Grand Total: {totalDiscountedprice_} </div>
                {
                    invoice.paymentMethod ? 
                    (
                        <div className="receipt-payment-mode">
                            {invoice.paymentMethod.clientName ? <div>Client Name: {invoice.paymentMethod.clientName}</div> : ''}
                            {invoice.paymentMethod.cash ? <div>Cash: {invoice.paymentMethod.cash}</div> : ''}
                            {invoice.paymentMethod.POS ? <div>POS: {invoice.paymentMethod.POS}</div> : ''}
                            {invoice.paymentMethod.transfer ? <div>Transfer: {invoice.paymentMethod.transfer}</div> : ''}
                            {invoice.paymentMethod.amountPaid ? <div>Amount Paid: {invoice.paymentMethod.amountPaid}</div> : ''}
                            {invoice.paymentMethod.amountPaid  ? <div>Balance: {invoice.paymentMethod.balance}</div> : ''}
                        </div>
                    ): ''
                }
                <div className="receipt-contacts">
                    <ContactLinks link={invoice.contacts.phone} name="Phone"/>
                    <ContactLinks link={invoice.contacts.whatsapp} name="Whatsapp"/>
                    <ContactLinks link={invoice.contacts.facebook} name="Facebook"/>
                    <ContactLinks link={invoice.contacts.email} name="Email"/>
                    <ContactLinks link={invoice.contacts.twitter} name="Twitter"/>
                    <ContactLinks link={invoice.contacts.instagram} name="Instagram"/>
                    <ContactLinks link={invoice.contacts.websites} name="Websites"/>
                    <ContactLinks link={invoice.contacts.others} name="Others"/>
                </div>
                <div className="digest">{invoice.doc.digest ? invoice.doc.digest : ''}</div>
            </div>

            <div
                className='frame'
                ref={docRef}
            ></div>

            {

                display ? 
                (
                    <div
                        style={{
                            left: position.x,
                            top: position.y
                        }}
                        className="popUpFrame text-mid">
                            {
                                 activeDocument.active ? 
                                 (
                                     activeDocument.active && (function(){
                                         if(activeDocument.active === 'pos'){
                                            return (
                                                <>
                                                    <div onClick={action.saveInvoice}>Save</div>
                                                    <div onClick={action.printInvoice}>Print</div>
                                                </>
                                            )
                                         }else if(activeDocument.active === 'invoices'){
                                             return (
                                                 <>
                                                    <div onClick={()=>action.printInvoice(invoice)}>Print</div>
                                                    <div onClick={()=>action.editInvoice(invoice)}>Edit</div>
                                                    <div onClick={()=>action.deleteInvoice(invoice)}>Delete</div>
                                                 </>
                                             )
                                         }else{
                                             return ''
                                         }
                                     }())
                                 ):''
                            }
                    </div>
                ):''
            }
        </div>
    );
}

export default Receipt;