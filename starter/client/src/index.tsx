import React from 'react';
import ReactDOM from 'react-dom';
import webFontLoader from 'webfontloader';
import {QueryCache, ReactQueryCacheProvider} from 'react-query'
// react query hanya akan meminta data baru yang ada dibackend jika data diminta belum pernah ada di penyimpanan sementara (queryCache), ReactQueryCacheProvider ini adalah reqct konteks adalah sumber data diseluruh aplikasi 

import './assets/styles/main.css';
import App from './App';

// fungsi menggunakan webfontloader families:
// 1. perfomance akan lebih baik, sehingga kita tidak perlu banyak meload font famili
// 2. segi design untuk membuat user interface lebih baik dan pemilihan font famili harus sangat dipikirkan sehingga kita hanya akan memiliki 1 atau 2 font famili
webFontLoader.load({
  google: {
    families: ['Raleway:400,700:latin', 'Montserrat:700:latin']
  }
});

// konstat yang akan instantiate QueryCache class
const queryCache = new QueryCache()

ReactDOM.render(
  <>
    {/* reactquerycacheprovider */}
    <ReactQueryCacheProvider queryCache={queryCache}>
      <App />
    </ReactQueryCacheProvider>
  </>,
  document.getElementById('root')
);
