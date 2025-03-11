import React from 'react'
import Image from 'next/image'
import { FaCheck, FaTruckLoading, FaTruck,  FaGift } from "react-icons/fa";
import {  FaTruckPlane, FaFileInvoice } from "react-icons/fa6";
import { useState } from 'react'




const Stepper = ({orderStatus}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [width, setWidth] = React.useState("0%")
  const Steps = ["CREATED", "PROCESSING", "SHIPPED", "OUT FOR DELIVERY", "DELIVERED"]
  const statusIcon = [{ icon: <FaCheck /> }, { icon: <FaTruckLoading /> }, { icon: <FaTruckPlane /> }, { icon: <FaTruck /> }, { icon: <FaGift /> }];
  const totalSteps = Steps.length;

  const currStep = async () => {
    let curr = 0;
    Steps.forEach((name, index) => {
      if (name == orderStatus) {
        curr = index + 1;
      }
    })
  await setActiveStep(curr);
 
}



React.useEffect(() => {
  currStep();
}, [orderStatus])

React.useEffect(() => {
  let newWidth = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;
  setWidth(newWidth);
}, [activeStep])


return (
  <div className="mx-auto w-full max-w-4xl px-4 pb-10">
    <div className="before:transform-y-1/2 relative mt-14 flex justify-between before:absolute before:left-0 before:top-1/2  before:h-1 before:w-full before:bg-slate-200">
      {Steps.map((step, idx) => (
        <div className="relative z-10" key={idx + 1}>
          <div
            className={`flex size-10 md:size-16  items-center justify-center border-2 transition-all delay-200 ease-in ${activeStep > idx + 1
              ? ' border-green-500 bg-green-400'
              : activeStep === idx + 1
                ? ' border-yellow-300  bg-yellow-100'
                : ' bg-gray-100'
              }`}
          >
            {activeStep > idx + 1 ? (
              <div className={` text-sm md:text-2xl font-semibold text-gray-100`}>
                {statusIcon[idx].icon}
              </div>
            ) : (
              <span
                className={`text-sm md:text-lg font-medium ${activeStep === idx + 1 && 'text-yellow-500 animate-pulse'}`}
              >
                 {statusIcon[idx].icon}
              </span>
            )}
          </div>
          <div className="absolute left-1/2 top-24 -translate-x-2/4 -translate-y-2/4">
            <span className="text-[10px] md:text-sm font-semibold text-zinc-400">
              {Steps[idx]}
            </span>
          </div>
        </div>
      ))}
      <div
        className="transform-y-1/2 absolute  left-0 top-1/2 h-1 w-full bg-green-500 transition-all delay-200 ease-in"
        style={{ width: width }}
      ></div>
    </div>
  </div>
);
};

