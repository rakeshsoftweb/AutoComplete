import axios from 'axios';
export const OrderAction = () => {
  return {
    type: 'ORDER-DATA', payload: new Promise((Resolve, Reject) => {
      axios.get("orders.json").then(Response => {
        Resolve(Response.data);
      }).catch(err=>{
        Reject(err);
      })
    })
  }     
}