import { useEffect, useReducer, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { shop100Pay } from '@100pay-hq/checkout';

function App() {
  const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [items, setItems] = useState([
    {
      name: 'Nike Kicks',
      imageSrc:
        'https://stackblitz.com/files/vitejs-vite-dskcpl/github/miracleonyenma/checkout-with-100pay-vanillajs/master/assets/img/pngwing.com%20(2).png',
      price: 20,
      qty: 1,
    },
    {
      name: 'Plain Nike Kicks',
      imageSrc:
        'https://stackblitz.com/files/vitejs-vite-dskcpl/github/miracleonyenma/checkout-with-100pay-vanillajs/master/assets/img/pngwing.com.png',
      price: 30,
      qty: 1,
    },
  ]);

  const [total, setTotal] = useState(0);
  const [currency, setCurrency] = useState({
    code: 'USD',
    name: 'United States Dollars',
  });

  const handleCurrencyChange = (e) => {
    setCurrency({ code: e.target.value, name: e.target.textContent });
  };

  const formatPrice = (price) => price.toLocaleString('en', currencyOptions);

  const initPayment = (e) => {
    e.preventDefault();

    shop100Pay.setup({
      ref_id: `${Math.floor(Math.random() * 1000000000 + 1)}`,
      api_key:
        'LIVE;PK;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjYyOGQyMDA1N2U0YmQyMDAyZDg5YTk3NyIsInVzZXJJZCI6IjYyOGQxZjEzN2U0YmQyMDAyZDg5YTk1MCIsImlhdCI6MTY1MzQxNTk0MX0.4a9Ov5x5MEmbIIO4ebRYG_9nH4BBxa7Fxo2tcC7BO14',
      customer: {
        user_id: '1', // optional
        name: `${firstName} ${lastName}`,
        phone,
        email: email,
      },
      billing: {
        amount: total,
        currency: currency.code, // or any other currency supported by 100pay
        description: 'Test Payment',
        country: 'USA',
        vat: 10, //optional
        pricing_type: 'fixed_price', // or partial
      },
      metadata: {
        is_approved: 'yes',
        order_id: 'OR2', // optional
        charge_ref: 'REF', // optional, you can add more fields
      },
      call_back_url: 'http://localhost:8000/verifyorder/',
      onClose: (msg) => {
        alert('User closed payment modal.');
      },
      callback: (reference) => {
        alert(`Transaction successful with id: ${reference}`);
      },
      onError: (error) => {
        console.log(error);
        alert('Sorry something went wrong pls try again.');
      },
    });
  };

  useEffect(() => {
    setTotal(() => {
      let x = 0;
      items.forEach((item) => (x = x + item.price));
      return x;
    });
  }, []);

  return (
    <div>
      <main>
        <section className>
          <div className="checkout-wrapper">
            <div className="checkout-section">
              <div className="wrapper">
                <header className="checkout-header">
                  <figure className="site-logo">100 Stores</figure>
                </header>
                <section className="cart-section">
                  <header className="cart-section-header">
                    <h3>Checkout</h3>
                    <h4 className="price total-amount">
                      USD {formatPrice(total)}
                    </h4>
                    <span className="items-count"> 2 items </span>
                  </header>
                  <section className="items-cont">
                    <ul className="items">
                      {items.map((item) => {
                        return (
                          <li key={item.name} className="item">
                            <div className="item-details">
                              <div className="img-cont item-img">
                                <img src={item.imageSrc} alt="" />
                              </div>
                              <div className="cont">
                                <h4 className="item-name">{item.name}</h4>
                                <div className="item-quantity">
                                  <span>Qty</span>
                                  <span className="font-bold">
                                    {' '}
                                    {item.qty}{' '}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="item-price">
                                USD ${formatPrice(item.price)}{' '}
                              </p>
                              <span className="text-gray-400">
                                USD ${formatPrice(item.price)} each
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                </section>
              </div>
            </div>
            <div className="payment-form-cont">
              <form
                onSubmit={initPayment}
                id="paymentForm"
                className="payment-form"
              >
                <div className="wrapper">
                  <header className="mb-4">
                    <h1 className="font-bold text-2xl">Complete Payment</h1>
                  </header>
                  <div className="form-group">
                    <div className="form-control">
                      <label htmlFor="first-name">First Name</label>
                      <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        id="firstName"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label htmlFor="last-name">Last Name</label>
                      <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        id="lastName"
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label htmlFor="email">Email Address</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      id="emailAddress"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label htmlFor="phone">Phone </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel"
                      id="phone"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-control select">
                    <label htmlFor="currency">Currency</label>
                    <select
                      name="currency"
                      id="currency"
                      value={currency.code}
                      onChange={handleCurrencyChange}
                    >
                      <option value="USD">United States Dollar</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label htmlFor="amount">Amount</label>
                    <input
                      type="number"
                      id="amount"
                      className="form-input"
                      value={total}
                      disabled
                      required
                    />
                  </div>
                  <div className="form-submit">
                    <button type="submit" className="cta w-icon w-full">
                      <span>Pay with 100pay</span>
                      {/* <span class="icon !w-16">
                  <img src="https://100pay.co/img/100pay-logo.svg" alt="100pay logo" class="img">
                </span> */}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      {/* Wrapper for the 100Pay checkout modal */}
      <div id="show100Pay" />
    </div>
  );
}

export default App;
