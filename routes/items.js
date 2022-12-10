// import required essentials
const express = require('express');
const {tables, servants, products, statuses} = require('./static-mocks')
// create new router
const router = express.Router();

// create a JSON data array
const data = [
    {
        id: 1,
        table: tables[0],
        servant: servants[0],
        status: statuses[0],
        orders: [
            {
                id: '5e9b683c-8e85-4a2e-75ee-ab0f324c6a03',
                title: products[0],
                count: 2,
                amount: 14,
                orderTime: "25-07-2022 17:17:00",
                status: statuses[0],
            },
            {
                id: '5e9b683c-4a2e-8e85-75ee-ab0f324c6a03',
                title: products[1],
                count: 1,
                amount: 3,
                orderTime: "25-07-2022 17:20:53",
                status: statuses[0],
            }
        ],
        totalAmount: 17,
        endTime: "25-07-2022 17:50:00"
    },
    {
        id: 2,
        table: tables[1],
        servant: servants[1],
        status: statuses[1],
        orders: [
            {
                id: '5e9b683c-4a2e-8eee-75ee-ab0f324c6a03',
                title: products[2],
                count: 3,
                amount: 16.5,
                orderTime: "25-07-2022 15:17:00",
                status: statuses[1],
            },
            {
                id: '5e9b683c-8e2e-4a85-75ee-ab0f324c6a03',
                title: products[1],
                count: 1,
                amount: 3,
                orderTime: "25-07-2022 17:20:53",
                status: statuses[0],
            }
        ],
        totalAmount: 19.5,
        endTime: "25-07-2022 17:50:00"
    },
    {
        id: 3,
        table: tables[2],
        servant: servants[1],
        status: statuses[2],
        orders: [
            {
                id: '5e9b683c-4a2e-8e85-ab0e-75ef324c6a03',
                title: products[0],
                count: 2,
                amount: 14,
                orderTime: "25-07-2022 15:17:00",
                status: statuses[2],
            },
            {
                id: '5e9b683c-4a2e-8a03-75ee-ab0f324c6e85',
                title: products[1],
                count: 1,
                amount: 3,
                orderTime: "25-07-2022 15:20:53",
                status: statuses[2],
            }
        ],
        totalAmount: 17,
        endTime: "25-07-2022 15:50:00"
    },
]

// READ
// this api end-point of an API returns JSON data array
router.get('/', function (req, res) {
    res.status(200).json(data);
});

// READ
// this api end-point returns an object from a data array find by id
// we get `id` from URL end-points
router.get('/:id', function (req, res) {
    // find an object from `data` array match by `id`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    // if object found return an object else return 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

// CREATE
// this api end-point add new object to item list
// that is add new object to `data` array
router.post('/', function (req, res) {
    // push new item object to data array of items
    data.push(req.body);

    // return with status 201
    // 201 means Created. The request has been fulfilled and
    // has resulted in one or more new resources being created.
    res.status(201).json(req.body);
});

// UPDATE
// this api end-point update an existing item object
// for that we get `id` and `title` from api end-point of item to update
router.put('/:id', function (req, res) {
    // get item object match by `id`

    let found = data.map(item => item.orders.find(item => item.id === req.params.id)).filter(item => item !== undefined)
    // check if item found
    if (found) {

        found.map(item => item.status = req.body.status)

        // find index of found object from array of data
        let targetIndex = data.map(item => item.orders.findIndex(item => item.id === req.params.id)).filter(item => item !== -1);

        // console.log('req found => ', data.map(item => item.orders.find(item => item.status === 'canceled')))

        // replace object from data list with `updated` object
        data.map(item => item.orders.splice(targetIndex, 1, ...found));

        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;
