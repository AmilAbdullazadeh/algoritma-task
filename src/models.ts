export interface IOrder {
    id: number
    table: string
    servant: string
    status: string
    orders: IOrderItem[]
    totalAmount: number
    endTime: string
}

export interface IOrderItem {
    id: number
    title: any
    count: number
    amount: number
    orderTime: string
    status: string
}

export interface ICustomField {
    id: string
    type: number
    label: string
}