const TrackPage= () => {

  const [order, setOrder] = React.useState();
  const [items, setItems] = React.useState();
  const [shippingAddress, setShippingAddress] = React.useState();

  React.useEffect(()=>{
    const data = obj;
    setOrder(data);
    setItems(data.items);
    setShippingAddress(data.shippingAddress);
  }, [])

  const downloadInvoice = async (orderId) => {
    const pdfUrl = 'https://example.com/invoice.pdf';
    const a = document.createElement('a');
    a.href = "/sample.pdf";
    a.download = 'invoice.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }


  const dateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // You can customize the format if you want
  }


  return (
    <>
      <div className="flex max-w-5xl mt-10 justify-between mb-3 mx-auto ">
        <div>
          <h2 className="text-sm md:text-xl font-bold ">Order No: {order?.orderNumber}</h2>
          <p className="text-gray-500 text-xs md:text-sm mt-1 ">Order placed on {dateString(order?.createdAt)}</p>
        </div>

        <button onClick={() => downloadInvoice("id")} className="flex-shrink-0 text-white bg-black border-0 py-2 md:px-8 px-4 mt-2 text-xs focus:outline-none rounded  sm:mt-0">
          <FaFileInvoice className="inline-block mb-0.5 mr-1" /> View Invoice
        </button>
      </div>
      <div className="max-w-5xl bg-inherit shadow-lg mb-10 mx-auto p-6  text-card-foreground border">
        <div className='w-full  max-h-72 overflow-y-scroll mt-5 border px-8 md:px-2'>
         { items && items.map((item) => <div className="flex items-center justify-around pb-8 mt-12 border-b-2">
          <div className="ml-4">
            <h3 className="text-xl font-semibold">{item.product.name}</h3>
            <p className="text-2xl font-bold text-primary mb-1">{item.price}</p>
            {item.product.description && <p className="text-muted-foreground text-sm pr-2 mb-1">
              {item.product.description}
            </p>}
            {item.size &&  <p className="text-sm mb-2 text-muted-foreground">Size: {item.size}</p>}
            
          </div>
          <img src="https://placehold.co/100x100" alt="Premium Suit" className="rounded-lg shadow-md" />
        </div>)}
        </div>
        


        <div className="bg-red-100 border mx-8 my-8 border-red-300 text-red-700 p-6 rounded-xl  text-center">
       
       <h2 className="text-xl font-semibold">Order Cancelled</h2>
       <p className="mt-2 text-sm text-red-600">
         Your order has been cancelled. If you have any concerns, please contact support.
       </p>
   
     </div>


        <div className="mb-10 mt-10 flex flex-col justify-center md:flex-row md:justify-between px-8 ">
          {shippingAddress && <div className="">
            <h4 className="font-bold">Shipping Address</h4>
            <p className="text-gray-500 text-sm mt-2">
              {shippingAddress.residenceType}
              <br/>
               {shippingAddress.name}
              <br />
              {shippingAddress.line1+" "+shippingAddress.line2}
              <br />
              {shippingAddress.city+" "+shippingAddress.state+" "+shippingAddress.country}
              <br/>
              {shippingAddress.pincode+" "+shippingAddress.phone}

            </p>
          </div>}

          <div className="mt-6 md:mt-0 ">
            <h4 className="font-bold">Payment Information</h4>
            <p className="text-gray-500 mt-2 text-sm">{order?.paymentMode}</p>
            <p className="text-gray-500 text-sm">
              SubTotal : {order?.subTotal}
            </p>
          </div>
          <div className='mt-6 md:mt-0'>
            <h4 className="font-bold">Shipping Updates</h4>
            <p className="text-gray-500 mt-2 text-sm">shipmentId : {order?.shipmentId}</p>
            <p className="text-gray-500 text-sm">pickupId : {order?.pickupId}</p>
          </div>
        </div>

        <div className="mt-6 border-t-2 border-border pt-4 px-4">
          <div className="flex justify-between mt-6 mb-2">
            <span>Total Amount</span>
            <span>₹{order?.totalAmount}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Gift Wrap Charge</span>
            <span>₹{order?.giftWrapCharge}</span>
          </div>
          <div className="flex justify-between mb-4 border-b-1 pb-4">
            <span>Delivery Charge</span>
            <span>₹{order?.deliveryCharge}</span>
          </div>
          <div className="flex justify-between text-lg font-bold mb-2">
            <span>Order Total</span>
            <span>₹{order?.subTotal}</span>
          </div>
        </div>
      </div>
    </>
  );
};



export default TrackPage;


