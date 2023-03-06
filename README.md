# Ecommerce shoe server

## Available Scripts

### Add package

#### `npm install` or `yarn add`

### .env setup

- PORT
- JWT_KEY
- DATABASE_URL
- expiresTime
- corsOrigin
- adminRegisterKey

### Run project

#### `npm start` or `yarn start`

Runs the server in the development mode.
Server run on http://localhost:4000

## API description

### Get post man file [here](https://drive.google.com/file/d/1sXlqaX05n2jbCSlbuArhSHN7adda_GqE/view?usp=sharing) and remember add environment with URL variable

### URL server deploy: https://ecom-shoe.onrender.com

### admin_key: gnauq

### Docs

- Public API:
  - Get products list:
    - request:
      - method: GET
      - url: `v1/products`
      - params: {
        per_page: Number,
        page: Number,
        sort_price: Number
        }
    - response:
      - success: {
        - data: {
          "items": [
          {
          product
          }
          ]
          "total_items": Number,
          "current_page": Number,
          "per_page": Number,
          "total_pages": Number
          }
          }
  - Get product:
    - note: id is id of product
    - request:
      - method: GET
      - url: `v1/product/:id`
    - response: {
      data:{product}
      }
- User API
  - Login:
    - request:
      - method: POST
      - url: `/v1/users/current/login`
      - body: {
        "email": String,
        "password": String
        }
      - response: {data: {token: String}}
  - Register:
    - note: if admin_key is true with key on server account will be create as admin
    - request:
      - method: POST
      - url: `/v1/users/current`
      - body: {
        "first_name": String,
        "last_name": String,
        "phone_number": String,
        "email": String,
        "password": String,
        "avatar_img": String,
        "admin_key": String
        }
  - Get user data:
    - note: require beaer token in header
    - request:
      - method: GET
      - url: `/v1/users/current`
    - response: { data: {
      "id": String,
      "email": String,
      "role": String,
      "first_name": String,
      "last_name": String,
      "phone_number": String,
      "avatar_img": String
      }}
  - Update user data:
    - note: require beaer token in header
    - request:
      - method: PUT
      - url: `/v1/users/current`
      - body: {
        "first_name": String,
        "last_name": String,
        "phone_number": String,
        "admin_key": String
        }
  - Logout:
    - note: require beaer token in header
    - request:
      - method: DELETE
      - url: `/v1/users/current/logout`
    - response: {message: "Logout success"}
  - Logout all device:
    - note: require beaer token in header
    - request:
      - method: DELETE
      - url: `/v1/users/current/logoutAll`
    - response: {message: "Logout all device success"}
  - Get user cart:
    - note: require beaer token in header
    - request:
      - method: GET
      - url: `/v1/cart`
    - response: {
      "data": {
      "id": String,
      "grand_total": Number,
      "items_total": Number,
      "discount_amount": Number,
      "products": [{
      product: {},
      size_id: String,
      quantity: Number,
      selected: Boolean,
      size: {},
      id: String
      }]
      }
      }
  - Post item cart:
    - note: require beaer token in header
    - request:
      - method: POST
      - url: `/v1/cart`
      - body: {
        "productId": String,
        "sizeId": String,
        "quantity": Number
        }
    - response: {
      "data": {
      "id": String,
      "grand_total": Number,
      "items_total": Number,
      "discount_amount": Number,
      "products": [{
      product: {},
      size_id: String,
      quantity: Number,
      selected: Boolean,
      size: {},
      id: String
      }]
      }
      }
  - Update cart item:
    - note: require beaer token in header
    - request:
      - method: PUT
      - url: `/v1/cart/:itemId`
      - body: {
        "quantity": Number,
        "selected": Boolean
        }
    - response: {
      "data": {
      "id": String,
      "grand_total": Number,
      "items_total": Number,
      "discount_amount": Number,
      "products": [{
      product: {},
      size_id: String,
      quantity: Number,
      selected: Boolean,
      size: {},
      id: String
      }]
      }
      }
  - Delete cart item:
    - note: require beaer token in header
    - request:
      - method: DELETE
      - url: `/v1/cart/:itemId`
    - response: {message: "Delete item success"}
  - Checkout:
    - note: require beaer token in header
    - request:
      - method: POST
      - url: `/v1/cart/checkout`
      - body: {
        "payment_method": "cash"
        }
    - response: {
      "message": "Payment success",
      "data": {
      "grand_total": Number,
      "items_total": Number,
      "discount_amount": Number,
      "payment_method": String,
      "products": [
      ]
      "userId" :String
      "id" : String}}
  - Get user order history:
  - note: require beaer token in header
  - request:
    - method: POST
    - url: `/v1/users/current/orders`
    - params: {
      per_page: Number
      page: Number
      }
  - response: {data: {
    items:[]
    "total_items": Number,
    "current_page": Number,
    "per_page": Number,
    "total_pages": Number}}
