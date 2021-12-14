import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Home,
  NotFound,
  ProductCreate,
  ProductDetails,
  ProductEdit,
  ProductList,
  RequestTo,
  TransactionDetails,
  TransactionList,
  UserLogin,
  UserProfile,
  UserRegister,
} from './containers'

export default function MainSwitch() {
  return (
    <Switch>
      <Route path='/products/create' exact>
        <ProductCreate />
      </Route>

      <Route path='/products/:id/edit'>
        <ProductEdit />
      </Route>

      <Route path='/products/:id'>
        <ProductDetails />
      </Route>

      <Route path='/products'>
        <ProductList />
      </Route>

      <Route path='/login' exact>
        <UserLogin />
      </Route>

      <Route path='/register' exact>
        <UserRegister />
      </Route>

      <Route path='/profile'>
        <UserProfile />
      </Route>

      <Route path='/requests'>
        <RequestTo />
      </Route>

      <Route path='/transactions/:id'>
        <TransactionDetails />
      </Route>

      <Route path='/transactions'>
        <TransactionList />
      </Route>

      <Route path='/search/'>
        <Home />
      </Route>

      <Route path='/' exact>
        <Home />
      </Route>

      <Route path='*'>
        <NotFound />
      </Route>
    </Switch>
  )
}