const obj = {
  id: "7a136c5a-d23e-43",
  orderNumber: "5541439071",
  status: "PROCESSING",
  totalAmount: 249,
  deliveryCharge: 49,
  giftWrapCharge: 0,
  subTotal: 298,
  userId: "2698efbf-242d31db0",
  shippingId: "a0111a48-2e5b-4830-0711",
  pickupId: null,
  shipmentId: null,
  paymentMode: "CASH_ON_DELIVERY",
  paymentId: null,
  createdAt: "2025-03-04T05:02:34.679Z",
  updatedAt: "2025-03-04T05:02:34.679Z",
  cancelledAt: null,
  cancelledBy: null,
  items: [
    {
      id: "bd870a97-9698-46543cdbdce",
      orderId: "7a136c5a-d2314-e710352af9e3",
      productId: "2ad78c-8664-0cfcb268c982",
      color: "#FFFFFF",
      size: "L",
      quantity: 1,
      price: 249,
      totalPrice: 249,
      product: {
        name: "Bright basics white t-shirt",
        sku: "100",
        slug: "bright-basics-white-t-shirt",
        images: [
          {
            id: "45323699-0253-13f67a58a771",
            key: "imageFFFFFF",
            color: "#FFFFFF",
            url: "http://resv/vif",
            publicId: "saa5",
            productId: "2ad78477-b491-41b82"
          }
        ]
      }
    }
  ],
  shippingAddress: {
    id: "a0111a4-b6b5-d678b2e90711",
    name: "Sa",
    line1: "h3",
    line2: "kam nagar",
    landmark: "a park",
    city: "mod",
    state: "uesh",
    country: "In",
    pincode: "201",
    phone: "986",
    email: "imm@gmail.com",
    residenceType: "Home",
    userId: "269-844a-e4f682d31db0",
    createdAt: "2025-03-02T07:11:43.107Z",
    updatedAt: "2025-03-02T07:11:43.107Z"
  },
  shipment: null
}


// Example usage with the given object
/**

<Stepper orderStatus={order?.status || ''} />
const Stepper: React.FC<StepperProps> = ({ orderStatus }) => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [width, setWidth] = React.useState("0%")
  const Steps = ["CREATED", "PROCESSING", "SHIPPED", "OUT FOR DELIVERY", "DELIVERED"]
  const statusIcon = [{ icon: <FaCheck /> }, { icon: <FaTruckLoading /> }, { icon: <FaTruckPlane /> }, { icon: <FaTruck /> }, { icon: <FaGift /> }];
  const totalSteps = Steps.length;

  const currStep = async () => {
    let curr = 0;
    Steps.forEach((name, index) => {
      if (name == orderStatus) {
        curr = index + 1;
      }
    })
    await setActiveStep(curr);

  }

  React.useEffect(() => {
    currStep();
  }, [orderStatus])

  React.useEffect(() => {
    let newWidth = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;
    setWidth(newWidth);
  }, [activeStep])


  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-10">
      <div className="before:transform-y-1/2 relative mt-14 flex justify-between before:absolute before:left-0 before:top-1/2  before:h-1 before:w-full before:bg-slate-200">
        {Steps.map((step, idx) => (
          <div className="relative z-10" key={idx + 1}>
            <div
              className={`flex size-10 md:size-16  items-center justify-center border-2 transition-all delay-200 ease-in ${activeStep > idx + 1
                ? ' border-green-500 bg-green-400'
                : activeStep === idx + 1
                  ? ' border-yellow-300  bg-yellow-100'
                  : ' bg-gray-100'
                }`}
            >
              {activeStep > idx + 1 ? (
                <div className={` text-sm md:text-2xl font-semibold text-gray-100`}>
                  {statusIcon[idx].icon}
                </div>
              ) : (
                <span
                  className={`text-sm md:text-lg font-medium ${activeStep === idx + 1 && 'text-yellow-500 animate-pulse'}`}
                >
                  {statusIcon[idx].icon}
                </span>
              )}
            </div>
            <div className="absolute left-1/2 top-24 -translate-x-2/4 -translate-y-2/4">
              <span className="text-[10px] md:text-sm font-semibold text-zinc-400">
                {Steps[idx]}
              </span>
            </div>
          </div>
        ))}
        <div
          className="transform-y-1/2 absolute  left-0 top-1/2 h-1 w-full bg-green-500 transition-all delay-200 ease-in"
          style={{ width: width }}
        ></div>
      </div>
    </div>
  );
};
 */