- Admin API
  - Add product:
    - note: require beaer token in header
    - request:
      - method: POST
      - url: `/v1/users/current/product`
      - body: {
        "name": String,
        "description": String,
        "size": [
        {
        "name": String,
        "price": Number,
        "original_price": Number,
        "stock": Number,
        "product_img": String
        }
        ]
        }
    - response: {
      "message": "Add product success",
      "data": {
      "name": String,
      "description": String,
      "min_price": Number,
      "max_price": Number,
      "rating": Number,
      "stock": Number,
      "id": String,
      "size": [
      {
      "id": "String,
      "name": String,
      "price": Number,
      "original_price": Number,
      "stock": Number,
      "product_img": String
      }
      ]
      }
      }
  - Update product:
    - note: require beaer token in header
    - request:
      - method: PUT
      - url: `/v1/users/current/product/:productId`
      - body: {
        "name": String,
        "description": String,
        "size": []
        }
    - response: {
      "message": String,
      "data": {
      "name": String,
      "description": String,
      "min_price": Number,
      "max_price": Number,
      "rating": Number,
      "stock": Number,
      "id": String,
      "size": []
      }
      }
  - Delete product:
    - note: require beaer token in header
      - request:
        - method: Delete
        - url: `/v1/users/current/product/:productId`
      - response: {
        "message": "Delete product success"
        }
  - Add product size:
    - note: require beaer token in header
    - request:
      - method: Delete
      - url: `/v1/users/current/product/size`
      - body: {
        "productId": String,
        "sizeData": {
        "name": String,
        "price": Number,
        "original_price": Number,
        "stock": Number,
        "product_img": String
        }
        }
    - response: {
      "message": String,
      "data": {
      "name": String,
      "description": String,
      "min_price": Number,
      "max_price": Number,
      "rating": Number,
      "stock": Number,
      "id": String,
      "size": [
      {
      "id": String,
      "name": String,
      "price": Number,
      "original_price": Number,
      "stock": Number,
      "product_img": String
      },
      {
      "id": String,
      "name": String,
      "price": Number,
      "original_price": Number,
      "stock": Number,
      "product_img": String
      }
      ]
      }
      }
  - Update product size:
    - note: require beaer token in header
    - request:
      - method: PUT
      - url: `/v1/users/current/product/size/:sizeId`
      - body: {
        "productId": String,
        "sizeData": {
        "name": String,
        "price": Number,
        "original_price": Number,
        "stock": Number,
        "product_img": String
        }
        }
    - response: {
      "message": String,
      "data": {
      "name": String,
      "description": String,
      "min_price": Number,
      "max_price": Number,
      "rating": Number,
      "stock": Number,
      "id": String,
      "size": [
      {
      "id": String,
      "name": String,
      "price": Number,
      "original_price": Number,
      "stock": Number,
      "product_img": String
      },
      {
      "id": String,
      "name": String,
      "price": Number,
      "original_price": Number,
      "stock": Number,
      "product_img": String
      }
      ]
      }
      }
  - Delete product size:
    - note: require beaer token in header
    - request:
      - method: Delete
      - url: `/v1/users/current/product/size/:sizeId`
      - body: {productId: String}
    - response: {
      "message": "Delete product size success"
      }
